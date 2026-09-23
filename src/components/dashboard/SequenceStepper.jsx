import React from 'react';
import {
  Lock,
  Radio,
  Wifi,
  Maximize2,
  UserCheck,
  ScanSearch,
  Thermometer,
  FileText,
  ChevronRight,
  Check
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

const stepIcons = {
  Lock,
  Radio,
  Wifi,
  Maximize2,
  UserCheck,
  ScanSearch,
  Thermometer,
  FileText,
};

export const SequenceStepper = () => {
  const { operationalSteps, setOperationalSteps, addLog } = useForensic();

  const handleStepClick = (index) => {
    setOperationalSteps((prev) =>
      prev.map((step, idx) => {
        if (idx === index) {
          addLog(`Operational step [${step.id} - ${step.name}] triggered manually`, 'info');
          return { ...step, status: 'active' };
        }
        return step;
      })
    );
  };

  return (
    <div className="cyber-panel p-4 w-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5 mb-3">
        <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Operational Sequence
        </h2>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          AUTOMATED WORKFLOW
        </span>
      </div>

      {/* 8-Step Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 items-center">
        {operationalSteps.map((step, idx) => {
          const Icon = stepIcons[step.icon] || Lock;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div key={step.id} className="relative flex items-center">
              <button
                onClick={() => handleStepClick(idx)}
                className={`w-full flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#0E274E] border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)] scale-102'
                    : isCompleted
                    ? 'bg-[#0B1E38] border-[#1C4177] text-slate-300'
                    : 'bg-[#081326] border-[#142646] text-slate-500 hover:border-[#1E3B68]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center mb-1.5 transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-[10px] font-mono font-bold text-cyan-300">
                  {step.id}
                </div>
                <div className="text-[11px] font-bold tracking-tight text-white capitalize truncate w-full text-center">
                  {step.name}
                </div>
              </button>

              {/* Arrow separator (hidden on last item) */}
              {idx < operationalSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/40">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
