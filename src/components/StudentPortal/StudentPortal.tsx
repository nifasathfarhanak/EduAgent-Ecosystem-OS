import React, { useState, useEffect } from 'react';
import { LanguageType, FeatureModality, UserProfile } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { VisionQA } from './VisionQA';
import { VoiceInterview } from './VoiceInterview';
import { ProjectGrader } from './ProjectGrader';
import { SpacedRetrieval } from './SpacedRetrieval';
import { DisengagementStudio } from './DisengagementStudio';
import { SkillGapMatrix } from './SkillGapMatrix';
import { EngineeringTasks } from './EngineeringTasks';
import { AITestPlanWorkflow } from './AITestPlanWorkflow';
import { CSERagGroundStudio } from './CSERagGroundStudio';
import { P2PArena } from './P2PArena';
import { VerifiedCredentials } from './VerifiedCredentials';
import { MentorSwarm } from './MentorSwarm';
import { MicroInternshipSimulator } from './MicroInternshipSimulator';
import { AIMentorChat } from './AIMentorChat';
import { AIVideoLessonStudio } from './AIVideoLessonStudio';
import { AIAssessmentEngine } from './AIAssessmentEngine';
import { ErrorBoundary } from '../ErrorBoundary';
import {
  getActiveStudentSession,
  setActiveStudentSession,
  getAllStudentProfiles,
  StudentProfile,
} from '../../lib/telemetryStore';
import { InsideRoboticTelemetryBar, RoboticEqualizer, RoboticAIPilotCard } from '../CyberVisuals';
import { Eye, Mic, Code2, Brain, Flame, Target, Terminal, User, ShieldCheck, CheckCircle2, Activity, Cpu, Bot, Zap, Sparkles, HeartPulse, Swords, Briefcase, MessageSquare, Video, FileCheck } from 'lucide-react';

interface Props {
  language: LanguageType;
  onSetModality: (modality: FeatureModality) => void;
  currentUser?: UserProfile;
}

export const StudentPortal: React.FC<Props> = ({ language, onSetModality, currentUser }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('rag');
  const [activeSession, setActiveSession] = useState<StudentProfile>(() => {
    const all = getAllStudentProfiles();
    if (currentUser?.studentId) {
      const match = all.find((s) => s.id === currentUser.studentId);
      if (match) return match;
    }
    return getActiveStudentSession();
  });

  useEffect(() => {
    const handleSessionChange = () => {
      const all = getAllStudentProfiles();
      if (currentUser?.studentId) {
        const match = all.find((s) => s.id === currentUser.studentId);
        if (match) {
          setActiveSession(match);
          return;
        }
      }
      setActiveSession(getActiveStudentSession());
    };
    window.addEventListener('eduagent_student_session_changed', handleSessionChange);
    window.addEventListener('eduagent_students_data_updated', handleSessionChange);
    return () => {
      window.removeEventListener('eduagent_student_session_changed', handleSessionChange);
      window.removeEventListener('eduagent_students_data_updated', handleSessionChange);
    };
  }, [currentUser]);

  const handleTabChange = (tabId: string, label: string) => {
    setActiveTab(tabId);
    const updated = {
      ...activeSession,
      activeModule: label,
    };
    setActiveStudentSession(updated);
    setActiveSession(updated);
  };

  const tabs = [
    { id: 'rag', key: 'cseRagGroundStudio', label: 'CSE Curriculum RAG Studio', icon: Brain, color: 'text-cyan-400 font-bold' },
    { id: 'assessment', key: 'aiAssessmentEngine', label: 'AI Subject Assessment & Report', icon: FileCheck, color: 'text-emerald-400 font-bold' },
    { id: 'video', key: 'aiVideoLessonStudio', label: 'AI Subject Video Studio', icon: Video, color: 'text-pink-400 font-bold' },
    { id: 'aitestplan', key: 'aiTestPlanWorkflow', label: 'AI Test Plan & Study Workflow', icon: Sparkles, color: 'text-cyan-400 font-bold' },
    { id: 'chat', key: 'aiMentorChat', label: '24/7 AI Mentor Chat', icon: MessageSquare, color: 'text-purple-400 font-bold' },
    { id: 'internship', key: 'microInternshipSimulator', label: 'AI Micro-Internship Simulator', icon: Briefcase, color: 'text-amber-400 font-bold' },
    { id: 'interview', key: 'voiceStarInterview', label: 'Vernacular Voice AI Tutor', icon: Mic, color: 'text-cyan-400' },
    { id: 'vision', key: 'visionImageReview', label: 'Vision Image Review', icon: Eye, color: 'text-emerald-400' },
    { id: 'p2p', key: 'p2pArena', label: '1v1 Mobile P2P Arena', icon: Swords, color: 'text-red-400 font-bold' },
    { id: 'credentials', key: 'verifiedCredentials', label: 'AST Verified Credentials', icon: ShieldCheck, color: 'text-emerald-400 font-bold' },
    { id: 'mentors', key: 'mentorSwarm', label: 'AI Mentor Swarm Panel', icon: Bot, color: 'text-purple-400 font-bold' },
    { id: 'tasks', key: 'engineeringTaskBoard', label: 'Engineering Task Board', icon: Terminal, color: 'text-indigo-400' },
    { id: 'grader', key: 'projectRepoGrader', label: 'Project Repo Grader', icon: Code2, color: 'text-blue-400' },
    { id: 'spaced', key: 'spacedRetrievalQueue', label: 'Spaced Retrieval Queue', icon: Brain, color: 'text-amber-400' },
    { id: 'analogy', key: 'disengagementAnalogy', label: 'Disengagement Analogy', icon: Flame, color: 'text-orange-400' },
    { id: 'skillgap', key: 'skillGapMatrix', label: 'Skill-Gap Career Matrix', icon: Target, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <InsideRoboticTelemetryBar
        portalType="STUDENT"
        activeEntityName={activeSession.studentName}
        roleBadge={`${activeSession.rollNo} • ${activeSession.targetRole}`}
        telemetryStatus="ASTRO-X ROBOT ONLINE // PRIVACY LOCKED"
      />

      <RoboticAIPilotCard
        mentorName="Astro-X Autonomous AI Mentor"
        mentorRole={`Gemini 2.5 & Vertex AI • Dedicated to ${activeSession.studentName}`}
        statusText={`Active Track: ${activeSession.targetRole} | Attendance: ${activeSession.attendancePct}% | Project Score: ${activeSession.projectScore}/100`}
        neuralSyncPct={99.8}
        speechBubble={`Cadet ${activeSession.studentName}, your diagnosed gap is: "${activeSession.keyLearningGap}". CSE 3-Subject RAG Knowledge Base, AI Mentor Chat, 1v1 Battle Arena, and AST Verified Credentials are live!`}
        themeColor="cyan"
        quickActions={[
          { label: 'CSE RAG Ground Studio', onClick: () => handleTabChange('rag', 'CSE Curriculum RAG Studio') },
          { label: 'AI Mentor Chat', onClick: () => handleTabChange('chat', '24/7 AI Mentor Chat') },
          { label: 'AI Test Plan & Workflow', onClick: () => handleTabChange('aitestplan', 'AI Test Plan & Study Workflow') },
          { label: 'Vernacular Voice AI', onClick: () => handleTabChange('interview', 'Vernacular Voice AI Tutor') },
          { label: '1v1 P2P Battle Arena', onClick: () => handleTabChange('p2p', '1v1 Mobile P2P Arena') },
          { label: 'AST Verified Credentials', onClick: () => handleTabChange('credentials', 'AST Verified Credentials') },
        ]}
      />

      <div className="flex items-center justify-between bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 shadow-lg relative z-20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Active Student Profile</h3>
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
              <span>{activeSession.studentName}</span>
              <span className="text-xs text-cyan-400 font-normal font-mono">({activeSession.rollNo})</span>
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Privacy Lock Active</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id, tab.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex-shrink-0 border cursor-pointer ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.color}`} />
              <span>{t(tab.key, tab.label)}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <ErrorBoundary resetKey={activeTab} fallbackTitle={`${activeTab.toUpperCase()} Module Error`}>
        {activeTab === 'rag' && <CSERagGroundStudio studentName={activeSession.studentName} />}
        {activeTab === 'vision' && <VisionQA language={language} onSetModality={onSetModality} />}
        {activeTab === 'assessment' && <AIAssessmentEngine language={language} />}
        {activeTab === 'video' && <AIVideoLessonStudio language={language} />}
        {activeTab === 'aitestplan' && <AITestPlanWorkflow language={language} />}
        {activeTab === 'chat' && <AIMentorChat language={language} />}
        {activeTab === 'internship' && <MicroInternshipSimulator language={language} />}
        {activeTab === 'interview' && <VoiceInterview language={language} onSetModality={onSetModality} />}
        {activeTab === 'p2p' && <P2PArena language={language} />}
        {activeTab === 'credentials' && <VerifiedCredentials language={language} />}
        {activeTab === 'mentors' && <MentorSwarm language={language} />}
        {activeTab === 'tasks' && <EngineeringTasks language={language} />}
        {activeTab === 'grader' && <ProjectGrader language={language} onSetModality={onSetModality} />}
        {activeTab === 'spaced' && <SpacedRetrieval language={language} />}
        {activeTab === 'analogy' && <DisengagementStudio language={language} onSetModality={onSetModality} />}
        {activeTab === 'skillgap' && <SkillGapMatrix language={language} onSetModality={onSetModality} />}
      </ErrorBoundary>
    </div>
  );
};
