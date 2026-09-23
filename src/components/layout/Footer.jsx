import React from 'react';
import { User, MapPin, Printer, ShieldCheck } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const Footer = () => {
  const { investigator, location, setIsPrintReportOpen } = useForensic();

  return (
    <footer className="w-full bg-[#060D1A] border-t border-[#152745] px-4 lg:px-6 py-2.5 text-xs text-slate-300 select-none">
      <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Investigator Name & Location Metadata */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-400">Name:</span>
            <span className="font-bold text-white tracking-wide">{investigator.name}</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-[#1E3B68]"></div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-400">Location:</span>
            <span className="font-medium text-slate-200">{location.name}</span>
          </div>
        </div>

        {/* Action Button: Print Report */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Forensic Audit Ready</span>
          </div>

          <button
            onClick={() => setIsPrintReportOpen(true)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_15px_rgba(30,96,213,0.5)] transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
