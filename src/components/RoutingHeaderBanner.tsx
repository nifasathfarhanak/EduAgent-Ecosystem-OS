import React from 'react';
import { PortalType, FeatureModality, LanguageType } from '../types';
import { Cpu, Eye, Mic, FileText, Globe, Shield, Activity, Sparkles } from 'lucide-react';

interface Props {
  portal: PortalType | 'Landing';
  feature: FeatureModality;
  language: LanguageType;
}

export const RoutingHeaderBanner: React.FC<Props> = ({ portal, feature }) => {
  const displayPortal = portal === 'Landing' ? 'Academic Hub' : portal;
  const formattedHeader = `[PORTAL: ${displayPortal}] | [Modality: ${feature}] | [RAG: Active]`;

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
    <div className="bg-slate-950/80 border-b border-slate-900 text-xs font-mono py-1.5 sm:py-2 px-2.5 sm:px-8 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shadow-inner backdrop-blur-md overflow-x-auto">
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-900/90 text-slate-200 px-2 sm:px-2.5 py-1 rounded-xl border border-slate-800 font-bold shadow-sm flex-shrink-0">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300">ROUTING HEADER</span>
        </div>
        <span className="text-slate-100 font-bold tracking-wide bg-gradient-to-r from-indigo-950/90 to-purple-950/90 px-2.5 sm:px-3 py-1 rounded-xl border border-indigo-500/30 text-indigo-200 shadow-sm text-[10px] sm:text-[11px] truncate max-w-[240px] xs:max-w-none">
          {formattedHeader}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-[10px] sm:text-[11px] flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 sm:px-2.5 py-1 rounded-xl border border-slate-800 shadow-sm">
          {getFeatureIcon()}
          <span className="text-slate-200 font-medium capitalize">{feature}</span>
        </div>
        <div className="hidden xs:flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/40 px-2 sm:px-2.5 py-1 rounded-xl border border-emerald-800/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>A2A & MCP Active</span>
        </div>
      </div>
    </div>
  );
};
