import React, { useState } from 'react';
import {
  Camera,
  Video,
  CircleDot,
  Layers,
  Sparkles,
  Sliders,
  Maximize2,
  RefreshCw,
  Sun,
  Eye,
  Crosshair,
  Volume2
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const LiveFeedView = () => {
  const {
    streamUrl,
    setStreamUrl,
    cameraFilter,
    setCameraFilter,
    isRecording,
    setIsRecording,
    recordTime,
    captureEvidence,
    detectedObject,
    scanAngle,
    setScanAngle,
    addLog
  } = useForensic();

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [showHud, setShowHud] = useState(true);

  const filterOptions = [
    { id: 'none', label: 'Standard RGB' },
    { id: 'night', label: 'Night Vision (IR)' },
    { id: 'thermal', label: 'Thermal False-Color' },
    { id: 'edge', label: 'Sobel Edge Detect' },
  ];

  const getFilterStyle = () => {
    let base = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (cameraFilter === 'night') base += ' hue-rotate(85deg) saturate(1.8)';
    if (cameraFilter === 'thermal') base += ' invert(1) hue-rotate(180deg) saturate(3)';
    if (cameraFilter === 'edge') base += ' invert(0.8) grayscale(1)';
    return base;
  };

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            ESP32-CAM Forensic High-Definition Laboratory
          </h2>
          <p className="text-xs text-slate-400">
            Real-time MJPEG Stream, PTZ Servo angle control, and AI computer vision processing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="http://192.168.1.105:81/stream"
            className="bg-[#070E1B] border border-[#1A3866] text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-mono w-60 focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={() => addLog(`ESP32-CAM stream reconnected to: ${streamUrl}`, 'success')}
            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
            title="Reconnect Stream"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Stream Area & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Stream Canvas Viewport */}
        <div className="lg:col-span-8 cyber-panel p-4 flex flex-col justify-between">
          <div className="relative w-full h-80 sm:h-[420px] rounded-xl overflow-hidden bg-black border border-[#1A3866] flex items-center justify-center">
            
            {/* Live Camera Feed */}
            <div
              className="w-full h-full overflow-hidden flex items-center justify-center transition-all duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              <img
                src={crimeSceneImg}
                alt="Live Camera Feed"
                style={{ filter: getFilterStyle() }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Futuristic HUD Overlay */}
            {showHud && (
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                {/* Top HUD Row */}
                <div className="flex justify-between items-center">
                  <div className="bg-black/70 px-2.5 py-1 rounded border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>ESP32-CAM LIVE [1080p @ 30FPS]</span>
                  </div>

                  <div className="bg-black/70 px-2.5 py-1 rounded border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    SERVO PAN: {scanAngle}°
                  </div>
                </div>

                {/* Center Crosshair */}
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <Crosshair className="w-12 h-12 text-cyan-400/60" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 absolute"></div>
                  </div>
                </div>

                {/* AI Detected Object Box */}
                <div className="absolute top-[28%] left-[28%] w-[44%] h-[46%] border-2 border-cyan-400 bg-cyan-400/10 pointer-events-none">
                  <div className="absolute -top-7 left-0 bg-cyan-500 text-black px-2 py-0.5 text-xs font-bold rounded flex items-center gap-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{detectedObject.name} ({detectedObject.confidence}%)</span>
                  </div>
                </div>

                {/* Bottom HUD Row */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-1 rounded">
                  <span>ISO: AUTO (100)</span>
                  <span>SHUTTER: 1/120s</span>
                  <span>AI MODEL: YOLOv8-NANO</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Capture / Record Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-[#162A4E]">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  captureEvidence({
                    description: `ESP32-CAM High-Res Frame Snapshot`,
                    type: 'Image',
                    tag: 'High-Res Frame'
                  })
                }
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(30,96,213,0.4)]"
              >
                <Camera className="w-4 h-4" />
                <span>Capture High-Res</span>
              </button>

              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-[#0B1A33] text-rose-400 border border-[#1B3660] hover:bg-[#112447]'
                }`}
              >
                <CircleDot className="w-4 h-4" />
                <span>{isRecording ? `Recording (${recordTime}s)` : 'Start Recording'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHud(!showHud)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  showHud
                    ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Toggle HUD Overlays
              </button>
            </div>
          </div>
        </div>

        {/* Video Processing & PTZ Controls */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Vision Filters */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Vision Processing Filters
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {filterOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCameraFilter(f.id)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                    cameraFilter === f.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'bg-[#0A152A] border-[#162D52] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* PTZ Servo Sweep Control */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Servo Angle & Optical Adjustment
            </h3>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Servo Pan Angle</span>
                <span className="font-mono font-bold text-cyan-300">{scanAngle}°</span>
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

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Digital Zoom</span>
                <span className="font-mono font-bold text-cyan-300">{zoom}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Brightness</span>
                <span className="font-mono font-bold text-cyan-300">{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
