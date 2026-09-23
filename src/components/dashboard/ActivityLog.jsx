import React from 'react';
import { Terminal, Clock } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const ActivityLog = () => {
  const { activityLogs } = useForensic();

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Recent Activity Log
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>AUDIT STREAM</span>
        </div>
      </div>

      {/* Activity Log Entries */}
      <div className="my-2 space-y-2 max-h-48 overflow-y-auto pr-1">
        {activityLogs.slice(0, 4).map((log, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] shrink-0"></span>
            <span className="text-slate-400 shrink-0">{log.time}</span>
            <span className="text-slate-200 truncate font-sans">{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
