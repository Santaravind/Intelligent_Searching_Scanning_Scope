import React from 'react';
import { Thermometer, Flame } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const TemperatureCard = () => {
  const { temperature } = useForensic();

  // Percentage on scale from -10°C to +50°C (total range: 60°C)
  const minTemp = -10;
  const maxTemp = 50;
  const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temperature));
  const pointerPercent = ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Temperature Monitoring
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          DHT22 CALIBRATED
        </span>
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-center gap-4 my-auto py-2">
        {/* Thermometer Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-600/30 border border-rose-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <Thermometer className="w-7 h-7 text-rose-400 animate-pulse" />
        </div>

        {/* Ambient Temperature Value */}
        <div>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">
            {temperature.toFixed(1)} <span className="text-lg font-sans font-bold text-rose-400">°C</span>
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Ambient Temperature
          </div>
        </div>
      </div>

      {/* Graduated Temperature Color Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="relative w-full">
          {/* Gradient bar (-10°C to 50°C) */}
          <div
            className="w-full h-3 rounded-full shadow-inner"
            style={{
              background: 'linear-gradient(to right, #38bdf8 0%, #10b981 30%, #f59e0b 65%, #ef4444 100%)'
            }}
          ></div>

          {/* Pointer indicator */}
          <div
            className="absolute -top-1 w-3.5 h-5 bg-white rounded border border-slate-900 shadow-[0_0_8px_#fff] -translate-x-1/2 transition-all duration-300"
            style={{ left: `${pointerPercent}%` }}
          ></div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-[9px] font-mono text-slate-400 px-0.5">
          <span>-10</span>
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
        </div>
      </div>
    </div>
  );
};
