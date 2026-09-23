import React from 'react';
import { Radar, Radio, Activity, Compass, Target, Sparkles } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const RadarView = () => {
  const { scanAngle, setScanAngle, distance, radarBlips } = useForensic();

  const radius = 130;
  const cx = 160;
  const cy = 150;
  const rad = ((180 - scanAngle) * Math.PI) / 180;
  const targetX = cx + radius * Math.cos(rad);
  const targetY = cy - radius * Math.sin(rad);

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Radar className="w-5 h-5 text-cyan-400" />
            180° Panoramic Sonar Radar & Acoustic Oscilloscope
          </h2>
          <p className="text-xs text-slate-400">
            Precision 40kHz Ultrasonic Sonar Ranging with SG90 Micro-Servo 180° Sweep
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#070E1B] border border-cyan-500/30 px-3.5 py-1.5 rounded-lg text-xs font-mono">
            <span>FREQUENCY: </span>
            <span className="font-bold text-cyan-300">40.0 kHz</span>
          </div>
          <div className="bg-[#070E1B] border border-emerald-500/30 px-3.5 py-1.5 rounded-lg text-xs font-mono">
            <span>SAMPLING: </span>
            <span className="font-bold text-emerald-300">120 Hz</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Large Canvas Radar Scope */}
        <div className="lg:col-span-8 cyber-panel p-6 flex flex-col items-center justify-center">
          
          <div className="relative w-full max-w-lg flex flex-col items-center">
            <svg viewBox="0 0 320 180" className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id="largeSweep" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0044ff" stopOpacity="0.0" />
                </linearGradient>
                <radialGradient id="radarBg" cx="50%" cy="100%" r="100%">
                  <stop offset="0%" stopColor="#0A1D3D" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#050C17" stopOpacity="0.95" />
                </radialGradient>
              </defs>

              {/* Background semi-circle */}
              <path
                d="M 20,150 A 140,140 0 0,1 300,150 Z"
                fill="url(#radarBg)"
                stroke="#1E457C"
                strokeWidth="2"
              />

              {/* Concentric Distance Rings (1m, 2m, 3m, 4m) */}
              {[35, 70, 105, 140].map((r, i) => (
                <g key={i}>
                  <path
                    d={`M ${160 - r},150 A ${r},${r} 0 0,1 ${160 + r},150`}
                    fill="none"
                    stroke="#183664"
                    strokeWidth="1.2"
                    strokeDasharray={i === 3 ? 'none' : '4 4'}
                  />
                  <text x={162} y={150 - r + 10} fill="#475569" fontSize="8" fontWeight="bold">
                    {(i + 1)}m
                  </text>
                </g>
              ))}

              {/* Radial Degree lines */}
              <line x1="160" y1="150" x2="20" y2="150" stroke="#1E457C" strokeWidth="1.5" />
              <line x1="160" y1="150" x2="61" y2="51" stroke="#1E457C" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="160" y1="150" x2="160" y2="10" stroke="#00f0ff" strokeWidth="2" strokeOpacity="0.7" />
              <line x1="160" y1="150" x2="259" y2="51" stroke="#1E457C" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="160" y1="150" x2="300" y2="150" stroke="#1E457C" strokeWidth="1.5" />

              {/* Sweeping fan */}
              <path
                d={`M 160,150 L ${targetX},${targetY} A 140,140 0 0,0 ${
                  160 + radius * Math.cos(rad + 0.4)
                },${150 - radius * Math.sin(rad + 0.4)} Z`}
                fill="url(#largeSweep)"
              />

              {/* Active Beam */}
              <line
                x1="160"
                y1="150"
                x2={targetX}
                y2={targetY}
                stroke="#00f0ff"
                strokeWidth="3"
              />

              {/* Detected targets / blips on radar */}
              {radarBlips.map((blip, idx) => {
                const bRad = ((180 - blip.angle) * Math.PI) / 180;
                const bDist = (blip.distance / 4.5) * 140;
                const bx = 160 + bDist * Math.cos(bRad);
                const by = 150 - bDist * Math.sin(bRad);

                return (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={bx} cy={by} r="4" fill="#10B981" />
                    <circle cx={bx} cy={by} r="8" fill="none" stroke="#10B981" strokeWidth="1" className="animate-ping" />
                    <text x={bx + 6} y={by - 4} fill="#6ee7b7" fontSize="7" fontWeight="bold">
                      {blip.label} ({blip.distance}m)
                    </text>
                  </g>
                );
              })}

              {/* Center Base Hub */}
              <circle cx="160" cy="150" r="10" fill="#00f0ff" />
              <circle cx="160" cy="150" r="5" fill="#070E1B" />

              {/* Angle labels */}
              <text x="10" y="165" fill="#64748b" fontSize="10" fontWeight="bold">0°</text>
              <text x="50" y="42" fill="#64748b" fontSize="10" fontWeight="bold">45°</text>
              <text x="152" y="5" fill="#00f0ff" fontSize="11" fontWeight="bold">90°</text>
              <text x="260" y="42" fill="#64748b" fontSize="10" fontWeight="bold">135°</text>
              <text x="295" y="165" fill="#64748b" fontSize="10" fontWeight="bold">180°</text>
            </svg>
          </div>

          {/* Interactive Manual Sweep Slider */}
          <div className="w-full max-w-md mt-6 bg-[#070E1B] p-4 rounded-xl border border-[#162A4E] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Interactive Sweep Angle</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{scanAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              value={scanAngle}
              onChange={(e) => setScanAngle(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        {/* Sonar Telemetry & Blip Registry */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Target telemetry card */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Active Acoustic Target
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#070E1B] p-2.5 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400">Current Distance:</span>
                <span className="text-lg font-bold text-cyan-300">{distance.toFixed(2)} m</span>
              </div>
              <div className="bg-[#070E1B] p-2.5 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400">Scan Angle:</span>
                <span className="text-lg font-bold text-cyan-300">{scanAngle}°</span>
              </div>
              <div className="bg-[#070E1B] p-2.5 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400">Speed of Sound:</span>
                <span className="text-sm font-bold text-white">343.2 m/s @ 27.4°C</span>
              </div>
            </div>
          </div>

          {/* Sonar Blip Target List */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              Detected Acoustic Echoes
            </h3>

            <div className="space-y-2">
              {radarBlips.map((blip, idx) => (
                <div
                  key={idx}
                  onClick={() => setScanAngle(blip.angle)}
                  className="bg-[#070E1B] hover:bg-[#0E1F3B] p-2.5 rounded-lg border border-[#172D52] flex justify-between items-center cursor-pointer transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{blip.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Bearing: {blip.angle}°</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {blip.distance} m
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
