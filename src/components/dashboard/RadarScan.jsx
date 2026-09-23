import React from 'react';
import { Radar } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const RadarScan = () => {
  const { scanAngle, setScanAngle } = useForensic();

  // Angle in radians for geometry (0° is left, 90° is top, 180° is right)
  // Mapping 0° -> 180° to trigonometric circle angles: (180 - angle) in deg
  const displayAngle = Math.min(180, Math.max(0, scanAngle));
  const rad = ((180 - displayAngle) * Math.PI) / 180;
  const radius = 70;
  const cx = 90;
  const cy = 80;
  const targetX = cx + radius * Math.cos(rad);
  const targetY = cy - radius * Math.sin(rad);

  return (
    <div className="cyber-panel p-3.5 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2">
        <div className="flex items-center gap-1.5">
          <Radar className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            180° Scanning
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          SERVO ACTIVE
        </span>
      </div>

      {/* 180° Semi-circle Radar Display */}
      <div className="relative flex flex-col items-center justify-center my-auto py-1">
        <svg viewBox="0 0 180 95" className="w-44 sm:w-52 h-24 sm:h-28 overflow-visible">
          <defs>
            {/* Radar Sweep Gradient */}
            <linearGradient id="radarSweepGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0.05" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer arc background */}
          <path
            d="M 10,80 A 80,80 0 0,1 170,80 Z"
            fill="#081427"
            stroke="#1B3864"
            strokeWidth="1.5"
          />

          {/* Inner concentric distance arcs */}
          <path
            d="M 30,80 A 60,60 0 0,1 150,80"
            fill="none"
            stroke="#172F56"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 50,80 A 40,40 0 0,1 130,80"
            fill="none"
            stroke="#172F56"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 70,80 A 20,20 0 0,1 110,80"
            fill="none"
            stroke="#172F56"
            strokeWidth="1"
          />

          {/* Radial grid rays (0°, 45°, 90°, 135°, 180°) */}
          <line x1="90" y1="80" x2="10" y2="80" stroke="#1C3866" strokeWidth="1" />
          <line x1="90" y1="80" x2="33" y2="23" stroke="#1C3866" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="90" y1="80" x2="90" y2="0" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="90" y1="80" x2="147" y2="23" stroke="#1C3866" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="90" y1="80" x2="170" y2="80" stroke="#1C3866" strokeWidth="1" />

          {/* Active sweeping sector fan */}
          <path
            d={`M 90,80 L ${targetX},${targetY} A 80,80 0 0,0 ${
              90 + radius * Math.cos(rad + 0.3)
            },${80 - radius * Math.sin(rad + 0.3)} Z`}
            fill="url(#radarSweepGrad)"
            opacity="0.8"
          />

          {/* Active target beam line */}
          <line
            x1="90"
            y1="80"
            x2={targetX}
            y2={targetY}
            stroke="#00f0ff"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {/* Blip dot on target */}
          <circle
            cx={targetX}
            cy={targetY}
            r="3.5"
            fill="#00f0ff"
            filter="url(#glow)"
          />
          <circle
            cx={targetX}
            cy={targetY}
            r="6"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1"
            className="animate-ping"
            style={{ transformOrigin: `${targetX}px ${targetY}px` }}
          />

          {/* Degree angle indicators */}
          <text x="5" y="92" fill="#64748b" fontSize="8" fontWeight="bold">0°</text>
          <text x="84" y=" -2" fill="#00f0ff" fontSize="8" fontWeight="bold">90°</text>
          <text x="165" y="92" fill="#64748b" fontSize="8" fontWeight="bold">180°</text>

          {/* Base Origin Center */}
          <rect x="85" y="74" width="10" height="8" rx="2" fill="#00f0ff" />
        </svg>
      </div>

      {/* Angle Readout Display */}
      <div className="text-center pt-1">
        <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          {displayAngle}°
        </div>
        <div className="text-[11px] font-medium text-slate-400">
          Current Scan Angle
        </div>
      </div>
    </div>
  );
};
