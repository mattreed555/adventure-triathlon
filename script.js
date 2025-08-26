// ===== SUPABASE CONFIGURATION =====
const SUPABASE_URL = 'https://awbmqsuoqretisrhkpqe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Ym1xc3VvcXJldGlzcmhrcHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxODIzMDksImV4cCI6MTk4OTc1ODMwOX0.leAvGr6lASVRC20N0hm9UsL8BbW9CXw2LuG76xDhOIw';

let supabase;
let currentUser = null;

// ===== CONSTANTS =====
const MONTHS = ['may', 'june', 'july', 'august', 'september'];
const MONTH_NAMES = ['May', 'June', 'July', 'August', 'September'];
const TOTAL_MONTHS = 5;
const MAX_PERCENT = 99.999;
const MIN_PERCENT = 0.001;
const OVERFLOW_ADJUSTMENT = 100.1;
const SAFE_MAX_PERCENT = 99.1;

// Default goal values
const DEFAULT_SWIM_GOAL = 24000;
const DEFAULT_STEPS_GOAL = 1200000;
const DEFAULT_CYCLE_GOAL = 800;
const DEFAULT_DIVERSITY_GOAL = 16;

const SUMMER_ACTIVITIES = [
  { name: "Ruck", abbreviation: "R", emoji: "🥾", unit: "miles", suggestedGoal: 100 },
  { name: "Paddleboard", abbreviation: "PB", emoji: "🏄‍♂️", unit: "miles", suggestedGoal: 15 },
  { name: "Kayak", abbreviation: "K", emoji: "🛶", unit: "miles", suggestedGoal: 25 },
  { name: "Row", abbreviation: "R", emoji: "🚣‍♂️", unit: "miles", suggestedGoal: 25 },
  { name: "Mountain Bike", abbreviation: "MB", emoji: "🚵‍♂️", unit: "miles", suggestedGoal: 100 },
  { name: "Forest Bathe", abbreviation: "FB", emoji: "🌲", unit: "times", suggestedGoal: 15 },
  { name: "Goat Yoga", abbreviation: "GY", emoji: "🐐", unit: "times", suggestedGoal: 15 },
  { name: "Yoga (Non-Goat)", abbreviation: "Y", emoji: "🧘‍♀️", unit: "times", suggestedGoal: 10 },
  { name: "Rock Climb", abbreviation: "RC", emoji: "🧗‍♂️", unit: "time", suggestedGoal: 15 },
  { name: "Pickleball", abbreviation: "P", emoji: "🏓", unit: "times", suggestedGoal: 15 },
  { name: "Tennis", abbreviation: "T", emoji: "🎾", unit: "times", suggestedGoal: 15 },
  { name: "Water Balloon Tag", abbreviation: "WB", emoji: "💦", unit: "times", suggestedGoal: 15 },
  { name: "Dance", abbreviation: "D", emoji: "💃", unit: "times", suggestedGoal: 15 },
  { name: "Urban Stairclimb", abbreviation: "US", emoji: "🏙️", unit: "times", suggestedGoal: 15 },
  { name: "Jump Rope", abbreviation: "JR", emoji: "🤾", unit: "minutes", suggestedGoal: 480 },
  { name: "Badminton", abbreviation: "B", emoji: "🏸", unit: "times", suggestedGoal: 15 },
  { name: "Challenge/Competition", abbreviation: "C", emoji: "🏆", unit: "events", suggestedGoal: 5 },
  { name: "Tai Chi", abbreviation: "TC", emoji: "🐉", unit: "times", suggestedGoal: 10 },
  { name: "Roller Skate / Blade", abbreviation: "R", emoji: "🛼", unit: "times", suggestedGoal: 10 },
  { name: "Stretch", abbreviation: "S", emoji: "🧎‍♀️", unit: "times", suggestedGoal: 75 }
];

const VIBE_OPTIONS = [
  { char: "❤️", name: "heart" },
  { char: "😀", name: "grinning face" },
  { char: "😁", name: "beaming smile" },
  { char: "😂", name: "tears of joy" },
  { char: "🤩", name: "star-struck" },
  { char: "😊", name: "blush" },
  { char: "😇", name: "innocent" },
  { char: "😎", name: "cool" },
  { char: "😌", name: "relieved" },
  { char: "😍", name: "heart eyes" },
  { char: "🥰", name: "smiling with hearts" },
  { char: "😅", name: "sweat smile" },
  { char: "🤗", name: "hug" },
  { char: "🥲", name: "smiling tear" },
  { char: "😔", name: "pensive" },
  { char: "😢", name: "crying" },
  { char: "😠", name: "angry" },
  { char: "😤", name: "steam from nose" },
  { char: "😫", name: "tired" },
  { char: "😴", name: "sleepy" },
  { char: "🤒", name: "sick" },
  { char: "🤕", name: "hurt" },
  { char: "🥵", name: "hot" },
  { char: "🥶", name: "cold" },
  { char: "🫠", name: "melting" },
  { char: "🤯", name: "mind blown" },
  { char: "🫥", name: "dotted outline" },
  { char: "🧘", name: "meditation" },
  { char: "🥳", name: "party face" },
  { char: "😵‍💫", name: "dizzy" },
  { char: "🤔", name: "thinking" },
  { char: "😶", name: "speechless" },
  { char: "🫤", name: "meh" },
  { char: "😬", name: "grimace" },
  { char: "🙃", name: "upside-down" },
  { char: "🫣", name: "peek" },
  { char: "🏊‍♂️", name: "swimming" },
  { char: "🚴‍♀️", name: "biking" },
  { char: "🏃‍♂️", name: "running" },
  { char: "🥾", name: "hiking" },
  { char: "🧗‍♀️", name: "climbing" },
  { char: "🏄‍♂️", name: "surfing" },
  { char: "🧘‍♀️", name: "yoga" },
  { char: "🤸", name: "cartwheel" },
  { char: "🏋️", name: "lifting" },
  { char: "🤽", name: "water polo" },
  { char: "⛹️", name: "basketball" },
  { char: "🥎", name: "softball" },
  { char: "⚽", name: "soccer" },
  { char: "🏐", name: "volleyball" },
  { char: "🏓", name: "ping pong" },
  { char: "🏸", name: "badminton" },
  { char: "🛶", name: "canoeing" },
  { char: "🛹", name: "skateboard" },
  { char: "🛷", name: "sledding" },
  { char: "☀️", name: "sun" },
  { char: "🌈", name: "rainbow" },
  { char: "🌤️", name: "sun behind cloud" },
  { char: "⛱️", name: "beach umbrella" },
  { char: "🌊", name: "wave" },
  { char: "🍉", name: "watermelon" },
  { char: "🍦", name: "ice cream" },
  { char: "🧊", name: "ice cube" },
  { char: "🕶️", name: "sunglasses" },
  { char: "🩱", name: "swimsuit" },
  { char: "🩴", name: "flip-flops" },
  { char: "🧴", name: "sunscreen" },
  { char: "🏖️", name: "beach" },
  { char: "🧭", name: "compass" },
  { char: "🏕️", name: "camping" },
  { char: "🏞️", name: "national park" },
  { char: "🗺️", name: "map" },
  { char: "🧳", name: "luggage" },
  { char: "🚗", name: "car" },
  { char: "🚙", name: "SUV" },
  { char: "🚌", name: "bus" },
  { char: "🛻", name: "pickup" },
  { char: "⛺", name: "tent" },
  { char: "🚤", name: "speedboat" },
  { char: "🏝️", name: "desert island" },
  { char: "🏔️", name: "mountain" },
  { char: "🌋", name: "volcano" },
  { char: "🌆", name: "city sunset" },
  { char: "🌃", name: "night sky" },
  { char: "🛼", name: "roller skate" },
  { char: "🎢", name: "rollercoaster" },
  { char: "🎡", name: "ferris wheel" },
  { char: "🏟️", name: "stadium" },
  { char: "🎆", name: "fireworks" },
  { char: "🇺🇸", name: "usa flag" },
  { char: "🎇", name: "sparkler" },
  { char: "🎉", name: "celebration" },
  { char: "🎈", name: "balloon" },
  { char: "🍔", name: "burger" },
  { char: "🌭", name: "hot dog" },
  { char: "🍻", name: "cheers" },
  { char: "🎶", name: "music" },
  { char: "🪩", name: "disco" },
  { char: "🎤", name: "mic" },
  { char: "🐦", name: "bird" },
  { char: "🐧", name: "penguin" },
  { char: "🐤", name: "baby chick" },
  { char: "🐣", name: "hatching chick" },
  { char: "🐥", name: "chick face" },
  { char: "🦉", name: "owl" },
  { char: "🦅", name: "eagle" },
  { char: "🕊️", name: "dove" },
  { char: "🐓", name: "rooster" },
  { char: "🦆", name: "duck" },
  { char: "🦢", name: "swan" },
  { char: "🦤", name: "dodo" },
  { char: "🦚", name: "peacock" },
  { char: "🦜", name: "parrot" },
  { char: "🪶", name: "feather" }
];

// ===== GLOBAL STATE =====
const appData = {
  swimData: [0, 0, 0, 0, 0],
  swimGoal: DEFAULT_SWIM_GOAL,
  swimActive: 1,
  stepsData: [0, 0, 0, 0, 0],
  stepsGoal: DEFAULT_STEPS_GOAL,
  stepsActive: 1,
  cycleData: [0, 0, 0, 0, 0],
  cycleGoal: DEFAULT_CYCLE_GOAL,
  cycleActive: 1,
  pickData: [0, 0, 0, 0, 0],
  pickGoal: 0,
  pickActive: 0,
  pickName: "",
  pickAbbreviation: "",
  pickUnits: "",
  pickEmoji: "",
  diversityData1: [0, 0, 0, 0, 0],
  diversityName1: "",
  diversityEmoji1: "",
  diversityData2: [0, 0, 0, 0, 0],
  diversityName2: "",
  diversityEmoji2: "",
  diversityData3: [0, 0, 0, 0, 0],
  diversityName3: "",
  diversityEmoji3: "",
  diversityData4: [0, 0, 0, 0, 0],
  diversityName4: "",
  diversityEmoji4: "",
  diversityGoal: DEFAULT_DIVERSITY_GOAL,
  diversityActive: 0,
  vibeData: ["", "", "", "", ""],
  goalsExplicitlySet: false  // Track if user has actually saved goals
};

let summaries = {};
let allDiversityData = [];

// ===== UTILITY FUNCTIONS =====
function getElement(id) {
  const element = document.getElementById(id);
  // Don't warn about these expected missing elements
  const expectedMissing = [
    'update-progress-dropdown',
    'share-progress-dropdown', 
    'share-progress-dialog-save',
    'swim-progress-name',
    'cycle-progress-name',
    'steps-progress-name',
    'diversity-progress-name'
  ];
  
  if (!element && !expectedMissing.includes(id)) {
    console.warn(`Element with id '${id}' not found`);
  }
  return element;
}

function getMonthValue(array, monthIndex, defaultValue = 0) {
  return monthIndex >= array.length ? defaultValue : array[monthIndex];
}

function ensureArrayLength(propname, targetLength, defaultVal = 0) {
  if (appData[propname].length < targetLength) {
    const toAdd = targetLength - appData[propname].length;
    for (let j = 0; j < toAdd; j++) {
      appData[propname].push(defaultVal);
    }
  }
}

function interpolateMonths(...activityValues) {
  const combined = new Array(TOTAL_MONTHS).fill(0);
  
  activityValues.forEach(activityValue => {
    for (let j = 0; j < activityValue.length; j++) {
      combined[j] += activityValue[j];
    }
  });
  
  return combined;
}

function formatNumber(n) {
  if (n >= MAX_PERCENT) return "100";
  if (n <= MIN_PERCENT) return "0";
  
  const rounded = Math.round(n);
  return Math.abs(n - rounded) < 1e-6 ? String(rounded) : n.toFixed(1);
}

function getProgressPercent(list, total, active) {
  const sum = list.reduce((acc, val) => acc + val, 0);
  const percent = (sum / total) * 100;
  
  if (active === 0 || sum <= 0) return MIN_PERCENT;
  if (percent > 100) return MAX_PERCENT;
  
  return percent;
}

function getRandomActivity(exclude = []) {
  const availableActivities = exclude.length > 0 
    ? SUMMER_ACTIVITIES.filter(activity => !exclude.includes(activity.name))
    : SUMMER_ACTIVITIES;
    
  const index = Math.floor(Math.random() * availableActivities.length);
  return availableActivities[index];
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

// ===== DATA MANAGEMENT =====
function handleSave(elName, dataName, type) {
  const element = getElement(elName);
  if (!element) return false;
  
  let newValue;
  if (type === "number") {
    newValue = parseInt(element.value);
  } else if (type === "bool") {
    newValue = element.checked ? 1 : 0;
  } else if (type === "span") {
    newValue = element.innerHTML;
  } else {
    newValue = element.value;
  }
  
  if (newValue !== appData[dataName]) {
    appData[dataName] = newValue;
    return true;
  }
  return false;
}

function madeChanges(...results) {
  return results.some(Boolean);
}

function saveOtherValues() {
  ensureArrayLength("swimData", TOTAL_MONTHS);
  ensureArrayLength("stepsData", TOTAL_MONTHS);
  ensureArrayLength("cycleData", TOTAL_MONTHS);
  ensureArrayLength("pickData", TOTAL_MONTHS);
  
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    appData.swimData[i] = parseInt(getElement(`${monthName}-swim-input`)?.value || 0);
    appData.stepsData[i] = parseInt(getElement(`${monthName}-steps-input`)?.value || 0);
    appData.cycleData[i] = parseInt(getElement(`${monthName}-cycle-input`)?.value || 0);
    appData.pickData[i] = parseInt(getElement(`${monthName}-pick-input`)?.value || 0);
  }
  
  return false;
}

function saveDiversity() {
  ensureArrayLength("diversityData1", TOTAL_MONTHS);
  ensureArrayLength("diversityData2", TOTAL_MONTHS);
  ensureArrayLength("diversityData3", TOTAL_MONTHS);
  ensureArrayLength("diversityData4", TOTAL_MONTHS);
  
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    appData.diversityData1[i] = getDiversity(`${monthName}-diversity-check-1`);
    appData.diversityData2[i] = getDiversity(`${monthName}-diversity-check-2`);
    appData.diversityData3[i] = getDiversity(`${monthName}-diversity-check-3`);
    appData.diversityData4[i] = getDiversity(`${monthName}-diversity-check-4`);
  }
}

function saveVibes() {
  ensureArrayLength("vibeData", TOTAL_MONTHS, "");
  
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    const emoji1 = getElement(`${monthName}-vibe1-selected-emoji`)?.firstChild?.alt || "";
    const emoji2 = getElement(`${monthName}-vibe2-selected-emoji`)?.firstChild?.alt || "";
    const emoji3 = getElement(`${monthName}-vibe3-selected-emoji`)?.firstChild?.alt || "";
    appData.vibeData[i] = emoji1 + emoji2 + emoji3;
  }
}

// ===== ACTIVITY UPDATE FUNCTIONS =====
function updateActivityProgress(activityName, chartId, color, imagePath, dataKey, goalKey, activeKey, abbreviation = null) {
  summaries[activityName] = getProgressPercent(appData[dataKey], appData[goalKey], appData[activeKey]);
  
  makeDonut(chartId, summaries[activityName], color, imagePath, appData[activeKey], abbreviation);
  
  const chartElement = getElement(`${activityName}-progress-chart`);
  if (chartElement) {
    createChart(appData[dataKey], appData[goalKey], chartElement, color, "#6B6B6B", appData[activeKey]);
  }
  
  createChartNotes(activityName, appData[goalKey]);
}

function updateSwimming() {
  updateActivityProgress("swim", "donut-chart1", "#77c7d2", 
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/SwimWatercolor.svg?v=1743556029550",
    "swimData", "swimGoal", "swimActive");
}

function updateSteps() {
  updateActivityProgress("steps", "donut-chart3", "#6e9d58",
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/RunWatercolor.svg?v=1743559096749",
    "stepsData", "stepsGoal", "stepsActive");
}

function updateCycle() {
  updateActivityProgress("cycle", "donut-chart2", "#e0a4a7",
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/BikeWatercolor.svg?v=1743559094968",
    "cycleData", "cycleGoal", "cycleActive");
  
  const chartElement = getElement("cycle-progress-chart");
  if (chartElement) {
    createChart(appData.cycleData, appData.cycleGoal, chartElement, "#e0a4a7", "#6B6B6B", appData.cycleActive);
  }
}

function updatePick() {
  updateActivityProgress("pick", "donut-chart4", "#ccbf1a",
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/PickActivityWatercolor.svg?v=1743615466149",
    "pickData", "pickGoal", "pickActive", appData.pickAbbreviation);
  
  CreateProgressDetail("pick", "donut-chart4", summaries.pick, "#ccbf1a",
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/PickActivityWatercolor.svg?v=1743615466149",
    appData.pickData, appData.pickGoal, appData.pickAbbreviation, appData.pickName, appData.pickActive);
}

function updateDiversity() {
  allDiversityData = interpolateMonths(
    appData.diversityData1, appData.diversityData2, 
    appData.diversityData3, appData.diversityData4
  );
  
  summaries.diversity = getProgressPercent(allDiversityData, appData.diversityGoal, appData.diversityActive);
  
  makeDonut("donut-chart5", summaries.diversity, "#8a7bab",
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/DiversityWatercolor.svg?v=1743615462400",
    appData.diversityActive);
  
  const chartElement = getElement("diversity-progress-chart");
  if (chartElement) {
    createChart(allDiversityData, appData.diversityGoal, chartElement, "#8a7bab", "#6B6B6B", appData.diversityActive);
  }
  
  createChartNotes("diversity", appData.diversityGoal);
}

// ===== UI INTERACTION FUNCTIONS =====
function setVibe(text, namePrefix) {
  // Simple emoji splitting - works for most emojis
  const emojis = Array.from(text || "");
  const defaultBox = twemoji.parse("⚪️");
  
  for (let i = 1; i <= 3; i++) {
    const box = getElement(`${namePrefix}${i}-selected-emoji`);
    if (box) {
      box.innerHTML = emojis[i - 1] ? twemoji.parse(emojis[i - 1]) : defaultBox;
    }
  }
}

function setDiversity(pastVal, monthVal, prefix) {
  let past = pastVal;
  let current = monthVal;
  
  for (let i = 1; i < 5; i++) {
    const element = getElement(`${prefix}-${i}`);
    if (!element) continue;
    
    if (past > 0) {
      element.checked = true;
      element.disabled = true;
      past--;
    } else if (current > 0) {
      element.checked = true;
      element.disabled = false;
      current--;
    } else {
      element.checked = false;
      element.disabled = false;
    }
  }
}

function getDiversity(prefix) {
  let count = 0;
  for (let i = 1; i < 5; i++) {
    const element = getElement(`${prefix}-${i}`);
    if (element?.checked && !element.disabled) {
      count++;
    }
  }
  return count;
}

function diversityCheckText(data) {
  const sum = data.reduce((acc, v) => acc + v, 0);
  return '✅'.repeat(sum);
}

function switchTab(tab) {
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    const panel = getElement(`${monthName}-panel`);
    const button = getElement(`update-progress-dialog-${monthName}-button`);
    
    if (panel) {
      panel.style.display = i === tab ? 'inline' : 'none';
    }
    if (button) {
      button.classList.toggle('tab-selected', i === tab);
    }
  }
}

// ===== MAIN FUNCTIONS =====
function setGoals() {
  const goalMappings = [
    { element: "swimGoal", data: "swimGoal" },
    { element: "stepsGoal", data: "stepsGoal" },
    { element: "cycleGoal", data: "cycleGoal" },
    { element: "pickSelection", data: "pickName" },
    { element: "pickGoal", data: "pickGoal" },
    { element: "pickAbbreviation", data: "pickAbbreviation" },
    { element: "pickEmoji", data: "pickEmoji" },
    { element: "diverseActivity1", data: "diversityName1" },
    { element: "diverseActivity2", data: "diversityName2" },
    { element: "diverseActivity3", data: "diversityName3" },
    { element: "diverseActivity4", data: "diversityName4" },
    { element: "diverseEmoji1", data: "diversityEmoji1" },
    { element: "diverseEmoji2", data: "diversityEmoji2" },
    { element: "diverseEmoji3", data: "diversityEmoji3" },
    { element: "diverseEmoji4", data: "diversityEmoji4" }
  ];
  
  goalMappings.forEach(mapping => {
    const element = getElement(mapping.element);
    if (element) {
      element.value = appData[mapping.data];
    }
  });
  
  const pickUnitsElement = getElement("pickUnitsValue");
  if (pickUnitsElement) {
    pickUnitsElement.innerText = appData.pickUnits;
  }
  
  const checkboxMappings = [
    { element: "swimActive", data: "swimActive" },
    { element: "stepsActive", data: "stepsActive" },
    { element: "cycleActive", data: "cycleActive" },
    { element: "pickActive", data: "pickActive" },
    { element: "diversityActive", data: "diversityActive" }
  ];
  
  checkboxMappings.forEach(mapping => {
    const element = getElement(mapping.element);
    if (element) {
      element.checked = appData[mapping.data] === 1;
    }
  });
}

function updateProgress() {
  let diversityPastVals = [0, 0, 0, 0];
  
  // Show/hide sections based on active status
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    const panel = getElement(`${monthName}-panel`);
    if (!panel) continue;
    
    const rows = panel.querySelectorAll('.section.row');
    
    rows.forEach(row => {
      // Check for swim input
      if (row.querySelector(`#${monthName}-swim-input`)) {
        row.style.display = appData.swimActive ? '' : 'none';
      }
      // Check for steps input  
      else if (row.querySelector(`#${monthName}-steps-input`)) {
        row.style.display = appData.stepsActive ? '' : 'none';
      }
      // Check for cycle input
      else if (row.querySelector(`#${monthName}-cycle-input`)) {
        row.style.display = appData.cycleActive ? '' : 'none';
      }
      // Check for pick input
      else if (row.querySelector(`#${monthName}-pick-input`)) {
        row.style.display = appData.pickActive ? '' : 'none';
      }
      // Check for diversity header (contains "cool things")
      else if (row.textContent.includes('cool things')) {
        row.style.display = appData.diversityActive ? '' : 'none';
      }
      // Check for diversity checkboxes
      else if (row.querySelector(`[id*="${monthName}-diversity-check"]`)) {
        row.style.display = appData.diversityActive ? '' : 'none';
      }
    });
    
    const inputMappings = [
      { element: `${monthName}-swim-input`, data: "swimData" },
      { element: `${monthName}-steps-input`, data: "stepsData" },
      { element: `${monthName}-cycle-input`, data: "cycleData" },
      { element: `${monthName}-pick-input`, data: "pickData" }
    ];
    
    inputMappings.forEach(mapping => {
      const element = getElement(mapping.element);
      if (element) {
        element.value = getMonthValue(appData[mapping.data], i);
      }
    });
    
    const pickNameElement = getElement(`${monthName}-pick-name`);
    if (pickNameElement) {
      pickNameElement.innerHTML = appData.pickName;
    }
    
    for (let j = 1; j <= 4; j++) {
      const nameElement = getElement(`${monthName}-diversity-name${j}`);
      if (nameElement) {
        nameElement.innerHTML = appData[`diversityName${j}`];
      }
      
      const diversityVal = getMonthValue(appData[`diversityData${j}`], i);
      setDiversity(diversityPastVals[j-1], diversityVal, `${monthName}-diversity-check-${j}`);
      diversityPastVals[j-1] += diversityVal;
    }
    
    setVibe(getMonthValue(appData.vibeData, i, ""), `${monthName}-vibe`);
  }
}

function saveProgress() {
  saveVibes();
  saveDiversity();
  saveOtherValues();
  updateSwimming();
  updateSteps();
  updateCycle();
  updatePick();
  updateDiversity();
  createSummary(summaries);
  
  // Save to database
  saveUserData();
}

function saveGoals() {
  let hasUpdates = false;
  
  const activityUpdates = [
    {
      checks: [
        () => handleSave("swimGoal", "swimGoal", "number"),
        () => handleSave("swimActive", "swimActive", "bool")
      ],
      update: updateSwimming
    },
    {
      checks: [
        () => handleSave("stepsGoal", "stepsGoal", "number"),
        () => handleSave("stepsActive", "stepsActive", "bool")
      ],
      update: updateSteps
    },
    {
      checks: [
        () => handleSave("cycleGoal", "cycleGoal", "number"),
        () => handleSave("cycleActive", "cycleActive", "bool")
      ],
      update: updateCycle
    },
    {
      checks: [
        () => handleSave("pickSelection", "pickName", "text"),
        () => handleSave("pickGoal", "pickGoal", "number"),
        () => handleSave("pickUnitsValue", "pickUnits", "span"),
        () => handleSave("pickActive", "pickActive", "bool"),
        () => handleSave("pickAbbreviation", "pickAbbreviation", "text"),
        () => handleSave("pickEmoji", "pickEmoji", "text")
      ],
      update: updatePick
    },
    {
      checks: [
        () => handleSave("diverseActivity1", "diversityName1", "text"),
        () => handleSave("diverseActivity2", "diversityName2", "text"),
        () => handleSave("diverseActivity3", "diversityName3", "text"),
        () => handleSave("diverseActivity4", "diversityName4", "text"),
        () => handleSave("diverseEmoji1", "diversityEmoji1", "text"),
        () => handleSave("diverseEmoji2", "diversityEmoji2", "text"),
        () => handleSave("diverseEmoji3", "diversityEmoji3", "text"),
        () => handleSave("diverseEmoji4", "diversityEmoji4", "text"),
        () => handleSave("diversityActive", "diversityActive", "bool")
      ],
      update: updateDiversity
    }
  ];
  
  activityUpdates.forEach(({ checks, update }) => {
    if (madeChanges(...checks.map(check => check()))) {
      update();
      hasUpdates = true;
    }
  });
  
  if (hasUpdates) {
    appData.goalsExplicitlySet = true;
    
    // Update button visibility
    const setGoalsButton = getElement('set-goals-button');
    const updateProgressButton = getElement('update-progress-button');
    if (setGoalsButton?.parentNode) {
      setGoalsButton.parentNode.classList.add('hidden');
    }
    if (updateProgressButton?.parentNode) {
      updateProgressButton.parentNode.classList.remove('hidden');
    }
    
    createSummary(summaries);
    // Save to database
    saveUserData();
  }
}

function shareProgress() {
  const totalPercent = ((summaries.swim + summaries.cycle + summaries.steps + summaries.pick + summaries.diversity) / 5).toFixed(1);
  const values = {
    bike: formatNumber(summaries.cycle),
    swim: formatNumber(summaries.swim),
    pick: formatNumber(summaries.pick),
    step: formatNumber(summaries.steps)
  };
  
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const diversityTexts = [
    `${appData.diversityEmoji1}:${diversityCheckText(appData.diversityData1)}`,
    `${appData.diversityEmoji2}:${diversityCheckText(appData.diversityData2)}`,
    `${appData.diversityEmoji3}:${diversityCheckText(appData.diversityData3)}`,
    `${appData.diversityEmoji4}:${diversityCheckText(appData.diversityData4)}`
  ];
  
  const toShare = `Adventure Triathlon ${month}/${day} 
${totalPercent}% of the way to my goal!
🌊: ${values.swim}%, 🚲: ${values.bike}%, 👟: ${values.step}%, ${appData.pickEmoji}: ${values.pick}%
${diversityTexts.join('\n')}`;
  
  copyToClipboard(toShare).then(success => {
    if (success) {
      const statusElement = getElement('share-progress-status');
      if (statusElement) {
        statusElement.innerHTML = 'Shared to your clipboard!<br><br>';
      }
    }
  });
  
  const valueElement = getElement('share-progress-value');
  if (valueElement) {
    valueElement.innerHTML = twemoji.parse(toShare.replaceAll("\n", "<br>"));
  }
}

// ===== UI SETUP FUNCTIONS =====
function setupProgressInteractions() {
  // Determine which month tab to show based on current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, we want 1-12
  
  let defaultTab;
  if (currentMonth >= 1 && currentMonth <= 5) {
    // January through May -> show May (index 0)
    defaultTab = 0;
  } else if (currentMonth >= 9 && currentMonth <= 12) {
    // September through December -> show September (index 4)
    defaultTab = 4;
  } else if (currentMonth === 6) {
    // June -> show June (index 1)
    defaultTab = 1;
  } else if (currentMonth === 7) {
    // July -> show July (index 2)
    defaultTab = 2;
  } else if (currentMonth === 8) {
    // August -> show August (index 3)
    defaultTab = 3;
  } else {
    // Fallback to May
    defaultTab = 0;
  }
  
  console.log('Current month:', currentMonth, 'Selected tab:', defaultTab);
  switchTab(defaultTab);
  
  const tabButtons = [
    { month: "may", index: 0 },
    { month: "june", index: 1 },
    { month: "july", index: 2 },
    { month: "august", index: 3 },
    { month: "september", index: 4 }
  ];
  
  tabButtons.forEach(({ month, index }) => {
    const button = getElement(`update-progress-dialog-${month}-button`);
    if (button) {
      button.addEventListener("click", () => switchTab(index));
    }
  });
  
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const monthName = MONTHS[i];
    setUpEmojiButton(`${monthName}-vibe1`);
    setUpEmojiButton(`${monthName}-vibe2`);
    setUpEmojiButton(`${monthName}-vibe3`);
  }
}

function fillSelects() {
  const selectIds = ['diverseActivity1', 'diverseActivity2', 'diverseActivity3', 'diverseActivity4', 'pickSelection'];
  const selects = selectIds.map(id => getElement(id)).filter(Boolean);
  const lookup = {};
  
  SUMMER_ACTIVITIES.forEach(activity => {
    lookup[activity.name] = activity;
    const option = document.createElement("option");
    option.value = activity.name;
    option.innerHTML = `${activity.name} (${activity.emoji})`;
    
    selects.forEach(select => {
      select.appendChild(option.cloneNode(true));
    });
  });
  
  const pickSelect = getElement('pickSelection');
  if (pickSelect) {
    pickSelect.addEventListener("change", (event) => {
      const activity = lookup[event.target.value];
      if (activity) {
        const mappings = [
          { element: "pickAbbreviation", value: activity.abbreviation },
          { element: "pickGoal", value: activity.suggestedGoal },
          { element: "pickEmoji", value: activity.emoji }
        ];
        
        mappings.forEach(mapping => {
          const element = getElement(mapping.element);
          if (element) element.value = mapping.value;
        });
        
        const unitsElement = getElement("pickUnitsValue");
        if (unitsElement) unitsElement.innerText = activity.unit;
      }
    });
  }
  
  ['diverseActivity1', 'diverseActivity2', 'diverseActivity3', 'diverseActivity4'].forEach((selectId, index) => {
    const select = getElement(selectId);
    if (select) {
      select.addEventListener("change", (event) => {
        const activity = lookup[event.target.value];
        if (activity) {
          const emojiElement = getElement(`diverseEmoji${index + 1}`);
          if (emojiElement) emojiElement.value = activity.emoji;
        }
      });
    }
  });
  
  const randomButton = getElement("chooseForMe");
  if (randomButton) {
    randomButton.addEventListener("click", () => {
      const exclude = [];
      ['diverseActivity1', 'diverseActivity2', 'diverseActivity3', 'diverseActivity4'].forEach(selectId => {
        const select = getElement(selectId);
        if (select) {
          const activity = getRandomActivity(exclude);
          select.value = activity.name;
          exclude.push(activity.name);
        }
      });
    });
  }
}

function createDropdown() {
  const svg = getElement('kebab');
  if (!svg) return;
  
  const rc = rough.svg(svg);
  const dots = [
    rc.circle(20, 5, 4),
    rc.circle(20, 15, 4),
    rc.circle(20, 25, 4)
  ];
  
  dots.forEach(dot => svg.appendChild(dot));
  
  const dropdown = getElement('dropdown');
  if (dropdown) {
    dropdown.classList.add('hidden');
    
    svg.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
      const menuWrapper = getElement('menu-wrapper');
      if (menuWrapper && !menuWrapper.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }
}

function createNavButton(name, openFunc, closeFunc, enabled) {
  const button = getElement(`${name}-button`);
  const dropdown = getElement(`${name}-dropdown`);
  const dialog = getElement(`${name}-dialog`);
  const cancelButton = getElement(`${name}-dialog-cancel`);
  const saveButton = getElement(`${name}-dialog-save`);
  
  if (!button) return;
  
  if (enabled) {
    button.parentNode?.classList.remove('hidden');
  } else {
    button.parentNode?.classList.add('hidden');
  }
  
  const handleClick = () => {
    if (dropdown) {
      dropdown.parentNode?.parentNode?.classList.toggle('hidden');
    }
    if (dialog && openFunc) {
      openFunc();
      dialog.open = true;
    } else if (openFunc) {
      // For buttons without dialogs (like share), just call the function
      openFunc();
    } else {
      window.alert('There was a problem!');
    }
  };
  
  button.addEventListener("click", handleClick);
  
  // Only add dropdown listener if dropdown exists
  if (dropdown) {
    dropdown.addEventListener("click", handleClick);
  }
  
  if (dialog && saveButton) {
    saveButton.addEventListener("click", () => {
      closeFunc?.();
      dialog.open = false;
    });
  }
  
  if (dialog && cancelButton) {
    cancelButton.addEventListener("click", () => {
      dialog.open = false;
    });
  }
}

// ===== CHART CREATION FUNCTIONS =====
function createChartNotes(name, goal, friendlyName) {
  const descriptor = getElement(`${name}-progress-text`);
  if (descriptor) {
    descriptor.textContent = `Getting closer to your goal of ${goal}`;
  }
  
  // Only set the name for activities that have a name element (like pick)
  if (name === 'pick') {
    const nameSpot = getElement(`${name}-progress-name`);
    if (nameSpot && friendlyName) {
      nameSpot.innerText = friendlyName;
    }
  }
}

function createChart(data, goal, svg, color, oldColor, active) {
  if (!active) data = [];
  
  svg.innerHTML = '';
  const rc = rough.svg(svg);
  
  const width = +svg.getAttribute("width");
  const height = +svg.getAttribute("height");
  const topPadding = 20;
  const bottomPadding = 40;
  const maxBarHeight = height - topPadding - bottomPadding;
  const barWidth = 40;
  const gap = 25;
  const startX = 60;
  
  let cumulative = 0;
  
  MONTH_NAMES.forEach((month, i) => {
    let value = 0;
    if (data.length > i) {
      value = (data[i] / goal) * 100;
    }
    
    const x = startX + i * (barWidth + gap);
    const previousCumulative = cumulative;
    cumulative += value;
    
    if (cumulative > 100) {
      const overflow = cumulative - OVERFLOW_ADJUSTMENT;
      cumulative = SAFE_MAX_PERCENT;
      value = value - overflow;
    }
    
    const baseHeight = (previousCumulative / 100) * maxBarHeight;
    const newHeight = (value / 100) * maxBarHeight;
    const baseY = height - bottomPadding - baseHeight;
    const newY = baseY - newHeight;
    
    if (data.length > i) {
      const rectOptions = {
        fillStyle: "hachure",
        hachureGap: 3,
        fillWeight: 2,
        roughness: 1.5
      };
      
      const baseRect = rc.rectangle(x, baseY, barWidth, baseHeight, {
        ...rectOptions,
        fill: oldColor,
        hachureAngle: 42
      });
      svg.appendChild(baseRect);
      
      const newRect = rc.rectangle(x, newY, barWidth, newHeight, {
        ...rectOptions,
        fill: color,
        hachureAngle: 51
      });
      svg.appendChild(newRect);
    }
    
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x + barWidth / 2);
    label.setAttribute("y", height - 10);
    label.textContent = month;
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-family", "Gloria Hallelujah");
    label.setAttribute("font-size", "12px");
    label.setAttribute("fill", "#0e0f0d");
    svg.appendChild(label);
  });
  
  const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yLabel.setAttribute("x", 10);
  yLabel.setAttribute("y", topPadding + 5);
  yLabel.setAttribute("text-anchor", "start");
  yLabel.textContent = "100%";
  yLabel.setAttribute("font-family", "Gloria Hallelujah");
  yLabel.setAttribute("font-size", "12px");
  yLabel.setAttribute("fill", "#0e0f0d");
  svg.appendChild(yLabel);
  
  const yAxis = rc.line(startX - 10, topPadding, startX - 10, height - bottomPadding);
  const xAxis = rc.line(startX - 10, height - bottomPadding, width - 10, height - bottomPadding);
  svg.appendChild(yAxis);
  svg.appendChild(xAxis);
  
  svg.style.filter = active ? '' : 'grayscale(100%)';
}

function polarToCartesian(centerX, centerY, radius, angleInRadians) {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const sa = startAngle + Math.PI;
  const ea = endAngle + Math.PI;
  
  const startOuter = polarToCartesian(cx, cy, rOuter, sa);
  const endOuter = polarToCartesian(cx, cy, rOuter, ea);
  const startInner = polarToCartesian(cx, cy, rInner, ea);
  const endInner = polarToCartesian(cx, cy, rInner, sa);
  
  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
  const sweepFlag = "1";
  
  return [
    "M", startOuter.x, startOuter.y,
    "A", rOuter, rOuter, 0, largeArcFlag, sweepFlag, endOuter.x, endOuter.y,
    "L", startInner.x, startInner.y,
    "A", rInner, rInner, 0, largeArcFlag, 0, endInner.x, endInner.y,
    "Z"
  ].join(" ");
}

function makeDonut(elementId, percent, color, path, active, overlay) {
  const svg = getElement(elementId);
  if (!svg) return;
  
  svg.innerHTML = '';
  const rc = rough.svg(svg);
  
  const data = [
    { value: percent, color: "#0e0f0d", fillColor: color, fill: "cross-hatch" },
    { value: 100 - percent, color: "#0e0f0d", fillColor: "#fbfbf9", fill: "solid" }
  ];
  
  const centerX = 150;
  const centerY = 150;
  const outerRadius = 100;
  const innerRadius = 60;
  let startAngle = 0;
  
  data.forEach(segment => {
    const segmentAngle = (segment.value / 100) * 2 * Math.PI;
    const endAngle = startAngle + segmentAngle;
    
    const pathData = describeArc(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle);
    const segmentPath = rc.path(pathData, {
      fill: segment.fillColor,
      fillStyle: segment.fill,
      roughness: 1.5,
      stroke: segment.color,
      strokeWidth: 2
    });
    
    svg.appendChild(segmentPath);
    startAngle = endAngle;
  });
  
  const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttribute("href", path);
  img.setAttribute("x", centerX - 54);
  img.setAttribute("y", centerY - 54);
  img.setAttribute("width", "108");
  img.setAttribute("height", "108");
  img.setAttribute("class", "center-image");
  svg.appendChild(img);
  
  if (overlay) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", centerX - 36);
    text.setAttribute("y", centerY + 26);
    text.textContent = overlay;
    text.setAttribute("font-family", "kc");
    text.setAttribute("font-size", "92");
    text.setAttribute("fill", "#0e0f0d");
    svg.appendChild(text);
  }
  
  if (!active) {
    svg.parentNode.style.pointerEvents = "none";
    svg.parentNode.style.cursor = "default";
    svg.style.filter = 'grayscale(100%)';
  } else {
    svg.style.filter = '';
    svg.parentNode.style.pointerEvents = "auto";
    svg.parentNode.style.cursor = "pointer";
  }
}

function createUser() {
  const svg = getElement("user-info");
  if (!svg) return;
  
  const rc = rough.svg(svg);
  
  const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttributeNS(null, "href", 
    "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/louise_cackle.png?v=1743771202084");
  img.setAttribute("x", 7);
  img.setAttribute("y", 7);
  img.setAttribute("width", "60");
  img.setAttribute("height", "60");
  img.setAttribute("class", "center-image");
  svg.appendChild(img);
  
  svg.appendChild(rc.circle(37, 37, 65, {
    stroke: "#4806d8",
    strokeWidth: 2,
    roughness: 1.5
  }));
}

function createSummary(sumData) {
  const svg = getElement("bar-chart");
  if (!svg) return;
  
  svg.innerHTML = '';
  const rc = rough.svg(svg);
  
  const activeSections = appData.stepsActive + appData.swimActive + appData.cycleActive + 
                        appData.pickActive + appData.diversityActive;
  
  // Avoid division by zero - if no activities are active, show empty chart
  if (activeSections === 0) {
    const emptyRect = rc.rectangle(3, 3, 374, 29, {
      fill: "#fbfbf9",
      fillStyle: "solid",
      stroke: "#0e0f0d",
      strokeWidth: 1.5,
      roughness: 1.6
    });
    svg.appendChild(emptyRect);
    return;
  }
  
  const chartData = [
    { value: (sumData.swim * appData.swimActive) / activeSections, color: "#77c7d2", fill: "cross-hatch" },
    { value: (sumData.cycle * appData.cycleActive) / activeSections, color: "#e0a4a7", fill: "cross-hatch" },
    { value: (sumData.steps * appData.stepsActive) / activeSections, color: "#6e9d58", fill: "cross-hatch" },
    { value: (sumData.pick * appData.pickActive) / activeSections, color: "#ccbf1a", fill: "cross-hatch" },
    { value: (sumData.diversity * appData.diversityActive) / activeSections, color: "#8a7bab", fill: "cross-hatch" }
  ];
  
  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  if (total < 100) {
    chartData.push({ value: 100 - total, color: "#fbfbf9", fill: "solid" });
  }
  
  const barWidth = 374;
  const barHeight = 29;
  let currentX = 3;
  
  chartData.forEach(segment => {
    const segmentWidth = (segment.value / 100) * barWidth;
    const rect = rc.rectangle(currentX, 3, segmentWidth, barHeight, {
      fill: segment.color,
      fillStyle: segment.fill,
      stroke: "#0e0f0d",
      strokeWidth: 1.5,
      roughness: 1.6
    });
    svg.appendChild(rect);
    currentX += segmentWidth;
  });
}

function CreateProgressDetail(name, elementId, percent, color, path, data, goal, overlay, friendlyName, active) {
  const svg = getElement(`${name}-progress-header`);
  if (!svg) return;
  
  svg.innerHTML = '';
  
  const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttribute("href", path);
  img.setAttribute("x", 0);
  img.setAttribute("y", 0);
  img.setAttribute("width", "70");
  img.setAttribute("height", "70");
  img.setAttribute("class", "center-image");
  svg.appendChild(img);
  
  if (overlay) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 35);
    text.setAttribute("y", 53);
    text.setAttribute("text-anchor", "middle");
    text.textContent = overlay;
    text.setAttribute("font-family", "kc");
    text.setAttribute("font-size", "60");
    text.setAttribute("fill", "#0e0f0d");
    svg.appendChild(text);
  }
  
  createChartNotes(name, goal, friendlyName);
  
  const chartElement = getElement(`${name}-progress-chart`);
  if (chartElement) {
    createChart(data, goal, chartElement, color, "#6B6B6B", active);
  }
}

function createProgress(name, elementId, percent, color, path, monthsData, goal, active, overlay, friendlyName) {
  const button = getElement(elementId)?.parentNode;
  const dialog = getElement(`${name}-progress`);
  const closeButton = getElement(`${name}-progress-close`);
  
  CreateProgressDetail(name, elementId, percent, color, path, monthsData, goal, overlay, friendlyName, active);
  
  if (button) {
    button.addEventListener("click", () => {
      if (dialog && closeButton) {
        dialog.open = true;
      } else {
        window.alert('There was a problem!');
      }
    });
  }
  
  if (dialog && closeButton) {
    closeButton.addEventListener("click", () => {
      dialog.open = false;
    });
  }
  
  makeDonut(elementId, percent, color, path, active, overlay);
}

// ===== EMOJI FUNCTIONS =====
function setUpEmojiButton(emojiName) {
  const emojiButton = getElement(`${emojiName}-emoji-button`);
  const selectedEmoji = getElement(`${emojiName}-selected-emoji`);
  const emojiDialog = getElement('emoji-dialog');
  const search = getElement('emoji-search');
  const grid = getElement('emoji-grid');
  
  if (!emojiButton || !selectedEmoji || !emojiDialog || !search || !grid) return;
  
  function renderEmojiGrid(filter = '') {
    grid.innerHTML = '';
    VIBE_OPTIONS.filter(e => e.name.includes(filter.toLowerCase())).forEach(e => {
      const span = document.createElement('span');
      span.className = 'emoji-option';
      span.textContent = e.char;
      span.title = e.name;
      span.addEventListener('click', () => {
        selectedEmoji.textContent = e.char;
        twemoji.parse(selectedEmoji);
        emojiDialog.open = false;
      });
      grid.appendChild(span);
    });
    twemoji.parse(grid);
  }
  
  emojiButton.addEventListener('click', () => {
    search.value = "";
    renderEmojiGrid();
    emojiDialog.open = true;
  });
  
  search.addEventListener('input', (e) => {
    renderEmojiGrid(e.target.value);
  });
  
  const closeDialog = getElement('emoji-close-dialog');
  if (closeDialog) {
    closeDialog.addEventListener('click', () => {
      emojiDialog.open = false;
    });
  }
  
  twemoji.parse(selectedEmoji);
}

// ===== AUTHENTICATION FUNCTIONS =====
async function initializeSupabase() {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('Please configure your Supabase credentials in script.js');
    return false;
  }
  
  try {
    console.log('Initializing Supabase with URL:', SUPABASE_URL);
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client created successfully');
    
    // Test basic connection
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.from('triathlonactivity').select('count', { count: 'exact', head: true });
      console.log('Connection test result:', { data, error });
    } catch (testError) {
      console.error('Connection test failed:', testError);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
}

async function checkSession() {
  if (!supabase) return null;
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    currentUser = session?.user || null;
    return currentUser;
  } catch (error) {
    console.error('Session check failed:', error);
    return null;
  }
}

async function sendMagicLink(email) {
  if (!supabase) {
    throw new Error('Supabase not initialized');
  }
  
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Magic link failed:', error);
    throw error;
  }
}

async function signOut() {
  if (!supabase) return;
  
  try {
    await supabase.auth.signOut();
    currentUser = null;
    showLoginDialog();
  } catch (error) {
    console.error('Sign out failed:', error);
  }
}

// ===== DATABASE SYNC FUNCTIONS =====
async function loadUserData() {
  if (!supabase || !currentUser) {
    console.log('Cannot load user data - supabase or currentUser missing:', { supabase: !!supabase, currentUser: !!currentUser });
    return;
  }
  
  console.log('Loading user data for user:', currentUser.id);
  
  
  try {
    console.log('Executing database query...');
    
    // Add timeout to prevent hanging
    const queryPromise = supabase
      .from('triathlonactivity')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('year', 2025)
      .single();
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database query timeout')), 10000)
    );
    
    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
    
    console.log('Database query completed:', { data, error });
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    if (data) {
      console.log('Found user data, loading into app...');
      // Map database fields to app data
      appData.swimActive = data.swim_active ? 1 : 0;
      appData.swimGoal = data.swim_goal || appData.swimGoal;
      appData.swimData = data.swim_data || appData.swimData;
      
      appData.stepsActive = data.steps_active ? 1 : 0;
      appData.stepsGoal = data.steps_goal || appData.stepsGoal;
      appData.stepsData = data.steps_data || appData.stepsData;
      
      appData.cycleActive = data.cycle_active ? 1 : 0;
      appData.cycleGoal = data.cycle_goal || appData.cycleGoal;
      appData.cycleData = data.cycle_data || appData.cycleData;
      
      appData.pickActive = data.pick_active ? 1 : 0;
      appData.pickName = data.pick_name || appData.pickName;
      appData.pickAbbreviation = data.pick_abbreviation || appData.pickAbbreviation;
      appData.pickUnits = data.pick_units || appData.pickUnits;
      appData.pickGoal = data.pick_goal || appData.pickGoal;
      appData.pickData = data.pick_data || appData.pickData;
      appData.pickEmoji = data.pick_emoji || appData.pickEmoji;
      
      appData.diversityActive = data.diversity_active ? 1 : 0;
      appData.diversityGoal = data.diversity_goal || appData.diversityGoal;
      appData.diversityName1 = data.diversity_name1 || appData.diversityName1;
      appData.diversityEmoji1 = data.diversity_emoji1 || appData.diversityEmoji1;
      appData.diversityData1 = data.diversity_data1 || appData.diversityData1;
      appData.diversityName2 = data.diversity_name2 || appData.diversityName2;
      appData.diversityEmoji2 = data.diversity_emoji2 || appData.diversityEmoji2;
      appData.diversityData2 = data.diversity_data2 || appData.diversityData2;
      appData.diversityName3 = data.diversity_name3 || appData.diversityName3;
      appData.diversityEmoji3 = data.diversity_emoji3 || appData.diversityEmoji3;
      appData.diversityData3 = data.diversity_data3 || appData.diversityData3;
      appData.diversityName4 = data.diversity_name4 || appData.diversityName4;
      appData.diversityEmoji4 = data.diversity_emoji4 || appData.diversityEmoji4;
      appData.diversityData4 = data.diversity_data4 || appData.diversityData4;
      
      appData.vibeData = data.vibe_data || appData.vibeData;
      appData.goalsExplicitlySet = true; // If data exists in DB, goals were set
      
      console.log('AppData after loading:', appData);
      
      // Refresh UI with loaded data
      refreshAllProgress();
      console.log('User data loaded from database');
    } else {
      // No existing data for this user/year, will use defaults
      console.log('No existing data found, using defaults');
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
}

async function saveUserData() {
  if (!supabase || !currentUser) return;
  
  try {
    const dataToSave = {
      user_id: currentUser.id,
      year: 2025,
      swim_active: appData.swimActive === 1,
      swim_goal: appData.swimGoal,
      swim_data: appData.swimData,
      steps_active: appData.stepsActive === 1,
      steps_goal: appData.stepsGoal,
      steps_data: appData.stepsData,
      cycle_active: appData.cycleActive === 1,
      cycle_goal: appData.cycleGoal,
      cycle_data: appData.cycleData,
      pick_active: appData.pickActive === 1,
      pick_name: appData.pickName,
      pick_abbreviation: appData.pickAbbreviation,
      pick_units: appData.pickUnits,
      pick_goal: appData.pickGoal,
      pick_data: appData.pickData,
      pick_emoji: appData.pickEmoji,
      diversity_active: appData.diversityActive === 1,
      diversity_goal: appData.diversityGoal,
      diversity_name1: appData.diversityName1,
      diversity_emoji1: appData.diversityEmoji1,
      diversity_data1: appData.diversityData1,
      diversity_name2: appData.diversityName2,
      diversity_emoji2: appData.diversityEmoji2,
      diversity_data2: appData.diversityData2,
      diversity_name3: appData.diversityName3,
      diversity_emoji3: appData.diversityEmoji3,
      diversity_data3: appData.diversityData3,
      diversity_name4: appData.diversityName4,
      diversity_emoji4: appData.diversityEmoji4,
      diversity_data4: appData.diversityData4,
      vibe_data: appData.vibeData,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('triathlonactivity')
      .upsert(dataToSave, {
        onConflict: 'user_id,year'
      });
    
    if (error) throw error;
    
    console.log('User data saved to database');
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

function refreshAllProgress() {
  // Recalculate all summaries
  allDiversityData = interpolateMonths(
    appData.diversityData1, appData.diversityData2, 
    appData.diversityData3, appData.diversityData4
  );
  
  summaries.swim = getProgressPercent(appData.swimData, appData.swimGoal, appData.swimActive);
  summaries.cycle = getProgressPercent(appData.cycleData, appData.cycleGoal, appData.cycleActive);
  summaries.steps = getProgressPercent(appData.stepsData, appData.stepsGoal, appData.stepsActive);
  summaries.pick = getProgressPercent(appData.pickData, appData.pickGoal, appData.pickActive);
  summaries.diversity = getProgressPercent(allDiversityData, appData.diversityGoal, appData.diversityActive);
  
  // Update all UI elements
  updateSwimming();
  updateSteps();
  updateCycle();
  updatePick();
  updateDiversity();
  createSummary(summaries);
}

function resetToDefaultData() {
  // Reset appData to empty defaults with default goals and core activities active
  appData.swimData = [0, 0, 0, 0, 0];
  appData.swimGoal = DEFAULT_SWIM_GOAL;
  appData.swimActive = 1;
  appData.stepsData = [0, 0, 0, 0, 0];
  appData.stepsGoal = DEFAULT_STEPS_GOAL;
  appData.stepsActive = 1;
  appData.cycleData = [0, 0, 0, 0, 0];
  appData.cycleGoal = DEFAULT_CYCLE_GOAL;
  appData.cycleActive = 1;
  appData.pickData = [0, 0, 0, 0, 0];
  appData.pickGoal = 0;
  appData.pickActive = 0;
  appData.pickName = "";
  appData.pickAbbreviation = "";
  appData.pickUnits = "";
  appData.pickEmoji = "";
  appData.diversityData1 = [0, 0, 0, 0, 0];
  appData.diversityName1 = "";
  appData.diversityEmoji1 = "";
  appData.diversityData2 = [0, 0, 0, 0, 0];
  appData.diversityName2 = "";
  appData.diversityEmoji2 = "";
  appData.diversityData3 = [0, 0, 0, 0, 0];
  appData.diversityName3 = "";
  appData.diversityEmoji3 = "";
  appData.diversityData4 = [0, 0, 0, 0, 0];
  appData.diversityName4 = "";
  appData.diversityEmoji4 = "";
  appData.diversityGoal = DEFAULT_DIVERSITY_GOAL;
  appData.diversityActive = 0;
  appData.vibeData = ["", "", "", "", ""];
  appData.goalsExplicitlySet = false; // Reset flag when logging out
  
  // Refresh the UI with empty data
  refreshAllProgress();
  setGoals();
  updateProgress();
}

function setupAuthListeners() {
  if (!supabase) return;
  
  supabase.auth.onAuthStateChange(async (event, session) => {
    currentUser = session?.user || null;
    
    if (event === 'SIGNED_IN') {
      hideLoginDialog();
      console.log('User signed in:', currentUser?.email);
      await loadUserData();
      // Refresh the UI after loading data
      setGoals();
      updateProgress();
    } else if (event === 'SIGNED_OUT') {
      showLoginDialog();
      console.log('User signed out');
      // Reset to default data when signed out
      resetToDefaultData();
    }
  });
}

function showLoginDialog() {
  const dialog = getElement('login-dialog');
  if (dialog) {
    dialog.open = true;
  }
}

function hideLoginDialog() {
  const dialog = getElement('login-dialog');
  if (dialog) {
    dialog.open = false;
  }
}

function setupLoginDialog() {
  const sendButton = getElement('login-send-magic-link');
  const emailInput = getElement('login-email');
  const statusDiv = getElement('login-status');
  
  if (!sendButton || !emailInput || !statusDiv) return;
  
  sendButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    
    if (!email) {
      statusDiv.innerHTML = 'Please enter your email address.';
      return;
    }
    
    if (!supabase) {
      statusDiv.innerHTML = 'Authentication not configured. Please set up Supabase credentials.';
      return;
    }
    
    try {
      statusDiv.innerHTML = 'Sending magic link...';
      sendButton.disabled = true;
      
      await sendMagicLink(email);
      
      statusDiv.innerHTML = `✅ Magic link sent to ${email}! Check your inbox and click the link to sign in.`;
      emailInput.value = '';
    } catch (error) {
      statusDiv.innerHTML = `❌ Failed to send magic link: ${error.message}`;
    } finally {
      sendButton.disabled = false;
    }
  });
  
  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
}

// ===== INITIALIZATION =====
async function initializeApp() {
  console.log('Starting app initialization...');
  
  try {
    // Initialize basic data
    console.log('Initializing basic data...');
    allDiversityData = interpolateMonths(
      appData.diversityData1, appData.diversityData2, 
      appData.diversityData3, appData.diversityData4
    );
    
    console.log('Calculating summaries...');
    summaries.swim = getProgressPercent(appData.swimData, appData.swimGoal, appData.swimActive);
    summaries.cycle = getProgressPercent(appData.cycleData, appData.cycleGoal, appData.cycleActive);
    summaries.steps = getProgressPercent(appData.stepsData, appData.stepsGoal, appData.stepsActive);
    summaries.pick = getProgressPercent(appData.pickData, appData.pickGoal, appData.pickActive);
    summaries.diversity = getProgressPercent(allDiversityData, appData.diversityGoal, appData.diversityActive);
    
    console.log('Summaries:', summaries);
    
    console.log('Total amount:', summaries.swim + summaries.cycle + summaries.steps + summaries.pick);
    
    // Try basic UI setup first
    console.log('Creating basic UI...');
    
    try {
      createUser();
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
    try {
      createSummary(summaries);
      console.log('Summary created successfully');
    } catch (error) {
      console.error('Error creating summary:', error);
    }
    
    try {
      createDropdown();
      console.log('Dropdown created successfully');
    } catch (error) {
      console.error('Error creating dropdown:', error);
    }
    
    // Create navigation buttons and charts
    console.log('Creating navigation buttons...');
    let amount = summaries.swim + summaries.cycle + summaries.steps + summaries.pick;
    
    createNavButton("set-goals", setGoals, saveGoals, !appData.goalsExplicitlySet);
    createNavButton("update-progress", updateProgress, saveProgress, appData.goalsExplicitlySet);
    createNavButton("share-progress", () => {
      shareProgress();
      const dialog = getElement('share-progress-dialog');
      if (dialog) dialog.open = true;
    }, () => {}, true);
    
    try {
      fillSelects();
      console.log('Selects filled successfully');
    } catch (error) {
      console.error('Error filling selects:', error);
    }
    
    try {
      setupProgressInteractions();
      console.log('Progress interactions setup successfully');
    } catch (error) {
      console.error('Error setting up progress interactions:', error);
    }
    
    // Create empty charts initially
    console.log('Creating charts...');
    try {
      createProgress("swim", "donut-chart1", summaries.swim, "#77c7d2",
        "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/SwimWatercolor.svg?v=1743556029550",
        appData.swimData, appData.swimGoal, appData.swimActive);
        
      createProgress("cycle", "donut-chart2", summaries.cycle, "#e0a4a7",
        "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/BikeWatercolor.svg?v=1743559094968",
        appData.cycleData, appData.cycleGoal, appData.cycleActive);
        
      createProgress("steps", "donut-chart3", summaries.steps, "#6e9d58",
        "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/RunWatercolor.svg?v=1743559096749",
        appData.stepsData, appData.stepsGoal, appData.stepsActive);
        
      createProgress("pick", "donut-chart4", summaries.pick, "#ccbf1a",
        "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/PickActivityWatercolor.svg?v=1743615466149",
        appData.pickData, appData.pickGoal, appData.pickActive, appData.pickAbbreviation, appData.pickName);
        
      createProgress("diversity", "donut-chart5", summaries.diversity, "#8a7bab",
        "https://cdn.glitch.global/596ecb40-0329-4e4c-b6ba-1d1a47d106a0/DiversityWatercolor.svg?v=1743615462400",
        allDiversityData, appData.diversityGoal, appData.diversityActive);
      
      console.log('Charts created successfully');
    } catch (error) {
      console.error('Error creating charts:', error);
    }
    
    // Now initialize Supabase and load user data
    console.log('Initializing Supabase...');
    const supabaseInitialized = await initializeSupabase();
    
    if (supabaseInitialized) {
      setupAuthListeners();
      setupLoginDialog();
      
      // Setup logout functionality
      const logoutDropdown = getElement('logout-dropdown');
      if (logoutDropdown) {
        logoutDropdown.addEventListener('click', signOut);
      }
      
      // Check for existing session
      const user = await checkSession();
      if (user) {
        hideLoginDialog();
        console.log('User is logged in, loading data...');
        await loadUserData();
        // Refresh the UI after loading data
        setGoals();
        updateProgress();
        // Recreate everything with loaded data
        console.log('Refreshing all progress with loaded data...');
        refreshAllProgress();
      } else {
        showLoginDialog();
      }
    }
    
    console.log('App initialization complete');
    
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// Start the application
initializeApp();