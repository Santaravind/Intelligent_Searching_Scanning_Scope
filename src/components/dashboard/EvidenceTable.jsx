import React from 'react';
import {
  FileText,
  Camera,
  Save,
  PlusCircle,
  Eye,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const EvidenceTable = () => {
  const {
    evidenceList,
    setIsAddEvidenceOpen,
    setSelectedEvidence,
    captureEvidence
  } = useForensic();

  const handleCapturePhoto = () => {
    captureEvidence({
      description: 'Quick Capture (Field Camera)',
      type: 'Image',
      tag: 'Field Photo'
    });
  };

  const handleSaveRecord = () => {
    captureEvidence({
      description: 'Cryptographic Snapshot Saved',
      type: 'Record',
      tag: 'Vault Backup'
    });
  };

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Evidence / Digital Documentation
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-[#0B1A33] px-2 py-0.5 rounded border border-[#1A3763]">
          <FileCheck className="w-3 h-3 text-emerald-400" />
          <span>{evidenceList.length} ITEMS LOGGED</span>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="my-2 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1A335E] text-slate-400 font-mono text-[11px]">
              <th className="py-1.5 px-2">#</th>
              <th className="py-1.5 px-2">Type</th>
              <th className="py-1.5 px-2">Description</th>
              <th className="py-1.5 px-2 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#132646] font-mono">
            {evidenceList.slice(0, 3).map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedEvidence(item)}
                className="hover:bg-[#112447] cursor-pointer transition-colors group"
              >
                <td className="py-2 px-2 text-cyan-400 font-bold">{item.index}</td>
                <td className="py-2 px-2 text-slate-300 font-sans">{item.type}</td>
                <td className="py-2 px-2 text-slate-200 font-sans truncate max-w-[150px] group-hover:text-cyan-300">
                  {item.description}
                </td>
                <td className="py-2 px-2 text-right text-slate-400">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons: Capture Photo, Save Record, Add Observation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#162A4E]">
        <button
          onClick={handleCapturePhoto}
          className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(30,96,213,0.4)] transition-all active:scale-95"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Capture Photo</span>
        </button>

        <button
          onClick={handleSaveRecord}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all active:scale-95"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Record</span>
        </button>

        <button
          onClick={() => setIsAddEvidenceOpen(true)}
          className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(139,92,246,0.4)] transition-all active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Observation</span>
        </button>
      </div>
    </div>
  );
};
