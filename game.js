// ==========================================
// 🎵 2 SEPARATE BACKGROUND AUDIO TRACKS
// ==========================================
const menuBGM = new Audio("menu.mp3");
menuBGM.loop = true;
menuBGM.volume = 0.35;

const raceBGM = new Audio("race.mp3");
raceBGM.loop = true;
raceBGM.volume = 0.35;

let isMuted = false;

function playMenuMusic() {
  if (isMuted) return;
  raceBGM.pause();
  raceBGM.currentTime = 0;
  menuBGM.play().catch(err => console.log("Menu audio error:", err));
}

function playRaceMusic() {
  if (isMuted) return;
  menuBGM.pause();
  menuBGM.currentTime = 0;
  raceBGM.play().catch(err => console.log("Race audio error:", err));
}

function stopAllMusic() {
  menuBGM.pause();
  raceBGM.pause();
}

function toggleMute() {
  isMuted = !isMuted;
  menuBGM.muted = isMuted;
  raceBGM.muted = isMuted;
  const btnMute = document.getElementById("btnMute");
  if (btnMute) btnMute.textContent = isMuted ? "🔇" : "🔊";
}

// ==========================================
// 🏎️ F1 MACHINES & DRIVERS (REALISTIC 3D SPECS)
// ==========================================
const CARS = [
  {
    name: "Red Bull Racing RB20",
    driver: "Max Verstappen #1",
    team: "redbull",
    suitColor: 0x06153b,
    accentColor: 0xd91438,
    hairColor: 0x8b5a2b,
    capColor: 0x030d22,
    skinTone: 0xffdfc4,
    desc: "Superior aerodynamic balance built for fast and technical corners.",
    bodyColor: 0x030d22,
    wingColor: 0xd91438,
    sideColor: 0xfacc15,
    topSpeed: "320 km/h",
    accel: "2.4 s",
    handling: "94/100",
    speedPct: 92,
    accelPct: 90,
    handlingPct: 94,
    maxSpeed: 0.82,
    accelRate: 0.0055,
    turnRate: 0.048
  },
  {
    name: "Ferrari SF-24",
    driver: "Charles Leclerc #16",
    team: "ferrari",
    suitColor: 0xd40000,
    accentColor: 0xffffff,
    hairColor: 0x3d2314,
    capColor: 0xd40000,
    skinTone: 0xffdfc4,
    desc: "Rapid acceleration and sharp responsiveness on corner exits.",
    bodyColor: 0xd40000,
    wingColor: 0x111111,
    sideColor: 0xffffff,
    topSpeed: "315 km/h",
    accel: "2.2 s",
    handling: "96/100",
    speedPct: 88,
    accelPct: 96,
    handlingPct: 96,
    maxSpeed: 0.80,
    accelRate: 0.0068,
    turnRate: 0.050
  },
  {
    name: "Mercedes-AMG W15",
    driver: "George Russell #63",
    team: "mercedes",
    suitColor: 0x181e24,
    accentColor: 0x00d2be,
    hairColor: 0x4a2e18,
    capColor: 0x00d2be,
    skinTone: 0xffdfc4,
    desc: "Smooth steering response with outstanding high-speed stability.",
    bodyColor: 0xa0a5aa,
    wingColor: 0x111111,
    sideColor: 0x00d2be,
    topSpeed: "318 km/h",
    accel: "2.3 s",
    handling: "98/100",
    speedPct: 90,
    accelPct: 92,
    handlingPct: 98,
    maxSpeed: 0.81,
    accelRate: 0.0060,
    turnRate: 0.052
  }
];

// ==========================================
// 🏁 LEVEL CONFIGURATIONS
// ==========================================
const LEVELS = [
  {
    id: 1,
    name: "MONZA GP (DAY - MORNING)",
    type: "monza",
    skyColor: 0x93c5fd,
    fogColor: 0xbfdbfe,
    roadColor: 0x1e242d,
    grassColor: 0x2e7d32,
    buildingColor: 0x64748b,
    distance: 3000,
    curvePower: 0.00035,
    aiSpeedBonus: 0,
    ambientLight: 1.0,
    sunLight: 1.3,
    isRain: false,
    hasFences: false,
    hasSakura: false,
    hasJapanFlags: false,
    hasStreetLights: false,
    gripMultiplier: 1.0
  },
  {
    id: 2,
    name: "SUZUKA GP (WET / RAIN)",
    type: "suzuka",
    skyColor: 0x475569,
    fogColor: 0x334155,
    roadColor: 0x111419,
    grassColor: 0x1b4332,
    buildingColor: 0x334155,
    distance: 4000,
    curvePower: 0.00055,
    aiSpeedBonus: 0.02,
    ambientLight: 0.55,
    sunLight: 0.6,
    isRain: true,
    hasFences: false,
    hasSakura: true,
    hasJapanFlags: true,
    hasStreetLights: false,
    gripMultiplier: 0.72
  },
  {
    id: 3,
    name: "SINGAPORE NIGHT GP",
    type: "singapore",
    skyColor: 0x05070e,
    fogColor: 0x0a0f1d,
    roadColor: 0x0f141c,
    grassColor: 0x062013,
    buildingColor: 0x1e1b4b,
    distance: 5000,
    curvePower: 0.00075,
    aiSpeedBonus: 0.06,
    ambientLight: 0.45,
    sunLight: 0.5,
    isRain: false,
    hasFences: true,
    hasSakura: false,
    hasJapanFlags: true,
    hasStreetLights: true,
    gripMultiplier: 1.0
  }
];

// ==========================================
// 📚 BANK SOALAN PERAKAUNAN RAWAK (ENGLISH POOL)
// ==========================================
const PITSTOP_QUIZ_POOLS = {
  // Pit Stop Selepas Monza GP -> Menuju ke Suzuka GP
  1: [
    {
      category: "AUDIT & INTERNAL CONTROL",
      question: "In external auditing, what is the primary objective of performing a 'Test of Controls'?",
      options: [
        { text: "A. To prepare complete financial statements for team management.", correct: false },
        { text: "B. To evaluate the operating effectiveness of controls in preventing material misstatements.", correct: true },
        { text: "C. To calculate the exact depreciation expense of racing machinery.", correct: false },
        { text: "D. To verify corporate tax deductions filed with tax authorities.", correct: false }
      ],
      explanation: "Tests of Controls evaluate whether internal controls operate effectively to prevent or detect material misstatements."
    },
    {
      category: "AUDIT RISK & EVIDENCE",
      question: "According to the Audit Risk Model, if an auditor assesses Inherent Risk and Control Risk as high, what must happen to Detection Risk?",
      options: [
        { text: "A. Detection Risk must be set lower, requiring more substantive testing.", correct: true },
        { text: "B. Detection Risk will naturally increase without further testing.", correct: false },
        { text: "C. The auditor can issue an immediate adverse opinion.", correct: false },
        { text: "D. Control risk should be recalculated to zero.", correct: false }
      ],
      explanation: "To keep overall audit risk acceptably low, high risk of material misstatement requires a lower detection risk achieved through extensive substantive procedures."
    },
    {
      category: "FINANCIAL ACCOUNTING PRINCIPLES",
      question: "Which accounting concept dictates that racing engine expenses must be matched against the revenue earned in the same fiscal period?",
      options: [
        { text: "A. Prudence Concept", correct: false },
        { text: "B. Matching / Accrual Concept", correct: true },
        { text: "C. Going Concern Concept", correct: false },
        { text: "D. Historical Cost Concept", correct: false }
      ],
      explanation: "The matching principle requires expenses incurred to generate revenue to be recognized in the same accounting period as the related revenue."
    }
  ],

  // Pit Stop Selepas Suzuka GP -> Menuju ke Singapore GP
  2: [
    {
      category: "TAXATION & CAPITAL ALLOWANCES",
      question: "Under corporate tax principles, what relief is granted on qualifying capital assets to replace accounting depreciation?",
      options: [
        { text: "A. Capital Allowance", correct: true },
        { text: "B. Input Tax Credit", correct: false },
        { text: "C. Exempt Dividend Income", correct: false },
        { text: "D. Operational Fuel & Tire Expense", correct: false }
      ],
      explanation: "Accounting depreciation is disallowed for tax computations and is replaced by statutory Capital Allowances."
    },
    {
      category: "MANAGEMENT ACCOUNTING & COST CAP",
      question: "Under FIA Financial Regulations (Cost Cap), how are wind-tunnel testing electricity costs classified in cost behavior?",
      options: [
        { text: "A. Direct Material Cost", correct: false },
        { text: "B. Variable Production Overhead", correct: true },
        { text: "C. Sunk Fixed Equity", correct: false },
        { text: "D. Non-operational Liability", correct: false }
      ],
      explanation: "Electricity consumed directly by variable testing volume behaves as a variable overhead cost."
    },
    {
      category: "ETHICS & GOVERNANCE",
      question: "Which fundamental ethical principle of the IESBA Code is breached if a team accountant deliberately conceals over-budget R&D expenditure?",
      options: [
        { text: "A. Integrity & Objectivity", correct: true },
        { text: "B. Technical Competence", correct: false },
        { text: "C. Professional Courtesy", correct: false },
        { text: "D. Public Advocacy", correct: false }
      ],
      explanation: "Deliberately misleading financial reporting directly breaches the fundamental principles of Integrity and Objectivity."
    }
  ]
};

let lastQuizIndices = { 1: -1, 2: -1 };
let isQuizAnswerCorrect = false;

const TRACK_BOUNDARY_X = 6.6;

let currentLevelIdx = 0;
let currentIndex = 0;
const container = document.getElementById("gameWrapper");

// Navigation DOM Elements
const mainTitleScreen = document.getElementById("mainTitleScreen");
const carSelectScreen = document.getElementById("carSelectScreen");
const mainStartBtn = document.getElementById("mainStartBtn");
const backToTitleBtn = document.getElementById("backToTitleBtn");
const startChampionshipBtn = document.getElementById("startChampionshipBtn");

// HUD, Quick Controls & Radio Elements
const raceHud = document.getElementById("raceHud");
const raceTopControls = document.getElementById("raceTopControls");
const pauseMenuOverlay = document.getElementById("pauseMenuOverlay");
const pitRadioBox = document.getElementById("pitRadioBox");
const radioMsgText = document.getElementById("radioMsgText");
const endUI = document.getElementById("endUI");
const countdownBox = document.getElementById("countdownBox");
const countdownText = document.getElementById("countdownText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const enterPitStopBtn = document.getElementById("enterPitStopBtn");
const currentLvlBadge = document.getElementById("currentLvlBadge");
const mobileControls = document.getElementById("mobileControls");

// Pit Stop Quiz Modal Elements
const pitStopModal = document.getElementById("pitStopModal");
const quizCategory = document.getElementById("quizCategory");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptionsContainer = document.getElementById("quizOptionsContainer");
const quizFeedbackBox = document.getElementById("quizFeedbackBox");
const quizFeedbackTitle = document.getElementById("quizFeedbackTitle");
const quizFeedbackDesc = document.getElementById("quizFeedbackDesc");
const proceedNextGrandPrixBtn = document.getElementById("proceedNextGrandPrixBtn");

const btnPause = document.getElementById("btnPause");
const btnRestartRace = document.getElementById("btnRestartRace");
const btnMute = document.getElementById("btnMute");
const btnResume = document.getElementById("btnResume");
const btnRestartFromPause = document.getElementById("btnRestartFromPause");
const btnExitToMenu = document.getElementById("btnExitToMenu");

const carName = document.getElementById("carName");
const driverBadge = document.getElementById("driverBadge");
const carDesc = document.getElementById("carDesc");
const barSpeed = document.getElementById("barSpeed");
const barAccel = document.getElementById("barAccel");
const barHandling = document.getElementById("barHandling");
const valSpeed = document.getElementById("valSpeed");
const valAccel = document.getElementById("valAccel");
const valHandling = document.getElementById("valHandling");

const posDisplay = document.getElementById("posDisplay");
const speedVal = document.getElementById("speedVal");
const distVal = document.getElementById("distVal");
const trackProgress = document.getElementById("trackProgress");
const scoreVal = document.getElementById("scoreVal");
const timeLiveVal = document.getElementById("timeLiveVal");
const finalPosBadge = document.getElementById("finalPosBadge");
const finalScoreVal = document.getElementById("finalScoreVal");
const finalTimeVal = document.getElementById("finalTimeVal");
const endHeading = document.getElementById("endHeading");
const endSub = document.getElementById("endSub");

const markerPlayer = document.getElementById("markerPlayer");
const markerAI = [
  document.getElementById("markerAI0"),
  document.getElementById("markerAI1"),
  document.getElementById("markerAI2"),
  document.getElementById("markerAI3")
];

// --- 📻 SISTEM SUARA JURUTERA PASUKAN ---
let radioTimeout = null;

function triggerTeamRadio(message) {
  if (gameState !== "RACE") return;

  if (pitRadioBox && radioMsgText) {
    radioMsgText.textContent = `"${message}"`;
    pitRadioBox.classList.remove("hidden");
    clearTimeout(radioTimeout);
    radioTimeout = setTimeout(() => {
      pitRadioBox.classList.add("hidden");
    }, 4200);
  }

  if (!isMuted && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.08;
    utterance.pitch = 0.95;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
}

// --- SOUND SYSTEM & CROWD CHEERING ---
let audioCtx = null;
let masterGain = null;
let compressor = null;
let engineOsc = null;
let engineGain = null;
let engineSubOsc = null;
let engineFilter = null;
let isAudioRunning = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
    compressor.knee.setValueAtTime(25, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(10, audioCtx.currentTime);
    compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
    compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(1.5, audioCtx.currentTime);

    compressor.connect(masterGain);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function startEngineAudio() {
  initAudio();
  if (isAudioRunning) return;
  try {
    engineOsc = audioCtx.createOscillator();
    engineGain = audioCtx.createGain();
    engineOsc.type = "sawtooth";
    engineOsc.frequency.setValueAtTime(70, audioCtx.currentTime);

    engineSubOsc = audioCtx.createOscillator();
    engineSubOsc.type = "triangle";
    engineSubOsc.frequency.setValueAtTime(35, audioCtx.currentTime);

    engineFilter = audioCtx.createBiquadFilter();
    engineFilter.type = "lowpass";
    engineFilter.frequency.setValueAtTime(420, audioCtx.currentTime);

    engineGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

    engineOsc.connect(engineFilter);
    engineSubOsc.connect(engineFilter);
    engineFilter.connect(engineGain);
    engineGain.connect(compressor);

    engineOsc.start();
    engineSubOsc.start();
    isAudioRunning = true;
  } catch (e) {}
}

function updateEnginePitch(currentSpeed, maxSpd, isAccelerating) {
  if (!isAudioRunning || !engineOsc || !audioCtx) return;
  try {
    const ratio = Math.max(0, currentSpeed / maxSpd);
    const targetFreq = 70 + (ratio * 160) + (isAccelerating ? 20 : 0);
    engineOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.08);
    engineSubOsc.frequency.setTargetAtTime(targetFreq * 0.5, audioCtx.currentTime, 0.08);

    const targetVol = isMuted ? 0 : 0.06 + (ratio * 0.08);
    engineGain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.08);
  } catch (e) {}
}

function stopEngineAudio() {
  if (!isAudioRunning) return;
  try {
    if (engineGain) {
      engineGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      setTimeout(() => {
        if (engineOsc) engineOsc.stop();
        if (engineSubOsc) engineSubOsc.stop();
        isAudioRunning = false;
      }, 150);
    }
  } catch (e) {
    isAudioRunning = false;
  }
}

function playCrowdCheer() {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const bufferSize = audioCtx.sampleRate * 2.5;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1100, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.5, audioCtx.currentTime);

    const cheerGain = audioCtx.createGain();
    cheerGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    cheerGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.5);
    cheerGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.4);

    whiteNoise.connect(filter);
    filter.connect(cheerGain);
    cheerGain.connect(compressor);

    whiteNoise.start();
  } catch (e) {}
}

function playSoundFX(type) {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    if (type === "beep") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "go") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1040, now);
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "crash") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "screech") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "boost") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.35);
      gain.gain.setValueAtTime(0.4, now);
      gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "spin") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.3);
      gain.gain.setValueAtTime(0.35, now);
      gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(compressor);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "win") {
      playCrowdCheer();
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.5, now + i * 0.12);
        gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(compressor);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    }
  } catch (e) {}
}

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1724);

const isMobileDevice = () => window.innerWidth < 768 || window.innerHeight > window.innerWidth;

const camera = new THREE.PerspectiveCamera(
  isMobileDevice() ? 60 : 50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(25, 45, 30);
scene.add(dirLight);

// Pentas Showroom
const showroomStage = new THREE.Group();
const stageGeo = new THREE.CylinderGeometry(5.2, 5.4, 0.3, 40);
const stageMat = new THREE.MeshStandardMaterial({ color: 0x131d2b, roughness: 0.3, metalness: 0.4 });
const stageMesh = new THREE.Mesh(stageGeo, stageMat);
stageMesh.position.y = -0.15;
showroomStage.add(stageMesh);

const ringGeo = new THREE.TorusGeometry(5.3, 0.08, 16, 64);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.rotation.x = Math.PI / 2;
showroomStage.add(ringMesh);
scene.add(showroomStage);

// 🌧️ SISTEM PARTIKEL HUJAN 3D
const RAIN_COUNT = 1000;
const rainGeo = new THREE.BufferGeometry();
const rainPositions = new Float32Array(RAIN_COUNT * 3);

for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
  rainPositions[i] = (Math.random() - 0.5) * 50;
  rainPositions[i + 1] = Math.random() * 32 + 1;
  rainPositions[i + 2] = (Math.random() - 0.5) * 65;
}

rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
const rainMat = new THREE.PointsMaterial({
  color: 0x93c5fd,
  size: 0.22,
  transparent: true,
  opacity: 0.7
});
const rainParticles = new THREE.Points(rainGeo, rainMat);
scene.add(rainParticles);
rainParticles.visible = false;

// ==========================================
// 👨‍🚀 MODEL PEMANDU 3D
// ==========================================
function buildHandsomeDriver(data) {
  const driver = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: data.skinTone || 0xffdfc4, roughness: 0.5 });
  const hairMat = new THREE.MeshStandardMaterial({ color: data.hairColor || 0x4a2e18, roughness: 0.8 });
  const suitMat = new THREE.MeshStandardMaterial({ color: data.suitColor || 0x11161d, roughness: 0.4, metalness: 0.1 });
  const accentMat = new THREE.MeshStandardMaterial({ color: data.accentColor || 0xffffff, roughness: 0.3 });
  const capMat = new THREE.MeshStandardMaterial({ color: data.capColor || 0xd40000, roughness: 0.4 });
  const bootMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });

  const headGeo = new THREE.BoxGeometry(0.38, 0.42, 0.34);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 1.48;
  driver.add(head);

  const chinGeo = new THREE.BoxGeometry(0.24, 0.12, 0.28);
  const chin = new THREE.Mesh(chinGeo, skinMat);
  chin.position.set(0, 1.25, 0.02);
  driver.add(chin);

  const hairGeo = new THREE.BoxGeometry(0.42, 0.16, 0.38);
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.set(0, 1.70, -0.02);
  driver.add(hair);

  const capTopGeo = new THREE.BoxGeometry(0.40, 0.12, 0.38);
  const capTop = new THREE.Mesh(capTopGeo, capMat);
  capTop.position.set(0, 1.74, 0);
  driver.add(capTop);

  const capVisorGeo = new THREE.BoxGeometry(0.38, 0.03, 0.24);
  const capVisor = new THREE.Mesh(capVisorGeo, capMat);
  capVisor.position.set(0, 1.68, 0.26);
  capVisor.rotation.x = 0.08;
  driver.add(capVisor);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeWhiteGeo = new THREE.BoxGeometry(0.09, 0.05, 0.02);
  const eyePupilGeo = new THREE.BoxGeometry(0.05, 0.05, 0.03);

  const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
  leftEyeWhite.position.set(-0.1, 1.48, 0.18);
  const leftPupil = new THREE.Mesh(eyePupilGeo, eyeMat);
  leftPupil.position.set(-0.1, 1.48, 0.185);

  const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
  rightEyeWhite.position.set(0.1, 1.48, 0.18);
  const rightPupil = new THREE.Mesh(eyePupilGeo, eyeMat);
  rightPupil.position.set(0.1, 1.48, 0.185);
  driver.add(leftEyeWhite, leftPupil, rightEyeWhite, rightPupil);

  const noseGeo = new THREE.BoxGeometry(0.06, 0.1, 0.07);
  const nose = new THREE.Mesh(noseGeo, skinMat);
  nose.position.set(0, 1.42, 0.2);
  driver.add(nose);

  const bodyGeo = new THREE.BoxGeometry(0.56, 0.68, 0.32);
  const body = new THREE.Mesh(bodyGeo, suitMat);
  body.position.y = 0.95;
  driver.add(body);

  const stripeGeo = new THREE.BoxGeometry(0.16, 0.68, 0.33);
  const stripe = new THREE.Mesh(stripeGeo, accentMat);
  stripe.position.y = 0.95;
  driver.add(stripe);

  const armGeo = new THREE.BoxGeometry(0.16, 0.6, 0.2);
  const leftArm = new THREE.Mesh(armGeo, suitMat);
  leftArm.position.set(-0.36, 0.9, 0);
  const rightArm = new THREE.Mesh(armGeo, suitMat);
  rightArm.position.set(0.36, 0.9, 0);

  const handGeo = new THREE.BoxGeometry(0.14, 0.14, 0.16);
  const leftHand = new THREE.Mesh(handGeo, accentMat);
  leftHand.position.set(-0.36, 0.55, 0);
  const rightHand = new THREE.Mesh(handGeo, accentMat);
  rightHand.position.set(0.36, 0.55, 0);
  driver.add(leftArm, rightArm, leftHand, rightHand);

  const legGeo = new THREE.BoxGeometry(0.2, 0.65, 0.24);
  const leftLeg = new THREE.Mesh(legGeo, suitMat);
  leftLeg.position.set(-0.14, 0.35, 0);
  const rightLeg = new THREE.Mesh(legGeo, suitMat);
  rightLeg.position.set(0.14, 0.35, 0);

  const bootGeo = new THREE.BoxGeometry(0.2, 0.12, 0.28);
  const leftBoot = new THREE.Mesh(bootGeo, bootMat);
  leftBoot.position.set(-0.14, 0.06, 0.02);
  const rightBoot = new THREE.Mesh(bootGeo, bootMat);
  rightBoot.position.set(0.14, 0.06, 0.02);
  driver.add(leftLeg, rightLeg, leftBoot, rightBoot);

  return driver;
}

// ==========================================
// 🏎️ JENTERA FORMULA 1 3D
// ==========================================
function buildF1Car(data, isRacingMode = false) {
  const car = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: data.bodyColor, roughness: 0.2, metalness: 0.6 });
  const wingMat = new THREE.MeshStandardMaterial({ color: data.wingColor, roughness: 0.3, metalness: 0.5 });
  const sideMat = new THREE.MeshStandardMaterial({ color: data.sideColor, roughness: 0.2, metalness: 0.4 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.7, metalness: 0.3 });
  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.5, metalness: 0.2 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1c2128, roughness: 0.8 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd91438, roughness: 0.3, metalness: 0.8 });

  const chassisGeo = new THREE.BoxGeometry(0.76, 0.32, 3.8);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  chassis.position.set(0, 0.28, 0);
  car.add(chassis);

  const noseGeo = new THREE.ConeGeometry(0.38, 1.4, 4);
  const nose = new THREE.Mesh(noseGeo, bodyMat);
  nose.rotation.x = -Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.position.set(0, 0.28, 2.5);
  car.add(nose);

  const spGeo = new THREE.BoxGeometry(0.48, 0.30, 1.9);
  const spL = new THREE.Mesh(spGeo, sideMat);
  spL.position.set(-0.62, 0.27, -0.2);
  const spR = new THREE.Mesh(spGeo, sideMat);
  spR.position.set(0.62, 0.27, -0.2);
  car.add(spL, spR);

  const fwMain = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.05, 0.65), wingMat);
  fwMain.position.set(0, 0.14, 2.15);
  const fwEndplateL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.65), bodyMat);
  fwEndplateL.position.set(-1.35, 0.20, 2.15);
  const fwEndplateR = fwEndplateL.clone();
  fwEndplateR.position.set(1.35, 0.20, 2.15);
  car.add(fwMain, fwEndplateL, fwEndplateR);

  const rwMain = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.65), wingMat);
  rwMain.position.set(0, 0.88, -1.8);
  const rwEndL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.65), bodyMat);
  rwEndL.position.set(-1.05, 0.72, -1.8);
  const rwEndR = rwEndL.clone();
  rwEndR.position.set(1.05, 0.72, -1.8);
  const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 0.15), carbonMat);
  pylon.position.set(0, 0.60, -1.8);
  car.add(rwMain, rwEndL, rwEndR, pylon);

  const cockpitHole = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.26, 0.95), darkMat);
  cockpitHole.position.set(0, 0.40, 0.15);
  car.add(cockpitHole);

  const haloGeo = new THREE.TorusGeometry(0.24, 0.03, 8, 16, Math.PI);
  const halo = new THREE.Mesh(haloGeo, carbonMat);
  halo.position.set(0, 0.58, 0.35);
  halo.rotation.x = -Math.PI / 2.3;
  car.add(halo);

  if (isRacingMode) {
    const helmetMat = new THREE.MeshStandardMaterial({ color: data.capColor || 0xffffff, roughness: 0.2 });
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), helmetMat);
    helmet.position.set(0, 0.62, 0.15);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.09, 0.16), new THREE.MeshBasicMaterial({ color: 0x050505 }));
    visor.position.set(0, 0.63, 0.25);
    car.add(helmet, visor);
  }

  car.wheels = [];
  const makeF1Wheel = (x, z, width = 0.38, radius = 0.48) => {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 24), wheelMat);
    tire.rotation.z = Math.PI / 2;
    wheelGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, width + 0.02, 16), rimMat);
    rim.rotation.z = Math.PI / 2;
    wheelGroup.add(rim);

    wheelGroup.position.set(x, 0.45, z);
    car.add(wheelGroup);
    car.wheels.push(wheelGroup);
  };

  makeF1Wheel(-1.18, 1.45, 0.34, 0.46);
  makeF1Wheel(1.18, 1.45, 0.34, 0.46);
  makeF1Wheel(-1.26, -1.35, 0.42, 0.50);
  makeF1Wheel(1.26, -1.35, 0.42, 0.50);

  return car;
}

let showroomDisplayGroup = null;
let activeCar = null;

function renderShowroomCar(index) {
  if (showroomDisplayGroup) scene.remove(showroomDisplayGroup);

  const data = CARS[index];
  showroomDisplayGroup = new THREE.Group();

  activeCar = buildF1Car(data, false);
  activeCar.position.set(0.35, 0, 0);
  showroomDisplayGroup.add(activeCar);

  const handsomeDriver = buildHandsomeDriver(data);
  handsomeDriver.position.set(-1.65, 0, 0.35);
  handsomeDriver.rotation.y = Math.PI / 5;
  showroomDisplayGroup.add(handsomeDriver);

  scene.add(showroomDisplayGroup);

  carName.textContent = data.name;
  driverBadge.textContent = "👨‍🚀 Driver: " + data.driver;
  carDesc.textContent = data.desc;
  valSpeed.textContent = data.topSpeed;
  valAccel.textContent = data.accel;
  valHandling.textContent = data.handling;

  barSpeed.style.width = data.speedPct + "%";
  barAccel.style.width = data.accelPct + "%";
  barHandling.style.width = data.handlingPct + "%";
}

prevBtn.addEventListener("click", () => {
  playSoundFX("beep");
  currentIndex = (currentIndex - 1 + CARS.length) % CARS.length;
  renderShowroomCar(currentIndex);
});

nextBtn.addEventListener("click", () => {
  playSoundFX("beep");
  currentIndex = (currentIndex + 1) % CARS.length;
  renderShowroomCar(currentIndex);
});

let isDragging = false;
let prevMouseX = 0;
let carRotationY = -Math.PI / 4;

window.addEventListener("mousedown", (e) => {
  if (gameState === "CAR_SELECT") {
    isDragging = true;
    prevMouseX = e.clientX;
  }
});
window.addEventListener("mouseup", () => isDragging = false);
window.addEventListener("mousemove", (e) => {
  if (isDragging && gameState === "CAR_SELECT") {
    carRotationY += (e.clientX - prevMouseX) * 0.01;
    prevMouseX = e.clientX;
  }
});

window.addEventListener("touchstart", (e) => {
  if (gameState === "CAR_SELECT" && e.touches.length > 0) {
    isDragging = true;
    prevMouseX = e.touches[0].clientX;
  }
}, { passive: true });
window.addEventListener("touchend", () => isDragging = false);
window.addEventListener("touchmove", (e) => {
  if (isDragging && gameState === "CAR_SELECT" && e.touches.length > 0) {
    carRotationY += (e.touches[0].clientX - prevMouseX) * 0.015;
    prevMouseX = e.touches[0].clientX;
  }
}, { passive: true });

// --- PENGENDALIAN ALIRAN MENU ---
let gameState = "TITLE";
let isPaused = false;

mainStartBtn.addEventListener("click", () => {
  initAudio();
  playSoundFX("beep");
  playMenuMusic();

  gameState = "CAR_SELECT";
  mainTitleScreen.classList.add("hidden");
  carSelectScreen.classList.remove("hidden");
  showroomStage.visible = true;
  raceWorld.visible = false;
  rainParticles.visible = false;
  renderShowroomCar(currentIndex);
});

backToTitleBtn.addEventListener("click", () => {
  playSoundFX("beep");
  gameState = "TITLE";
  carSelectScreen.classList.add("hidden");
  mainTitleScreen.classList.remove("hidden");
});

startChampionshipBtn.addEventListener("click", () => {
  carSelectScreen.classList.add("hidden");
  currentLevelIdx = 0;
  startRaceForCurrentLevel();
});

function pauseGame() {
  if (gameState !== "RACE" || isPaused) return;
  isPaused = true;
  stopEngineAudio();
  if (raceBGM && !raceBGM.paused) raceBGM.pause();
  pauseMenuOverlay.classList.remove("hidden");
}

function resumeGame() {
  if (!isPaused) return;
  isPaused = false;
  startEngineAudio();
  if (!isMuted && raceBGM) raceBGM.play().catch(e => console.log(e));
  pauseMenuOverlay.classList.add("hidden");
}

const setupButtonAction = (btn, action) => {
  if (!btn) return;
  btn.addEventListener("click", action);
  btn.addEventListener("touchend", (e) => {
    e.preventDefault();
    action();
  });
};

setupButtonAction(btnPause, pauseGame);
setupButtonAction(btnResume, resumeGame);

setupButtonAction(btnRestartRace, () => {
  playSoundFX("beep");
  startRaceForCurrentLevel();
});

setupButtonAction(btnRestartFromPause, () => {
  resumeGame();
  playSoundFX("beep");
  startRaceForCurrentLevel();
});

setupButtonAction(btnExitToMenu, () => {
  resumeGame();
  restartBtn.click();
});

setupButtonAction(btnMute, toggleMute);

// ==========================================
// 🔧 PIT STOP TECHNICAL & AUDIT CHALLENGE (SOALAN RAWAK SETIAP KALI SALAH JAWAB)
// ==========================================
function openPitStopChallenge() {
  const stage = currentLevelIdx + 1;
  const pool = PITSTOP_QUIZ_POOLS[stage];

  if (!pool || pool.length === 0) return;

  // Pilih soalan secara rawak yang berbeza daripada percubaan sebelumnya
  let chosenIndex;
  do {
    chosenIndex = Math.floor(Math.random() * pool.length);
  } while (pool.length > 1 && chosenIndex === lastQuizIndices[stage]);

  lastQuizIndices[stage] = chosenIndex;
  const currentQuiz = pool[chosenIndex];

  isQuizAnswerCorrect = false;
  endUI.classList.add("hidden");
  pitStopModal.classList.remove("hidden");
  quizFeedbackBox.classList.add("hidden");

  quizCategory.textContent = currentQuiz.category;
  quizQuestion.textContent = currentQuiz.question;
  quizOptionsContainer.innerHTML = "";

  currentQuiz.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    btn.textContent = opt.text;

    btn.addEventListener("click", () => {
      const allBtns = quizOptionsContainer.querySelectorAll(".quiz-opt-btn");
      allBtns.forEach(b => b.disabled = true);

      if (opt.correct) {
        isQuizAnswerCorrect = true;
        btn.classList.add("correct-opt");
        playSoundFX("win");
        score += 1000;
        scoreVal.textContent = score;

        quizFeedbackTitle.textContent = "✅ AUDIT PASSED! FAST PIT STOP!";
        quizFeedbackTitle.style.color = "#22c55e";
        quizFeedbackDesc.textContent = `${currentQuiz.explanation} (+1,000 Bonus Points awarded!)`;

        proceedNextGrandPrixBtn.textContent = "PROCEED TO NEXT GP ⏩";
        proceedNextGrandPrixBtn.style.background = "#16a34a";
      } else {
        isQuizAnswerCorrect = false;
        btn.classList.add("wrong-opt");
        playSoundFX("crash");

        quizFeedbackTitle.textContent = "❌ AUDIT FAILED (PENALTY)!";
        quizFeedbackTitle.style.color = "#ef4444";
        quizFeedbackDesc.textContent = `Incorrect! You must replay this circuit again. A new question will be tested next time!`;

        proceedNextGrandPrixBtn.textContent = "RETRY CIRCUIT 🔄";
        proceedNextGrandPrixBtn.style.background = "#dc2626";
      }

      quizFeedbackBox.classList.remove("hidden");
    });

    quizOptionsContainer.appendChild(btn);
  });
}

setupButtonAction(proceedNextGrandPrixBtn, () => {
  pitStopModal.classList.add("hidden");
  if (isQuizAnswerCorrect) {
    currentLevelIdx++;
    startRaceForCurrentLevel();
  } else {
    startRaceForCurrentLevel();
  }
});

setupButtonAction(enterPitStopBtn, () => {
  openPitStopChallenge();
});

// ==========================================
// 🏢 PEMBINAAN ELEMEN PERSEKITARAN 3D REALISTIK
// ==========================================
const raceWorld = new THREE.Group();
scene.add(raceWorld);
raceWorld.visible = false;

const ROAD_SEGMENT_COUNT = 80;
const SEGMENT_LENGTH = 8;
const roadSegments = [];

const segGeo = new THREE.PlaneGeometry(18, SEGMENT_LENGTH);
const segMat = new THREE.MeshStandardMaterial({ color: 0x22262e, roughness: 0.8 });
const grassMat = new THREE.MeshStandardMaterial({ color: 0x3d7032, roughness: 0.9 });

for (let i = 0; i < ROAD_SEGMENT_COUNT; i++) {
  const segGroup = new THREE.Group();

  const rMesh = new THREE.Mesh(segGeo, segMat);
  rMesh.rotation.x = -Math.PI / 2;
  segGroup.add(rMesh);

  const isRed = i % 2 === 0;
  const kMat = new THREE.MeshBasicMaterial({ color: isRed ? 0xd91438 : 0xffffff });
  const kGeo = new THREE.BoxGeometry(0.85, 0.15, SEGMENT_LENGTH);
  const kL = new THREE.Mesh(kGeo, kMat);
  kL.position.set(-9.42, 0.08, 0);
  const kR = kL.clone();
  kR.position.set(9.42, 0.08, 0);
  segGroup.add(kL, kR);

  const gGeo = new THREE.PlaneGeometry(110, SEGMENT_LENGTH);
  const gL = new THREE.Mesh(gGeo, grassMat);
  gL.rotation.x = -Math.PI / 2;
  gL.position.set(-64, -0.05, 0);
  const gR = gL.clone();
  gR.position.set(64, -0.05, 0);
  segGroup.add(gL, gR);

  segGroup.zOffset = -i * SEGMENT_LENGTH;
  segGroup.position.z = segGroup.zOffset;
  raceWorld.add(segGroup);
  roadSegments.push(segGroup);
}

function createStartGantryWithTrafficLights() {
  const gantry = new THREE.Group();
  const trussMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.4 });
  const boxMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const redLightMat = new THREE.MeshBasicMaterial({ color: 0xff1111 });

  const poleL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9.0, 0.6), trussMat);
  poleL.position.set(-10.2, 4.5, 0);
  const poleR = poleL.clone();
  poleR.position.set(10.2, 4.5, 0);
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(21.4, 0.8, 0.8), trussMat);
  topBeam.position.set(0, 8.8, 0);
  gantry.add(poleL, poleR, topBeam);

  const lightHousing = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.2, 0.4), boxMat);
  lightHousing.position.set(0, 8.0, 0.3);
  gantry.add(lightHousing);

  for (let i = -2; i <= 2; i++) {
    const light = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16), redLightMat);
    light.rotation.x = Math.PI / 2;
    light.position.set(i * 1.3, 8.0, 0.52);
    gantry.add(light);
  }

  const sLine = new THREE.Mesh(new THREE.PlaneGeometry(18, 2.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  sLine.rotation.x = -Math.PI / 2;
  sLine.position.set(0, 0.04, 0);
  gantry.add(sLine);

  return gantry;
}

const startGantry = createStartGantryWithTrafficLights();
raceWorld.add(startGantry);

const finishGantry = new THREE.Group();
const fBar = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 1), new THREE.MeshStandardMaterial({ color: 0x111, metalness: 0.7 }));
fBar.position.y = 8.5;
finishGantry.add(fBar);
const fLine = new THREE.Mesh(new THREE.PlaneGeometry(18, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
fLine.rotation.x = -Math.PI / 2;
fLine.position.set(0, 0.05, 0);
finishGantry.add(fLine);
raceWorld.add(finishGantry);

function createGrandstand(color = 0x2563eb) {
  const gs = new THREE.Group();
  const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });

  const tierCount = 4;
  for (let t = 0; t < tierCount; t++) {
    const tier = new THREE.Mesh(new THREE.BoxGeometry(8, 1.5, 22), standMat);
    tier.position.set(-t * 2, t * 1.5 + 0.75, 0);
    gs.add(tier);

    for (let s = -9; s <= 9; s += 2) {
      const crowdColor = Math.random() > 0.5 ? color : (Math.random() > 0.5 ? 0xfacc15 : 0xef4444);
      const fan = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshBasicMaterial({ color: crowdColor }));
      fan.position.set(-t * 2 + 0.4, t * 1.5 + 1.8, s);
      gs.add(fan);
    }
  }

  const roof = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 24), roofMat);
  roof.position.set(-3.5, 8.8, 0);
  roof.rotation.z = -0.15;
  gs.add(roof);

  return gs;
}

function createPitStopBuilding() {
  const pit = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5, metalness: 0.2 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const garageMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });

  const main = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 28), wallMat);
  main.position.set(0, 4, 0);
  pit.add(main);

  for (let g = -1; g <= 1; g++) {
    const garage = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 6.5), garageMat);
    garage.position.set(-5.1, 2.0, g * 8.5);
    pit.add(garage);

    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 6.5), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    sign.position.set(-5.15, 4.4, g * 8.5);
    pit.add(sign);
  }

  const pitWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.4, 28), frameMat);
  pitWall.position.set(-7.5, 0.7, 0);
  pit.add(pitWall);

  return pit;
}

function createSakuraTree() {
  const tree = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
  const blossomMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.6 });

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 5, 8), trunkMat);
  trunk.position.y = 2.5;
  tree.add(trunk);

  const foliage1 = new THREE.Mesh(new THREE.SphereGeometry(2.4, 10, 10), blossomMat);
  foliage1.position.y = 5.6;
  const foliage2 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 8), blossomMat);
  foliage2.position.set(1.2, 4.8, 0);
  const foliage3 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 8), blossomMat);
  foliage3.position.set(-1.2, 4.8, 0.8);

  tree.add(foliage1, foliage2, foliage3);
  return tree;
}

function createJapanFlag() {
  const flagGroup = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 7, 8), poleMat);
  pole.position.y = 3.5;
  flagGroup.add(pole);

  const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.8, 2.8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  cloth.position.set(0, 5.8, 1.4);
  flagGroup.add(cloth);

  const redSun = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 20), new THREE.MeshBasicMaterial({ color: 0xd91438 }));
  redSun.rotation.z = Math.PI / 2;
  redSun.position.set(0, 5.8, 1.4);
  flagGroup.add(redSun);

  return flagGroup;
}

function createStreetLight() {
  const lightPost = new THREE.Group();
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
  const lampGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 9, 8), metalMat);
  pole.position.y = 4.5;
  const arm = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 0.12), metalMat);
  arm.position.set(1.1, 8.8, 0);
  const bulb = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.6), lampGlowMat);
  bulb.position.set(2.0, 8.6, 0);

  lightPost.add(pole, arm, bulb);
  return lightPost;
}

function createSafetyFence() {
  const fence = new THREE.Group();
  const barMat = new THREE.MeshBasicMaterial({ color: 0x64748b });

  const fMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.8, SEGMENT_LENGTH), barMat);
  fMesh.position.y = 1.4;
  fence.add(fMesh);
  return fence;
}

function createRealisticBuilding(lvl, height, width, depth) {
  const building = new THREE.Group();
  const facadeMat = new THREE.MeshStandardMaterial({ color: lvl.buildingColor, roughness: 0.4, metalness: 0.2 });
  const windowColor = lvl.hasStreetLights ? 0xfef08a : 0x93c5fd;
  const windowMat = new THREE.MeshBasicMaterial({ color: windowColor });

  const core = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), facadeMat);
  core.position.y = height / 2;
  building.add(core);

  const floors = Math.floor(height / 4.5);
  for (let f = 1; f < floors; f++) {
    const winStripL = new THREE.Mesh(new THREE.BoxGeometry(width + 0.1, 0.6, depth * 0.8), windowMat);
    winStripL.position.y = f * 4.5;
    building.add(winStripL);
  }

  const roof = new THREE.Mesh(new THREE.BoxGeometry(width * 0.7, 2, depth * 0.7), facadeMat);
  roof.position.y = height + 1;
  building.add(roof);

  return building;
}

let sceneryObjects = [];

function buildTrackScenery(lvl) {
  sceneryObjects.forEach(obj => raceWorld.remove(obj));
  sceneryObjects = [];

  const pitBuilding = createPitStopBuilding();
  pitBuilding.position.set(-19, 0, -45);
  raceWorld.add(pitBuilding);
  sceneryObjects.push(pitBuilding);

  const grandstand = createGrandstand(lvl.type === "ferrari" ? 0xd40000 : 0x2563eb);
  grandstand.position.set(20, 0, -45);
  raceWorld.add(grandstand);
  sceneryObjects.push(grandstand);

  const grandstand2 = createGrandstand(0xf59e0b);
  grandstand2.position.set(20, 0, -220);
  raceWorld.add(grandstand2);
  sceneryObjects.push(grandstand2);

  for (let i = 0; i < 36; i++) {
    const h = Math.random() * 26 + 18;
    const w = Math.random() * 5 + 9;
    const d = Math.random() * 6 + 10;
    const bld = createRealisticBuilding(lvl, h, w, d);

    const side = Math.random() > 0.5 ? 1 : -1;
    const dist = side * (Math.random() * 22 + 27);
    bld.baseSide = side;
    bld.baseDist = dist;
    bld.zOffset = -i * 22;
    bld.position.set(dist, 0, bld.zOffset);

    if (lvl.hasJapanFlags && Math.random() > 0.6) {
      const flag = createJapanFlag();
      flag.position.set(0, h, 0);
      bld.add(flag);
    }

    if (lvl.hasSakura && Math.random() > 0.4) {
      const sakura = createSakuraTree();
      sakura.position.set(side * -6, 0, Math.random() * 6 - 3);
      bld.add(sakura);
    }

    raceWorld.add(bld);
    sceneryObjects.push(bld);
  }

  if (lvl.hasStreetLights || lvl.hasFences) {
    for (let j = 0; j < 30; j++) {
      const zPos = -j * 26;
      if (lvl.hasStreetLights) {
        const lightL = createStreetLight();
        lightL.position.set(-11.5, 0, zPos);
        lightL.rotation.y = Math.PI;
        const lightR = createStreetLight();
        lightR.position.set(11.5, 0, zPos);

        lightL.baseSide = -1; lightL.baseDist = -11.5; lightL.zOffset = zPos;
        lightR.baseSide = 1; lightR.baseDist = 11.5; lightR.zOffset = zPos;

        raceWorld.add(lightL, lightR);
        sceneryObjects.push(lightL, lightR);
      }

      if (lvl.hasFences) {
        const fenceL = createSafetyFence();
        fenceL.position.set(-10.2, 0, zPos);
        const fenceR = createSafetyFence();
        fenceR.position.set(10.2, 0, zPos);

        fenceL.baseSide = -1; fenceL.baseDist = -10.2; fenceL.zOffset = zPos;
        fenceR.baseSide = 1; fenceR.baseDist = 10.2; fenceR.zOffset = zPos;

        raceWorld.add(fenceL, fenceR);
        sceneryObjects.push(fenceL, fenceR);
      }
    }
  }
}

function applyLevelVisuals(lvl) {
  scene.background = new THREE.Color(lvl.skyColor);
  scene.fog = new THREE.FogExp2(lvl.fogColor, lvl.isRain ? 0.007 : 0.004);
  ambLight.intensity = lvl.ambientLight;
  dirLight.intensity = lvl.sunLight;

  segMat.color.setHex(lvl.roadColor);
  grassMat.color.setHex(lvl.grassColor);

  if (lvl.isRain) {
    segMat.roughness = 0.2;
    segMat.metalness = 0.5;
    rainParticles.visible = true;
  } else {
    segMat.roughness = 0.8;
    segMat.metalness = 0.1;
    rainParticles.visible = false;
  }

  buildTrackScenery(lvl);
}

// --- 3D RACE SIMULATION LOGIC ---
const PLAYER_BASE_Z = -3.2;
let playerDistance = 0;
let speed = 0;
let playerX = 0;
let targetPlayerX = 0;
let score = 0;
let raceTime = 0;
let raceTimerInterval = null;
let screechCooldown = 0;
let prevRank = 5;

let playerY = 0;
let velocityY = 0;
let airborneSpin = 0;
let isAirborne = false;

let aiCars = [];
const AI_CONFIGS = [
  { name: "McLaren", bodyColor: 0xff8000, wingColor: 0x111111, sideColor: 0x000000, gridX: -3.2, gridZ: -12, capColor: 0xff8000 },
  { name: "Aston Martin", bodyColor: 0x00594f, wingColor: 0x00352f, sideColor: 0xcedc00, gridX: 3.2, gridZ: -18, capColor: 0xcedc00 },
  { name: "Alpine", bodyColor: 0x0090ff, wingColor: 0x111111, sideColor: 0xff87b2, gridX: -1.5, gridZ: -24, capColor: 0x0090ff },
  { name: "Williams", bodyColor: 0x00a0dd, wingColor: 0x041e42, sideColor: 0xffffff, gridX: 1.5, gridZ: -30, capColor: 0x00a0dd }
];

let trackObstacles = [];

const keys = { left: false, right: false, gas: false, brake: false };
window.addEventListener("keydown", (e) => {
  if (e.key === "p" || e.key === "P" || e.key === "Escape") {
    if (gameState === "RACE") {
      isPaused ? resumeGame() : pauseGame();
    }
  }
  if (e.key === "a" || e.key === "ArrowLeft") keys.left = true;
  if (e.key === "d" || e.key === "ArrowRight") keys.right = true;
  if (e.key === "w" || e.key === "ArrowUp") keys.gas = true;
  if (e.key === "s" || e.key === "ArrowDown") keys.brake = true;
});
window.addEventListener("keyup", (e) => {
  if (e.key === "a" || e.key === "ArrowLeft") keys.left = false;
  if (e.key === "d" || e.key === "ArrowRight") keys.right = false;
  if (e.key === "w" || e.key === "ArrowUp") keys.gas = false;
  if (e.key === "s" || e.key === "ArrowDown") keys.brake = false;
});

function bindTouchKey(elemId, keyProp) {
  const btn = document.getElementById(elemId);
  if (!btn) return;

  const press = (e) => { e.preventDefault(); keys[keyProp] = true; };
  const release = (e) => { e.preventDefault(); keys[keyProp] = false; };

  btn.addEventListener("touchstart", press, { passive: false });
  btn.addEventListener("touchend", release, { passive: false });
  btn.addEventListener("touchcancel", release, { passive: false });
  btn.addEventListener("mousedown", press);
  btn.addEventListener("mouseup", release);
  btn.addEventListener("mouseleave", release);
}

bindTouchKey("touchLeft", "left");
bindTouchKey("touchRight", "right");
bindTouchKey("touchGas", "gas");
bindTouchKey("touchBrake", "brake");

function getTrackCurvature(dist) {
  return Math.sin(dist * 0.003) * 0.7 + Math.sin(dist * 0.0012) * 0.3;
}

function spawnObstacleMesh(type, x, dist) {
  const group = new THREE.Group();
  group.obsType = type;
  group.trackDist = dist;
  group.laneX = x;

  if (type === "oil") {
    const oilMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.5, 0.05, 16),
      new THREE.MeshBasicMaterial({ color: 0x111111 })
    );
    oilMesh.position.y = 0.03;
    group.add(oilMesh);
  } else if (type === "cone") {
    const coneMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.7, 12),
      new THREE.MeshStandardMaterial({ color: 0xff6600 })
    );
    coneMesh.position.y = 0.35;
    group.add(coneMesh);
  } else if (type === "drs") {
    const drsMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ff66 })
    );
    drsMesh.rotation.x = -Math.PI / 2;
    drsMesh.position.y = 0.04;
    group.add(drsMesh);
  }

  scene.add(group);
  trackObstacles.push(group);
}

function startRaceForCurrentLevel() {
  initAudio();
  gameState = "COUNTDOWN";
  isPaused = false;

  const currentLvl = LEVELS[currentLevelIdx];
  currentLvlBadge.textContent = "LVL " + currentLvl.id;

  countdownBox.classList.remove("hidden");
  raceHud.classList.remove("hidden");
  if (raceTopControls) raceTopControls.classList.remove("hidden");
  if (mobileControls) mobileControls.classList.remove("hidden");
  if (pauseMenuOverlay) pauseMenuOverlay.classList.add("hidden");
  if (pitRadioBox) pitRadioBox.classList.add("hidden");
  if (pitStopModal) pitStopModal.classList.add("hidden");
  endUI.classList.add("hidden");
  showroomStage.visible = false;
  raceWorld.visible = true;

  applyLevelVisuals(currentLvl);

  playerDistance = 0;
  speed = 0;
  playerX = 0;
  targetPlayerX = 0;
  playerY = 0;
  velocityY = 0;
  airborneSpin = 0;
  isAirborne = false;
  raceTime = 0;
  prevRank = 5;
  timeLiveVal.textContent = "0";
  distVal.textContent = currentLvl.distance + " m";

  // Memadam kereta pendua daripada memori pemaparan
  if (showroomDisplayGroup) scene.remove(showroomDisplayGroup);
  if (activeCar) {
    scene.remove(activeCar);
    activeCar = null;
  }

  activeCar = buildF1Car(CARS[currentIndex], true);
  activeCar.position.set(playerX, 0, PLAYER_BASE_Z);
  scene.add(activeCar);

  trackObstacles.forEach(o => scene.remove(o));
  trackObstacles = [];
  aiCars.forEach(ai => scene.remove(ai.mesh));
  aiCars = [];

  AI_CONFIGS.forEach((cfg, idx) => {
    const mesh = buildF1Car(cfg, true);
    mesh.position.set(cfg.gridX, 0, cfg.gridZ);
    scene.add(mesh);
    aiCars.push({
      cfg: cfg,
      mesh: mesh,
      distance: -(cfg.gridZ - PLAYER_BASE_Z),
      x: cfg.gridX,
      targetX: cfg.gridX,
      y: 0,
      velocityY: 0,
      isAirborne: false,
      airborneSpin: 0,
      speed: 0,
      baseAccel: 0.0048 + (idx * 0.0003) + currentLvl.aiSpeedBonus,
      switchTimer: Math.random() * 80 + 60
    });
  });

  const spawnGap = currentLevelIdx === 2 ? 75 : (currentLevelIdx === 1 ? 85 : 100);
  for (let d = 250; d < currentLvl.distance - 150; d += spawnGap) {
    const r = Math.random();
    const lane = [-4.0, -1.3, 1.3, 4.0][Math.floor(Math.random() * 4)];
    if (r < 0.35) spawnObstacleMesh("oil", lane, d);
    else if (r < 0.70) spawnObstacleMesh("cone", lane, d);
    else spawnObstacleMesh("drs", lane, d);
  }

  let count = 3;
  countdownText.textContent = count;
  countdownText.style.color = "#facc15";
  playSoundFX("beep");

  const countInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownText.textContent = count;
      playSoundFX("beep");
    } else if (count === 0) {
      countdownText.textContent = "GO!";
      countdownText.style.color = "#22c55e";
      playSoundFX("go");
      startEngineAudio();
      playRaceMusic();

      if (currentLvl.isRain) {
        triggerTeamRadio("Track is wet! Watch your traction!");
      } else {
        triggerTeamRadio("Lights out, push hard into turn 1!");
      }

    } else {
      clearInterval(countInterval);
      countdownBox.classList.add("hidden");
      gameState = "RACE";

      clearInterval(raceTimerInterval);
      raceTimerInterval = setInterval(() => {
        if (gameState === "RACE" && !isPaused) {
          raceTime++;
          timeLiveVal.textContent = raceTime;
        }
      }, 1000);
    }
  }, 1000);
}

function endRace(pos) {
  gameState = "END";
  stopEngineAudio();
  stopAllMusic();

  clearInterval(raceTimerInterval);
  raceHud.classList.add("hidden");
  if (raceTopControls) raceTopControls.classList.add("hidden");
  if (mobileControls) mobileControls.classList.add("hidden");
  if (pauseMenuOverlay) pauseMenuOverlay.classList.add("hidden");
  if (pitRadioBox) pitRadioBox.classList.add("hidden");
  endUI.classList.remove("hidden");

  finalScoreVal.textContent = score;
  finalTimeVal.textContent = raceTime;

  playSoundFX("win");
  const currentLvl = LEVELS[currentLevelIdx];
  endHeading.textContent = `🏁 ${currentLvl.name} FINISHED!`;
  finalPosBadge.textContent = `POSITION: P${pos} / 5`;

  if (pos === 1) {
    finalPosBadge.style.color = "#facc15";
    endSub.textContent = `🏆 P1 WINNER! You dominated ${currentLvl.name}!`;
    triggerTeamRadio("P1, phenomenal drive! Pit entry is open!");
  } else if (pos <= 3) {
    finalPosBadge.style.color = "#38bdf8";
    endSub.textContent = `🎉 PODIUM P${pos}! You qualify for the pit stop review!`;
    triggerTeamRadio(`Podium finish P${pos}! Box now for pit stop audit!`);
  } else {
    finalPosBadge.style.color = "#94a3b8";
    endSub.textContent = "Full Grand Prix distance completed.";
    triggerTeamRadio("Checkered flag. Box now for team inspection.");
  }

  if (currentLevelIdx < LEVELS.length - 1) {
    enterPitStopBtn.style.display = "block";
    enterPitStopBtn.textContent = `ENTER PIT STOP CHALLENGE 🔧 (NEXT: LVL ${currentLevelIdx + 2})`;
  } else {
    enterPitStopBtn.style.display = "none";
    endSub.textContent += " 🌟 CONGRATULATIONS! You completed the full FIA Accounting Championship!";
  }
}

restartBtn.addEventListener("click", () => {
  stopEngineAudio();
  gameState = "TITLE";
  isPaused = false;

  endUI.classList.add("hidden");
  countdownBox.classList.add("hidden");
  if (raceTopControls) raceTopControls.classList.add("hidden");
  if (mobileControls) mobileControls.classList.add("hidden");
  if (pauseMenuOverlay) pauseMenuOverlay.classList.add("hidden");
  if (pitRadioBox) pitRadioBox.classList.add("hidden");
  if (pitStopModal) pitStopModal.classList.add("hidden");
  carSelectScreen.classList.add("hidden");
  mainTitleScreen.classList.remove("hidden");

  if (activeCar) {
    scene.remove(activeCar);
    activeCar = null;
  }

  showroomStage.visible = true;
  raceWorld.visible = false;
  rainParticles.visible = false;
  scene.background = new THREE.Color(0x0e1724);
  scene.fog = null;
  ambLight.intensity = 0.85;

  aiCars.forEach(ai => scene.remove(ai.mesh));
  aiCars = [];

  renderShowroomCar(currentIndex);
  playMenuMusic();
});

function triggerAICrash(ai, pushDirX) {
  ai.isAirborne = true;
  ai.velocityY = 0.22;
  ai.airborneSpin = 18;
  ai.targetX += pushDirX * 1.6;
  ai.speed *= 0.45;
}

function triggerAirborneCrash(pushDirX) {
  playSoundFX("crash");
  container.classList.add("crash-flash");
  setTimeout(() => container.classList.remove("crash-flash"), 250);

  isAirborne = true;
  velocityY = 0.22;
  airborneSpin = 18;
  targetPlayerX += pushDirX * 1.5;
  speed *= 0.55;

  triggerTeamRadio("Contact! Keep control of the car!");
}

// --- MAIN ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);

  const mobile = isMobileDevice();

  if (gameState === "TITLE" || gameState === "CAR_SELECT") {
    if (!isDragging) carRotationY += 0.003;
    if (showroomDisplayGroup) {
      showroomDisplayGroup.rotation.y = carRotationY;
    }
    const camY = mobile ? 4.2 : 3.2;
    const camZ = mobile ? 8.2 : 6.8;
    camera.position.set(0, camY, camZ);
    camera.lookAt(0, 0.4, 0);

  } else if (gameState === "COUNTDOWN") {
    const camY = mobile ? 3.6 : 2.2;
    const camZ = mobile ? 7.2 : 5.8;
    camera.position.set(playerX * 0.5, camY, camZ);
    camera.lookAt(playerX * 0.3, 1.1, -15);

  } else if (gameState === "RACE") {
    if (isPaused) return;

    const carData = CARS[currentIndex];
    const currentLvl = LEVELS[currentLevelIdx];
    const TOTAL_RACE_DISTANCE = currentLvl.distance;

    const curveValue = getTrackCurvature(playerDistance);
    const curveStrength = currentLvl.curvePower;

    if (currentLvl.isRain && rainParticles.visible) {
      const positions = rainGeo.attributes.position.array;
      const rainFallSpeed = 0.55 + speed * 0.8;
      for (let i = 1; i < RAIN_COUNT * 3; i += 3) {
        positions[i] -= rainFallSpeed;
        if (positions[i] < -1) {
          positions[i] = 28;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;
    }

    if (isAirborne) {
      playerY += velocityY;
      velocityY -= 0.012;
      activeCar.rotation.y += 0.22;
      activeCar.rotation.x += 0.08;

      if (playerY <= 0) {
        playerY = 0;
        velocityY = 0;
        isAirborne = false;
        activeCar.rotation.y = Math.PI;
        activeCar.rotation.x = 0;
        playSoundFX("screech");
      }
    } else {
      activeCar.rotation.y = Math.PI;
      activeCar.rotation.x = 0;

      if (keys.gas) {
        if (speed < carData.maxSpeed) speed += carData.accelRate;
      } else if (keys.brake) {
        speed -= 0.02;
        if (speed < 0) speed = 0;
        if (speed > 0.3 && screechCooldown <= 0) {
          playSoundFX("screech");
          screechCooldown = 30;
        }
      } else {
        if (speed > 0) {
          speed -= 0.004;
          if (speed < 0.002) speed = 0;
        }
      }

      const slipFactor = currentLvl.isRain ? 1.4 : 1.0;
      if (speed > 0.1) {
        targetPlayerX -= curveValue * speed * 0.06 * slipFactor;
      }

      if (speed > 0.02) {
        const effectiveTurnRate = carData.turnRate * currentLvl.gripMultiplier;
        const turnSpeed = effectiveTurnRate * Math.min(speed / 0.4, 1.15);
        if (keys.left) {
          targetPlayerX -= turnSpeed;
          if (speed > 0.6 && screechCooldown <= 0) {
            playSoundFX("screech");
            screechCooldown = 40;
          }
        }
        if (keys.right) {
          targetPlayerX += turnSpeed;
          if (speed > 0.6 && screechCooldown <= 0) {
            playSoundFX("screech");
            screechCooldown = 40;
          }
        }
      }
    }

    if (targetPlayerX < -TRACK_BOUNDARY_X) {
      targetPlayerX = -TRACK_BOUNDARY_X;
      speed *= 0.95;
      if (screechCooldown <= 0 && speed > 0.3) {
        playSoundFX("screech");
        screechCooldown = 25;
      }
    } else if (targetPlayerX > TRACK_BOUNDARY_X) {
      targetPlayerX = TRACK_BOUNDARY_X;
      speed *= 0.95;
      if (screechCooldown <= 0 && speed > 0.3) {
        playSoundFX("screech");
        screechCooldown = 25;
      }
    }

    if (screechCooldown > 0) screechCooldown--;

    updateEnginePitch(speed, carData.maxSpeed, keys.gas);

    const steerResponsiveness = currentLvl.isRain ? 0.09 : 0.14;
    playerX += (targetPlayerX - playerX) * steerResponsiveness;

    if (playerX < -TRACK_BOUNDARY_X) playerX = -TRACK_BOUNDARY_X;
    if (playerX > TRACK_BOUNDARY_X) playerX = TRACK_BOUNDARY_X;

    playerDistance += speed * 2.0;

    activeCar.position.set(playerX, playerY, PLAYER_BASE_Z);
    if (!isAirborne) {
      activeCar.rotation.z = (playerX - targetPlayerX) * 0.18 - (curveValue * 0.08);
      activeCar.rotation.y = Math.PI + (playerX - targetPlayerX) * 0.12 - (curveValue * 0.15);
    }

    if (activeCar.wheels) {
      activeCar.wheels.forEach(w => { w.rotation.x += speed * 0.5; });
    }

    const camOffsetSide = -curveValue * 2.5;
    const chaseCamY = mobile ? 3.8 + playerY * 0.4 : 2.4 + playerY * 0.4;
    const chaseCamZ = mobile ? 7.6 : 5.8;
    camera.position.set(playerX * 0.45 + camOffsetSide, chaseCamY, chaseCamZ);
    camera.lookAt(playerX * 0.25 - camOffsetSide * 1.5, 1.0 + playerY * 0.3, -20);
    camera.rotation.z = curveValue * 0.035;

    const trackLoopLength = ROAD_SEGMENT_COUNT * SEGMENT_LENGTH;
    roadSegments.forEach((seg) => {
      seg.position.z += speed * 20;
      if (seg.position.z > 20) {
        seg.position.z -= trackLoopLength;
      }
      const zDist = Math.abs(seg.position.z);
      const roadBendX = -curveValue * curveStrength * (zDist * zDist);
      seg.position.x = roadBendX;
      seg.rotation.y = -curveValue * (zDist * 0.003);
    });

    sceneryObjects.forEach(item => {
      item.position.z += speed * 20;
      if (item.position.z > 25) item.position.z -= 750;
      const zDist = Math.abs(item.position.z);
      const roadBendX = -curveValue * curveStrength * (zDist * zDist);
      if (item.baseDist !== undefined) {
        item.position.x = item.baseDist + roadBendX;
      }
    });

    startGantry.position.set(0, 0, playerDistance);
    const finishRelZ = -(TOTAL_RACE_DISTANCE - playerDistance);
    if (finishRelZ > -500 && finishRelZ < 20) {
      const zDist = Math.abs(finishRelZ);
      finishGantry.position.set(-curveValue * curveStrength * (zDist * zDist), 0, finishRelZ);

      if (finishRelZ > -120 && finishRelZ < -110) {
        playCrowdCheer();
      }
    } else {
      finishGantry.position.set(0, 0, -9999);
    }

    if (playerDistance >= TOTAL_RACE_DISTANCE) {
      let finalRank = 1;
      aiCars.forEach(ai => { if (ai.distance > playerDistance) finalRank++; });
      endRace(finalRank);
      return;
    }

    aiCars.forEach((ai) => {
      if (ai.isAirborne) {
        ai.y += ai.velocityY;
        ai.velocityY -= 0.012;
        ai.mesh.rotation.y += 0.22;
        ai.mesh.rotation.x += 0.08;

        if (ai.y <= 0) {
          ai.y = 0;
          ai.velocityY = 0;
          ai.isAirborne = false;
          ai.mesh.rotation.y = Math.PI;
          ai.mesh.rotation.x = 0;
        }
      } else {
        const targetSpeed = Math.max(0.45, Math.min(carData.maxSpeed * 0.98, speed + 0.05));
        if (ai.speed < targetSpeed) {
          ai.speed += ai.baseAccel;
        } else if (ai.speed > targetSpeed) {
          ai.speed -= 0.008;
        }

        const distDiff = ai.distance - playerDistance;
        if (distDiff > 45) {
          ai.speed = Math.max(0.4, speed * 0.92);
        } else if (distDiff < -30) {
          ai.speed = Math.min(carData.maxSpeed, speed * 1.08);
        }

        ai.switchTimer--;
        if (ai.switchTimer <= 0) {
          const lanes = [-4.5, -2.0, 0, 2.0, 4.5];
          ai.targetX = lanes[Math.floor(Math.random() * lanes.length)];
          ai.switchTimer = Math.random() * 120 + 90;
        }
        ai.x += (ai.targetX - ai.x) * 0.025;

        if (ai.x < -TRACK_BOUNDARY_X) ai.x = -TRACK_BOUNDARY_X;
        if (ai.x > TRACK_BOUNDARY_X) ai.x = TRACK_BOUNDARY_X;
      }

      ai.distance += ai.speed * 2.0;

      const relZ = -(ai.distance - playerDistance) + PLAYER_BASE_Z;
      const zDist = Math.abs(relZ);
      const aiBendX = -curveValue * curveStrength * (zDist * zDist);

      ai.mesh.position.set(ai.x + aiBendX, 0, relZ);
      ai.mesh.rotation.y = Math.PI - (curveValue * 0.15);

      if (ai.mesh.wheels) {
        ai.mesh.wheels.forEach(w => { w.rotation.x += ai.speed * 0.5; });
      }

      if (Math.abs(relZ - PLAYER_BASE_Z) < 1.8 && Math.abs((ai.x + aiBendX) - playerX) < 1.4) {
        const pushDir = playerX < (ai.x + aiBendX) ? -1 : 1;

        if (!ai.isAirborne) {
          triggerAICrash(ai, -pushDir);
        }
        if (!isAirborne) {
          triggerAirborneCrash(pushDir);
        }
      }
    });

    let currentRank = 1;
    aiCars.forEach(ai => {
      if (ai.distance > playerDistance) currentRank++;
    });
    posDisplay.textContent = `POS: ${currentRank} / 5`;

    if (currentRank < prevRank) {
      if (currentRank === 1) {
        triggerTeamRadio("You are leading P1! Bring it home!");
      } else {
        triggerTeamRadio("Great overtake! Keep this momentum!");
      }
    }
    prevRank = currentRank;

    trackObstacles.forEach(obs => {
      const relZ = -(obs.trackDist - playerDistance) + PLAYER_BASE_Z;
      const zDist = Math.abs(relZ);
      const obsBendX = -curveValue * curveStrength * (zDist * zDist);

      obs.position.set(obs.laneX + obsBendX, 0, relZ);

      if (Math.abs(relZ - PLAYER_BASE_Z) < 1.5 && Math.abs((obs.laneX + obsBendX) - playerX) < 1.2 && !obs.hit) {
        obs.hit = true;
        scene.remove(obs);

        if (obs.obsType === "oil") {
          playSoundFX("spin");
          targetPlayerX += (Math.random() > 0.5 ? 1 : -1) * 1.8;
          speed *= 0.85;
          triggerTeamRadio("Yellow flag! Oil on track!");
        } else if (obs.obsType === "cone") {
          triggerAirborneCrash(Math.random() > 0.5 ? 1 : -1);
        } else if (obs.obsType === "drs") {
          playSoundFX("boost");
          speed = Math.min(speed + 0.28, carData.maxSpeed + 0.2);
          score += 100;
          triggerTeamRadio("DRS boost enabled! Push to pass!");
        }
      }

      aiCars.forEach(ai => {
        const aiDistDiff = Math.abs(obs.trackDist - ai.distance);
        if (aiDistDiff < 1.5 && Math.abs(ai.x - obs.laneX) < 1.2 && !ai.isAirborne) {
          if (obs.obsType === "cone") {
            triggerAICrash(ai, Math.random() > 0.5 ? 1 : -1);
          } else if (obs.obsType === "oil") {
            ai.speed *= 0.75;
            ai.targetX += (Math.random() > 0.5 ? 1 : -1) * 1.5;
          }
        }
      });
    });

    const kmh = Math.floor(speed * 280);
    speedVal.textContent = kmh;
    if (speed > 0.05) score += Math.floor(speed * 2);
    scoreVal.textContent = score;

    const playerPct = Math.min(Math.max((playerDistance / TOTAL_RACE_DISTANCE) * 100, 0), 100);
    trackProgress.style.width = playerPct + "%";

    if (markerPlayer) {
      markerPlayer.style.left = playerPct + "%";
    }

    aiCars.forEach((ai, idx) => {
      if (markerAI[idx]) {
        const aiPct = Math.min(Math.max((ai.distance / TOTAL_RACE_DISTANCE) * 100, 0), 100);
        markerAI[idx].style.left = aiPct + "%";
      }
    });

    const remainingM = Math.max(0, Math.floor(TOTAL_RACE_DISTANCE - playerDistance));
    distVal.textContent = remainingM + " m";
  }

  renderer.render(scene, camera);
}

// Window Resize Handling
window.addEventListener("resize", () => {
  const mobile = isMobileDevice();
  camera.fov = mobile ? 60 : 50;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Initialize Title View
renderShowroomCar(0);
animate();