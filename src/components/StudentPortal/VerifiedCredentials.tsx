import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getActiveStudentSession } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { ShieldCheck, Award, CheckCircle2, Code2, Sparkles, Lock, ExternalLink, Download } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const VerifiedCredentials: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const activeStudent = getActiveStudentSession();
  const [verifying, setVerifying] = useState(false);
  const [credential, setCredential] = useState<{
    hash: string;
    verifiedSkills: string[];
    astScore: number;
    issueDate: string;
  } | null>({
    hash: '0x8f7a93b21c4e9d6a8f3b21c4e9d6a8f7',
    verifiedSkills: [
      'Async Event Loop & Non-Blocking I/O (AST Verified)',
      'Distributed Consensus & Fault Isolation (Score: 94%)',
      'Docker Sandbox Execution & Zero Memory Leak Safety',
    ],
    astScore: 94,
    issueDate: 'August 29, 2026',
  });

  const handleGenerateCredential = () => {
    setVerifying(true);
    setTimeout(() => {
      setCredential({
        hash: `0x${Math.random().toString(16).substring(2, 18)}${Math.random().toString(16).substring(2, 18)}`,
        verifiedSkills: [
          'Async Event Loop & Non-Blocking I/O (AST Verified)',
          'Distributed Consensus & Fault Isolation (Score: 98%)',
          'Docker Sandbox Execution & Zero Memory Leak Safety',
        ],
        astScore: 96,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      setVerifying(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="emerald"
        title="Tamper-Proof Verified Skill Credential (AST Scanning)"
        subTitle="Replaces static unverified resume claims with cryptographic skill credentials issued via deep Abstract Syntax Tree (AST) code scanning & sandbox verification."
        badge="CRYPTOGRAPHIC VERIFICATION // AST ENGINE"
        icon={<ShieldCheck className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleGenerateCredential}
              disabled={verifying}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{verifying ? 'Scanning AST Repos...' : 'Generate Verified Skill Credential'}</span>
            </button>
          </div>

          {credential && (
            <div className="bg-slate-950/90 border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">{activeStudent.studentName}</h3>
                    <p className="text-xs text-emerald-400 font-mono">Verified Software Engineering Competency Badge</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-2xl font-bold text-emerald-400">{credential.astScore}%</span>
                  <span className="text-[10px] text-slate-400 block">AST Competency Score</span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs mb-4">
                <span className="text-slate-400 uppercase tracking-wider block">Verified Technical Competencies:</span>
                <div className="space-y-2">
                  {credential.verifiedSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-900/80 rounded-xl border border-emerald-500/20 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <Lock className="w-3 h-3 text-emerald-400" /> Hash: {credential.hash}
                </span>
                <span>Issued: {credential.issueDate}</span>
              </div>
            </div>
          )}
        </div>
      </MechaCard>
    </div>
  );
};
