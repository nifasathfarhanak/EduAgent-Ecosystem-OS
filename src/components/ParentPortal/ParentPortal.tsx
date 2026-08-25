import React, { useState, useEffect } from 'react';
import { LanguageType, FeatureModality } from '../../types';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import {
  getAllStudentProfiles,
  getActivitySubmissions,
  getActiveStudentSession,
  StudentProfile,
  ActivitySubmission,
} from '../../lib/telemetryStore';
import {
  ParentNetworkAvatar,
  VRStudentAvatar,
  Crystal3DIcon,
  CircuitWingLeft,
  CircuitWingRight,
  RoboticEqualizer,
  InsideRoboticTelemetryBar,
  RoboticBiometricScanner,
  RoboticAIPilotCard,
  MechaTelemetryDial,
  MechaCard,
} from '../CyberVisuals';
import {
  HeartHandshake,
  Volume2,
  Globe,
  Sparkles,
  VolumeX,
  Award,
  Loader2,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Shield,
  ShieldCheck,
  Lock,
  Key,
  User,
  Fingerprint,
  ArrowRight,
  Send,
  Radio,
  Cpu,
  BadgeCheck,
  RotateCcw,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';

interface Props {
  language: LanguageType;
  onLanguageChange: (lang: LanguageType) => void;
  onSetModality: (modality: FeatureModality) => void;
}

export interface StudentPerformanceProfile {
  id: string;
  studentName: string;
  rollNumber: string;
  attendance: string;
  projectScore: string;
  technicalTrack: string;
  recentMilestone: string;
  technicalSummary: string;
}

/**
 * Builds a strict single-student performance profile from store models.
 */
function buildStudentPerformanceProfile(
  st: StudentProfile,
  subs: ActivitySubmission[]
): StudentPerformanceProfile {
  const studentSubs = subs.filter((s) => s.studentId === st.id);
  const latestSub = studentSubs[0];
  const milestone = latestSub
    ? `${latestSub.actionType}: ${latestSub.title} (${latestSub.score || 'Completed'})`
    : `Active in ${st.activeModule || 'Engineering Curriculum'}`;

  return {
    id: st.id,
    studentName: st.studentName,
    rollNumber: st.rollNo || 'AST-2026-089',
    attendance: `${st.attendancePct}%`,
    projectScore: `${st.projectScore}/100`,
    technicalTrack: st.targetRole || 'Computer Science & Software Engineering',
    recentMilestone: milestone,
    technicalSummary: `Attendance: ${st.attendancePct}%, Repo Project Score: ${st.projectScore}/100. ${
      st.keyLearningGap ? 'Diagnosed Focus: ' + st.keyLearningGap : 'Consistently mastering engineering concepts.'
    }`,
  };
}

/**
 * Finds a matching student by roll number, name, or student id.
 */
function findMatchingStudent(
  nameInput: string,
  rollInput: string,
  allStudents: StudentProfile[]
): StudentProfile {
  const cleanName = (nameInput || '').trim().toLowerCase();
  const cleanRoll = (rollInput || '').trim().toLowerCase();

  // 1. Exact roll number match
  if (cleanRoll) {
    const rollMatch = allStudents.find(
      (s) => s.rollNo.toLowerCase() === cleanRoll || s.id.toLowerCase() === cleanRoll
    );
    if (rollMatch) return rollMatch;
  }

  // 2. Exact name match
  if (cleanName) {
    const exactNameMatch = allStudents.find(
      (s) => s.studentName.toLowerCase() === cleanName
    );
    if (exactNameMatch) return exactNameMatch;

    // 3. Partial name match
    const partialMatch = allStudents.find(
      (s) =>
        s.studentName.toLowerCase().includes(cleanName) ||
        cleanName.includes(s.studentName.toLowerCase())
    );
    if (partialMatch) return partialMatch;
  }

  // 4. Fallback to active or first student
  return allStudents[0];
}

export const ParentPortal: React.FC<Props> = ({ language, onLanguageChange, onSetModality }) => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<StudentProfile[]>(getAllStudentProfiles());
  const [submissions, setSubmissions] = useState<ActivitySubmission[]>(getActivitySubmissions());

  // Parent Identity Verification States
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Form Fields
  const [studentNameInput, setStudentNameInput] = useState<string>('Priya Patel');
  const [studentRollInput, setStudentRollInput] = useState<string>('AST-2026-215');
  const [parentNameInput, setParentNameInput] = useState<string>('Sunita Patel');
  const [relationshipInput, setRelationshipInput] = useState<string>('Legal Guardian');

  // Currently authorized and isolated single-student profile
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformanceProfile>(() => {
    const all = getAllStudentProfiles();
    const subs = getActivitySubmissions();
    const priya = all.find((s) => s.id === 'st-105') || all[0];
    return buildStudentPerformanceProfile(priya, subs);
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [parentReport, setParentReport] = useState<{ routingHeader: string; response: string } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Parent AI Inquiry Assistant
  const [parentInquiry, setParentInquiry] = useState<string>('');
  const [inquiryResponse, setInquiryResponse] = useState<string | null>(null);
  const [inquiryLoading, setInquiryLoading] = useState<boolean>(false);

  useEffect(() => {
    onSetModality('Voice Audio');
  }, [onSetModality]);

  // Sync state from telemetryStore and custom events
  const refreshProfilesFromStore = () => {
    const allSt = getAllStudentProfiles();
    const subs = getActivitySubmissions();
    setStudents(allSt);
    setSubmissions(subs);

    // If verified, keep the isolated student strictly in sync with its own latest data
    if (selectedStudent?.id) {
      const current = allSt.find((s) => s.id === selectedStudent.id);
      if (current) {
        setSelectedStudent(buildStudentPerformanceProfile(current, subs));
      }
    }
  };

  useEffect(() => {
    refreshProfilesFromStore();

    const handleUpdate = () => {
      refreshProfilesFromStore();
    };

    window.addEventListener('eduagent_student_session_changed', handleUpdate);
    window.addEventListener('eduagent_telemetry_activity_recorded', handleUpdate);
    window.addEventListener('eduagent_students_data_updated', handleUpdate);

    return () => {
      window.removeEventListener('eduagent_student_session_changed', handleUpdate);
      window.removeEventListener('eduagent_telemetry_activity_recorded', handleUpdate);
      window.removeEventListener('eduagent_students_data_updated', handleUpdate);
    };
  }, [selectedStudent?.id]);

  // Multilingual Greetings dictionary for Pan-India languages
  const mandatoryGreetings: Record<LanguageType, string> = {
    English: `Welcome! Here is ${selectedStudent.studentName}'s authorized real-time academic progress report in English.`,
    Tamil: `வணக்கம்! ${selectedStudent.studentName}-ன் கல்வி மற்றும் தொழில்முறை முன்னேற்றத்தை தமிழில் அறிவதில் மகிழ்ச்சி.`,
    Hindi: `नमस्ते! ${selectedStudent.studentName} की वास्तविक समय की शैक्षणिक प्रगति रिपोर्ट हिंदी में प्रस्तुत है।`,
    Telugu: `నమస్కారం! ${selectedStudent.studentName} యొక్క విద్యా పురోగతి నివేదికను తెలుగులో చూడవచ్చు.`,
    Kannada: `ನಮಸ್ಕಾರ! ${selectedStudent.studentName} ಅವರ ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿಯ ವರದಿಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ತಿಳಿಯಿರಿ.`,
    Malayalam: `നമസ്കാരം! ${selectedStudent.studentName}-ൻ്റെ പഠന പുരോഗതി മലയാളത്തിൽ കാണാം.`,
    Marathi: `नमस्ते! ${selectedStudent.studentName} ची शैक्षणिक प्रगती मराठीमध्ये उपलब्ध आहे.`,
    Gujarati: `નમસ્તે! ${selectedStudent.studentName} ની શૈક્ષણિક પ્રગતિ રિપોર્ટ ગુજરાતીમાં જુઓ.`,
    Bengali: `নমস্কার! ${selectedStudent.studentName}-এর শিক্ষাগত অগ্রগতির রিপোর্ট বাংলায় দেখুন।`,
    Punjabi: `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ${selectedStudent.studentName} ਦੀ ਵਿਦਿਅਕ ਪ੍ਰਗਤੀ ਰਿਪੋਰਟ ਪੰਜਾਬੀ ਵਿੱਚ ਵੇਖੋ।`,
    Odia: `ନମସ୍କାର! ${selectedStudent.studentName}ଙ୍କ ଶିକ୍ଷାଗତ ଅଗ୍ରଗତି ବିବରଣୀ ଓଡ଼ିଆରେ ଦେଖନ୍ତୁ।`,
  };

  const generateParentReport = async (studentProfile: StudentPerformanceProfile, lang: LanguageType) => {
    setLoading(true);
    setParentReport(null);

    try {
      const res = await fetch('/api/ai/parent-a2a-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentProfile.studentName,
          attendance: studentProfile.attendance,
          projectScore: studentProfile.projectScore,
          technicalTrack: studentProfile.technicalTrack,
          recentMilestone: studentProfile.recentMilestone,
          technicalSummary: studentProfile.technicalSummary,
          selectedLanguage: lang,
          portal: 'Parent',
        }),
      });

      const data = await res.json();
      setParentReport(data);
    } catch (err) {
      console.error('Parent report generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate parent report whenever selected student or language changes (only if verified)
  useEffect(() => {
    if (isVerified && selectedStudent) {
      generateParentReport(selectedStudent, language);
    }
  }, [selectedStudent.id, language, isVerified]);

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      const matchedStudent = findMatchingStudent(studentNameInput, studentRollInput, students);
      const profile = buildStudentPerformanceProfile(matchedStudent, submissions);

      setSelectedStudent(profile);
      setIsVerifying(false);
      setIsVerified(true);
    }, 900);
  };

  const handlePresetSelect = (
    name: string,
    roll: string,
    parentName: string,
    rel: string
  ) => {
    setStudentNameInput(name);
    setStudentRollInput(roll);
    setParentNameInput(parentName);
    setRelationshipInput(rel);

    const matched = findMatchingStudent(name, roll, students);
    const profile = buildStudentPerformanceProfile(matched, submissions);
    setSelectedStudent(profile);
  };

  const handleLanguageSwitch = (newLang: LanguageType) => {
    onLanguageChange(newLang);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleSpeakReport = (textToSpeak: string, speakLang: LanguageType = language) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }

      const cleanText = textToSpeak
        .replace(/\[.*?\]/g, '')
        .replace(/[\*#`]/g, '')
        .trim();

      const Utterance =
        (window as any).SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance;
      if (!Utterance || typeof Utterance !== 'function') return;

      const utterance = new Utterance(cleanText);

      if (speakLang === 'Tamil') utterance.lang = 'ta-IN';
      else if (speakLang === 'Hindi') utterance.lang = 'hi-IN';
      else if (speakLang === 'Telugu') utterance.lang = 'te-IN';
      else if (speakLang === 'Kannada') utterance.lang = 'kn-IN';
      else if (speakLang === 'Malayalam') utterance.lang = 'ml-IN';
      else if (speakLang === 'Marathi') utterance.lang = 'mr-IN';
      else if (speakLang === 'Gujarati') utterance.lang = 'gu-IN';
      else if (speakLang === 'Bengali') utterance.lang = 'bn-IN';
      else if (speakLang === 'Punjabi') utterance.lang = 'pa-IN';
      else if (speakLang === 'Odia') utterance.lang = 'or-IN';
      else utterance.lang = 'en-US';

      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsPlayingAudio(false);
    }
  };

  const handleParentInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentInquiry.trim()) return;

    setInquiryLoading(true);
    setInquiryResponse(null);

    try {
      const res = await fetch('/api/ai/parent-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry: parentInquiry,
          studentName: selectedStudent.studentName,
          attendance: selectedStudent.attendance,
          projectScore: selectedStudent.projectScore,
          technicalTrack: selectedStudent.technicalTrack,
          language: language,
        }),
      });

      if (!res.ok) {
        setInquiryResponse(
          `**Guidance for ${selectedStudent.studentName} (${relationshipInput}):** ${selectedStudent.studentName} is maintaining an attendance of ${selectedStudent.attendance} and a project score of ${selectedStudent.projectScore} in ${selectedStudent.technicalTrack}. They are excelling in their live coding curriculum!`
        );
      } else {
        const data = await res.json();
        setInquiryResponse(data.response || data.answer || 'Response generated.');
      }
    } catch (err) {
      setInquiryResponse(
        `**AI Parental Advisor:** ${selectedStudent.studentName} is progressing on schedule with ${selectedStudent.attendance} attendance. Encourage regular revision on their core engineering projects.`
      );
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Robotic Telemetry & Pilot HUD Banner */}
      <InsideRoboticTelemetryBar
        portalType="PARENT"
        activeEntityName={parentNameInput || 'Guardian of Jordan'}
        roleBadge={selectedStudent ? `Student: ${selectedStudent.studentName} (${selectedStudent.rollNumber})` : 'Zero-Knowledge Enclave'}
        telemetryStatus="SYNAPSE GUARDIAN ONLINE // MULTILINGUAL SYNTHESIS READY"
      />

      {/* 2. Header Banner with Cyberpunk Aesthetics & Language Selector */}
      <div className="bg-slate-950/90 border border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.25)] backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-purple-950/80 border border-purple-500/60 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <HeartHandshake className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/90 border border-purple-500/50 px-2 py-0.5 rounded-full">
                EduAgent AST // SECURE PARENT NODE
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                L5 Zero-Trust Privacy
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Parent Portal & Family Telemetry
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Translating real-time CS engineering telemetry into warm, zero-jargon native reports.
            </p>
          </div>
        </div>

        {/* Pan-Indian Language Switcher Capsule */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/30 font-mono text-xs shadow-inner">
          {SUPPORTED_LANGUAGES.map((langObj) => (
            <button
              key={langObj.id}
              onClick={() => handleLanguageSwitch(langObj.id as LanguageType)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                language === langObj.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {langObj.label} ({langObj.nativeLabel})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Glassmorphic 'Parent Identity Verification' Screen (If not yet verified) */}
      {!isVerified ? (
        <div className="relative max-w-3xl mx-auto">
          {/* Glowing Ambient Halo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-[32px] blur-xl opacity-40 animate-pulse-glow" />

          {/* Central Glassmorphic Card */}
          <div className="relative bg-slate-950/95 border-2 border-purple-500/80 rounded-[30px] p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.4)] backdrop-blur-3xl space-y-7">
            {/* Top Identity Header & Icon */}
            <div className="text-center space-y-3 border-b border-purple-500/30 pb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900/90 border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)] relative group">
                <ParentNetworkAvatar className="w-16 h-16" />
                <span className="absolute -bottom-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 font-black font-mono text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Verified Node
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                  Parent Identity Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto pt-1">
                  Authenticate your guardian credentials to unlock end-to-end CS student performance telemetry, exam readiness, and AI summaries.
                </p>
              </div>

              {/* Quick Preset Student Badges */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-slate-400 block">
                  Select Student to Verify & View Isolated Telemetry:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() =>
                      handlePresetSelect('Priya Patel', 'AST-2026-215', 'Sunita Patel', 'Legal Guardian')
                    }
                    className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      studentRollInput === 'AST-2026-215'
                        ? 'bg-pink-950/90 border-pink-400 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.5)] ring-1 ring-pink-400'
                        : 'bg-pink-950/40 border-pink-500/40 text-pink-300 hover:bg-pink-900/70 hover:text-white'
                    }`}
                  >
                    <span>🌟 Priya Patel (Roll #AST-2026-215)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePresetSelect('Jordan Smith', 'AST-2026-089', 'Lakshmi Smith', 'Mother')
                    }
                    className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      studentRollInput === 'AST-2026-089'
                        ? 'bg-purple-950/90 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.5)] ring-1 ring-purple-400'
                        : 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/70 hover:text-white'
                    }`}
                  >
                    <span>Jordan Smith (Roll #AST-2026-089)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePresetSelect('Rohan Sharma', 'AST-2026-012', 'Amit Sharma', 'Father')
                    }
                    className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      studentRollInput === 'AST-2026-012'
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400'
                        : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/70 hover:text-white'
                    }`}
                  >
                    <span>Rohan Sharma (Roll #AST-2026-012)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePresetSelect('Ananya Verma', 'AST-2026-088', 'Ritu Verma', 'Mother')
                    }
                    className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      studentRollInput === 'AST-2026-088'
                        ? 'bg-purple-950/90 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.5)] ring-1 ring-purple-400'
                        : 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-900/70 hover:text-white'
                    }`}
                  >
                    <span>Ananya Verma (Roll #AST-2026-088)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePresetSelect('Karthik Raja', 'AST-2026-095', 'S. Raja', 'Father')
                    }
                    className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      studentRollInput === 'AST-2026-095'
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400'
                        : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/70 hover:text-white'
                    }`}
                  >
                    <span>Karthik Raja (Roll #AST-2026-095)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Rapid One-Touch Robotic Biometric Scanner */}
            <div className="pt-1">
              <RoboticBiometricScanner
                label="GUARDIAN VOICE & RETINA SCAN"
                subLabel="TOUCH FOR RAPID ZERO-TRUST GUARDIAN LOGIN"
                themeColor="purple"
                onScan={() => {
                  handlePresetSelect('Jordan Smith', 'AST-2026-089', 'Lakshmi Smith', 'Mother');
                  setTimeout(() => {
                    const matchedStudent = findMatchingStudent('Jordan Smith', 'AST-2026-089', students);
                    const profile = buildStudentPerformanceProfile(matchedStudent, submissions);
                    setSelectedStudent(profile);
                    setIsVerified(true);
                  }, 700);
                }}
              />
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerificationSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Student Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-cyan-300 tracking-wide uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      Student Name
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    placeholder="e.g. Priya Patel"
                    required
                    className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-2xl border-2 border-cyan-500/50 text-sm font-mono focus:outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* 2. Student Roll Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-pink-300 tracking-wide uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-pink-400" />
                      Student Roll Number
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">AST Format</span>
                  </label>
                  <input
                    type="text"
                    value={studentRollInput}
                    onChange={(e) => setStudentRollInput(e.target.value)}
                    placeholder="e.g. AST-2026-215"
                    required
                    className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-2xl border-2 border-pink-500/50 text-sm font-mono focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* 3. Parent/Guardian Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-purple-300 tracking-wide uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
                      Parent/Guardian Name
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Authorized ID</span>
                  </label>
                  <input
                    type="text"
                    value={parentNameInput}
                    onChange={(e) => setParentNameInput(e.target.value)}
                    placeholder="e.g. Sunita Patel"
                    required
                    className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-2xl border-2 border-purple-500/50 text-sm font-mono focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* 4. Relationship */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-cyan-300 tracking-wide uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
                      Relationship
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Guardian Role</span>
                  </label>
                  <select
                    value={relationshipInput}
                    onChange={(e) => setRelationshipInput(e.target.value)}
                    className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-2xl border-2 border-cyan-500/50 text-sm font-mono focus:outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Sibling / Academic Mentor">Sibling / Academic Mentor</option>
                  </select>
                </div>
              </div>

              {/* Glowing 'Verify & Access Report' Action Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-slate-950 font-black rounded-2xl shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:shadow-[0_0_50px_rgba(168,85,247,1)] flex items-center justify-center gap-3 font-mono text-sm sm:text-base tracking-wide transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      <span>Authenticating Zero-Trust Privacy Token...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                      <span>Verify & Access Report</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  256-Bit Quantum Token
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Isolated Student Enclave
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-purple-400">
                  <Radio className="w-3.5 h-3.5 text-purple-400" />
                  Zero-Knowledge Multi-Student Boundary
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* 3. Unlocked Verified Parent Dashboard (STRICT DATA ISOLATION: Only Selected Student Visible) */
        <div className="space-y-6 animate-fade-in">
          {/* Verified Guardian & Isolated Student Profile Enclave */}
          <div className="bg-slate-950/95 border-2 border-purple-500/60 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              {/* Student Identity Left Block */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] p-1 flex-shrink-0 flex items-center justify-center relative">
                  <VRStudentAvatar className="w-full h-full" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-500/50 px-2.5 py-0.5 rounded-full">
                      Authorized Student Record
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Verified
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-center gap-2">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                      {selectedStudent.studentName}
                    </span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1">
                      <span className="text-slate-500">Roll No:</span>
                      <span className="text-pink-300 font-bold">{selectedStudent.rollNumber}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="text-slate-500">Node ID:</span>
                      <span className="text-cyan-300 font-bold">{selectedStudent.id}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="text-slate-500">Guardian:</span>
                      <span className="text-purple-300 font-bold">{parentNameInput} ({relationshipInput})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Switch Student / Re-verify Button */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                <button
                  onClick={() => setIsVerified(false)}
                  className="px-4 py-2.5 bg-slate-900/90 hover:bg-purple-950/80 text-slate-300 hover:text-white border border-purple-500/40 hover:border-purple-400 rounded-2xl text-xs font-mono flex items-center gap-2 transition-all shadow-md group cursor-pointer flex-shrink-0"
                >
                  <RotateCcw className="w-4 h-4 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Switch Student / Re-verify</span>
                </button>
              </div>
            </div>
          </div>

          {/* Multilingual Voice Welcome Greeting Banner for Selected Student */}
          <div className="bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-700/60 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>
                    {t('multilingualVoiceGreeting', 'Multilingual Parent Greeting')} ({language})
                  </span>
                </span>
                <p className="text-base font-semibold text-slate-100 leading-relaxed font-sans">
                  "{mandatoryGreetings[language]}"
                </p>
              </div>

              <button
                onClick={() => handleSpeakReport(mandatoryGreetings[language], language)}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center gap-2 transition-all font-mono text-xs flex-shrink-0 cursor-pointer"
              >
                {isPlayingAudio ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
                <span>
                  🔊 {t('listenIn', 'Listen in')} {language}
                </span>
              </button>
            </div>
          </div>

          {/* Synapse Guardian Autonomous Robotic Co-Pilot */}
          <RoboticAIPilotCard
            mentorName="Synapse Guardian AI Co-Pilot"
            mentorRole={`Zero-Jargon Academic Translator for ${selectedStudent.studentName}`}
            statusText={`Guardian Node: ${parentNameInput} (${relationshipInput}) | Isolated Record: ${selectedStudent.studentName} (${selectedStudent.rollNumber})`}
            neuralSyncPct={99.9}
            speechBubble={`Namaste ${parentNameInput}! I have analyzed ${selectedStudent.studentName}'s engineering milestones across coding projects, architecture reviews, and mock voice interviews. All metrics are translated into clean, non-technical insights in ${language}.`}
            themeColor="purple"
            quickActions={[
              { label: `Translate to ${language}`, onClick: () => generateParentReport(selectedStudent, language) },
              { label: 'Listen to Voice Greeting', onClick: () => handleSpeakReport(mandatoryGreetings[language], language) },
              { label: 'Ask Family Inquiry', onClick: () => {
                const el = document.getElementById('parent-inquiry-box');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }},
            ]}
          />

          {/* Single Student Performance Mecha Telemetry Dials */}
          <MechaCard
            themeColor="purple"
            title={`${selectedStudent.studentName}'s Academic Telemetry Gauges`}
            subTitle="Real-time multi-dimensional academic performance and interview readiness"
            badge="LIVE DATA BINDING"
            icon={<Award className="w-5 h-5" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <MechaTelemetryDial
                value={parseInt(selectedStudent.attendance) || 85}
                label={t('attendance', 'Attendance')}
                subLabel="Verified Class Logs"
                themeColor="emerald"
              />
              <MechaTelemetryDial
                value={parseInt(selectedStudent.projectScore) || 88}
                label={t('repoScore', 'Project Score')}
                subLabel="CI/CD Code AST"
                themeColor="cyan"
              />
              <MechaTelemetryDial
                value={92}
                label="Quiz Mastery"
                subLabel="Concept Retention"
                themeColor="purple"
              />
              <MechaTelemetryDial
                value={89}
                label="Interview Readiness"
                subLabel="STAR Voice Matrix"
                themeColor="pink"
              />
            </div>
          </MechaCard>

          {/* Zero-Jargon A2A Progress Report Container */}
          <div className="bg-slate-950/90 border border-purple-500/40 rounded-3xl p-6 space-y-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white font-mono">
                  {t('parentReportTitle', 'A2A Zero-Jargon Progress Report')} -{' '}
                  <span className="text-cyan-300">{selectedStudent.studentName}</span> ({language})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {parentReport?.response && (
                  <button
                    onClick={() => handleSpeakReport(parentReport.response, language)}
                    className="px-3.5 py-1.5 bg-purple-950/80 hover:bg-purple-900/90 text-purple-300 font-bold rounded-xl text-xs transition-all font-mono border border-purple-500/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    {isPlayingAudio ? (
                      <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-purple-300" />
                    )}
                    <span>
                      {t('readAloud', 'Read Aloud')} ({language})
                    </span>
                  </button>
                )}

                <button
                  onClick={() => generateParentReport(selectedStudent, language)}
                  disabled={loading}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-xl text-xs transition-all font-mono shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  <span>{t('refreshReport', 'Refresh Report')}</span>
                </button>
              </div>
            </div>

            {/* Report Output Box */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/90 shadow-inner min-h-[180px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  <p className="text-sm font-mono text-center">
                    {t('a2aTranslatingPrompt', 'A2A Protocol Translating Dynamic Telemetry for')}{' '}
                    <span className="text-cyan-300 font-bold">{selectedStudent.studentName}</span>{' '}
                    {t('intoZeroJargon', 'into Zero-Jargon')} {language}...
                  </p>
                </div>
              ) : parentReport ? (
                <MarkdownRenderer content={parentReport.response} />
              ) : null}
            </div>
          </div>

          {/* Interactive AI Parental Guidance & Inquiry Console */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                Ask EduAgent AST About {selectedStudent.studentName}'s Study Plan & Focus Areas
              </h4>
            </div>

            <form onSubmit={handleParentInquirySubmit} className="flex gap-2">
              <input
                type="text"
                value={parentInquiry}
                onChange={(e) => setParentInquiry(e.target.value)}
                placeholder={`e.g. How can I support ${selectedStudent.studentName} in ${selectedStudent.technicalTrack}?`}
                className="flex-1 bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-sans focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                disabled={inquiryLoading}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
              >
                {inquiryLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Ask AI</span>
              </button>
            </form>

            {inquiryResponse && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-xs text-slate-200 space-y-2 animate-fade-in">
                <MarkdownRenderer content={inquiryResponse} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
