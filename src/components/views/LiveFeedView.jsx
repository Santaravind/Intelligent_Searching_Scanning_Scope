import React, { useState, useRef } from 'react';
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
  Wifi,
  WifiOff
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const LiveFeedView = () => {
  const {
    streamUrl,
    setStreamUrl,
    cameraSource,
    setCameraSource,
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
  const [streamError, setStreamError] = useState(false);
  const [streamKey, setStreamKey] = useState(Date.now());
  const imgRef = useRef(null);

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

  const isLiveEsp = cameraSource === 'esp32';
  const displaySrc = isLiveEsp && !streamError ? `${streamUrl}?t=${streamKey}` : crimeSceneImg;

  const handleCapture = () => {
    let capturedDataUrl = crimeSceneImg;
    try {
      if (imgRef.current && imgRef.current.naturalWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = imgRef.current.naturalWidth || 1280;
        canvas.height = imgRef.current.naturalHeight || 720;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0);
        capturedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      }
    } catch (e) {
      capturedDataUrl = crimeSceneImg;
    }

    captureEvidence({
      description: `ESP32-CAM High-Res Frame Snapshot (${detectedObject.name})`,
      type: 'Image',
      tag: isLiveEsp ? 'Live IP Snapshot' : 'HD Frame Capture',
      customImage: capturedDataUrl
    });
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
          {/* Source Toggle */}
          <div className="flex bg-[#070E1B] p-0.5 rounded-lg border border-[#1A3866] text-xs font-mono">
            <button
              onClick={() => {
                setCameraSource('esp32');
                setStreamError(false);
                setStreamKey(Date.now());
              }}
              className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
                isLiveEsp && !streamError
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Live ESP32</span>
            </button>
            <button
              onClick={() => {
                setCameraSource('mock');
                setStreamError(false);
              }}
              className={`px-3 py-1 rounded transition-all ${
                !isLiveEsp || streamError
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Demo Feed</span>
            </button>
          </div>

          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="http://10.97.56.183:81/stream"
            className="bg-[#070E1B] border border-[#1A3866] text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-mono w-60 focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={() => {
              setStreamError(false);
              setStreamKey(Date.now());
              setCameraSource('esp32');
              addLog(`ESP32-CAM stream reconnected to: ${streamUrl}`, 'success');
            }}
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
                ref={imgRef}
                src={displaySrc}
                alt="Live Camera Feed"
                crossOrigin="anonymous"
                onError={() => {
                  if (isLiveEsp) setStreamError(true);
                }}
                style={{ filter: getFilterStyle() }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Offline notification if stream fails */}
            {isLiveEsp && streamError && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
                <WifiOff className="w-10 h-10 text-amber-400 mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">
                  ESP32 Live Stream Not Connected
                </h3>
                <p className="text-xs font-mono text-cyan-300 mb-3 bg-[#070E1B] px-3 py-1 rounded border border-[#1A3866]">
                  Target: {streamUrl}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStreamError(false);
                      setStreamKey(Date.now());
                    }}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded"
                  >
                    Retry IP Connection
                  </button>
                  <button
                    onClick={() => setCameraSource('mock')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-600"
                  >
                    Switch to Demo Stream
                  </button>
                </div>
              </div>
            )}

            {/* Futuristic HUD Overlay */}
            {showHud && !streamError && (
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                {/* Top HUD Row */}
                <div className="flex justify-between items-center">
                  <div className="bg-black/70 px-2.5 py-1 rounded border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{isLiveEsp ? 'ESP32 REAL-TIME STREAM' : 'DEMO LAB FEED'} [30 FPS]</span>
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
                    <span>{detectedObject.name} ({detectedObject.confidence}% AI)</span>
                  </div>
                </div>

                {/* Bottom HUD Row */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-1 rounded">
                  <span>STREAM: {streamUrl.replace('http://', '')}</span>
                  <span>MODE: MJPEG REAL-TIME</span>
                  <span>AI: YOLOv8</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Capture / Record Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-[#162A4E]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCapture}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(30,96,213,0.4)] active:scale-95"
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
