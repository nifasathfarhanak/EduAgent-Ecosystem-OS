import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getActiveStudentSession } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { Briefcase, AlertTriangle, CheckCircle2, Play, GitPullRequest, ShieldCheck, Terminal, Award } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const MicroInternshipSimulator: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const activeStudent = getActiveStudentSession();
  const [internshipStep, setInternshipStep] = useState<number>(1);
  const [prCode, setPrCode] = useState(`// PR #104: Add Rate Limiting to Auth API
app.post('/api/login', async (req, res) => {
  const { user, password } = req.body;
  // TODO: Add Redis rate limiter
  const valid = await checkUser(user, password);
  res.json({ success: valid });
});`);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="cyan"
        title="AI Virtual Micro-Internship & Production Incident Simulator"
        subTitle="Solves student employability gaps by simulating 3-day virtual internships at tech startups (PR code reviews, high-traffic production outages, and AI CTO evaluation)."
        badge="AI CTO ENGINE // PRODUCTION INCIDENT SIMULATOR"
        icon={<Briefcase className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-4">
          {/* Internship Stepper */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <button
              onClick={() => setInternshipStep(1)}
              className={`p-3 rounded-xl border transition-all ${
                internshipStep === 1
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Day 1: Legacy PR Code Review
            </button>
            <button
              onClick={() => setInternshipStep(2)}
              className={`p-3 rounded-xl border transition-all ${
                internshipStep === 2
                  ? 'bg-amber-950 text-amber-300 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Day 2: Live Production Outage
            </button>
            <button
              onClick={() => setInternshipStep(3)}
              className={`p-3 rounded-xl border transition-all ${
                internshipStep === 3
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Day 3: AI CTO Verification
            </button>
          </div>

          {/* Step 1: PR Code Review */}
          {internshipStep === 1 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <GitPullRequest className="w-4 h-4 text-cyan-400" /> PR #104: Security & Rate Limiting Audit
                </span>
                <span className="text-[10px] text-amber-400 font-semibold">Missing Rate Limiter</span>
              </div>
              <textarea
                value={prCode}
                onChange={(e) => setPrCode(e.target.value)}
                rows={6}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-cyan-300 text-xs focus:outline-none"
              />
              <button
                onClick={() => setSubmitted(true)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl transition-all cursor-pointer"
              >
                Submit Code Fix to AI CTO
              </button>
              {submitted && (
                <p className="text-emerald-400 font-sans text-xs pt-1">
                  ✓ AI CTO Review Passed: Redis Token Bucket Rate Limiter approved for staging deployment.
                </p>
              )}
            </div>
          )}

          {/* Step 2: Live Production Outage */}
          {internshipStep === 2 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
                <span>INCIDENT ALERT: Database Connection Pool Exhausted (504 Gateway Timeout)</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Traffic surged to 50,000 req/sec. Unclosed database connections in user analytics endpoint are causing connection pool starvation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
                <strong className="text-cyan-300">AI Mentor Guidance:</strong> Wrap all DB client handles in try/finally blocks and configure connection pool max size = 50 with queue timeout = 2000ms.
              </div>
            </div>
          )}

          {/* Step 3: AI CTO Certificate */}
          {internshipStep === 3 && (
            <div className="bg-emerald-950/30 border-2 border-emerald-500/50 rounded-2xl p-6 text-center space-y-3">
              <Award className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-emerald-300 font-mono">Micro-Internship Completion Certified</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-md mx-auto">
                {activeStudent.studentName} has completed the 3-Day Production Incident Simulation at FinTech Labs with a 95% rating from the AI CTO.
              </p>
            </div>
          )}
        </div>
      </MechaCard>
    </div>
  );
};
