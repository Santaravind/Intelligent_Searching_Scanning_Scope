import React from 'react';
import { UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const HumanDetectCard = () => {
  const { humanDetected, humanConfidence } = useForensic();

  return (
    <div className="cyber-panel p-3.5 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2">
        <div className="flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Human Presence Detection
          </h2>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      </div>

      {/* Detection Status Badge */}
      <div className="flex justify-center pt-2">
        {humanDetected ? (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/60 text-xs font-bold text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
            <span>Human Detected!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-xs font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>No Human Detected</span>
          </div>
        )}
      </div>

      {/* Human Silhouette Wireframe Visualizer */}
      <div className="flex items-center justify-center my-auto py-1">
        <div className="relative w-14 h-24 flex items-center justify-center">
          <svg viewBox="0 0 40 80" className="w-full h-full text-cyan-400/80">
            {/* Head */}
            <circle cx="20" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="10" r="4" fill="#00f0ff" fillOpacity="0.2" />
            
            {/* Torso */}
            <path
              d="M 12,20 L 28,20 L 25,48 L 15,48 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Grid rib lines inside torso */}
            <line x1="14" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="15" y1="33" x2="25" y2="33" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="16" y1="40" x2="24" y2="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1" />
            <line x1="20" y1="20" x2="20" y2="48" stroke="#00f0ff" strokeWidth="1" />

            {/* Arms */}
            <path d="M 12,21 L 5,38 L 7,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 28,21 L 35,38 L 33,50" fill="none" stroke="currentColor" strokeWidth="1.5" />

            {/* Legs */}
            <path d="M 16,48 L 14,64 L 12,78" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 24,48 L 26,64 L 28,78" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Pulse radar sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse-slow pointer-events-none"></div>
        </div>
      </div>

      {/* Confidence Footer */}
      <div className="text-center text-xs font-mono border-t border-[#162A4E] pt-1.5 text-slate-300">
        Confidence : <span className="font-bold text-cyan-300">{humanConfidence}%</span>
      </div>
    </div>
  );
};
