import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Signal, Compass, Globe } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const LocationCard = () => {
  const { location } = useForensic();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Real-Time Location
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <span className="text-[10px] font-mono text-slate-300">GPS</span>
          <Signal className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center my-auto py-2">
        {/* Map Preview Window */}
        <div className="sm:col-span-7 relative h-32 rounded-lg overflow-hidden border border-[#1A3763] bg-[#071120] group shadow-inner">
          {/* Simulated Satellite Map Texture */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(16, 185, 129, 0.15), transparent 70%), 
              linear-gradient(rgba(10, 20, 38, 0.65), rgba(7, 14, 28, 0.85)),
              repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(30, 96, 213, 0.15) 15px, rgba(30, 96, 213, 0.15) 16px),
              repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(30, 96, 213, 0.15) 15px, rgba(30, 96, 213, 0.15) 16px)`
            }}
          ></div>

          {/* Compass Rose icon in corner */}
          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          {/* Glowing Pin Marker at Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              {/* Ripple circles */}
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 animate-ping absolute"></div>
              <div className="w-6 h-6 rounded-full bg-blue-500/40 border border-cyan-400/80 absolute"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* Bottom tag */}
          <div className="absolute bottom-1 left-2 text-[9px] font-mono text-cyan-300/80 bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/20">
            Jhansi Campus Grid #04
          </div>
        </div>

        {/* GPS Coordinates readout */}
        <div className="sm:col-span-5 space-y-2 text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-400 font-sans uppercase">Latitude</div>
            <div className="font-bold text-white tracking-wider text-sm">{location.latitude}° N</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 font-sans uppercase">Longitude</div>
            <div className="font-bold text-white tracking-wider text-sm">{location.longitude}° E</div>
          </div>

          <div className="border-t border-[#162A4E] pt-1.5 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-sans">Accuracy</span>
            <span className="font-bold text-emerald-400">± {location.accuracy} m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
