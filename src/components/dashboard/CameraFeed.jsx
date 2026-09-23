import React, { useRef, useState } from 'react';
import {
  Camera,
  Maximize2,
  CircleDot,
  Layers,
  Sparkles,
  Eye,
  Crosshair,
  CheckCircle
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const CameraFeed = () => {
  const {
    streamUrl,
    cameraFilter,
    setCameraFilter,
    isRecording,
    setIsRecording,
    recordTime,
    captureEvidence,
    detectedObject
  } = useForensic();

  const [flash, setFlash] = useState(false);
  const [showAiBoxes, setShowAiBoxes] = useState(true);

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    captureEvidence({
      description: `ESP32-CAM Snapshot (${detectedObject.name})`,
      type: 'Image',
      tag: 'Camera Capture'
    });
  };

  const formatRecordTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filter classes
  const getFilterStyle = () => {
    switch (cameraFilter) {
      case 'night':
        return 'brightness(1.2) contrast(1.4) hue-rotate(85deg) saturate(1.8)';
      case 'thermal':
        return 'invert(1) hue-rotate(180deg) saturate(3) contrast(1.5)';
      case 'edge':
        return 'contrast(2) invert(0.8) grayscale(1)';
      default:
        return 'none';
    }
  };

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            ESP32-CAM Live Feed
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* Video Stream Container */}
      <div className="relative my-2 w-full h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden bg-black border border-[#1C3660] group shadow-inner">
        {/* Flash animation */}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none"></div>
        )}

        {/* Live Video / Mock Image */}
        <img
          src={crimeSceneImg}
          alt="ESP32-CAM Stream"
          style={{ filter: getFilterStyle() }}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* HUD Crosshairs & Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70"></div>
          
          {/* Center Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Crosshair className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        {/* AI Bounding Box (Over Crime Scene Textbook) */}
        {showAiBoxes && (
          <div className="absolute top-[28%] left-[28%] w-[44%] h-[46%] border-2 border-cyan-400 rounded bg-cyan-400/10 pointer-events-none transition-all duration-300">
            <div className="absolute -top-6 left-0 bg-cyan-500 text-black px-1.5 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>{detectedObject.name} [{detectedObject.confidence}%]</span>
            </div>
          </div>
        )}

        {/* Top Stream Overlay Info */}
        <div className="absolute top-2 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>FPS: 30.2</span>
          <span>|</span>
          <span>720p HD</span>
        </div>

        {/* Active Recording Indicator */}
        {isRecording && (
          <div className="absolute top-2 right-3 flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/50 px-2.5 py-0.5 rounded text-[10px] font-mono text-rose-300 animate-pulse">
            <CircleDot className="w-3 h-3 text-rose-500" />
            <span>REC {formatRecordTime(recordTime)}</span>
          </div>
        )}
      </div>

      {/* Stream Controls & Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs pt-1 border-t border-[#162A4E]">
        {/* Stream URL IP Display */}
        <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="text-cyan-400">IP:</span>
          <span className="bg-[#0C172C] px-2 py-0.5 rounded border border-[#1A345E] text-slate-200">
            {streamUrl.replace('http://', '')}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Filter cycle */}
          <button
            onClick={() => {
              const filters = ['none', 'night', 'thermal', 'edge'];
              const next = filters[(filters.indexOf(cameraFilter) + 1) % filters.length];
              setCameraFilter(next);
            }}
            className="px-2.5 py-1 rounded bg-[#0C1930] hover:bg-[#152B52] border border-[#1E3B68] text-[11px] font-medium text-cyan-300 flex items-center gap-1 transition-colors"
            title="Cycle Vision Filters (Normal, Night Vision, Thermal, Edge)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="capitalize">{cameraFilter}</span>
          </button>

          {/* Capture Snapshot */}
          <button
            onClick={handleCapture}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-[0_0_10px_rgba(30,96,213,0.4)] transition-all active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Capture</span>
          </button>

          {/* Record Video */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-3 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-all active:scale-95 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                : 'bg-[#0C1930] hover:bg-[#162E58] border border-[#1E3B68] text-rose-400'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>{isRecording ? 'Stop Rec' : 'Record'}</span>
          </button>

          {/* AI Box Toggle */}
          <button
            onClick={() => setShowAiBoxes(!showAiBoxes)}
            className={`p-1 rounded border transition-colors ${
              showAiBoxes
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400'
                : 'bg-[#0C1930] border-[#1E3B68] text-slate-400'
            }`}
            title="Toggle AI Detection Bounding Boxes"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
