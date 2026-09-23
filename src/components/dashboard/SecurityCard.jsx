import React from 'react';
import { Lock, ShieldCheck, Check } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const SecurityCard = () => {
  const { securityStatus } = useForensic();

  const securityItems = [
    { label: 'RFID Authentication', active: securityStatus.rfidVerified },
    { label: 'Device Lock', active: securityStatus.deviceLock },
    { label: 'Data Encryption', active: securityStatus.encryption },
    { label: 'Unauthorized Access Alert', active: !securityStatus.unauthorizedAlert },
  ];

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Security & Access Control
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          AES-256
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center my-auto py-2">
        {/* Access Granted Badge & Lock */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-1">
            <Lock className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-emerald-400">
            Access Granted
          </div>
        </div>

        {/* Security Feature Checklist */}
        <div className="sm:col-span-8 space-y-1.5 text-xs">
          {securityItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-slate-200 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
