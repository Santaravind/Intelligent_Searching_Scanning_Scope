import React from 'react';
import {
  BookOpen,
  Cpu,
  Radio,
  Navigation,
  Thermometer,
  Shield,
  Layers,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';

export const DocumentationView = () => {
  return (
    <div className="space-y-6 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none text-slate-200">
      
      {/* Header */}
      <div className="bg-[#0A1428] p-5 rounded-xl border border-[#172E54]">
        <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          Intelligent Searching Scanning Scope - Technical System Documentation
        </h2>
        <p className="text-xs text-cyan-300/90 mt-1">
          Forensic Hardware Architecture, Sensor Pinout Mapping, AI YOLO Pipeline & Operating Manual
        </p>
      </div>

      {/* Grid of Docs Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hardware Architecture */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            1. Hardware Component Architecture
          </h3>

          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              The <strong>Intelligent Searching Scanning Scope</strong> is a portable, edge-computing forensic reconnaissance unit built around an ESP32 microcontroller with an OV2640 camera sensor. It provides wireless MJPEG video streaming, 180° acoustic radar ranging, environmental logging, and biometric verification.
            </p>

            <div className="bg-[#070E1B] p-3 rounded-lg border border-[#162A4E] space-y-2 font-mono text-[11px]">
              <div className="text-cyan-400 font-bold font-sans text-xs">Core Modules:</div>
              <div>• <strong>Main Microcontroller:</strong> ESP32-WROVER (4MB PSRAM, Dual-Core 240MHz)</div>
              <div>• <strong>Optical Sensor:</strong> OV2640 2-Megapixel Camera with 120° Wide-Angle Lens</div>
              <div>• <strong>Sonar Ranging:</strong> HC-SR04 Ultrasonic Transducer (40 kHz, 2cm - 450cm)</div>
              <div>• <strong>Panning Actuator:</strong> SG90 Micro Servo (180° Panoramic Sweep)</div>
              <div>• <strong>GNSS Geolocation:</strong> U-blox NEO-6M GPS Receiver (±3m CEP Accuracy)</div>
              <div>• <strong>Environmental Sensor:</strong> DHT22 Digital Temperature & Humidity Sensor</div>
              <div>• <strong>Investigator Auth:</strong> RC522 13.56 MHz RFID / NFC Transponder</div>
            </div>
          </div>
        </div>

        {/* Pinout Wiring Mapping Table */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            2. ESP32 GPIO Pinout & Connection Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E3B68] text-cyan-300 text-[11px]">
                  <th className="py-2 px-2">Module</th>
                  <th className="py-2 px-2">Pin Name</th>
                  <th className="py-2 px-2">ESP32 GPIO</th>
                  <th className="py-2 px-2">Voltage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132646] text-slate-300 text-[11px]">
                <tr>
                  <td className="py-1.5 px-2 font-bold text-white">HC-SR04 Sonar</td>
                  <td className="py-1.5 px-2">TRIG / ECHO</td>
                  <td className="py-1.5 px-2 text-cyan-400">GPIO 12 / GPIO 13</td>
                  <td className="py-1.5 px-2">5.0 V</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-white">SG90 Servo</td>
                  <td className="py-1.5 px-2">PWM Signal</td>
                  <td className="py-1.5 px-2 text-cyan-400">GPIO 14</td>
                  <td className="py-1.5 px-2">5.0 V</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-white">NEO-6M GPS</td>
                  <td className="py-1.5 px-2">TX / RX</td>
                  <td className="py-1.5 px-2 text-cyan-400">GPIO 16 / GPIO 17</td>
                  <td className="py-1.5 px-2">3.3 V</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-white">DHT22 Temp</td>
                  <td className="py-1.5 px-2">DATA (Pull-up)</td>
                  <td className="py-1.5 px-2 text-cyan-400">GPIO 4</td>
                  <td className="py-1.5 px-2">3.3 V</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-bold text-white">RC522 RFID</td>
                  <td className="py-1.5 px-2">SPI (SDA, SCK, MOSI)</td>
                  <td className="py-1.5 px-2 text-cyan-400">GPIO 21, 22, 19</td>
                  <td className="py-1.5 px-2">3.3 V</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational 8-Stage Procedure */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            3. Standard Forensic Operational Protocol
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">01. Authenticate:</span>
              <span className="text-slate-300">Tap authorized RFID investigator card (IK-001) to unlock operational security locks.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">02. Activate:</span>
              <span className="text-slate-300">Initiate local Wi-Fi Hotspot or connect to secure lab mesh network.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">03. 180° Scan:</span>
              <span className="text-slate-300">Servo executes continuous 0° to 180° sweeps for volumetric spatial profiling.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">04. Sonar Measure:</span>
              <span className="text-slate-300">Ultrasonic pulses calculate obstacle distance and room footprint.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">05. AI Detection:</span>
              <span className="text-slate-300">Neural network localizes evidence, books, weapons, tools, and human thermal signatures.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-mono font-bold text-cyan-400">06. Digital Chain:</span>
              <span className="text-slate-300">Snapshots are cryptographically signed with SHA-256 and GPS stamped.</span>
            </div>
          </div>
        </div>

        {/* API & Firmware Reference */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            4. Firmware HTTP Endpoints & Stream API
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="bg-[#070E1B] p-2.5 rounded border border-[#162A4E]">
              <span className="text-emerald-400 font-bold">GET</span> /stream
              <span className="text-slate-400 font-sans block text-[11px] mt-0.5">MJPEG continuous live camera feed stream (Port 81)</span>
            </div>

            <div className="bg-[#070E1B] p-2.5 rounded border border-[#162A4E]">
              <span className="text-emerald-400 font-bold">GET</span> /capture
              <span className="text-slate-400 font-sans block text-[11px] mt-0.5">Single high-resolution JPEG frame capture</span>
            </div>

            <div className="bg-[#070E1B] p-2.5 rounded border border-[#162A4E]">
              <span className="text-blue-400 font-bold">GET</span> /telemetry
              <span className="text-slate-400 font-sans block text-[11px] mt-0.5">JSON packet with current angle, sonar distance, temp, and GPS</span>
            </div>

            <div className="bg-[#070E1B] p-2.5 rounded border border-[#162A4E]">
              <span className="text-purple-400 font-bold">POST</span> /servo?angle=124
              <span className="text-slate-400 font-sans block text-[11px] mt-0.5">Direct pan control to specified angle (0-180)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
