# 🛡️ Intelligent Searching Scanning Scope
### Portable AI-Assisted Forensic Scanning Dashboard

A state-of-the-art cyber-forensic operational dashboard built with **React 18**, **Tailwind CSS**, **Lucide Icons**, **Recharts**, and **Leaflet**. Designed for field forensic investigators (deployed with Investigator Indresh Kumar, Bundelkhand University, Jhansi).

---

## 🌟 Key Features

1. **Investigator Authentication & Access Control**
   - Cryptographic RFID & NFC UID verification (Level 4 Tactical Clearance).
   - AES-256 data encryption and tamper-proof session locking.

2. **ESP32-CAM High-Definition Live Feed**
   - Real-time MJPEG live camera stream connector (`http://192.168.1.105:81/stream`).
   - Integrated Night Vision (IR), Thermal False-Color, and Sobel Edge Detection vision filters.
   - High-resolution snapshot capture and MP4 evidence recording timer.

3. **180° Panoramic Sonar & Radar Scope**
   - 40 kHz ultrasonic obstacle and distance profiling (HC-SR04).
   - SG90 micro-servo continuous 180° sweeping with live angular telemetry and acoustic echo blip tracking.

4. **AI YOLOv8 Object & Human Presence Detection**
   - Real-time computer vision bounding box localized classification (e.g. Crime Scene Management books, electronic breadboards, gear bags).
   - Thermal/PIR human presence silhouette detection with confidence scoring.

5. **GNSS Real-Time Location Tracking**
   - Leaflet interactive satellite & dark cybernetic mapping centered at Bundelkhand University, Jhansi (25.4531° N, 78.5695° E).
   - Dynamic 50m forensic crime scene perimeter geo-fencing.

6. **Environmental Telemetry & Dynamic Graphs**
   - DHT22 ambient thermometry (-10°C to +50°C calibrated scale) and relative humidity monitoring.
   - Interactive time-series telemetry charts powered by Recharts.
   - Dynamic acoustic sound speed compensation.

7. **Cryptographic Digital Evidence Locker**
   - Searchable, filterable evidence database with SHA-256 hash digests.
   - 8-stage operational workflow pipeline (Authenticate ➔ Activate ➔ Scan ➔ Measure ➔ Detect ➔ Identify ➔ Monitor ➔ Document).
   - 1-Click **"Print Report"** generating official legal forensic crime scene summary sheets.

---

## 🔌 Hardware Wiring & Pinout Guide

| Module | Sensor Pin | ESP32 GPIO Pin | Operating Voltage |
| :--- | :--- | :--- | :--- |
| **HC-SR04 Sonar** | `TRIG` / `ECHO` | `GPIO 12` / `GPIO 13` | 5.0 V |
| **SG90 Micro Servo** | `PWM` | `GPIO 14` | 5.0 V |
| **NEO-6M GPS** | `TX` / `RX` | `GPIO 16` / `GPIO 17` | 3.3 V |
| **DHT22 Sensor** | `DATA` (4.7kΩ Pull-up) | `GPIO 4` | 3.3 V |
| **RC522 RFID** | `SDA`, `SCK`, `MOSI` | `GPIO 21`, `GPIO 22`, `GPIO 19` | 3.3 V |
| **OV2640 Camera** | `Camera Bus` | Direct Camera Ribbon Port | 3.3 V |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── assets/                  # Generated crime scene setup & holographic scanner assets
├── components/
│   ├── dashboard/           # Master HUD cards (Radar, Auth, Sonar, AI, Location, Temp, etc.)
│   ├── layout/              # Header with live HUD clock, Sidebar with hologram, Footer
│   ├── modals/              # Add Evidence, Evidence Inspector, and Printable Forensic Report
│   └── views/               # Sub-pages (Live Feed, Sonar Radar, AI Vision, GPS GIS, Analytics)
├── context/
│   └── ForensicContext.jsx  # Central state management & live telemetry simulation engine
├── utils/
│   └── mockData.js          # Reference datasets, logs, and initial state
├── App.jsx                  # Root assembly
├── index.css                # Global cybernetic styles and Tailwind layers
└── main.jsx                 # Vite entrypoint
```

---

## ⚖️ License & Credits
Developed for **Forensic Patrika** & **Bundelkhand University, Jhansi**.  
Lead Investigator: **Indresh Kumar (IK-001)**.
