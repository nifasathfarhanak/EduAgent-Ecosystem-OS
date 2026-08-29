import React, { useState } from 'react';
import { PortalType, LanguageType, FeatureModality, UserProfile } from './types';
import { useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { RoutingHeaderBanner } from './components/RoutingHeaderBanner';
import { LandingPage, demoUsers } from './components/LandingPage';
import { StudentPortal } from './components/StudentPortal/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal/TeacherPortal';
import { AdminPortal } from './components/AdminPortal/AdminPortal';
import { DeveloperView } from './components/DeveloperView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LiveA2AFeedModal } from './components/LiveA2AFeedModal';
import {
  SmartEducationBackground,
  BackgroundThemeId,
  BackgroundThemeSelector,
  BACKGROUND_THEMES,
} from './components/SmartEducationBackground';
import { LoginModal } from './components/LoginModal';
import { Cpu, Terminal, Shield, Zap, Radio, Layers, Bot, Sparkles, UserCheck } from 'lucide-react';

export default function App() {
  const [portal, setPortal] = useState<PortalType | 'Landing'>('Landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { language, setLanguage } = useLanguage();
  const [feature, setFeature] = useState<FeatureModality>('Vision Image');
  const [manualTheme, setManualTheme] = useState<BackgroundThemeId | undefined>(undefined);
  const [showA2AFeed, setShowA2AFeed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginAs = (user: UserProfile) => {
    setCurrentUser(user);
    setPortal(user.role);
    if (user.role === 'Student') {
      setFeature('Vision Image');
    } else if (user.role === 'Teacher') {
      setFeature('Text');
    } else if (user.role === 'Admin') {
      setFeature('Text');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPortal('Landing');
    setFeature('Vision Image');
  };

  const handlePortalChange = (newPortal: PortalType | 'Landing') => {
    if (newPortal === 'Landing') {
      handleLogout();
      return;
    }

    if (newPortal === 'Developer') {
      setPortal('Developer');
      setFeature('Text');
      return;
    }

    if (currentUser) {
      setPortal(newPortal);
      if (newPortal === 'Student') setFeature('Vision Image');
      else setFeature('Text');
    } else {
      // Allow demo viewing of portals even before explicit login
      setPortal(newPortal);
      if (newPortal === 'Student') setFeature('Vision Image');
      else setFeature('Text');
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#02040a] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-black relative pb-16 md:pb-0">
      {/* Next-Gen Smart Education AI Background (Context-Aware + Dynamic Robotics AI Themes) */}
      <SmartEducationBackground
        portal={portal}
        manualTheme={manualTheme}
        onThemeChange={(theme) => setManualTheme(theme)}
      />

      {/* Top Application Header with Theme Customizer */}
      <Header
        activePortal={portal}
        onPortalChange={handlePortalChange}
        activeLanguage={language}
        onLanguageChange={setLanguage}
        currentUser={currentUser}
        onLoginAs={handleLoginAs}
        onLogout={handleLogout}
        currentTheme={manualTheme || 'robotics'}
        onSelectTheme={(t) => setManualTheme(t)}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginAs={handleLoginAs}
      />

      {/* Mandatory Routing Header Banner */}
      <RoutingHeaderBanner portal={portal} feature={feature} language={language} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 z-10 overflow-x-hidden">
        <ErrorBoundary resetKey={portal} fallbackTitle={`${portal} Portal Execution Warning`}>
          {portal === 'Landing' && (
            <LandingPage
              onLoginAs={handleLoginAs}
              currentTheme={manualTheme || 'robotics'}
              onSelectTheme={(t) => setManualTheme(t)}
            />
          )}

          {portal === 'Student' && (
            <StudentPortal language={language} onSetModality={setFeature} currentUser={currentUser || undefined} />
          )}

          {portal === 'Teacher' && (
            <TeacherPortal language={language} onSetModality={setFeature} currentUser={currentUser || undefined} />
          )}

          {portal === 'Admin' && (
            <AdminPortal language={language} />
          )}

          {portal === 'Developer' && (
            <DeveloperView onBackToLanding={() => handlePortalChange('Landing')} />
          )}
        </ErrorBoundary>
      </main>

      {/* Live A2A Trace Modal for Phone Mirroring Demo */}
      <LiveA2AFeedModal isOpen={showA2AFeed} onClose={() => setShowA2AFeed(false)} />

      {/* Mobile Bottom Navigation for Phone Mirroring */}
      <MobileBottomNav
        activePortal={portal}
        onPortalChange={handlePortalChange}
        onToggleA2AFeed={() => setShowA2AFeed((prev) => !prev)}
        showA2AFeed={showA2AFeed}
      />

      {/* Enterprise Nexus System Status Footer */}
      <footer className="bg-slate-950/90 border-t border-cyan-500/20 text-xs font-mono py-4 px-6 text-slate-400 backdrop-blur-xl z-10 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>EduAgent AST • Next-Gen Smart Education Ecosystem • Vertex AI, Gemini, BigQuery Telemetry</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => handlePortalChange('Developer')}
              className="flex items-center gap-1.5 text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              <span>Developer Specs</span>
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setShowA2AFeed(true)}
              className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>A2A Agent Trace Active</span>
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-cyan-400 font-medium">STAR Evaluator L6</span>
            <span className="text-slate-700">•</span>
            <span className="text-purple-400 font-medium">Spaced Retrieval (SM-2 Alg)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

