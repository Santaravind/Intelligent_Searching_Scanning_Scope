import React from 'react';
import { Radio, Activity } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const UltrasonicCard = () => {
  const { distance } = useForensic();

  return (
    <div className="cyber-panel p-3.5 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2">
        <div className="flex items-center gap-1.5">
          <Radio className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Ultrasonic Measurement
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-[#0C1A33] px-2 py-0.5 rounded border border-[#1C3A66]">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>ECHO 40kHz</span>
        </div>
      </div>

      <div className="text-center text-[11px] font-medium text-cyan-400/90 pt-1">
        40 kHz Ultrasonic
      </div>

      {/* Animated Acoustic Waves and Distance Display */}
      <div className="flex items-center justify-center gap-4 my-auto py-2">
        {/* Animated Sonar Wave Icon */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          {/* Concentric ripples */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping-slow"></div>
          <div className="absolute -inset-1.5 rounded-full border border-cyan-400/10"></div>
        </div>

        {/* Distance Value */}
        <div className="text-left">
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
            {distance.toFixed(2)} <span className="text-sm font-sans font-bold text-cyan-400">m</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400">
            Distance to Object
          </div>
        </div>
      </div>

      {/* Precision indicator */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 bg-[#091528] px-2.5 py-1 rounded border border-[#152B4D]">
        <span>Precision: <strong className="text-slate-200 font-mono">±0.3 cm</strong></span>
        <span>Range: <strong className="text-slate-200 font-mono">0.02m - 4.5m</strong></span>
      </div>
    </div>
  );
};
