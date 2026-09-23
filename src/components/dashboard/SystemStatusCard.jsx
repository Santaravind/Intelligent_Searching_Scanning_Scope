import React from 'react';
import { Settings, Check, Activity } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const SystemStatusCard = () => {
  const { systemStatus } = useForensic();

  const statusItems = [
    { label: 'Device', status: systemStatus.device, color: 'text-emerald-400' },
    { label: 'RFID', status: systemStatus.rfid, color: 'text-emerald-400' },
    { label: 'GPS', status: systemStatus.gps, color: 'text-emerald-400' },
    { label: 'AI Camera', status: systemStatus.aiCamera, color: 'text-emerald-400' },
    { label: 'Ultrasonic', status: systemStatus.ultrasonic, color: 'text-emerald-400' },
    { label: 'Temperature', status: systemStatus.temperature, color: 'text-emerald-400' },
    { label: 'Location Track', status: systemStatus.locationTrack, color: 'text-emerald-400' },
  ];

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            System Status
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>SYS_OK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-auto py-2">
        {/* Status Checklist list */}
        <div className="sm:col-span-7 space-y-1.5 text-xs">
          {statusItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]"></span>
                <span className="text-slate-300 font-medium">{item.label}</span>
              </div>
              <span className={`font-semibold tracking-wide ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Circular Gauge "All Systems Operational" */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Glowing Progress Ring */}
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              {/* Background ring */}
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#0E2344"
                strokeWidth="5"
              />
              {/* Active animated green ring */}
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
                strokeDasharray="213.6"
                strokeDashoffset="10"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_#10B981]"
              />
            </svg>

            {/* Inner check icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs font-bold text-slate-200 tracking-wide leading-tight">
            All Systems<br />Operational
          </div>
        </div>
      </div>
    </div>
  );
};
