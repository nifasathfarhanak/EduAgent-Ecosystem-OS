import React, { useState } from 'react';
import { PortalType, LanguageType, FeatureModality, UserProfile } from './types';
import { useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { RoutingHeaderBanner } from './components/RoutingHeaderBanner';
import { LandingPage, demoUsers } from './components/LandingPage';
import { StudentPortal } from './components/StudentPortal/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal/TeacherPortal';
import { ParentPortal } from './components/ParentPortal/ParentPortal';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  SmartEducationBackground,
  BackgroundThemeId,
  BackgroundThemeSelector,
  BACKGROUND_THEMES,
} from './components/SmartEducationBackground';
import { Cpu, Terminal, Shield, Zap, Radio, Layers, Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [portal, setPortal] = useState<PortalType | 'Landing'>('Landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { language, setLanguage } = useLanguage();
  const [feature, setFeature] = useState<FeatureModality>('Vision Image');
  const [manualTheme, setManualTheme] = useState<BackgroundThemeId | undefined>(undefined);

  const handleLoginAs = (user: UserProfile) => {
    setCurrentUser(user);
    setPortal(user.role);
    if (user.role === 'Student') {
      setFeature('Vision Image');
    } else if (user.role === 'Teacher') {
      setFeature('Text');
    } else if (user.role === 'Parent') {
      setFeature('Voice Audio');
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

    // If user is already logged in, lock view to their role
    if (currentUser) {
      setPortal(currentUser.role);
      if (currentUser.role === 'Student') setFeature('Vision Image');
      else if (currentUser.role === 'Teacher') setFeature('Text');
      else if (currentUser.role === 'Parent') setFeature('Voice Audio');
    } else {
      setPortal('Landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-black relative">
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
      />

      {/* Mandatory Routing Header Banner */}
      <RoutingHeaderBanner portal={portal} feature={feature} language={language} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        <ErrorBoundary resetKey={portal} fallbackTitle={`${portal} Portal Execution Warning`}>
          {portal === 'Landing' && (
            <LandingPage
              onLoginAs={handleLoginAs}
              currentTheme={manualTheme || 'robotics'}
              onSelectTheme={(t) => setManualTheme(t)}
            />
          )}

          {portal === 'Student' && (
            <StudentPortal language={language} onSetModality={setFeature} />
          )}

          {portal === 'Teacher' && (
            <TeacherPortal language={language} onSetModality={setFeature} />
          )}

          {portal === 'Parent' && (
            <ParentPortal
              language={language}
              onLanguageChange={setLanguage}
              onSetModality={setFeature}
            />
          )}
        </ErrorBoundary>
      </main>

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
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Trending Robotic AI Active</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-cyan-400 font-medium">STAR Evaluator L6</span>
            <span className="text-slate-700">•</span>
            <span className="text-purple-400 font-medium">Spaced Retrieval (1-7-21-60d)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

