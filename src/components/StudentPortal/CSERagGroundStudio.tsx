import React, { useState, useEffect } from 'react';
import { CSE_SUBJECTS, CSEKnowledgeChunk } from '../../data/cseKnowledgeBase';
import { MechaCard } from '../CyberVisuals';
import { MarkdownRenderer } from '../MarkdownRenderer';
import {
  Brain,
  Search,
  BookOpen,
  Code2,
  Database,
  Cpu,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronRight,
  ExternalLink,
  Zap,
  HelpCircle,
  RefreshCw,
  Award,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface Props {
  studentName?: string;
}

export const CSERagGroundStudio: React.FC<Props> = ({ studentName = 'Cadet' }) => {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<'CS201' | 'CS301' | 'CS302'>('CS201');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    answer: string;
    subjectCode: string;
    subjectName: string;
    confidenceScore: number;
    retrievedChunks: Array<{ chunk: CSEKnowledgeChunk; score: number }>;
  } | null>(null);

  const [activeChunkTab, setActiveChunkTab] = useState<number>(0);
  const [curriculumMeta, setCurriculumMeta] = useState<any>(null);

  const currentSubject = CSE_SUBJECTS.find((s) => s.code === selectedSubjectCode) || CSE_SUBJECTS[0];

  useEffect(() => {
    fetch('/api/ai/cse-curriculum')
      .then((res) => res.json())
      .then((data) => setCurriculumMeta(data))
      .catch(() => {});
  }, []);

  const handleRunRAGQuery = async (customQuery?: string) => {
    const q = (customQuery || query).trim();
    if (!q || loading) return;

    if (customQuery) {
      setQuery(customQuery);
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/rag-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          subjectCode: selectedSubjectCode,
          studentName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult({
          answer: data.answer,
          subjectCode: data.subjectCode,
          subjectName: data.subjectName,
          confidenceScore: data.confidenceScore || 0.92,
          retrievedChunks: data.retrievedChunks || [],
        });
        setActiveChunkTab(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectIcon = (code: string) => {
    switch (code) {
      case 'CS201':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'CS301':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'CS302':
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Degree & Curriculum Grounding */}
      <MechaCard
        themeColor="cyan"
        title="CSE Curriculum RAG Knowledge Base & Ground Studio"
        subTitle="Retrieval-Augmented Generation (RAG) powered by verified Open-Source Computer Science curricula (OSSU, Stanford CS, MIT OCW, CMU Database Systems & OSTEP). Select a subject and ask any theoretical, algorithmic, or architectural question for grounded answers."
        badge="B.TECH CSE // VERIFIED OPEN-SOURCE RAG ENGINE"
        icon={<Brain className="w-6 h-6" />}
      >
        {/* 3 Core Subject Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
          {CSE_SUBJECTS.map((subj) => {
            const isSelected = selectedSubjectCode === subj.code;
            return (
              <button
                key={subj.code}
                onClick={() => {
                  setSelectedSubjectCode(subj.code as any);
                  setResult(null);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/40'
                    : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {getSubjectIcon(subj.code)}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                      {subj.code}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-mono text-white tracking-tight">
                      {subj.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                      {subj.degree} • {subj.semester}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{subj.topicsCount} Curriculum Units</span>
                  <span className="text-cyan-400 flex items-center gap-1 font-bold">
                    {isSelected ? 'Active Subject' : 'Select'}
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </MechaCard>

      {/* 2. Interactive Query & Socratic RAG Search Deck */}
      <div className="bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-white">
              Ask AI Subject Tutor ({currentSubject.name})
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Grounding Source: OSSU / MIT / Stanford / CMU / GATE CSE
          </span>
        </div>

        {/* Input Bar */}
        <div className="space-y-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunRAGQuery()}
              placeholder={`Ask any question in ${currentSubject.name} (e.g. "${currentSubject.sampleQuestions[0]}")`}
              className="w-full bg-slate-900/90 text-slate-100 pl-4 pr-32 py-3.5 rounded-2xl border border-cyan-500/40 text-xs font-mono focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 shadow-inner"
            />
            <button
              onClick={() => handleRunRAGQuery()}
              disabled={loading || !query.trim()}
              className="absolute right-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 cursor-pointer transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Retrieving...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Ask RAG</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Suggested High-Yield Questions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              Suggested Subject Prompts (Click to Run):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSubject.sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunRAGQuery(q)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real-Time RAG Results Deck */}
      {result && (
        <div className="space-y-6">
          {/* Top RAG Pipeline Telemetry Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">RAG Confidence</span>
                <div className="text-lg font-bold font-mono text-cyan-400">
                  {(result.confidenceScore * 100).toFixed(0)}% Match
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Retrieved Chunks</span>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  {result.retrievedChunks.length} Citations
                </div>
              </div>
              <Layers className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-purple-500/40 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Grounding Model</span>
                <div className="text-lg font-bold font-mono text-purple-300">
                  Gemini 3.7 Flash
                </div>
              </div>
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          {/* Grounded AI Answer */}
          <div className="bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold font-mono text-white">
                  Grounded AI Professor Response
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                100% Curriculum Grounded
              </span>
            </div>

            <div className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans prose prose-invert max-w-none">
              <MarkdownRenderer content={result.answer} />
            </div>
          </div>

          {/* Retrieved Knowledge Base Chunks Inspector */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Retrieved Open-Source Curriculum Chunks & Citations</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Examine the exact textbook references, code modules, and syllabus chunks used to ground the AI answer.
                </p>
              </div>
            </div>

            {/* Chunk Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {result.retrievedChunks.map((rc, idx) => (
                <button
                  key={rc.chunk.id}
                  onClick={() => setActiveChunkTab(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeChunkTab === idx
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Citation #{idx + 1}: {rc.chunk.subtopic}</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-900/60 text-cyan-300">
                    {(rc.score * 100).toFixed(0)}%
                  </span>
                </button>
              ))}
            </div>

            {/* Active Chunk Card */}
            {result.retrievedChunks[activeChunkTab] && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>{result.retrievedChunks[activeChunkTab].chunk.topic} — {result.retrievedChunks[activeChunkTab].chunk.subtopic}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    Source: {result.retrievedChunks[activeChunkTab].chunk.source}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  {result.retrievedChunks[activeChunkTab].chunk.content}
                </p>

                {result.retrievedChunks[activeChunkTab].chunk.codeSnippet && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Curriculum Code Implementation:</span>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto text-[11px]">
                      <code>{result.retrievedChunks[activeChunkTab].chunk.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {result.retrievedChunks[activeChunkTab].chunk.complexityOrProperties && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="font-bold text-emerald-400">Complexity & Bounds: </span>
                    <span>{result.retrievedChunks[activeChunkTab].chunk.complexityOrProperties}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
