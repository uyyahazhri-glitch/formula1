// ==========================================
// 🎵 2 SEPARATE BACKGROUND AUDIO TRACKS
// ==========================================
const menuBGM = new Audio("menu.mp3");
menuBGM.loop = true;
menuBGM.volume = 0.50;

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

// --- F1 MACHINES & DRIVERS DATA ---
const CARS = [
  {
    name: "Red Bull Racing RB20",
    driver: "Max Verstappen #1",
    suitColor: 0x06153b,
    accentColor: 0xd91438,
    hairColor: 0x8b5a2b,
    capColor: 0x030d22,
    skinTone: 0xffdfc4,
    desc: "Superior aerodynamic balance built for fast and technical corners.",
    bodyColor: 0x030d22,
    wingColor: 0xd91438,
    sideColor: 0xd91438,
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
    suitColor: 0x181e24,
    accentColor: 0x00d2be,
    hairColor: 0x4a2e18,
    capColor: 0x00d2be,
    skinTone: 0xffdfc4,
    desc: "Smooth steering response with outstanding high-speed stability.",
    bodyColor: 0x9aa0a6,
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

// --- LEVEL CONFIGURATION DATA ---
const LEVELS = [
  {
    id: 1,
    name: "MONZA GP (DAY)",
    skyColor: 0x60a5fa,
    fogColor: 0x60a5fa,
    roadColor: 0x22262e,
    grassColor: 0x3d7032,
    buildingColor: 0x2c3e50,
    distance: 3000,
    curvePower: 0.00035,
    aiSpeedBonus: 0,
    ambientLight: 0.85,
    isRain: false,
    gripMultiplier: 1.0
  },
  {
    id: 2,
    name: "SUZUKA GP (WET / RAIN)",
    skyColor: 0x475569,
    fogColor: 0x334155,
    roadColor: 0x14171d,
    grassColor: 0x1e3a1f,
    buildingColor: 0x1e293b,
    distance: 4000,
    curvePower: 0.00055,
    aiSpeedBonus: 0.02,
    ambientLight: 0.55,
    isRain: true,
    gripMultiplier: 0.72
  },
  {
    id: 3,
    name: "SINGAPORE NIGHT GP",
    skyColor: 0x05070e,
    fogColor: 0x05070e,
    roadColor: 0x11161d,
    grassColor: 0x0f2d15,
    buildingColor: 0x1e1b4b,
    distance: 5000,
    curvePower: 0.00075,
    aiSpeedBonus: 0.06,
    ambientLight: 0.45,
    isRain: false,
    gripMultiplier: 1.0
  }
];

const TRACK_BOUNDARY_X = 6.6;

let currentLevelIdx = 0;
let currentIndex = 0;
const container = document.getElementById("gameWrapper");

// Navigation DOM Elements
const mainTitleScreen = document.getElementById("mainTitleScreen");
const carSelectScreen = document.getElementById("carSelectScreen");
const trackSelectScreen = document.getElementById("trackSelectScreen");
const mainStartBtn = document.getElementById("mainStartBtn");
const backToTitleBtn = document.getElementById("backToTitleBtn");
const goToTrackBtn = document.getElementById("goToTrackBtn");
const backToCarBtn = document.getElementById("backToCarBtn");
const startRaceFinalBtn = document.getElementById("startRaceFinalBtn");

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
const nextLvlBtn = document.getElementById("nextLvlBtn");
const currentLvlBadge = document.getElementById("currentLvlBadge");
const mobileControls = document.getElementById("mobileControls");

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
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(compressor);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    }
  } catch (e) {}
}

// --- THREE.JS SETUP & SISTEM HUJAN 3D ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1724);

const isMobileDevice = () => window.innerWidth < 768 || window.innerHeight > window.innerWidth;

const camera = new THREE.PerspectiveCamera(
  isMobileDevice() ? 60 : 50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(15, 25, 20);
scene.add(dirLight);

// Pentas Showroom
const showroomStage = new THREE.Group();
const stageGeo = new THREE.CylinderGeometry(5.2, 5.4, 0.3, 40);
const stageMat = new THREE.MeshStandardMaterial({ color: 0x131d2b, roughness: 0.4 });
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
const RAIN_COUNT = 900;
const rainGeo = new THREE.BufferGeometry();
const rainPositions = new Float32Array(RAIN_COUNT * 3);

for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
  rainPositions[i] = (Math.random() - 0.5) * 50;
  rainPositions[i + 1] = Math.random() * 30 + 1;
  rainPositions[i + 2] = (Math.random() - 0.5) * 60;
}

rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
const rainMat = new THREE.PointsMaterial({
  color: 0x93c5fd,
  size: 0.22,
  transparent: true,
  opacity: 0.65
});
const rainParticles = new THREE.Points(rainGeo, rainMat);
scene.add(rainParticles);
rainParticles.visible = false;

// --- PROCEDURAL 3D DRIVER CHARACTER ---
function buildHandsomeDriver(data) {
  const driver = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: data.skinTone || 0xffdfc4, roughness: 0.5 });
  const hairMat = new THREE.MeshStandardMaterial({ color: data.hairColor || 0x4a2e18, roughness: 0.8 });
  const suitMat = new THREE.MeshStandardMaterial({ color: data.suitColor || 0x11161d, roughness: 0.5 });
  const accentMat = new THREE.MeshStandardMaterial({ color: data.accentColor || 0xffffff, roughness: 0.4 });
  const capMat = new THREE.MeshStandardMaterial({ color: data.capColor || 0xd40000, roughness: 0.4 });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
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

  const sideHairGeo = new THREE.BoxGeometry(0.04, 0.22, 0.2);
  const leftSideHair = new THREE.Mesh(sideHairGeo, hairMat);
  leftSideHair.position.set(-0.2, 1.5, 0);
  const rightSideHair = new THREE.Mesh(sideHairGeo, hairMat);
  rightSideHair.position.set(0.2, 1.5, 0);
  driver.add(leftSideHair, rightSideHair);

  const capTopGeo = new THREE.BoxGeometry(0.4, 0.12, 0.38);
  const capTop = new THREE.Mesh(capTopGeo, capMat);
  capTop.position.set(0, 1.74, 0);
  driver.add(capTop);

  const capVisorGeo = new THREE.BoxGeometry(0.38, 0.03, 0.24);
  const capVisor = new THREE.Mesh(capVisorGeo, capMat);
  capVisor.position.set(0, 1.68, 0.26);
  capVisor.rotation.x = 0.08;
  driver.add(capVisor);

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

  const browGeo = new THREE.BoxGeometry(0.11, 0.03, 0.03);
  const leftBrow = new THREE.Mesh(browGeo, hairMat);
  leftBrow.position.set(-0.1, 1.53, 0.185);
  const rightBrow = new THREE.Mesh(browGeo, hairMat);
  rightBrow.position.set(0.1, 1.53, 0.185);
  driver.add(leftBrow, rightBrow);

  const noseGeo = new THREE.BoxGeometry(0.06, 0.1, 0.07);
  const nose = new THREE.Mesh(noseGeo, skinMat);
  nose.position.set(0, 1.42, 0.2);
  driver.add(nose);

  const smileGeo = new THREE.BoxGeometry(0.14, 0.03, 0.02);
  const smile = new THREE.Mesh(smileGeo, new THREE.MeshBasicMaterial({ color: 0xaa4444 }));
  smile.position.set(0, 1.33, 0.18);
  driver.add(smile);

  const bodyGeo = new THREE.BoxGeometry(0.56, 0.68, 0.32);
  const body = new THREE.Mesh(bodyGeo, suitMat);
  body.position.y = 0.95;
  driver.add(body);

  const stripeGeo = new THREE.BoxGeometry(0.16, 0.68, 0.33);
  const stripe = new THREE.Mesh(stripeGeo, accentMat);
  stripe.position.y = 0.95;
  driver.add(stripe);

  const beltGeo = new THREE.BoxGeometry(0.58, 0.08, 0.34);
  const belt = new THREE.Mesh(beltGeo, new THREE.MeshStandardMaterial({ color: 0x111111 }));
  belt.position.y = 0.65;
  driver.add(belt);

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

// --- PROCEDURAL 3D F1 CAR ---
function buildF1Car(data, isRacingMode = false) {
  const car = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: data.bodyColor, roughness: 0.3 });
  const wingMat = new THREE.MeshStandardMaterial({ color: data.wingColor, roughness: 0.3 });
  const sideMat = new THREE.MeshStandardMaterial({ color: data.sideColor, roughness: 0.3 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x151b22, roughness: 0.6 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x242b35, roughness: 0.8 });

  const chassisGeo = new THREE.BoxGeometry(0.8, 0.35, 3.8);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  chassis.position.set(0, 0.3, 0);
  car.add(chassis);

  const noseGeo = new THREE.ConeGeometry(0.4, 1.2, 4);
  const nose = new THREE.Mesh(noseGeo, bodyMat);
  nose.rotation.x = -Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.position.set(0, 0.3, 2.4);
  car.add(nose);

  const spGeo = new THREE.BoxGeometry(0.5, 0.3, 1.8);
  const spL = new THREE.Mesh(spGeo, sideMat);
  spL.position.set(-0.65, 0.28, -0.2);
  const spR = new THREE.Mesh(spGeo, sideMat);
  spR.position.set(0.65, 0.28, -0.2);
  car.add(spL, spR);

  const fwGeo = new THREE.BoxGeometry(2.6, 0.06, 0.6);
  const fw = new THREE.Mesh(fwGeo, wingMat);
  fw.position.set(0, 0.15, 2.1);
  car.add(fw);

  const rwGeo = new THREE.BoxGeometry(2.0, 0.08, 0.65);
  const rw = new THREE.Mesh(rwGeo, wingMat);
  rw.position.set(0, 0.85, -1.8);
  car.add(rw);

  const pilGeo = new THREE.BoxGeometry(0.1, 0.45, 0.15);
  const pil1 = new THREE.Mesh(pilGeo, darkMat);
  pil1.position.set(-0.35, 0.6, -1.8);
  const pil2 = pil1.clone();
  pil2.position.set(0.35, 0.6, -1.8);
  car.add(pil1, pil2);

  const cockpitHoleGeo = new THREE.BoxGeometry(0.45, 0.25, 0.9);
  const cockpitHole = new THREE.Mesh(cockpitHoleGeo, darkMat);
  cockpitHole.position.set(0, 0.42, 0.15);
  car.add(cockpitHole);

  if (isRacingMode) {
    const helmetMat = new THREE.MeshStandardMaterial({
      color: data.capColor || 0xffffff,
      roughness: 0.2
    });
    const helmetGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.set(0, 0.62, 0.15);
    car.add(helmet);

    const visorMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const visorGeo = new THREE.BoxGeometry(0.26, 0.09, 0.16);
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.63, 0.25);
    car.add(visor);
  }

  const rimGeo = new THREE.TorusGeometry(0.18, 0.03, 8, 20);
  const steer = new THREE.Mesh(rimGeo, darkMat);
  steer.rotation.x = Math.PI / 3;
  steer.position.set(0, 0.52, 0.4);
  car.add(steer);

  car.wheels = [];
  const makeWheel = (x, z) => {
    const wGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.36, 24);
    const w = new THREE.Mesh(wGeo, wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, 0.45, z);
    car.add(w);
    car.wheels.push(w);
  };

  makeWheel(-1.15, 1.4);
  makeWheel(1.15, 1.4);
  makeWheel(-1.25, -1.3);
  makeWheel(1.25, -1.3);

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
  handsomeDriver.position.set(-1.55, 0, 0.35);
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

// Car Selection Navigation Buttons
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

// Showroom Mouse Drag 360° Rotation
let isDragging = false;
let prevMouseX = 0;
let carRotationY = -Math.PI / 4;

window.addEventListener("mousedown", (e) => {
  if (gameState === "CAR_SELECT" || gameState === "TRACK_SELECT") {
    isDragging = true;
    prevMouseX = e.clientX;
  }
});
window.addEventListener("mouseup", () => isDragging = false);
window.addEventListener("mousemove", (e) => {
  if (isDragging && (gameState === "CAR_SELECT" || gameState === "TRACK_SELECT")) {
    carRotationY += (e.clientX - prevMouseX) * 0.01;
    prevMouseX = e.clientX;
  }
});

// Touch Drag Support for Mobile Showroom
window.addEventListener("touchstart", (e) => {
  if ((gameState === "CAR_SELECT" || gameState === "TRACK_SELECT") && e.touches.length > 0) {
    isDragging = true;
    prevMouseX = e.touches[0].clientX;
  }
}, { passive: true });
window.addEventListener("touchend", () => isDragging = false);
window.addEventListener("touchmove", (e) => {
  if (isDragging && (gameState === "CAR_SELECT" || gameState === "TRACK_SELECT") && e.touches.length > 0) {
    carRotationY += (e.touches[0].clientX - prevMouseX) * 0.015;
    prevMouseX = e.touches[0].clientX;
  }
}, { passive: true });

// --- MENU FLOW STATE MANAGEMENT ---
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

goToTrackBtn.addEventListener("click", () => {
  playSoundFX("beep");
  gameState = "TRACK_SELECT";
  carSelectScreen.classList.add("hidden");
  trackSelectScreen.classList.remove("hidden");
});

backToCarBtn.addEventListener("click", () => {
  playSoundFX("beep");
  gameState = "CAR_SELECT";
  trackSelectScreen.classList.add("hidden");
  carSelectScreen.classList.remove("hidden");
});

document.querySelectorAll(".track-card").forEach((card) => {
  card.addEventListener("click", () => {
    playSoundFX("beep");
    document.querySelectorAll(".track-card").forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    currentLevelIdx = parseInt(card.dataset.lvl);
  });
});

startRaceFinalBtn.addEventListener("click", () => {
  trackSelectScreen.classList.add("hidden");
  startRaceForCurrentLevel();
});

// --- IN-GAME QUICK CONTROLS (PAUSE, RESTART, MUTE) ---
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

// --- 3D ENVIRONMENT ---
const raceWorld = new THREE.Group();
scene.add(raceWorld);
raceWorld.visible = false;

const ROAD_SEGMENT_COUNT = 80;
const SEGMENT_LENGTH = 8;
const roadSegments = [];

const segGeo = new THREE.PlaneGeometry(18, SEGMENT_LENGTH);
const segMat = new THREE.MeshStandardMaterial({ color: 0x22262e, roughness: 0.9 });
const grassMat = new THREE.MeshStandardMaterial({ color: 0x3d7032, roughness: 0.9 });

for (let i = 0; i < ROAD_SEGMENT_COUNT; i++) {
  const segGroup = new THREE.Group();

  const rMesh = new THREE.Mesh(segGeo, segMat);
  rMesh.rotation.x = -Math.PI / 2;
  segGroup.add(rMesh);

  const isRed = i % 2 === 0;
  const kMat = new THREE.MeshBasicMaterial({ color: isRed ? 0xd91438 : 0xffffff });
  const kGeo = new THREE.BoxGeometry(0.8, 0.15, SEGMENT_LENGTH);
  const kL = new THREE.Mesh(kGeo, kMat);
  kL.position.set(-9.4, 0.08, 0);
  const kR = kL.clone();
  kR.position.set(9.4, 0.08, 0);
  segGroup.add(kL, kR);

  const lmGeo = new THREE.PlaneGeometry(0.3, SEGMENT_LENGTH * 0.4);
  const lmMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  [-4.5, 0, 4.5].forEach(lx => {
    const lm = new THREE.Mesh(lmGeo, lmMat);
    lm.rotation.x = -Math.PI / 2;
    lm.position.set(lx, 0.02, 0);
    segGroup.add(lm);
  });

  const gGeo = new THREE.PlaneGeometry(100, SEGMENT_LENGTH);
  const gL = new THREE.Mesh(gGeo, grassMat);
  gL.rotation.x = -Math.PI / 2;
  gL.position.set(-59, -0.05, 0);
  const gR = gL.clone();
  gR.position.set(59, -0.05, 0);
  segGroup.add(gL, gR);

  segGroup.zOffset = -i * SEGMENT_LENGTH;
  segGroup.position.z = segGroup.zOffset;
  raceWorld.add(segGroup);
  roadSegments.push(segGroup);
}

const startGantry = new THREE.Group();
const startLineMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 3),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
startLineMesh.rotation.x = -Math.PI / 2;
startLineMesh.position.set(0, 0.04, 0);
startGantry.add(startLineMesh);
raceWorld.add(startGantry);

const finishGantry = new THREE.Group();
const gBar = new THREE.Mesh(new THREE.BoxGeometry(22, 1, 1), new THREE.MeshStandardMaterial({ color: 0x111 }));
gBar.position.y = 8;
finishGantry.add(gBar);
const fLine = new THREE.Mesh(new THREE.PlaneGeometry(18, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
fLine.rotation.x = -Math.PI / 2;
fLine.position.set(0, 0.05, 0);
finishGantry.add(fLine);
raceWorld.add(finishGantry);

const sceneries = [];
for (let i = 0; i < 36; i++) {
  const h = Math.random() * 25 + 15;
  const bGeo = new THREE.BoxGeometry(9, h, 9);
  const bMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
  const b = new THREE.Mesh(bGeo, bMat);
  const side = Math.random() > 0.5 ? 1 : -1;
  b.baseSide = side;
  b.baseDist = side * (Math.random() * 25 + 26);
  b.zOffset = -i * 20;
  b.position.set(b.baseDist, h / 2, b.zOffset);
  raceWorld.add(b);
  sceneries.push(b);
}

function applyLevelVisuals(lvl) {
  scene.background = new THREE.Color(lvl.skyColor);
  scene.fog = new THREE.FogExp2(lvl.fogColor, 0.005);
  ambLight.intensity = lvl.ambientLight;
  segMat.color.setHex(lvl.roadColor);
  grassMat.color.setHex(lvl.grassColor);

  if (lvl.isRain) {
    segMat.roughness = 0.2;
    rainParticles.visible = true;
  } else {
    segMat.roughness = 0.9;
    rainParticles.visible = false;
  }

  sceneries.forEach(b => {
    b.material.color.setHex(lvl.buildingColor);
  });
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
  { name: "Ferrari Bot", bodyColor: 0xd40000, wingColor: 0x111111, sideColor: 0xffffff, gridX: -1.5, gridZ: -24, capColor: 0xd40000 },
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

// --- MOBILE TOUCH CONTROLS BINDING ---
function bindTouchKey(elemId, keyProp) {
  const btn = document.getElementById(elemId);
  if (!btn) return;

  const press = (e) => {
    e.preventDefault();
    keys[keyProp] = true;
  };
  const release = (e) => {
    e.preventDefault();
    keys[keyProp] = false;
  };

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
  score = 0;
  raceTime = 0;
  prevRank = 5;
  timeLiveVal.textContent = "0";
  distVal.textContent = currentLvl.distance + " m";

  if (showroomDisplayGroup) scene.remove(showroomDisplayGroup);
  activeCar = buildF1Car(CARS[currentIndex], true);
  activeCar.position.set(playerX, 0, PLAYER_BASE_Z);
  scene.add(activeCar);

  trackObstacles.forEach(o => scene.remove(o));
  trackObstacles = [];
  aiCars.forEach(ai => scene.remove(ai.mesh));
  aiCars = [];

  // Inisialisasi Bot AI lengkap dengan fizik melayang & graviti
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
    endSub.textContent = `🏆 P1 WINNER! You dominated the ${currentLvl.name}!`;
    triggerTeamRadio("P1, champion drive! That was masterclass!");
  } else if (pos <= 3) {
    finalPosBadge.style.color = "#38bdf8";
    endSub.textContent = `🎉 PODIUM P${pos}! You qualify for the next Grand Prix!`;
    triggerTeamRadio(`Podium finish P${pos}! Great job team!`);
  } else {
    finalPosBadge.style.color = "#94a3b8";
    endSub.textContent = "You completed the full Grand Prix circuit distance.";
    triggerTeamRadio("Checkered flag. Well brought home.");
  }

  if (currentLevelIdx < LEVELS.length - 1) {
    nextLvlBtn.style.display = "block";
    nextLvlBtn.textContent = `NEXT: LVL ${currentLevelIdx + 2} ⏩`;
  } else {
    nextLvlBtn.style.display = "none";
    endSub.textContent += " 🌟 CONGRATULATIONS! You completed all Grand Prix championships!";
  }
}

nextLvlBtn.addEventListener("click", () => {
  if (currentLevelIdx < LEVELS.length - 1) {
    currentLevelIdx++;
    document.querySelectorAll(".track-card").forEach((c) => {
      c.classList.toggle("active", parseInt(c.dataset.lvl) === currentLevelIdx);
    });
    startRaceForCurrentLevel();
  }
});

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
  carSelectScreen.classList.add("hidden");
  trackSelectScreen.classList.add("hidden");
  mainTitleScreen.classList.remove("hidden");

  if (activeCar) scene.remove(activeCar);

  showroomStage.visible = true;
  raceWorld.visible = false;
  rainParticles.visible = false;
  scene.background = new THREE.Color(0x0e1724);
  scene.fog = null;
  ambLight.intensity = 0.7;

  aiCars.forEach(ai => scene.remove(ai.mesh));
  aiCars = [];

  renderShowroomCar(currentIndex);
  playMenuMusic();
});

// FUNGSI MELAYANGKAN BOT AI BILA BERLANGGAR (FAIR CRASH)
function triggerAICrash(ai, pushDirX) {
  ai.isAirborne = true;
  ai.velocityY = 0.22;
  ai.airborneSpin = 18;
  ai.targetX += pushDirX * 1.6;
  ai.speed *= 0.45; // Bot hilang kelajuan bila melayang
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

  if (gameState === "TITLE" || gameState === "CAR_SELECT" || gameState === "TRACK_SELECT") {
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

    // 🌧️ Animasi Hujan
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

    // 1. FIZIK & KAWALAN KERETA PEMAIN
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

    // Had Sempadan Litar Pemain
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

    sceneries.forEach(item => {
      item.position.z += speed * 20;
      if (item.position.z > 25) item.position.z -= 700;
      const zDist = Math.abs(item.position.z);
      const roadBendX = -curveValue * curveStrength * (zDist * zDist);
      item.position.x = item.baseDist + roadBendX;
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

    // 2. FIZIK BOT AI (KINI BOT BOLEH MELAYANG JUGA!)
    aiCars.forEach((ai) => {
      // Jika bot sedang melayang di udara
      if (ai.isAirborne) {
        ai.y += ai.velocityY;
        ai.velocityY -= 0.012; // Graviti bot
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

      ai.mesh.position.set(ai.x + aiBendX, ai.y, relZ);
      if (!ai.isAirborne) {
        ai.mesh.rotation.y = Math.PI - (curveValue * 0.15);
      }

      if (ai.mesh.wheels) {
        ai.mesh.wheels.forEach(w => { w.rotation.x += ai.speed * 0.5; });
      }

      // 💥 PERLANGGARAN ADIL: KEDUA-DUA JENTERA ATAU BOT MELAYANG!
      if (Math.abs(relZ - PLAYER_BASE_Z) < 1.8 && Math.abs((ai.x + aiBendX) - playerX) < 1.4) {
        const pushDir = playerX < (ai.x + aiBendX) ? -1 : 1;

        // Jika pemain melanggar bot dengan laju, BOT turut melayang ke udara!
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

    // Rintangan di litar (Kon & Minyak)
    trackObstacles.forEach(obs => {
      const relZ = -(obs.trackDist - playerDistance) + PLAYER_BASE_Z;
      const zDist = Math.abs(relZ);
      const obsBendX = -curveValue * curveStrength * (zDist * zDist);

      obs.position.set(obs.laneX + obsBendX, 0, relZ);

      // Pemain langgar rintangan
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

      // 🤖 Bot AI turut melanggar kon atau minyak (Adil!)
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