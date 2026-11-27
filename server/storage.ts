import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { StorageConfigPublic, StorageMode } from '../src/types/index.ts';

export const DEFAULT_DATA_DIR = path.resolve(process.cwd(), 'data');
export const DEFAULT_STORE_FILE = path.join(DEFAULT_DATA_DIR, 'aetheris-store.json');
const STORAGE_CONFIG_PATH = path.join(DEFAULT_DATA_DIR, 'storage-config.json');
const MOUNTED_STORE_FILENAME = 'pheonikz-store.json';

export interface InternalStorageConfig {
  mode: StorageMode;
  mountedPath: string;
  remoteUrl: string;
  remoteUsername: string;
  remotePassword: string;
  remoteToken: string;
  remoteMethod: 'PUT' | 'POST';
  autoSyncRemote: boolean;
  lastSyncedAt: string | null;
  lastSyncError: string | null;
}

export interface StorageTestResult {
  ok: boolean;
  mode: StorageMode;
  target: string;
  latencyMs: number;
  existingStoreFound?: boolean;
  message: string;
}

const FORBIDDEN_SYSTEM_PREFIXES = [
  '/etc',
  '/proc',
  '/sys',
  '/dev',
  '/bin',
  '/sbin',
  '/usr',
  '/boot',
  '/lib',
  '/lib64',
  '/run',
];

function ensureDefaultDataDir(): void {
  try {
    if (!fs.existsSync(DEFAULT_DATA_DIR)) {
      fs.mkdirSync(DEFAULT_DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn(
      `Unable to create default data directory (${DEFAULT_DATA_DIR}):`,
      err instanceof Error ? err.message : err
    );
  }
}

function defaultConfigFromEnv(): InternalStorageConfig {
  const rawMode = (process.env.PHEONIKZ_STORAGE_MODE || 'local').trim();
  const mode: StorageMode =
    rawMode === 'mounted' || rawMode === 'webdav' || rawMode === 'remote-http'
      ? rawMode
      : 'local';
  return {
    mode,
    mountedPath: (process.env.PHEONIKZ_STORAGE_PATH || '').trim(),
    remoteUrl: (process.env.PHEONIKZ_REMOTE_STORAGE_URL || '').trim(),
    remoteUsername: (process.env.PHEONIKZ_REMOTE_STORAGE_USERNAME || '').trim(),
    remotePassword: (process.env.PHEONIKZ_REMOTE_STORAGE_PASSWORD || '').trim(),
    remoteToken: (process.env.PHEONIKZ_REMOTE_STORAGE_TOKEN || '').trim(),
    remoteMethod: 'PUT',
    autoSyncRemote: true,
    lastSyncedAt: null,
    lastSyncError: null,
  };
}

let cachedConfig: InternalStorageConfig | null = null;

export function loadStorageConfig(): InternalStorageConfig {
  if (cachedConfig) return cachedConfig;
  ensureDefaultDataDir();
  const envDefaults = defaultConfigFromEnv();
  if (fs.existsSync(STORAGE_CONFIG_PATH)) {
    try {
      const raw = fs.readFileSync(STORAGE_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<InternalStorageConfig>;
      cachedConfig = {
        ...envDefaults,
        ...parsed,
        mode:
          parsed.mode === 'mounted' ||
          parsed.mode === 'webdav' ||
          parsed.mode === 'remote-http' ||
          parsed.mode === 'local'
            ? parsed.mode
            : envDefaults.mode,
        remoteMethod: parsed.remoteMethod === 'POST' ? 'POST' : 'PUT',
        autoSyncRemote:
          typeof parsed.autoSyncRemote === 'boolean' ? parsed.autoSyncRemote : true,
      };
      return cachedConfig;
    } catch {
      // Fall back to env defaults if bootstrap config is unreadable
    }
  }
  cachedConfig = envDefaults;
  return cachedConfig;
}

export function persistStorageConfig(cfg: InternalStorageConfig): void {
  cachedConfig = cfg;
  ensureDefaultDataDir();
  try {
    writeFileAtomic(STORAGE_CONFIG_PATH, JSON.stringify(cfg, null, 2));
  } catch (err) {
    console.warn(
      `Unable to persist storage config (${STORAGE_CONFIG_PATH}):`,
      err instanceof Error ? err.message : err
    );
  }
}

export function validateMountedPath(rawPath: string): { ok: true; resolvedFile: string; resolvedDir: string } | { ok: false; error: string } {
  const trimmed = rawPath.trim();
  if (!trimmed || trimmed.includes('\0')) {
    return { ok: false, error: 'Mounted path cannot be empty.' };
  }
  if (!path.isAbsolute(trimmed)) {
    return {
      ok: false,
      error: 'Mounted path must be an absolute path (for example: /mnt/hetzner-box/pheonikz).',
    };
  }
  const normalized = path.resolve(trimmed);
  if (normalized === '/' || FORBIDDEN_SYSTEM_PREFIXES.some((p) => normalized === p || normalized.startsWith(`${p}/`))) {
    return {
      ok: false,
      error: 'Cannot store workspace data inside system directories (/etc, /usr, /proc, etc.). Use a mount path such as /mnt/hetzner-box/pheonikz.',
    };
  }

  if (normalized.toLowerCase().endsWith('.json')) {
    return {
      ok: true,
      resolvedFile: normalized,
      resolvedDir: path.dirname(normalized),
    };
  }

  return {
    ok: true,
    resolvedFile: path.join(normalized, MOUNTED_STORE_FILENAME),
    resolvedDir: normalized,
  };
}

export function validateRemoteStorageUrl(rawUrl: string): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { ok: false, error: 'Remote storage URL is required.' };
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { ok: false, error: 'Remote storage URL must use http:// or https://.' };
    }
    if (parsed.username || parsed.password) {
      return {
        ok: false,
        error: 'Do not embed credentials in the URL. Use the Username and Password fields below.',
      };
    }
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (
      !host ||
      host === 'metadata.google.internal' ||
      host === 'metadata.goog' ||
      host.startsWith('169.254.') ||
      host === 'fd00:ec2::254'
    ) {
      return { ok: false, error: 'Remote storage URL points to a blocked metadata address.' };
    }
    return { ok: true, url: parsed.toString() };
  } catch {
    return { ok: false, error: 'Enter a valid http:// or https:// remote storage URL.' };
  }
}

export function resolveActiveStoreFile(cfg?: InternalStorageConfig): string {
  const config = cfg ?? loadStorageConfig();
  if (config.mode === 'mounted' && config.mountedPath.trim()) {
    const check = validateMountedPath(config.mountedPath);
    if (check.ok) {
      return check.resolvedFile;
    }
  }
  return DEFAULT_STORE_FILE;
}

/**
 * Atomic file write safe for both local disk and mounted network filesystems (SSHFS/CIFS/NFS).
 */
export function writeFileAtomic(targetFile: string, content: string): void {
  const dir = path.dirname(targetFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const tmpFile = path.join(
    dir,
    `.${path.basename(targetFile)}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`
  );
  try {
    fs.writeFileSync(tmpFile, content, 'utf-8');
    fs.renameSync(tmpFile, targetFile);
  } catch {
    // Some CIFS/SSHFS mounts disallow atomic overwrite rename; fall back cleanly and remove tmp
    try {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    } catch {
      // ignore cleanup error
    }
    fs.writeFileSync(targetFile, content, 'utf-8');
  }
}

function buildRemoteAuthHeaders(cfg: InternalStorageConfig): Record<string, string> {
  const headers: Record<string, string> = {};
  if (cfg.mode === 'webdav') {
    const user = cfg.remoteUsername.trim();
    const pass = cfg.remotePassword;
    if (user || pass) {
      const encoded = Buffer.from(`${user}:${pass}`, 'utf-8').toString('base64');
      headers['Authorization'] = `Basic ${encoded}`;
    }
  } else if (cfg.mode === 'remote-http') {
    const token = cfg.remoteToken.trim();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

export function readLocalOrMountedStoreRaw(): { raw: string | null; filePath: string } {
  const cfg = loadStorageConfig();
  const targetFile = resolveActiveStoreFile(cfg);

  if (fs.existsSync(targetFile)) {
    try {
      return { raw: fs.readFileSync(targetFile, 'utf-8'), filePath: targetFile };
    } catch (err) {
      cfg.lastSyncError =
        err instanceof Error
          ? `Read error on ${targetFile}: ${err.message}`
          : `Unable to read ${targetFile}`;
      persistStorageConfig(cfg);
    }
  }

  // Fallback to default local cache if mounted path is temporarily missing
  if (targetFile !== DEFAULT_STORE_FILE && fs.existsSync(DEFAULT_STORE_FILE)) {
    try {
      return { raw: fs.readFileSync(DEFAULT_STORE_FILE, 'utf-8'), filePath: DEFAULT_STORE_FILE };
    } catch {
      return { raw: null, filePath: targetFile };
    }
  }

  return { raw: null, filePath: targetFile };
}

let remoteSyncInFlight: Promise<void> | null = null;
let pendingRemoteJson: string | null = null;

export async function pushStoreToRemote(
  rawJson: string,
  overrideCfg?: InternalStorageConfig
): Promise<{ ok: boolean; status: number; message: string }> {
  const cfg = overrideCfg ?? loadStorageConfig();
  if (cfg.mode !== 'webdav' && cfg.mode !== 'remote-http') {
    return { ok: false, status: 400, message: 'Active storage mode is not remote.' };
  }

  const check = validateRemoteStorageUrl(cfg.remoteUrl);
  if (!check.ok) {
    return { ok: false, status: 400, message: check.error };
  }

  const method = cfg.mode === 'webdav' ? 'PUT' : cfg.remoteMethod;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    ...buildRemoteAuthHeaders(cfg),
  };

  let res = await fetch(check.url, {
    method,
    headers,
    body: rawJson,
    signal: AbortSignal.timeout(20000),
  });

  // On WebDAV (like Hetzner Storage Box), 409 often means parent folder needs MKCOL
  if (cfg.mode === 'webdav' && res.status === 409) {
    const parentUrl = check.url.replace(/\/[^/]+$/, '/');
    if (parentUrl && parentUrl !== check.url) {
      await fetch(parentUrl, {
        method: 'MKCOL',
        headers: buildRemoteAuthHeaders(cfg),
        signal: AbortSignal.timeout(10000),
      }).catch(() => undefined);
      res = await fetch(check.url, {
        method: 'PUT',
        headers,
        body: rawJson,
        signal: AbortSignal.timeout(20000),
      });
    }
  }

  if (!res.ok) {
    const errBody = await res.text().catch(() => res.statusText);
    const msg = `Remote ${method} failed (${res.status}): ${errBody.slice(0, 180) || res.statusText}`;
    if (!overrideCfg) {
      cfg.lastSyncError = msg;
      persistStorageConfig(cfg);
    }
    return { ok: false, status: res.status, message: msg };
  }

  if (!overrideCfg) {
    cfg.lastSyncedAt = new Date().toISOString();
    cfg.lastSyncError = null;
    persistStorageConfig(cfg);
  }

  return {
    ok: true,
    status: res.status,
    message: `Synced ${Buffer.byteLength(rawJson, 'utf-8')} bytes to ${cfg.mode.toUpperCase()}.`,
  };
}

export async function pullStoreFromRemote(
  overrideCfg?: InternalStorageConfig
): Promise<{ ok: true; raw: string } | { ok: false; message: string }> {
  const cfg = overrideCfg ?? loadStorageConfig();
  if (cfg.mode !== 'webdav' && cfg.mode !== 'remote-http') {
    return { ok: false, message: 'Active storage mode is not remote.' };
  }

  const check = validateRemoteStorageUrl(cfg.remoteUrl);
  if (!check.ok) {
    return { ok: false, message: check.error };
  }

  try {
    const res = await fetch(check.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...buildRemoteAuthHeaders(cfg),
      },
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      const msg = `Remote GET failed (${res.status}): ${errText.slice(0, 180) || res.statusText}`;
      if (!overrideCfg) {
        cfg.lastSyncError = msg;
        persistStorageConfig(cfg);
      }
      return { ok: false, message: msg };
    }

    const raw = await res.text();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object' || (!('threads' in parsed) && !('memories' in parsed))) {
      return { ok: false, message: 'Remote file is not a valid Pheonikz UI / Mnemosyne store.' };
    }

    if (!overrideCfg) {
      cfg.lastSyncedAt = new Date().toISOString();
      cfg.lastSyncError = null;
      persistStorageConfig(cfg);
    }
    return { ok: true, raw };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to pull from remote storage.';
    if (!overrideCfg) {
      cfg.lastSyncError = msg;
      persistStorageConfig(cfg);
    }
    return { ok: false, message: msg };
  }
}

function scheduleRemotePush(rawJson: string): void {
  pendingRemoteJson = rawJson;
  if (remoteSyncInFlight) return;

  remoteSyncInFlight = (async () => {
    while (pendingRemoteJson !== null) {
      const nextPayload = pendingRemoteJson;
      pendingRemoteJson = null;
      try {
        await pushStoreToRemote(nextPayload);
      } catch (err) {
        const cfg = loadStorageConfig();
        cfg.lastSyncError = err instanceof Error ? err.message : 'Remote sync error';
        persistStorageConfig(cfg);
      }
    }
    remoteSyncInFlight = null;
  })();
}

/**
 * Primary write path called by server/store.ts on every state mutation.
 * - `local`: atomic write to ./data/aetheris-store.json
 * - `mounted`: atomic write directly to the mounted Hetzner Storage Box path (+ local shadow backup)
 * - `webdav` / `remote-http`: atomic write to local write-through cache + async remote push when autoSyncRemote is enabled
 */
export function writeStoreRaw(rawJson: string): void {
  const cfg = loadStorageConfig();

  if (cfg.mode === 'mounted') {
    const check = validateMountedPath(cfg.mountedPath);
    if (check.ok) {
      try {
        writeFileAtomic(check.resolvedFile, rawJson);
        cfg.lastSyncedAt = new Date().toISOString();
        cfg.lastSyncError = null;
        persistStorageConfig(cfg);
        return;
      } catch (err) {
        cfg.lastSyncError =
          err instanceof Error
            ? `Mount write failed (${check.resolvedFile}): ${err.message}. Saved to local fallback cache.`
            : 'Mount write failed. Saved to local fallback cache.';
        persistStorageConfig(cfg);
        writeFileAtomic(DEFAULT_STORE_FILE, rawJson);
        return;
      }
    }
  }

  // Local or remote write-through cache
  writeFileAtomic(DEFAULT_STORE_FILE, rawJson);

  if ((cfg.mode === 'webdav' || cfg.mode === 'remote-http') && cfg.autoSyncRemote) {
    scheduleRemotePush(rawJson);
  }
}

export async function testStorageConnection(draft?: {
  mode?: StorageMode;
  mountedPath?: string;
  remoteUrl?: string;
  remoteUsername?: string;
  remotePassword?: string;
  remoteToken?: string;
  remoteMethod?: 'PUT' | 'POST';
}): Promise<StorageTestResult> {
  const current = loadStorageConfig();
  const effective: InternalStorageConfig = {
    ...current,
    mode: draft?.mode ?? current.mode,
    mountedPath: draft?.mountedPath !== undefined ? draft.mountedPath.trim() : current.mountedPath,
    remoteUrl: draft?.remoteUrl !== undefined ? draft.remoteUrl.trim() : current.remoteUrl,
    remoteUsername:
      draft?.remoteUsername !== undefined ? draft.remoteUsername.trim() : current.remoteUsername,
    remotePassword:
      draft?.remotePassword && draft.remotePassword.trim()
        ? draft.remotePassword
        : current.remotePassword,
    remoteToken:
      draft?.remoteToken && draft.remoteToken.trim()
        ? draft.remoteToken.trim()
        : current.remoteToken,
    remoteMethod: draft?.remoteMethod ?? current.remoteMethod,
  };

  const started = Date.now();

  if (effective.mode === 'local' || effective.mode === 'mounted') {
    let targetFile = DEFAULT_STORE_FILE;
    let targetDir = DEFAULT_DATA_DIR;

    if (effective.mode === 'mounted') {
      const check = validateMountedPath(effective.mountedPath);
      if (!check.ok) {
        return {
          ok: false,
          mode: effective.mode,
          target: effective.mountedPath || '(unset)',
          latencyMs: Date.now() - started,
          message: check.error,
        };
      }
      targetFile = check.resolvedFile;
      targetDir = check.resolvedDir;
    }

    const probeFile = path.join(
      targetDir,
      `.pheonikz-probe-${crypto.randomBytes(4).toString('hex')}.tmp`
    );
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const token = `pheonikz-probe-${Date.now()}`;
      fs.writeFileSync(probeFile, token, 'utf-8');
      const readBack = fs.readFileSync(probeFile, 'utf-8');
      fs.unlinkSync(probeFile);
      if (readBack !== token) {
        throw new Error('Read-back verification mismatch.');
      }
      const existingStoreFound = fs.existsSync(targetFile);
      const latencyMs = Date.now() - started;
      return {
        ok: true,
        mode: effective.mode,
        target: targetFile,
        latencyMs,
        existingStoreFound,
        message: existingStoreFound
          ? `Read/write verified on ${targetDir} (${latencyMs}ms). Existing store detected at ${path.basename(targetFile)}.`
          : `Read/write verified on ${targetDir} (${latencyMs}ms). Ready to store Mnemosyne & UI data.`,
      };
    } catch (err) {
      try {
        if (fs.existsSync(probeFile)) fs.unlinkSync(probeFile);
      } catch {
        // ignore
      }
      return {
        ok: false,
        mode: effective.mode,
        target: targetFile,
        latencyMs: Date.now() - started,
        message:
          err instanceof Error
            ? `Mount/disk check failed: ${err.message}`
            : 'Mount/disk read-write test failed.',
      };
    }
  }

  // Remote WebDAV or External HTTP test
  const urlCheck = validateRemoteStorageUrl(effective.remoteUrl);
  if (!urlCheck.ok) {
    return {
      ok: false,
      mode: effective.mode,
      target: effective.remoteUrl || '(unset)',
      latencyMs: Date.now() - started,
      message: urlCheck.error,
    };
  }

  try {
    const authHeaders = buildRemoteAuthHeaders(effective);
    if (effective.mode === 'webdav') {
      // Probe parent folder or target via OPTIONS/HEAD, and GET check for existing file
      const probeRes = await fetch(urlCheck.url, {
        method: 'GET',
        headers: authHeaders,
        signal: AbortSignal.timeout(15000),
      });
      const latencyMs = Date.now() - started;

      if (probeRes.status === 401 || probeRes.status === 403) {
        return {
          ok: false,
          mode: effective.mode,
          target: urlCheck.url,
          latencyMs,
          message: `WebDAV authentication rejected (${probeRes.status}). Check your Hetzner Storage Box username & password.`,
        };
      }
      if (probeRes.ok) {
        return {
          ok: true,
          mode: effective.mode,
          target: urlCheck.url,
          latencyMs,
          existingStoreFound: true,
          message: `Connected to WebDAV (${probeRes.status}, ${latencyMs}ms). Existing remote store found.`,
        };
      }
      if (probeRes.status === 404) {
        // File doesn't exist yet; check parent folder reachability with OPTIONS
        const parentUrl = urlCheck.url.replace(/\/[^/]+$/, '/');
        const optRes = await fetch(parentUrl, {
          method: 'OPTIONS',
          headers: authHeaders,
          signal: AbortSignal.timeout(10000),
        });
        if (optRes.status === 401 || optRes.status === 403) {
          return {
            ok: false,
            mode: effective.mode,
            target: urlCheck.url,
            latencyMs: Date.now() - started,
            message: `WebDAV authentication failed (${optRes.status}).`,
          };
        }
        return {
          ok: true,
          mode: effective.mode,
          target: urlCheck.url,
          latencyMs: Date.now() - started,
          existingStoreFound: false,
          message: `Connected to WebDAV host (${Date.now() - started}ms). Target file will be created on first sync.`,
        };
      }
      return {
        ok: false,
        mode: effective.mode,
        target: urlCheck.url,
        latencyMs,
        message: `WebDAV responded with HTTP ${probeRes.status}.`,
      };
    }

    // External HTTP endpoint test
    const res = await fetch(urlCheck.url, {
      method: 'GET',
      headers: { Accept: 'application/json', ...authHeaders },
      signal: AbortSignal.timeout(15000),
    });
    const latencyMs = Date.now() - started;
    if (res.status === 401 || res.status === 403) {
      return {
        ok: false,
        mode: effective.mode,
        target: urlCheck.url,
        latencyMs,
        message: `Remote HTTP authorization failed (${res.status}). Check Bearer token.`,
      };
    }
    if (res.ok || res.status === 404 || res.status === 405) {
      return {
        ok: true,
        mode: effective.mode,
        target: urlCheck.url,
        latencyMs,
        existingStoreFound: res.ok,
        message: res.ok
          ? `Connected to external storage endpoint (${res.status}, ${latencyMs}ms). Existing store detected.`
          : `Endpoint reachable (${res.status}, ${latencyMs}ms). Ready for ${effective.remoteMethod} sync.`,
      };
    }
    return {
      ok: false,
      mode: effective.mode,
      target: urlCheck.url,
      latencyMs,
      message: `External storage endpoint returned HTTP ${res.status}.`,
    };
  } catch (err) {
    return {
      ok: false,
      mode: effective.mode,
      target: urlCheck.url,
      latencyMs: Date.now() - started,
      message: err instanceof Error ? err.message : 'Unable to reach remote storage endpoint.',
    };
  }
}

export function getPublicStorageConfig(): StorageConfigPublic {
  const cfg = loadStorageConfig();
  const activeFile = resolveActiveStoreFile(cfg);
  let storeSizeBytes = 0;
  try {
    if (fs.existsSync(activeFile)) {
      storeSizeBytes = fs.statSync(activeFile).size;
    } else if (fs.existsSync(DEFAULT_STORE_FILE)) {
      storeSizeBytes = fs.statSync(DEFAULT_STORE_FILE).size;
    }
  } catch {
    storeSizeBytes = 0;
  }

  return {
    mode: cfg.mode,
    mountedPath: cfg.mountedPath,
    remoteUrl: cfg.remoteUrl,
    remoteUsername: cfg.remoteUsername,
    hasRemotePassword: Boolean(cfg.remotePassword),
    hasRemoteToken: Boolean(cfg.remoteToken),
    remoteMethod: cfg.remoteMethod,
    autoSyncRemote: cfg.autoSyncRemote,
    activeStoreFile:
      cfg.mode === 'webdav' || cfg.mode === 'remote-http'
        ? cfg.remoteUrl || '(unconfigured remote URL)'
        : activeFile,
    lastSyncedAt: cfg.lastSyncedAt,
    lastSyncError: cfg.lastSyncError,
    storeSizeBytes,
  };
}
