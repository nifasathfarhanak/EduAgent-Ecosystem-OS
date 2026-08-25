import React from 'react';
import { PortalType, FeatureModality, LanguageType } from '../types';
import { Cpu, Eye, Mic, FileText, Globe, Shield, Activity, Sparkles } from 'lucide-react';

interface Props {
  portal: PortalType | 'Landing';
  feature: FeatureModality;
  language: LanguageType;
}

export const RoutingHeaderBanner: React.FC<Props> = ({ portal, feature, language }) => {
  const displayPortal = portal === 'Landing' ? 'Student/Overview' : portal;
  const formattedHeader = `[PORTAL: ${displayPortal}] | [Feature: ${feature}] | [Language: ${language}]`;

  const getFeatureIcon = () => {
    switch (feature) {
      case 'Vision Image':
        return <Eye className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Voice Audio':
        return <Mic className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Text':
      default:
        return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="bg-slate-950/80 border-b border-slate-900 text-xs font-mono py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 shadow-inner backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-slate-900/90 text-slate-200 px-2.5 py-1 rounded-xl border border-slate-800 font-bold shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider text-slate-300">ROUTING HEADER</span>
        </div>
        <span className="text-slate-100 font-bold tracking-wide bg-gradient-to-r from-indigo-950/90 to-purple-950/90 px-3 py-1 rounded-xl border border-indigo-500/30 text-indigo-200 shadow-sm text-[11px]">
          {formattedHeader}
        </span>
      </div>

      <div className="flex items-center gap-3 text-slate-400">
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px] shadow-sm">
          {getFeatureIcon()}
          <span className="text-slate-200 font-medium capitalize">{feature}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px] shadow-sm">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-200 font-medium">{language}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-800/40 text-[11px] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>A2A & MCP Active</span>
        </div>
      </div>
    </div>
  );
};
