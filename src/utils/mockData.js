export const INITIAL_INVESTIGATOR = {
  id: "IK-001",
  name: "Indresh Kumar",
  role: "Lead Forensic Investigator",
  affiliation: "Bundelkhand University, Jhansi",
  rfidUid: "A3 8F 9C 44",
  status: "AUTHORIZED",
  accessTime: "21-09-2026 21:42:18",
  clearanceLevel: "Level 4 - Tactical Field Analysis",
};

export const INITIAL_EVIDENCE_LIST = [
  {
    id: "EV-001",
    index: "001",
    type: "Image",
    description: "Evidence Marker (2) & Lab Hardware",
    time: "21:43:12",
    object: "Book / Bag (Nearby)",
    distance: "2.46 m",
    angle: "124°",
    confidence: "92.4%",
    category: "Education Material",
    tag: "Primary Evidence",
    hash: "sha256:8f4c2e8a719d3b10...e42",
    location: "Bundelkhand University Lab, Jhansi",
  },
  {
    id: "EV-002",
    index: "002",
    type: "Image",
    description: "Bag / Backpack Scan",
    time: "21:41:56",
    object: "Backpack / Nylon Gear",
    distance: "1.82 m",
    angle: "85°",
    confidence: "88.7%",
    category: "Personal Item",
    tag: "Secondary Evidence",
    hash: "sha256:3a91bf12d4808c19...9b7",
    location: "Bundelkhand University Lab, Jhansi",
  },
  {
    id: "EV-003",
    index: "003",
    type: "Note",
    description: "Room - Floor Area Ambient Scan",
    time: "21:40:33",
    object: "Perimeter Sweep Completed",
    distance: "4.10 m",
    angle: "172°",
    confidence: "99.1%",
    category: "Perimeter Survey",
    tag: "Field Note",
    hash: "sha256:0d2c771fae81b29a...110",
    location: "Bundelkhand University Lab, Jhansi",
  },
  {
    id: "EV-004",
    index: "004",
    type: "Telemetry",
    description: "Ultrasonic 180° Sonar Sweep Grid Log",
    time: "21:38:15",
    object: "Obstacle Profile Matrix",
    distance: "2.46 m",
    angle: "124°",
    confidence: "95.0%",
    category: "Sonar Telemetry",
    tag: "Telemetry",
    hash: "sha256:5e661c920bf012ea...761",
    location: "Bundelkhand University Lab, Jhansi",
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  { time: "21:45:32", text: "Live feed started", type: "success" },
  { time: "21:43:12", text: "Image captured (Evidence Marker #001)", type: "info" },
  { time: "21:41:56", text: "AI object identified (Book / Bag)", type: "success" },
  { time: "21:40:12", text: "RFID authentication successful (IK-001)", type: "success" },
  { time: "21:38:45", text: "180° Sonar sweeping calibrated (40kHz)", type: "info" },
  { time: "21:37:10", text: "GPS coordinates locked: 25.4531° N, 78.5695° E", type: "info" },
  { time: "21:35:00", text: "System Boot completed. All micro-modules active.", type: "system" },
];

export const OPERATIONAL_SEQUENCE = [
  { id: "01", name: "Authenticate", icon: "Lock", desc: "RFID & Biometric Handshake", status: "completed" },
  { id: "02", name: "Activate", icon: "Radio", desc: "Sensors & ESP32-CAM Boot", status: "completed" },
  { id: "03", name: "Scan", icon: "Wifi", desc: "180° Panoramic Sweep", status: "active" },
  { id: "04", name: "Measure", icon: "Maximize2", desc: "40kHz Ultrasonic Sonar", status: "active" },
  { id: "05", name: "Detect", icon: "UserCheck", desc: "Thermal & Human Presence", status: "idle" },
  { id: "06", name: "Identify", icon: "ScanSearch", desc: "AI YOLO Classification", status: "active" },
  { id: "07", name: "Monitor", icon: "Thermometer", desc: "Environmental DHT22", status: "active" },
  { id: "08", name: "Document", icon: "FileText", desc: "Cryptographic Chain of Custody", status: "pending" },
];

export const INITIAL_TEMPERATURE_HISTORY = [
  { time: "21:30", temp: 26.8, humidity: 54, distance: 2.1 },
  { time: "21:32", temp: 27.0, humidity: 53, distance: 2.3 },
  { time: "21:35", temp: 27.2, humidity: 55, distance: 2.5 },
  { time: "21:38", temp: 27.1, humidity: 54, distance: 2.4 },
  { time: "21:40", temp: 27.3, humidity: 52, distance: 2.45 },
  { time: "21:42", temp: 27.5, humidity: 53, distance: 2.48 },
  { time: "21:45", temp: 27.4, humidity: 52, distance: 2.46 },
];

export const RADAR_BLIPS = [
  { angle: 45, distance: 3.2, label: "Perimeter Wall" },
  { angle: 85, distance: 1.82, label: "Object (Bag)" },
  { angle: 124, distance: 2.46, label: "Target (Evidence #001)" },
  { angle: 160, distance: 4.05, label: "Doorway" },
];
