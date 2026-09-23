import React from 'react';
import {
  LayoutDashboard,
  Video,
  Radar,
  ScanSearch,
  MapPin,
  Thermometer,
  FileSpreadsheet,
  BookOpen,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import hologramImg from '../../assets/hologram_scanner.jpg';

export const Sidebar = () => {
  const { activeView, setActiveView } = useForensic();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-feed', label: 'Live Feed', icon: Video },
    { id: 'scan-measure', label: 'Scan & Measure', icon: Radar },
    { id: 'object-detection', label: 'Object Detection', icon: ScanSearch },
    { id: 'location-tracking', label: 'Location Tracking', icon: MapPin },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'evidence-log', label: 'Evidence Log', icon: FileSpreadsheet },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#070D19] border-r border-[#152745] flex flex-col justify-between shrink-0 select-none">
      {/* Navigation List */}
      <div className="p-3 space-y-1.5">
        <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
          <span>Main Navigation</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.35)] translate-x-1'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-[#0E1A33]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Futuristic Holographic Human Scanner Box */}
      <div className="p-3 m-3 bg-[#0A1428] rounded-xl border border-[#18315B] relative overflow-hidden group shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D19] via-transparent to-transparent z-10"></div>
        
        {/* Hologram scan animation line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 animate-pulse-slow"></div>

        <div className="relative z-0 h-44 w-full flex items-center justify-center overflow-hidden rounded-lg">
          <img
            src={hologramImg}
            alt="Forensic Body Scanner Hologram"
            className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 filter contrast-125"
          />
        </div>

        <div className="relative z-20 mt-2 text-center">
          <p className="text-[11px] font-bold text-cyan-300 tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            For a Safer and Smarter
          </p>
          <p className="text-[10px] font-semibold text-slate-300 tracking-wide">
            Investigation
          </p>
        </div>
      </div>
    </aside>
  );
};
