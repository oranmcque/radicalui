import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import { WebSocket, WebSocketServer } from 'ws';
import {
  type FunctionDeclaration,
  type LiveServerMessage,
  Modality,
  Type,
} from '@google/genai';
import { getGeminiClient } from './ai.ts';
import { executeWebReconSearch } from './search.ts';
import {
  addMemory,
  formatMnemosyneSystemBlock,
  loadState,
  recallMnemosyneContext,
  resolveProviderKey,
} from './store.ts';

const recallMemoryDecl: FunctionDeclaration = {
  name: 'recall_mnemosyne_memory',
  description:
    'Searches Mnemosyne OS long-term memories and Knowledge Vault documents for context relevant to a topic.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Topic, entity, or keywords to recall from Mnemosyne OS.',
      },
    },
    required: ['query'],
  },
};

const saveMemoryDecl: FunctionDeclaration = {
  name: 'save_mnemosyne_memory',
  description:
    'Commits an important user preference, fact, or decision learned during this live call into Mnemosyne OS persistent memory.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      tier: {
        type: Type.STRING,
        description: 'Memory tier: core, episodic, semantic, or procedural',
      },
      content: {
        type: Type.STRING,
        description: 'Concise standalone sentence describing the fact or preference.',
      },
    },
    required: ['tier', 'content'],
  },
};

const searchInternetDecl: FunctionDeclaration = {
  name: 'search_internet',
  description:
    'Searches the live internet via Parallel Search MCP for up-to-date facts, news, documentation, or current events.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Clear search question or topic to look up on the internet.',
      },
    },
    required: ['query'],
  },
};

export function attachWebSocketServers(server: {
  on: (event: string, listener: (req: IncomingMessage, socket: Duplex, head: Buffer) => void) => void;
}) {
  const liveWss = new WebSocketServer({ noServer: true });
  const deepgramWss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const urlPath = (request.url || '').split('?')[0];
    if (urlPath === '/ws/live-call') {
      liveWss.handleUpgrade(request, socket, head, (ws) => {
        liveWss.emit('connection', ws, request);
      });
    } else if (urlPath === '/ws/deepgram-stt') {
      deepgramWss.handleUpgrade(request, socket, head, (ws) => {
        deepgramWss.emit('connection', ws, request);
      });
    } else {
      // Do not destroy Vite HMR upgrades if any; only close unknown /ws paths
      if (urlPath.startsWith('/ws/')) {
        socket.destroy();
      }
    }
  });

  liveWss.on('connection', async (clientWs: WebSocket, req: IncomingMessage) => {
    const urlObj = new URL(req.url || '/ws/live-call', 'http://localhost');
    const requestedVoice = urlObj.searchParams.get('voice');

    const ai = getGeminiClient();
    if (!ai) {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          message: 'GEMINI_API_KEY is not configured in server secrets.',
        })
      );
      clientWs.close();
      return;
    }

    const state = loadState();
    const initialContext = recallMnemosyneContext('core directives active project user', 6, 3);
    const mnemosyneBlock = formatMnemosyneSystemBlock(initialContext);

    const systemInstruction = [
      state.settings.systemPrompt,
      'You are currently in a real-time low-latency Live Voice & Video Call. Keep spoken responses natural, conversational, and concise unless asked for deep technical detail. Use recall_mnemosyne_memory and save_mnemosyne_memory tools whenever useful.',
      mnemosyneBlock,
    ]
      .filter(Boolean)
      .join('\n\n');

    let closed = false;
    let session: Awaited<ReturnType<typeof ai.live.connect>> | null = null;

    const sendSafe = (payload: Record<string, unknown>) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify(payload));
      }
    };

    // Send initial recalled context to UI
    if (initialContext.memories.length > 0 || initialContext.vaultChunks.length > 0) {
      sendSafe({
        type: 'mnemosyne_recall',
        memories: initialContext.memories,
        vaultChunks: initialContext.vaultChunks,
      });
    }

    try {
      session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: requestedVoice || state.settings.geminiVoice || 'Zephyr',
              },
            },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          tools: [
            {
              functionDeclarations: [
                recallMemoryDecl,
                saveMemoryDecl,
                searchInternetDecl,
              ],
            },
          ],
          systemInstruction,
        },
        callbacks: {
          onopen: () => {
            sendSafe({ type: 'ready', model: 'gemini-3.8-live' });
          },
          onmessage: async (message: LiveServerMessage) => {
            const serverContent = message.serverContent;
            if (serverContent?.inputTranscription?.text) {
              sendSafe({
                type: 'input_transcript',
                text: serverContent.inputTranscription.text,
              });
            }
            if (serverContent?.outputTranscription?.text) {
              sendSafe({
                type: 'output_transcript',
                text: serverContent.outputTranscription.text,
              });
            }
            for (const part of serverContent?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data) {
                sendSafe({ type: 'audio', data: part.inlineData.data });
              }
            }
            if (serverContent?.interrupted) {
              sendSafe({ type: 'interrupted' });
            }
            if (serverContent?.turnComplete) {
              sendSafe({ type: 'turn_complete' });
            }

            // Handle Live Mnemosyne OS Tool Calls
            for (const call of message.toolCall?.functionCalls ?? []) {
              const args = (call.args || {}) as Record<string, string>;
              if (call.name === 'recall_mnemosyne_memory') {
                const recalled = recallMnemosyneContext(args.query || '', 5, 3);
                sendSafe({
                  type: 'mnemosyne_event',
                  action: 'recall',
                  query: args.query || '',
                  memories: recalled.memories,
                  vaultChunks: recalled.vaultChunks,
                });
                session?.sendToolResponse({
                  functionResponses: [
                    {
                      id: call.id,
                      name: call.name,
                      response: {
                        memories: recalled.memories.map((m) => `[${m.tier}] ${m.content}`),
                        vaultExcerpts: recalled.vaultChunks.map((c) => `${c.docTitle}: ${c.text}`),
                      },
                    },
                  ],
                });
              } else if (call.name === 'save_mnemosyne_memory') {
                const tierRaw = args.tier;
                const tier =
                  tierRaw === 'core' ||
                  tierRaw === 'episodic' ||
                  tierRaw === 'semantic' ||
                  tierRaw === 'procedural'
                    ? tierRaw
                    : 'episodic';
                const saved = addMemory({
                  tier,
                  content: args.content || '',
                  salience: 0.85,
                  sourceType: 'live_call',
                });
                sendSafe({
                  type: 'mnemosyne_event',
                  action: 'save',
                  memory: saved,
                });
                session?.sendToolResponse({
                  functionResponses: [
                    {
                      id: call.id,
                      name: call.name,
                      response: { status: 'saved', memoryId: saved.id },
                    },
                  ],
                });
              } else if (call.name === 'search_internet') {
                const q = (args.query || '').trim();
                try {
                  const searchRes = await executeWebReconSearch({ query: q });
                  sendSafe({
                    type: 'mnemosyne_event',
                    action: 'search',
                    query: q,
                    resultsCount: searchRes.results.length,
                  });
                  session?.sendToolResponse({
                    functionResponses: [
                      {
                        id: call.id,
                        name: call.name,
                        response: {
                          results: searchRes.results.slice(0, 5).map((r) => ({
                            title: r.title,
                            url: r.url,
                            publishDate: r.publishDate,
                            excerpt: r.excerpt.slice(0, 600),
                          })),
                        },
                      },
                    ],
                  });
                } catch (err) {
                  session?.sendToolResponse({
                    functionResponses: [
                      {
                        id: call.id,
                        name: call.name,
                        response: {
                          error:
                            err instanceof Error ? err.message : 'Internet search unavailable',
                        },
                      },
                    ],
                  });
                }
              }
            }
          },
          onerror: (err: unknown) => {
            const msg = err instanceof Error ? err.message : 'Live session error';
            sendSafe({ type: 'error', message: msg });
          },
          onclose: () => {
            if (!closed) {
              sendSafe({ type: 'closed' });
            }
          },
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to open Gemini Live session';
      sendSafe({ type: 'error', message: msg });
      clientWs.close();
      return;
    }

    clientWs.on('message', (raw) => {
      if (!session || closed) return;
      try {
        const msg = JSON.parse(raw.toString()) as {
          type?: string;
          audio?: string;
          video?: string;
          text?: string;
        };
        if (msg.audio) {
          session.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        } else if (msg.video) {
          session.sendRealtimeInput({
            video: { data: msg.video, mimeType: 'image/jpeg' },
          });
        } else if (msg.text) {
          session.sendRealtimeInput({ text: msg.text });
        }
      } catch {
        // Ignore malformed packets
      }
    });

    clientWs.on('close', () => {
      closed = true;
      try {
        session?.close();
      } catch {
        // Ignore close error
      }
    });
  });

  // Optional Deepgram Streaming STT Proxy for Modular Live Call
  deepgramWss.on('connection', (clientWs: WebSocket) => {
    const dgKey = resolveProviderKey('deepgram').key;
    if (!dgKey) {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          message: 'Deepgram API key is not configured.',
        })
      );
      clientWs.close();
      return;
    }

    const dgUrl =
      'wss://api.deepgram.com/v1/listen?model=nova-2&encoding=linear16&sample_rate=16000&channels=1&interim_results=true&endpointing=400&smart_format=true';
    const dgWs = new WebSocket(dgUrl, {
      headers: { Authorization: `Token ${dgKey}` },
    });

    dgWs.on('open', () => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: 'ready' }));
      }
    });

    dgWs.on('message', (data) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data.toString());
      }
    });

    dgWs.on('error', (err) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: 'error', message: err.message }));
      }
    });

    dgWs.on('close', () => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close();
      }
    });

    clientWs.on('message', (data) => {
      if (dgWs.readyState === WebSocket.OPEN) {
        dgWs.send(data);
      }
    });

    clientWs.on('close', () => {
      if (dgWs.readyState === WebSocket.OPEN) {
        dgWs.close();
      }
    });
  });
}
