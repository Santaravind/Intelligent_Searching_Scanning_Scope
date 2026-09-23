import React from 'react';
import { Shield, Wifi, Activity, Volume2, VolumeX, Sparkles, Printer } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const Header = () => {
  const {
    currentTime,
    isLiveSimulation,
    setIsLiveSimulation,
    isMuted,
    setIsMuted,
    setIsPrintReportOpen
  } = useForensic();

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <header className="w-full bg-[#070E1B] border-b border-[#16294A] px-4 lg:px-6 py-3 select-none">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#070E1B] rounded-[7px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>
            <div className="absolute -inset-0.5 bg-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 uppercase">
                Intelligent Searching Scanning Scope
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded tracking-widest uppercase">
                v2.6
              </span>
            </div>
            <p className="text-xs font-medium text-cyan-400/90 tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              {/* Portable AI-Assisted Forensic Scanning */}
              Indresh Kumar
            </p>
          </div>
        </div>

        {/* Right Status Controls & Live Clock */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-5">
          {/* Quick Simulation toggle */}
          <button
            onClick={() => setIsLiveSimulation(!isLiveSimulation)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isLiveSimulation
                ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
            title="Toggle Continuous Sensor Simulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{isLiveSimulation ? 'Sim: Live' : 'Sim: Paused'}</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors rounded-md bg-[#0C172C] border border-[#1B3158]"
            title={isMuted ? 'Unmute Alerts' : 'Mute Alerts'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Print Report quick action */}
          <button
            onClick={() => setIsPrintReportOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          {/* System Online Badge */}
          <div className="flex items-center gap-2 bg-[#091528] border border-emerald-500/30 px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-300 tracking-wider">System Online</span>
          </div>

          {/* Wireless & Connectivity Indicator */}
          <div className="flex items-center gap-1.5 text-cyan-400 bg-[#091528] px-2.5 py-1.5 rounded-lg border border-[#172D52]">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono font-semibold text-slate-300">ESP-WiFi</span>
          </div>

          {/* Dynamic HUD Clock */}
          <div className="flex items-center gap-2.5 bg-[#0C172C] border border-[#1E3B68] px-3.5 py-1.5 rounded-lg text-xs font-mono shadow-inner">
            <span className="text-slate-300 font-medium">{formattedDate}</span>
            <span className="text-cyan-400 font-bold tracking-wider">{formattedTime}</span>
          </div>
        </div>

      </div>
    </header>
  );
};
