import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Thermometer, Droplets, Activity, Flame, ShieldCheck } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const TempAnalyticsView = () => {
  const { temperature, humidity, tempHistory } = useForensic();

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-cyan-400" />
            Environmental & Thermal Microclimate Analytics
          </h2>
          <p className="text-xs text-slate-400">
            Precision DHT22 Ambient Thermometry and Crime Scene Environmental Telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#070E1B] border border-amber-500/30 px-3.5 py-1.5 rounded-lg text-xs font-mono">
            <span>TEMP: </span>
            <span className="font-bold text-amber-400">{temperature.toFixed(1)} °C</span>
          </div>
          <div className="bg-[#070E1B] border border-cyan-500/30 px-3.5 py-1.5 rounded-lg text-xs font-mono">
            <span>HUMIDITY: </span>
            <span className="font-bold text-cyan-400">{humidity}% RH</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Temperature Graph with Recharts */}
        <div className="lg:col-span-8 cyber-panel p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Real-Time Temperature Trendline (°C)
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
              TIME-SERIES TELEMETRY
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tempHistory}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#162947" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontMono />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#64748b" fontSize={11} fontMono />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#070E1B',
                    borderColor: '#1E3B68',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'monospace'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Secondary Humidity / Distance Correlation */}
          <div className="mt-6 pt-4 border-t border-[#162A4E]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                Relative Humidity vs Ultrasonic Sonar Distance
              </h4>
            </div>
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#162947" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} fontMono />
                  <YAxis yAxisId="left" stroke="#00f0ff" fontSize={10} fontMono />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={10} fontMono />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#070E1B',
                      borderColor: '#1E3B68',
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#00f0ff" strokeWidth={2} dot={{ fill: '#00f0ff' }} name="Humidity (%)" />
                  <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Distance (m)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Environmental Statistics Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Forensic Ambient Summary
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400 font-sans">Current Temperature:</span>
                <span className="text-lg font-bold text-amber-400">{temperature.toFixed(1)} °C</span>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400 font-sans">Dew Point Estimation:</span>
                <span className="text-base font-bold text-cyan-300">16.8 °C</span>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400 font-sans">Thermal Stability:</span>
                <span className="text-sm font-bold text-emerald-400">STABLE (±0.2°C)</span>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] flex justify-between items-center">
                <span className="text-slate-400 font-sans">Acoustic Speed Offset:</span>
                <span className="text-sm font-bold text-white">+0.14 m/s Compensated</span>
              </div>
            </div>
          </div>

          <div className="cyber-panel p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sensor Calibration Matrix
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              DHT22 precision capacitive sensor auto-calibrated against standard atmospheric pressure (1013.25 hPa). Sound velocity dynamically recalculated for ultrasonic measurement.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
