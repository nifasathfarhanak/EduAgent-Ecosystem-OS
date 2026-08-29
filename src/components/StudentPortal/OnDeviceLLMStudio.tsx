import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LanguageType } from '../../types';
import {
  Cpu,
  Zap,
  ShieldCheck,
  Smartphone,
  Terminal,
  Brain,
  Activity,
  WifiOff,
  Play,
  Download,
  Loader2,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

interface Props {
  language: LanguageType;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type EngineStatus = 'idle' | 'downloading' | 'loading' | 'ready' | 'error';

// CSE Syllabus context injected as system prompt
const SYLLABUS_SYSTEM_PROMPT = `You are an offline CSE (Computer Science & Engineering) syllabus assistant running on-device. You help B.Tech students understand core CS subjects. Your knowledge covers:

SUBJECTS:
1. Data Structures & Algorithms — Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Searching, Hashing, Dynamic Programming, Greedy Algorithms, Complexity Analysis (Big-O)
2. Database Management Systems (DBMS) — ER Diagrams, Normalization (1NF-BCNF), SQL queries, Transactions, ACID properties, Indexing, B+ Trees, Concurrency Control, Recovery
3. Operating Systems — Processes, Threads, CPU Scheduling (FCFS, SJF, Round Robin, Priority), Deadlocks, Memory Management, Paging, Segmentation, Virtual Memory, File Systems, Disk Scheduling
4. Computer Networks — OSI Model, TCP/IP, HTTP, DNS, Routing, Subnetting, Sockets, Congestion Control, ARP, DHCP
5. Object-Oriented Programming — Classes, Inheritance, Polymorphism, Encapsulation, Abstraction, SOLID Principles, Design Patterns

RULES:
- Give clear, concise explanations suitable for exam preparation
- Use examples and analogies when helpful
- For algorithm questions, include time/space complexity
- For SQL questions, provide sample queries
- Keep answers focused and exam-relevant`;

export const OnDeviceLLMStudio: React.FC<Props> = ({ language }) => {
  const [engineStatus, setEngineStatus] = useState<EngineStatus>('idle');
  const [downloadProgress, setDownloadProgress] = useState('');
  const [downloadPct, setDownloadPct] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [tokensPerSec, setTokensPerSec] = useState<number | null>(null);

  const engineRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, streamedText]);

  // Check WebGPU support
  const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

  // Load the on-device model
  const loadModel = useCallback(async () => {
    if (!hasWebGPU) {
      setErrorMsg('WebGPU is not supported in this browser. Please use Chrome 113+ or Edge 113+.');
      setEngineStatus('error');
      return;
    }

    try {
      setEngineStatus('downloading');
      setErrorMsg(null);
      setDownloadProgress('Initializing WebLLM engine...');
      setDownloadPct(0);

      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

      const engine = await CreateMLCEngine(
        'gemma-2-2b-it-q4f16_1-MLC',
        {
          initProgressCallback: (progress: any) => {
            const text = progress.text || '';
            setDownloadProgress(text);
            // Parse percentage from progress text if available
            const match = text.match(/(\d+)%/);
            if (match) {
              setDownloadPct(parseInt(match[1]));
            } else if (text.toLowerCase().includes('finish')) {
              setDownloadPct(100);
            }
          },
        }
      );

      engineRef.current = engine;
      setEngineStatus('ready');
      setDownloadProgress('');
      setDownloadPct(100);
    } catch (err: any) {
      console.error('WebLLM load error:', err);
      setErrorMsg(err.message || 'Failed to load model. Ensure WebGPU is available.');
      setEngineStatus('error');
    }
  }, [hasWebGPU]);

  // Send a message and get on-device response
  const handleSend = async () => {
    const trimmed = userInput.trim();
    if (!trimmed || !engineRef.current || isGenerating) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setIsGenerating(true);
    setStreamedText('');
    setTokensPerSec(null);

    try {
      const messages = [
        { role: 'system' as const, content: SYLLABUS_SYSTEM_PROMPT },
        ...chatHistory.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user' as const, content: trimmed },
      ];

      const startTime = performance.now();
      let fullResponse = '';
      let tokenCount = 0;

      // Use streaming for real-time output
      const chunks = await engineRef.current.chat.completions.create({
        messages,
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      });

      for await (const chunk of chunks) {
        const delta = chunk.choices?.[0]?.delta?.content || '';
        fullResponse += delta;
        tokenCount += 1;
        setStreamedText(fullResponse);
      }

      const elapsed = (performance.now() - startTime) / 1000;
      const tps = tokenCount > 0 ? +(tokenCount / elapsed).toFixed(1) : null;
      setTokensPerSec(tps);

      const assistantMsg: ChatMessage = { role: 'assistant', content: fullResponse };
      setChatHistory(prev => [...prev, assistantMsg]);
      setStreamedText('');
    } catch (err: any) {
      console.error('Generation error:', err);
      const errMsg: ChatMessage = { role: 'assistant', content: `⚠️ Error: ${err.message || 'Generation failed'}` };
      setChatHistory(prev => [...prev, errMsg]);
      setStreamedText('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setStreamedText('');
    setTokensPerSec(null);
  };

  // Quick question presets
  const quickQuestions = [
    'Explain virtual memory paging with a diagram',
    'Write SQL to find 2nd highest salary',
    'Difference between process and thread',
    'What is normalization? Explain 1NF to BCNF',
    'Time complexity of quicksort best/worst case',
    'Explain TCP 3-way handshake',
  ];

  return (
    <div className="space-y-5">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border-2 border-cyan-500/40 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              ON-DEVICE AI (WebGPU)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% OFFLINE PRIVACY
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/60 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              CSE SYLLABUS ASSISTANT
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            Offline Syllabus Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Runs <strong>Google Gemma 2B</strong> directly in your browser using WebGPU. No internet needed after model download.
            Ask any question about Data Structures, DBMS, OS, Networks, or OOP — get instant answers for exam prep.
          </p>

          {/* Status Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
              <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono mb-0.5">
                <Cpu className="w-3 h-3" /> Engine
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {engineStatus === 'ready' ? 'Gemma 2B Active' : engineStatus === 'downloading' ? 'Loading...' : 'Not Loaded'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono mb-0.5">
                <Zap className="w-3 h-3" /> Speed
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {tokensPerSec ? `${tokensPerSec} tok/s` : '—'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-purple-500/20">
              <div className="flex items-center gap-1.5 text-purple-400 text-[10px] font-mono mb-0.5">
                <Activity className="w-3 h-3" /> Status
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {engineStatus === 'ready' ? '✓ Ready' : engineStatus === 'error' ? '✗ Error' : engineStatus === 'downloading' ? '↓ Loading' : '○ Idle'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono mb-0.5">
                <WifiOff className="w-3 h-3" /> Network
              </div>
              <div className="text-sm font-bold text-white font-mono">
                {engineStatus === 'ready' ? 'Offline OK' : 'Required Once'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load Model Section */}
      {engineStatus !== 'ready' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          {engineStatus === 'idle' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono">Download Gemma 2B Model</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  One-time download (~1.4 GB). The model is cached in your browser — next time it loads instantly.
                  After download, everything runs 100% offline with zero data leakage.
                </p>
              </div>

              {!hasWebGPU && (
                <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-2 max-w-md mx-auto">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  WebGPU not detected. Use Chrome 113+ or Edge 113+ for on-device AI.
                </div>
              )}

              <button
                onClick={loadModel}
                disabled={!hasWebGPU}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black font-mono text-sm flex items-center gap-2 mx-auto cursor-pointer disabled:opacity-50 shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
              >
                <Download className="w-5 h-5" />
                Download & Initialize Model
              </button>
            </div>
          )}

          {engineStatus === 'downloading' && (
            <div className="space-y-3 text-center">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
              <h3 className="text-sm font-bold text-white font-mono">Loading Gemma 2B...</h3>
              <p className="text-xs text-slate-400 font-mono">{downloadProgress}</p>
              {downloadPct > 0 && (
                <div className="w-full max-w-md mx-auto h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${downloadPct}%` }}
                  />
                </div>
              )}
              <p className="text-[10px] text-slate-500 font-mono">
                First download takes 1-3 minutes. Model is cached for future offline use.
              </p>
            </div>
          )}

          {engineStatus === 'error' && (
            <div className="text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
              <h3 className="text-sm font-bold text-red-300 font-mono">Model Load Failed</h3>
              <p className="text-xs text-red-400/80 font-mono max-w-md mx-auto">{errorMsg}</p>
              <button
                onClick={loadModel}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4 inline mr-1.5" />
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chat Interface (only when model is ready) */}
      {engineStatus === 'ready' && (
        <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/30 overflow-hidden shadow-xl">
          {/* Quick Questions */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono text-slate-500 shrink-0">Quick:</span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => { setUserInput(q); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-300 transition-colors shrink-0 cursor-pointer"
              >
                {q.length > 35 ? q.slice(0, 35) + '...' : q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-3 scrollbar-none">
            {chatHistory.length === 0 && !streamedText && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Brain className="w-12 h-12 text-cyan-500/30 mb-3" />
                <p className="text-sm text-slate-500 font-mono">Ask any CSE syllabus question</p>
                <p className="text-[11px] text-slate-600 font-mono mt-1">
                  Data Structures • DBMS • OS • Networks • OOP
                </p>
              </div>
            )}

            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-100'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold mb-1.5">
                      <Cpu className="w-3 h-3" /> Gemma 2B (On-Device)
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming output */}
            {streamedText && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3.5 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap bg-slate-900 border border-cyan-500/30 text-slate-200">
                  <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold mb-1.5">
                    <Cpu className="w-3 h-3 animate-pulse" /> Gemma 2B (Generating...)
                  </div>
                  {streamedText}
                  <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-0.5 rounded-sm" />
                </div>
              </div>
            )}

            {isGenerating && !streamedText && (
              <div className="flex justify-start">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  Thinking on-device...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer transition-all shrink-0"
                title="Clear chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a syllabus question... (e.g. Explain B+ tree indexing in DBMS)"
                disabled={isGenerating}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none transition-all disabled:opacity-50"
              />

              <button
                onClick={handleSend}
                disabled={!userInput.trim() || isGenerating}
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer disabled:opacity-50 transition-all shrink-0"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>

            {/* Speed indicator */}
            <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Running locally — your data never leaves this device
              </span>
              {tokensPerSec && (
                <span className="text-cyan-400">{tokensPerSec} tokens/sec</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
