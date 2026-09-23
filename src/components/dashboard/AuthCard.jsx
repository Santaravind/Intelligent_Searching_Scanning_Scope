import React from 'react';
import { ShieldCheck, CheckCircle2, Radio, UserCheck } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const AuthCard = () => {
  const { investigator } = useForensic();

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Investigator Authentication
          </h2>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center my-auto py-2">
        {/* Authorized Badge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-sm font-black tracking-wider text-emerald-400">
            AUTHORIZED
          </span>
        </div>

        {/* Investigator Details */}
        <div className="md:col-span-5 space-y-1 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Investigator ID</span>
            <span className="font-mono font-bold text-white">: {investigator.id}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-0.5">
            <span className="text-slate-400">Name</span>
            <span className="font-bold text-cyan-300">: {investigator.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Access Time</span>
            <span className="font-mono text-slate-300">: {investigator.accessTime}</span>
          </div>
        </div>

        {/* RFID Verified Icon Badge */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-2 rounded-lg bg-[#0C1930] border border-[#1C3660] text-center">
          <div className="relative mb-1 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            <Radio className="w-3.5 h-3.5 text-cyan-400 absolute -top-1 -right-2 animate-ping" />
          </div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            RFID Verified
          </span>
        </div>
      </div>
    </div>
  );
};
