import React from 'react';
import { ScanSearch, Box } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const ObjectDetectCard = () => {
  const { detectedObject, lastCapturedImage } = useForensic();

  const objectName = (detectedObject.name && detectedObject.name.trim()) || "Target Object";
  const objectCategory = (detectedObject.category && detectedObject.category.trim()) || "Awaiting Scan";
  const thumbnailSrc = lastCapturedImage || crimeSceneImg;

  return (
    <div className="cyber-panel p-3.5 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2">
        <div className="flex items-center gap-1.5">
          <ScanSearch className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            AI Object Identification
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
          <Box className="w-3 h-3 text-cyan-400" />
          <span>YOLO-V8</span>
        </div>
      </div>

      {/* Main Identification Preview */}
      <div className="flex items-center gap-3 my-auto py-2">
        {/* Cropped thumbnail with bounding box graphic */}
        <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-cyan-500/50 shrink-0 bg-black shadow-[0_0_10px_rgba(0,240,255,0.2)]"> 
          <img
            src={thumbnailSrc}
            alt="Identified Subject"
            className="w-full h-full object-cover object-center"
          /> 
          {/* Cyber tag overlay  */}
          <div className="absolute inset-0 border border-cyan-400/80 pointer-events-none"></div>
          {lastCapturedImage && (
            <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] text-cyan-300 font-mono text-center py-0.5 font-bold">
              LIVE FRAME
            </div>
          )}
        </div>  

        {/* Object Label & Class */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-black text-white truncate drop-shadow-sm">
            {objectName}
          </div>
          <div className="text-[11px] font-medium text-cyan-400 truncate">
            {objectCategory}
          </div>
        </div>
      </div>

      {/* Confidence and Category Footer */}
      <div className="space-y-1 text-xs font-mono border-t border-[#162A4E] pt-1.5 text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Confidence</span>
          <span className="font-bold text-cyan-300">: {detectedObject.confidence}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Category</span>
          <span className="font-medium text-slate-200 truncate">: {detectedObject.category}</span>
        </div>
      </div>
    </div>
  );
};
