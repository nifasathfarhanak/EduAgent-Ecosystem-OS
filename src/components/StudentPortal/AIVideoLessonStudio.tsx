import React, { useState, useEffect } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MechaCard } from '../CyberVisuals';
import { Video, Play, Pause, RotateCcw, Sparkles, Volume2, BookOpen, CheckCircle2, Cpu, Loader2, ArrowRight } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export interface VideoScene {
  id: number;
  title: string;
  durationSec: number;
  script: string;
  visualGraphic: string;
  codeSnippet?: string;
  diagramNodes: string[];
}

export const AIVideoLessonStudio: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState<string>('PostgreSQL B-Tree Indexing & Query Execution');
  const [loading, setLoading] = useState<boolean>(false);
  const [scenes, setScenes] = useState<VideoScene[]>([]);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleGenerateVideoLesson = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setIsPlaying(false);
    setCurrentSceneIdx(0);

    try {
      const res = await fetch('/api/ai/generate-video-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language }),
      });
      const data = await res.json();
      if (data.scenes && data.scenes.length > 0) {
        setScenes(data.scenes);
      } else {
        setScenes(getDefaultScenes(topic));
      }
    } catch (err) {
      setScenes(getDefaultScenes(topic));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultScenes = (subject: string): VideoScene[] => [
    {
      id: 1,
      title: `Scene 1: Introduction to ${subject}`,
      durationSec: 5,
      script: `Welcome to this AI visual lesson on ${subject}. Let's break down how this core concept works under the hood step by step!`,
      visualGraphic: 'ROOT NODE INITIALIZATION',
      diagramNodes: ['Root Node (Val: 50)', 'Left Child (< 50)', 'Right Child (> 50)'],
    },
    {
      id: 2,
      title: `Scene 2: Core Mechanism & Memory Traversal`,
      durationSec: 6,
      script: `When a query executes, the database engine traverses tree branches in O(log N) time instead of performing expensive full table scans.`,
      visualGraphic: 'BINARY TREE BRANCH TRAVERSAL',
      codeSnippet: `SELECT * FROM users WHERE id = 104; // Index Scan Cost: 0.02ms`,
      diagramNodes: ['Binary Search Tree', 'Cache Line Hit', 'Page Reader'],
    },
    {
      id: 3,
      title: `Scene 3: Optimization & Real-World Impact`,
      durationSec: 6,
      script: `By reducing disk I/O from 100,000 reads to just 3 block pointer lookups, system latency drops by 99.4%!`,
      visualGraphic: 'LATENCY BENCHMARK VISUALIZER',
      diagramNodes: ['Unindexed Scan: 450ms', 'Indexed Scan: 1.2ms (99% Faster)'],
    },
  ];

  // Auto-play timeline timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && scenes.length > 0) {
      timer = setTimeout(() => {
        if (currentSceneIdx < scenes.length - 1) {
          setCurrentSceneIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, (scenes[currentSceneIdx]?.durationSec || 5) * 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIdx, scenes]);

  const speakNarration = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const activeScene = scenes[currentSceneIdx] || scenes[0];

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="cyan"
        title="AI Visual Lesson & Video Studio"
        subTitle="Enter any subject or topic to instantly generate an interactive, multi-scene AI animated video lesson with synchronized voice narration."
        badge="GEMINI 2.5 FLASH // MULTI-SCENE VIDEO GENERATOR"
        icon={<Video className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-4">
          {/* Subject Search / Topic Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter subject (e.g. Quantum Computing, Database B-Trees, React Fiber)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleGenerateVideoLesson}
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating AI Scenes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Video Lesson</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Topics */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 shrink-0">Try Subject:</span>
            {[
              'Database B-Tree Indexing',
              'Neural Network Backpropagation',
              'Quantum Superposition',
              'OAuth 2.0 PKCE Flow',
            ].map((tName) => (
              <button
                key={tName}
                onClick={() => setTopic(tName)}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg shrink-0 transition-all text-cyan-400 cursor-pointer"
              >
                {tName}
              </button>
            ))}
          </div>

          {/* AI Video Lesson Player Box */}
          {scenes.length > 0 && activeScene && (
            <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-2xl">
              {/* Video Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Scene {currentSceneIdx + 1} of {scenes.length}
                  </span>
                  <h3 className="text-sm font-bold font-mono text-white">{activeScene.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      speakNarration(activeScene.script);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause Lesson' : 'Play Lesson'}</span>
                  </button>

                  <button
                    onClick={() => speakNarration(activeScene.script)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-cyan-400 transition-all cursor-pointer"
                    title="Narrate Scene Voice"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-cyan-300' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Animated Motion Canvas Screen */}
              <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-6 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Cpu className="w-4 h-4 animate-pulse" /> {activeScene.visualGraphic}
                  </span>
                  <span className="text-slate-500">HD 1080p AI Render</span>
                </div>

                {/* Center Motion Graphic Diagram Nodes */}
                <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  {activeScene.diagramNodes?.map((node, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-cyan-400/40 rounded-xl font-mono text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-fadeIn"
                    >
                      {node}
                    </div>
                  ))}
                </div>

                {/* Code Snippet Overlay if present */}
                {activeScene.codeSnippet && (
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto">
                    <code>{activeScene.codeSnippet}</code>
                  </pre>
                )}

                {/* Synced Script Subtitle Bar */}
                <div className="mt-3 p-3 bg-slate-950/90 border border-slate-800 rounded-xl font-sans text-xs text-slate-200 leading-relaxed">
                  <strong className="text-cyan-400 font-mono text-[10px] block uppercase">AI Voice Subtitles:</strong>
                  {activeScene.script}
                </div>
              </div>

              {/* Timeline Scene Stepper Bar */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs pt-1">
                {scenes.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setCurrentSceneIdx(idx);
                      speakNarration(sc.script);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      currentSceneIdx === idx
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-400 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Scene {idx + 1} ({sc.durationSec}s)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </MechaCard>
    </div>
  );
};
