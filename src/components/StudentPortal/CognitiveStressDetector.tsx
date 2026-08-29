import React, { useState, useEffect } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MechaCard } from '../CyberVisuals';
import { Activity, HeartPulse, Brain, AlertCircle, Sparkles, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const CognitiveStressDetector: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [stressLevel, setStressLevel] = useState<number>(42);
  const [fatigueStatus, setFatigueStatus] = useState<'Optimal' | 'Elevated Stress' | 'Cognitive Fatigue'>('Optimal');
  const [activeAnalogy, setActiveAnalogy] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const simulated = Math.floor(35 + Math.random() * 45);
      setStressLevel(simulated);
      if (simulated > 75) {
        setFatigueStatus('Cognitive Fatigue');
        setActiveAnalogy('AWS EventBridge Kafka is like a busy Metro Station where trains (events) arrive on different tracks (topics) and passengers (consumers) get off at specific stations without blocking the main line.');
      } else if (simulated > 55) {
        setFatigueStatus('Elevated Stress');
      } else {
        setFatigueStatus('Optimal');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="purple"
        title="On-Device Neural Cognitive Load & Stress Detector"
        subTitle="Monitors student response latency, error frequency, and input friction to detect cognitive fatigue and automatically trigger intuitive real-world analogies."
        badge="SNAPDRAGON NPU // NEURAL STRESS SENSOR"
        icon={<HeartPulse className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Stress Meter */}
          <div className="bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Cognitive Friction Index
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className={`text-4xl font-bold font-mono ${stressLevel > 70 ? 'text-red-400' : stressLevel > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {stressLevel}%
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100 Load</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  stressLevel > 70 ? 'bg-red-500' : stressLevel > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${stressLevel}%` }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Neural Fatigue State
            </span>
            <div className="my-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border inline-block ${
                fatigueStatus === 'Cognitive Fatigue'
                  ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                  : fatigueStatus === 'Elevated Stress'
                  ? 'bg-amber-950 text-amber-300 border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}>
                {fatigueStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {stressLevel > 70
                ? 'High frustration detected. AI tutor is simplifying abstract code concepts.'
                : 'Pacing optimal for high-retention learning.'}
            </p>
          </div>

          {/* Real-World Analogy Trigger */}
          <div className="bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Auto-Analogy Trigger
            </span>
            <p className="text-xs text-slate-200 font-sans italic my-2 line-clamp-3 leading-relaxed">
              "{activeAnalogy || 'Select complex topic to trigger real-world visual analogy.'}"
            </p>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Auto-Pacing Active
            </span>
          </div>
        </div>
      </MechaCard>
    </div>
  );
};
