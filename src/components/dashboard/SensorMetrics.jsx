import React from 'react';
import { Activity } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const SensorMetrics = () => {
  const { distance, scanAngle, temperature, aiConfidence } = useForensic();

  const metrics = [
    {
      value: `${distance.toFixed(2)} m`,
      label: 'Distance',
      stroke: '#00F0FF',
      percent: Math.min(100, (distance / 4.5) * 100),
    },
    {
      value: `${scanAngle}°`,
      label: 'Scan Angle',
      stroke: '#00F0FF',
      percent: (scanAngle / 180) * 100,
    },
    {
      value: `${temperature.toFixed(1)}°C`,
      label: 'Temperature',
      stroke: '#F59E0B',
      percent: ((temperature + 10) / 60) * 100,
    },
    {
      value: `${aiConfidence}%`,
      label: 'AI Confidence',
      stroke: '#8B5CF6',
      percent: aiConfidence,
    },
  ];

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Live Sensor Data
          </h2>
        </div>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      </div>

      {/* 4 Circular Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto py-1">
        {metrics.map((item, idx) => {
          const radius = 28;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (item.percent / 100) * circumference;

          return (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
                <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="35"
                    cy="35"
                    r={radius}
                    fill="none"
                    stroke="#0D1E3A"
                    strokeWidth="4"
                  />
                  {/* Dynamic Glowing Progress */}
                  <circle
                    cx="35"
                    cy="35"
                    r={radius}
                    fill="none"
                    stroke={item.stroke}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 6px ${item.stroke})`,
                      transition: 'stroke-dashoffset 0.5s ease'
                    }}
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-black font-mono text-white tracking-tight">
                    {item.value}
                  </span>
                </div>
              </div>

              <div className="mt-1.5 text-[11px] font-semibold text-slate-300">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
