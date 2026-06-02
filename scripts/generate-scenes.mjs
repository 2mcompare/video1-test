import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'compositions');
mkdirSync(outDir, { recursive: true });

const CSS = `* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #0a1628; font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; color: #e8edf5; }
.clip { position: absolute; }
:root {
  --blue-50: #e8f4fd; --blue-100: #b8dffa; --blue-300: #60b0f4; --blue-500: #2196f3; --blue-600: #1a7ad9; --blue-700: #0f5ba8; --blue-900: #0a1628; --blue-950: #060f1c;
  --white: #f0f4ff; --gray-300: #a0b4cc; --gray-400: #7a8fa8; --gray-500: #5a6f88; --cyan: #22d3ee; --green: #4ade80; --orange: #fb923c; --gold: #fbbf24; --red: #ef4444; --purple: #a78bfa;
}
.scene { position: absolute; width: 1920px; height: 1080px; overflow: hidden; background: var(--blue-900); }
.scene-content { position: absolute; width: 1920px; height: 1080px; display: flex; flex-direction: column; justify-content: center; padding: 80px 120px; gap: 16px; box-sizing: border-box; }
h1 { font-size: 76px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; color: var(--white); }
h2 { font-size: 52px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.1; color: var(--white); }
h3 { font-size: 36px; font-weight: 600; line-height: 1.15; }
h4 { font-size: 24px; font-weight: 600; }
.body-text { font-size: 22px; font-weight: 400; line-height: 1.5; color: var(--gray-300); max-width: 1400px; }
.body-text.bright { color: var(--white); }
.mono { font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace; }
.accent-cyan { color: var(--cyan); } .accent-green { color: var(--green); } .accent-orange { color: var(--orange); }
.accent-gold { color: var(--gold); } .accent-red { color: var(--red); } .accent-purple { color: var(--purple); } .accent-blue { color: var(--blue-300); }
.gradient-text { background: linear-gradient(135deg, var(--blue-300), var(--cyan), var(--blue-500)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(33,150,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.04) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
.bg-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px); }
.bg-glow-1 { width: 600px; height: 600px; background: rgba(33,150,243,0.1); top: -200px; right: -100px; }
.bg-glow-2 { width: 400px; height: 400px; background: rgba(34,211,238,0.06); bottom: -100px; left: -100px; }
.info-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px 32px; backdrop-filter: blur(8px); }
.score-ring { width: 180px; height: 180px; position: relative; }
.score-ring svg { transform: rotate(-90deg); }
.score-ring .bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 6; }
.score-ring .progress { fill: none; stroke-width: 6; stroke-linecap: round; }
.score-ring .score-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
.model-pill { display: inline-flex; align-items: center; gap: 12px; padding: 12px 24px; border-radius: 100px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); font-size: 20px; }
.model-pill .dot { width: 12px; height: 12px; border-radius: 50%; }
.stat { text-align: center; }
.stat .num { font-size: 72px; font-weight: 800; font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
.stat .label { font-size: 18px; color: var(--gray-400); margin-top: 4px; }
.bench-row { display: flex; align-items: center; gap: 20px; padding: 18px 24px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: background 0.3s; }
.bench-row .rank { font-size: 28px; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: var(--gray-500); width: 40px; }
.bench-row .model-name { font-size: 22px; font-weight: 600; flex: 1; }
.bench-row .bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
.bench-row .bar-fill { height: 100%; border-radius: 4px; width: 0; }
.bench-row .bar-score { font-size: 28px; font-weight: 700; font-family: 'JetBrains Mono', monospace; width: 60px; text-align: right; }
.bento-grid { display: grid; gap: 12px; }
.bento-grid-3 { grid-template-columns: repeat(3, 1fr); }
.bento-grid-2 { grid-template-columns: repeat(2, 1fr); }
.bento-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; }
.bento-item .num { font-size: 42px; font-weight: 800; color: rgba(255,255,255,0.04); margin-bottom: -8px; font-family: 'JetBrains Mono', monospace; }
.bento-item .icon { font-size: 32px; margin-bottom: 8px; }
.bento-item h4 { font-size: 20px; margin-bottom: 8px; }
.bento-item p { font-size: 16px; color: var(--gray-400); line-height: 1.5; }
.bento-item.wide { grid-column: span 2; }
.podium { display: flex; align-items: flex-end; justify-content: center; gap: 24px; }
.pod { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.pod .medal { font-size: 40px; }
.pod .name { font-size: 20px; font-weight: 600; }
.pod .score { font-size: 36px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
.pod .bar { width: 100%; border-radius: 12px 12px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 16px; }
.terminal-box { background: #060f1c; border: 1px solid rgba(33,150,243,0.2); border-radius: 12px; overflow: hidden; max-width: 800px; }
.terminal-box .titlebar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); }
.terminal-box .dot { width: 12px; height: 12px; border-radius: 50%; }
.terminal-box .dot.r { background: #ff5f57; }
.terminal-box .dot.y { background: #ffbd2e; }
.terminal-box .dot.g { background: #28c840; }
.terminal-box .title-text { font-size: 12px; color: var(--gray-500); font-family: 'JetBrains Mono', monospace; margin-left: 12px; }
.terminal-box .body { padding: 20px; font-family: 'JetBrains Mono', monospace; font-size: 16px; line-height: 1.6; color: var(--gray-300); min-height: 200px; }
.tag { display: inline-block; padding: 6px 14px; border-radius: 100px; font-size: 14px; font-weight: 600; margin: 3px; }
.tag-blue { background: rgba(33,150,243,0.1); color: var(--blue-300); border: 1px solid rgba(33,150,243,0.2); }
.tag-cyan { background: rgba(34,211,238,0.1); color: var(--cyan); border: 1px solid rgba(34,211,238,0.2); }
.tag-red { background: rgba(239,68,68,0.1); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }
.tag-gray { background: rgba(255,255,255,0.04); color: var(--gray-400); border: 1px solid rgba(255,255,255,0.08); }`;

const HELPERS = `
function spring(t, { stiffness = 160, damping = 12, mass = 1, from = 0, to = 1 } = {}) {
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const A = from - to;
  const B = (from - to + damping * A / (2 * mass)) / omegaD;
  return to + Math.exp(-zeta * omega0 * t) * (A * Math.cos(omegaD * t) + B * Math.sin(omegaD * t));
}
function interpolate(t, a, b, ease) { const p = ease ? ease(t) : t; return a + (b - a) * p; }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeOutElastic(t) { const c4 = (2 * Math.PI) / 3; return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1; }
function animateBar(el, pct, dur, delay) {
  return function() { gsap.to(el, { width: pct + '%', duration: dur, delay: (delay || 0) / 1000, ease: 'power3.out' }); };
}`;

function template(sceneNum, duration, html, timeline, audioFile) {
  const padded = String(sceneNum).padStart(2, '0');
  const compId = `scene-${padded}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>${CSS}</style>
</head>
<body>
<div data-composition-id="${compId}" data-start="0" data-duration="${duration}" data-width="1920" data-height="1080">
${html}
</div>
<audio id="bg-music" data-start="0" data-duration="${duration}" data-track-index="1" src="../assets/music/jayson_burn-lofi-relax-song-386012.mp3" data-volume="0.12"></audio>
<audio id="vo-${padded}" data-start="0" data-duration="${duration}" data-track-index="2" src="../assets/audio/${audioFile}" data-volume="1.0"></audio>
<script>
window.__timelines = window.__timelines || {};
${HELPERS}
const tl1 = gsap.timeline({ paused: true });
window.__timelines["${compId}"] = tl1;
${timeline}
</script>
</body>
</html>`;
}

// ─── Scene data ───

const scenes = [
  // Scene 1: Hook
  {
    num: 1, duration: 48.3, audio: '01-hook.mp3',
    html: `<div id="s1" class="scene clip" data-start="0" data-duration="48.3" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="bg-glow bg-glow-2"></div>
  <div class="scene-content" style="align-items:center; text-align:center; gap:12px;">
    <div id="s1-models" style="display:flex; gap:16px; margin-bottom:16px; flex-wrap:wrap; justify-content:center;">
      <div class="model-pill" id="s1-m1"><span class="dot" style="background:var(--cyan)"></span>DeepSeek V4 Flash</div>
      <div class="model-pill" id="s1-m2"><span class="dot" style="background:var(--green)"></span>Big Pickle</div>
      <div class="model-pill" id="s1-m3"><span class="dot" style="background:var(--orange)"></span>MiMo v2.5</div>
      <div class="model-pill" id="s1-m4"><span class="dot" style="background:var(--blue-300)"></span>Gemma 4 31B</div>
      <div class="model-pill" id="s1-m5"><span class="dot" style="background:var(--gray-500)"></span>Nemotron 3</div>
    </div>
    <h1 id="s1-title">I Tested <span class="gradient-text">5 AI Models</span><br/>on the Same Coding Prompt</h1>
    <div id="s1-subtitle" class="body-text" style="font-size:28px;">One got a <span class="accent-cyan">perfect score</span>. One <span class="accent-red">broke on line 3</span>.</div>
    <div id="s1-split" class="info-card" style="display:flex; gap:20px; margin-top:16px; max-width:1200px;">
      <div style="flex:1; padding:20px; border-radius:12px; background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(33,150,243,0.04)); border:1px solid rgba(34,211,238,0.15);">
        <div style="font-size:18px; color:var(--cyan); font-weight:600; margin-bottom:8px;">DeepSeek Flash</div>
        <div style="font-size:14px; color:var(--gray-400);">Clean dashboard, working animations, proper structure</div>
      </div>
      <div style="flex:1; padding:20px; border-radius:12px; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15);">
        <div style="font-size:18px; color:var(--red); font-weight:600; margin-bottom:8px;">Nemotron</div>
        <div style="font-size:14px; color:var(--gray-400);">Broke on <span style="color:var(--red);font-weight:700;">line three</span> of eight hundred</div>
      </div>
    </div>
    <div id="s1-nemotron-score" style="margin-top:8px;">
      <span class="tag tag-red" style="font-size:18px; padding:8px 24px;">Nemotron Score: 1/10</span>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s1", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s1-title", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, 0.3);
tl1.from("#s1-subtitle", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, 0.6);
tl1.from("#s1-m1", { opacity: 0, x: -40, duration: 0.5, ease: "expo.out" }, 0.5);
tl1.from("#s1-m2", { opacity: 0, x: -40, duration: 0.5, ease: "expo.out" }, 0.65);
tl1.from("#s1-m3", { opacity: 0, x: -40, duration: 0.5, ease: "expo.out" }, 0.8);
tl1.from("#s1-m4", { opacity: 0, x: -40, duration: 0.5, ease: "expo.out" }, 0.95);
tl1.from("#s1-m5", { opacity: 0, x: -40, duration: 0.5, ease: "expo.out" }, 1.1);
tl1.from("#s1-split", { opacity: 0, y: 20, scale: 0.95, duration: 0.6, ease: "back.out(1.5)" }, 1.8);
tl1.from("#s1-nemotron-score", { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(2)" }, 2.5);`
  },
  // Scene 2: Setup
  {
    num: 2, duration: 64.5, audio: '02-setup.mp3',
    html: `<div id="s2" class="scene clip" data-start="0" data-duration="64.5" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="scene-content" style="gap:8px;">
    <h2 id="s2-title">The <span class="gradient-text">Setup</span></h2>
    <div id="s2-sub" class="body-text">8 mandatory sections — every model got the same brief</div>
    <div id="s2-tags" style="margin:8px 0;">
      <span class="tag tag-blue">1. OS Topbar + Live Clock</span>
      <span class="tag tag-blue">2. Typewriter Terminal</span>
      <span class="tag tag-cyan">3. SVG Radar Chart*</span>
      <span class="tag tag-blue">4. Infinite Stats Ticker</span>
      <span class="tag tag-blue">5. Feature Cards (6x)</span>
      <span class="tag tag-blue">6. Interactive Quiz</span>
      <span class="tag tag-blue">7. Syntax-highlighted Code</span>
      <span class="tag tag-blue">8. Gradient Footer</span>
    </div>
    <div id="s2-rules" style="display:flex; gap:16px;">
      <div class="info-card" style="flex:1;">
        <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ Hard Rules</h4>
        <div style="font-size:16px; color:var(--gray-400);">Zero libraries · One HTML file · 600-800 lines<br/>No CDN · All JS in IIFEs · CSS custom props</div>
      </div>
      <div class="info-card" style="flex:1;">
        <h4 style="color:var(--gold); margin-bottom:8px;">🎯 Judging Criteria</h4>
        <div style="font-size:16px; color:var(--gray-400);">Design · Code Quality · Features<br/>Animation · Mobile Score</div>
      </div>
    </div>
    <div id="s2-key" class="info-card" style="border-color:rgba(34,211,238,0.2); background:rgba(34,211,238,0.03);">
      <div style="font-size:18px; font-weight:600; color:var(--cyan);">🔑 Key Rule: <span style="color:var(--white);">"Think step by step before writing code"</span></div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s2", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s2-title", { opacity: 0, y: 40, duration: 0.7, ease: "power3.out" }, 1.3);
tl1.from("#s2-sub", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, 1.6);
tl1.from("#s2-tags .tag", { opacity: 0, y: 15, duration: 0.4, ease: "power2.out", stagger: 0.08 }, 2.0);
tl1.from("#s2-rules", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, 3.5);
tl1.from("#s2-key", { opacity: 0, scale: 0.95, duration: 0.5, ease: "back.out(1.5)" }, 4.5);`
  },
  // Scene 3: DeepSeek
  {
    num: 3, duration: 73.1, audio: '03-deepseek.mp3',
    html: `<div id="s3" class="scene clip" data-start="0" data-duration="73.1" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:500px;height:500px;background:rgba(34,211,238,0.08);top:-150px;right:-50px;filter:blur(100px);"></div>
  <div class="scene-content">
    <div id="s3-header" style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
      <div class="model-pill" style="background:rgba(34,211,238,0.08); border-color:rgba(34,211,238,0.2);">
        <span class="dot" style="background:var(--cyan)"></span>
        <span style="color:var(--cyan); font-weight:700;">DeepSeek V4 Flash</span>
      </div>
      <div style="font-size:32px; font-weight:800; color:var(--cyan); font-family:'JetBrains Mono',monospace;">
        <span id="s3-score-num">0.0</span><span style="font-size:20px; color:var(--gray-400);">/10</span>
      </div>
    </div>
    <div id="s3-contents" style="display:flex; gap:20px;">
      <div style="flex:1.3;">
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--cyan); font-weight:600; margin-bottom:4px;">Terminal</div>
          <div style="font-size:16px; color:var(--gray-400);">Actual file path in title bar · Realistic typewriter<br/>Async Python streaming — not a stub</div>
        </div>
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--cyan); font-weight:600; margin-bottom:4px;">Radar Chart ✅</div>
          <div style="font-size:16px; color:var(--gray-400);">6 axes labeled · Pure JS trigonometry · Scroll-animated</div>
        </div>
        <div class="info-card">
          <div style="font-size:18px; color:var(--red); font-weight:600; margin-bottom:4px;">Bug: Invisible Cards ✗</div>
          <div style="font-size:16px; color:var(--gray-400);">Glassmorphism opacity too low — common across all 5 models</div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="info-card">
          <div style="font-size:16px; color:var(--gray-400); margin-bottom:12px;">Sub-scores</div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Design</span><div class="bar-track"><div class="bar-fill" id="s3-bar1" style="background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="font-size:20px;" id="s3-s1">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Code</span><div class="bar-track"><div class="bar-fill" id="s3-bar2" style="background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="font-size:20px;" id="s3-s2">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Features</span><div class="bar-track"><div class="bar-fill" id="s3-bar3" style="background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="font-size:20px;" id="s3-s3">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Animation</span><div class="bar-track"><div class="bar-fill" id="s3-bar4" style="background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="font-size:20px;" id="s3-s4">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Mobile</span><div class="bar-track"><div class="bar-fill" id="s3-bar5" style="background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="font-size:20px;" id="s3-s5">0</span></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s3", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s3-header", { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" }, 1.3);
tl1.from("#s3-contents > div", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);
tl1.to({}, { duration: 1.2, ease: "none",
  onUpdate: function() {
    document.getElementById('s3-score-num').textContent = spring(this.progress(), { from: 0, to: 8.5 }).toFixed(1);
  },
  onComplete: function() { document.getElementById('s3-score-num').textContent = '8.5'; }
}, 2.0);
tl1.call(animateBar(document.getElementById('s3-bar1'), 90, 0.8, 200), null, null, 2.5);
tl1.call(function() { document.getElementById('s3-s1').textContent = '90'; }, null, null, 2.7);
tl1.call(animateBar(document.getElementById('s3-bar2'), 88, 0.8, 200), null, null, 2.7);
tl1.call(function() { document.getElementById('s3-s2').textContent = '88'; }, null, null, 2.9);
tl1.call(animateBar(document.getElementById('s3-bar3'), 85, 0.8, 200), null, null, 2.9);
tl1.call(function() { document.getElementById('s3-s3').textContent = '85'; }, null, null, 3.1);
tl1.call(animateBar(document.getElementById('s3-bar4'), 82, 0.8, 200), null, null, 3.1);
tl1.call(function() { document.getElementById('s3-s4').textContent = '82'; }, null, null, 3.3);
tl1.call(animateBar(document.getElementById('s3-bar5'), 88, 0.8, 200), null, null, 3.3);
tl1.call(function() { document.getElementById('s3-s5').textContent = '88'; }, null, null, 3.5);`
  },
  // Scene 4: Big Pickle
  {
    num: 4, duration: 76.1, audio: '04-bigpickle.mp3',
    html: `<div id="s4" class="scene clip" data-start="0" data-duration="76.1" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:450px;height:450px;background:rgba(74,222,128,0.07);bottom:-100px;right:-50px;filter:blur(100px);"></div>
  <div class="scene-content">
    <div id="s4-header" style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
      <div class="model-pill" style="background:rgba(74,222,128,0.08); border-color:rgba(74,222,128,0.2);">
        <span class="dot" style="background:var(--green)"></span>
        <span style="color:var(--green); font-weight:700;">Big Pickle v1.0</span>
      </div>
      <div style="font-size:32px; font-weight:800; color:var(--green); font-family:'JetBrains Mono',monospace;">
        <span id="s4-score-num">0.0</span><span style="font-size:20px; color:var(--gray-400);">/10</span>
      </div>
    </div>
    <div id="s4-contents" style="display:flex; gap:20px;">
      <div style="flex:1.3;">
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--green); font-weight:600; margin-bottom:4px;">Terminal Boot 🥒</div>
          <div style="font-size:16px; color:var(--gray-400);">"Loading brine... 100%" · "Fermenting reasoning engine"<br/>"Ready. No cap." — perfectly on-brand</div>
        </div>
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--green); font-weight:600; margin-bottom:4px;">Radar Chart ✅</div>
          <div style="font-size:16px; color:var(--gray-400);">Fully working · Proper 10-level grid · Animated values</div>
        </div>
        <div class="info-card">
          <div style="font-size:18px; color:var(--gold); font-weight:600; margin-bottom:4px;">Creative: Bubble BG</div>
          <div style="font-size:16px; color:var(--gray-400);">Fizz bubbles float up like a pickle jar — model invented it</div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="info-card">
          <div style="font-size:16px; color:var(--gray-400); margin-bottom:12px;">Sub-scores</div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Design</span><div class="bar-track"><div class="bar-fill" id="s4-bar1" style="background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="font-size:20px;" id="s4-s1">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Code</span><div class="bar-track"><div class="bar-fill" id="s4-bar2" style="background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="font-size:20px;" id="s4-s2">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Features</span><div class="bar-track"><div class="bar-fill" id="s4-bar3" style="background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="font-size:20px;" id="s4-s3">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Animation</span><div class="bar-track"><div class="bar-fill" id="s4-bar4" style="background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="font-size:20px;" id="s4-s4">0</span></div>
          <div class="bench-row" style="padding:10px 16px; margin-bottom:4px;"><span style="width:80px;font-size:15px;">Mobile</span><div class="bar-track"><div class="bar-fill" id="s4-bar5" style="background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="font-size:20px;" id="s4-s5">0</span></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s4", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s4-header", { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" }, 1.3);
tl1.from("#s4-contents > div", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);
tl1.to({}, { duration: 1.2, ease: "none",
  onUpdate: function() { document.getElementById('s4-score-num').textContent = spring(this.progress(), { from: 0, to: 8.0 }).toFixed(1); },
  onComplete: function() { document.getElementById('s4-score-num').textContent = '8.0'; }
}, 2.0);
tl1.call(animateBar(document.getElementById('s4-bar1'), 85, 0.8, 200), null, null, 2.5);
tl1.call(function() { document.getElementById('s4-s1').textContent = '85'; }, null, null, 2.7);
tl1.call(animateBar(document.getElementById('s4-bar2'), 88, 0.8, 200), null, null, 2.7);
tl1.call(function() { document.getElementById('s4-s2').textContent = '88'; }, null, null, 2.9);
tl1.call(animateBar(document.getElementById('s4-bar3'), 80, 0.8, 200), null, null, 2.9);
tl1.call(function() { document.getElementById('s4-s3').textContent = '80'; }, null, null, 3.1);
tl1.call(animateBar(document.getElementById('s4-bar4'), 82, 0.8, 200), null, null, 3.1);
tl1.call(function() { document.getElementById('s4-s4').textContent = '82'; }, null, null, 3.3);
tl1.call(animateBar(document.getElementById('s4-bar5'), 80, 0.8, 200), null, null, 3.3);
tl1.call(function() { document.getElementById('s4-s5').textContent = '80'; }, null, null, 3.5);`
  },
  // Scene 5: MiMo
  {
    num: 5, duration: 62.1, audio: '05-mimo.mp3',
    html: `<div id="s5" class="scene clip" data-start="0" data-duration="62.1" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:400px;height:400px;background:rgba(251,146,60,0.06);top:-100px;left:60%;filter:blur(100px);"></div>
  <div class="scene-content">
    <div id="s5-header" style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
      <div class="model-pill" style="background:rgba(251,146,60,0.08); border-color:rgba(251,146,60,0.2);">
        <span class="dot" style="background:var(--orange)"></span>
        <span style="color:var(--orange); font-weight:700;">MiMo v2.5 (7B)</span>
      </div>
      <div style="font-size:32px; font-weight:800; color:var(--orange); font-family:'JetBrains Mono',monospace;">
        <span id="s5-score-num">0.0</span><span style="font-size:20px; color:var(--gray-400);">/10</span>
      </div>
    </div>
    <div id="s5-contents" style="display:flex; gap:20px;">
      <div style="flex:1.3;">
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--orange); font-weight:600; margin-bottom:4px;">🏆 Best Terminal of All 5</div>
          <div style="font-size:16px; color:var(--gray-400);">Tag-style labels: [boot] [load] [spec] [core]<br/>Feels like an actual system log</div>
        </div>
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--orange); font-weight:600; margin-bottom:4px;">Contextual Intelligence</div>
          <div style="font-size:16px; color:var(--gray-400);">Math quiz because MiMo is a reasoning model<br/>The model knew itself and leaned into it</div>
        </div>
        <div class="info-card">
          <div style="font-size:18px; color:var(--gold); font-weight:600; margin-bottom:4px;">7B → 7.5/10</div>
          <div style="font-size:16px; color:var(--gray-400);">Punching way above its weight class<br/>Don't sleep on small reasoning models</div>
        </div>
      </div>
      <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
        <div class="info-card" style="text-align:center;">
          <div style="font-size:16px; color:var(--gray-400); margin-bottom:8px;">Parameter Comparison</div>
          <div style="display:flex; justify-content:center; gap:40px;">
            <div><div style="font-size:48px; font-weight:800; color:var(--orange); font-family:'JetBrains Mono',monospace;">7B</div><div style="font-size:14px; color:var(--gray-400);">MiMo</div><div style="font-size:28px; font-weight:700; color:var(--orange);">7.5</div></div>
            <div style="font-size:32px; color:var(--gray-500); display:flex; align-items:center;">vs</div>
            <div><div style="font-size:48px; font-weight:800; color:var(--blue-300); font-family:'JetBrains Mono',monospace;">31B</div><div style="font-size:14px; color:var(--gray-400);">Gemma</div><div style="font-size:28px; font-weight:700; color:var(--blue-300);">4.0</div></div>
          </div>
          <div style="font-size:16px; color:var(--gray-400); margin-top:8px;">Smaller model. Higher score. 🧠</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s5", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s5-header", { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" }, 1.3);
tl1.from("#s5-contents > div", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s5-score-num').textContent = spring(this.progress(), { from: 0, to: 7.5 }).toFixed(1); },
  onComplete: function() { document.getElementById('s5-score-num').textContent = '7.5'; }
}, 2.0);`
  },
  // Scene 6: Gemma
  {
    num: 6, duration: 65.0, audio: '06-gemma.mp3',
    html: `<div id="s6" class="scene clip" data-start="0" data-duration="65.0" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:400px;height:400px;background:rgba(96,165,250,0.06);bottom:-100px;left:-50px;filter:blur(100px);"></div>
  <div class="scene-content">
    <div id="s6-header" style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
      <div class="model-pill" style="background:rgba(96,165,250,0.08); border-color:rgba(96,165,250,0.2);">
        <span class="dot" style="background:var(--blue-300)"></span>
        <span style="color:var(--blue-300); font-weight:700;">Gemma 4 31B</span>
      </div>
      <div style="font-size:32px; font-weight:800; color:var(--blue-300); font-family:'JetBrains Mono',monospace;">
        <span id="s6-score-num">0.0</span><span style="font-size:20px; color:var(--gray-400);">/10</span>
      </div>
    </div>
    <div id="s6-contents" style="display:flex; gap:20px;">
      <div style="flex:1;">
        <div class="info-card" style="margin-bottom:8px; border-color:rgba(74,222,128,0.15);">
          <div style="font-size:18px; color:var(--green); font-weight:600; margin-bottom:4px;">✓ Did Well</div>
          <div style="font-size:16px; color:var(--gray-400);">Cleanest topbar of all 5 · Terminal works<br/>Dark mode toggle works · Google branding correct</div>
        </div>
        <div class="info-card">
          <div style="font-size:18px; color:var(--red); font-weight:600; margin-bottom:4px;">✗ The Radar Fail</div>
          <div style="font-size:16px; color:var(--gray-400);">Solid blue hexagon — no labels, no values<br/>Skipped the trigonometry entirely</div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="info-card" style="margin-bottom:8px; border-color:rgba(239,68,68,0.15);">
          <div style="font-size:18px; color:var(--red); font-weight:600; margin-bottom:4px;">✗ Critical Failures</div>
          <div style="font-size:16px; color:var(--gray-400);">Cards = blank dark void · Ticker = one line<br/>Particle background = absent</div>
        </div>
        <div class="info-card" style="text-align:center;">
          <div style="font-size:16px; color:var(--gray-400);">Size ≠ Quality</div>
          <div style="font-size:14px; color:var(--gold);">MiMo (7B) scored 7.5 · Gemma (31B) scored 4.0</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s6", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s6-header", { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" }, 1.3);
tl1.from("#s6-contents > div", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s6-score-num').textContent = spring(this.progress(), { from: 0, to: 4.0 }).toFixed(1); },
  onComplete: function() { document.getElementById('s6-score-num').textContent = '4.0'; }
}, 2.0);`
  },
  // Scene 7: Nemotron
  {
    num: 7, duration: 82.3, audio: '07-nemotron.mp3',
    html: `<div id="s7" class="scene clip" data-start="0" data-duration="82.3" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:500px;height:500px;background:rgba(239,68,68,0.05);top:-100px;right:30%;filter:blur(100px);"></div>
  <div class="scene-content">
    <div id="s7-header" style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
      <div class="model-pill" style="background:rgba(100,116,139,0.08); border-color:rgba(100,116,139,0.2);">
        <span class="dot" style="background:var(--gray-500)"></span>
        <span style="color:var(--red); font-weight:700;">Nemotron 3 Super</span>
      </div>
      <div style="font-size:32px; font-weight:800; color:var(--red); font-family:'JetBrains Mono',monospace;">
        <span id="s7-score-num">0.0</span><span style="font-size:20px; color:var(--gray-400);">/10</span>
      </div>
    </div>
    <div id="s7-contents" style="display:flex; gap:20px;">
      <div style="flex:1.3;">
        <div class="info-card" style="margin-bottom:8px; border-color:rgba(239,68,68,0.2); background:rgba(239,68,68,0.03);">
          <div style="font-size:20px; color:var(--red); font-weight:700; margin-bottom:4px;">💀 Line 3: CSS Vars as Strings</div>
          <div style="font-size:18px; font-family:'JetBrains Mono',monospace; color:var(--red); background:rgba(255,255,255,0.03); padding:8px 12px; border-radius:6px; margin:8px 0;">
            --a1: <span style="background:rgba(239,68,68,0.2); padding:2px 6px; border-radius:3px;">'#76b900'</span>;
          </div>
          <div style="font-size:16px; color:var(--gray-400);">Quoted strings, not colors → <span style="color:var(--red);font-weight:600;">every visual element failed</span></div>
        </div>
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:18px; color:var(--orange); font-weight:600; margin-bottom:4px;">🍌 The Banana Emoji</div>
          <div style="font-size:16px; color:var(--gray-400);">VRAM widget rendered as a banana emoji on a gray box<br/>From NVIDIA — the company that makes AI chips</div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="info-card" style="margin-bottom:8px;">
          <div style="font-size:16px; color:var(--green); margin-bottom:4px;">✓ The Only Things That Worked</div>
          <div style="font-size:15px; color:var(--gray-400);">
            • Live clock ticks correctly<br/>
            • Quiz about GPU parallelism is technically correct<br/>
            • Build timestamp injected by JS
          </div>
        </div>
        <div class="info-card" style="text-align:center;">
          <div style="font-size:36px; font-weight:800; color:var(--red); font-family:'JetBrains Mono',monospace;">1.0<span style="font-size:18px; color:var(--gray-400);">/10</span></div>
          <div style="font-size:16px; color:var(--gray-400);">From a model by <span style="font-weight:600;">NVIDIA</span></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s7", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s7-header", { opacity: 0, x: -30, duration: 0.6, ease: "expo.out" }, 1.3);
tl1.from("#s7-contents > div", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s7-score-num').textContent = spring(this.progress(), { from: 0, to: 1.0 }).toFixed(1); },
  onComplete: function() { document.getElementById('s7-score-num').textContent = '1.0'; }
}, 2.0);`
  },
  // Scene 8: Leaderboard
  {
    num: 8, duration: 60.4, audio: '08-leaderboard.mp3',
    html: `<div id="s8" class="scene clip" data-start="0" data-duration="60.4" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="scene-content" style="gap:12px;">
    <h2 id="s8-title">The <span class="gradient-text">Leaderboard</span></h2>
    <div id="s8-podium" class="podium" style="margin-bottom:8px;">
      <div class="pod"><div class="medal">🥈</div><div class="name" style="color:var(--green);">Big Pickle</div><div class="score" style="color:var(--green);" id="s8-s2">0.0</div><div class="bar" style="height:100px;background:linear-gradient(180deg,rgba(148,163,184,0.08) 0%,transparent);border:1px solid rgba(148,163,184,0.15);border-bottom:none;border-radius:12px 12px 0 0;width:180px;"></div></div>
      <div class="pod"><div class="medal">🥇</div><div class="name" style="color:var(--cyan);">DeepSeek Flash</div><div class="score" style="color:var(--cyan);" id="s8-s1">0.0</div><div class="bar" style="height:140px;background:linear-gradient(180deg,rgba(34,211,238,0.08) 0%,transparent);border:1px solid rgba(34,211,238,0.2);border-bottom:none;border-radius:12px 12px 0 0;width:200px;"></div></div>
      <div class="pod"><div class="medal">🥉</div><div class="name" style="color:var(--orange);">MiMo v2.5</div><div class="score" style="color:var(--orange);" id="s8-s3">0.0</div><div class="bar" style="height:80px;background:linear-gradient(180deg,rgba(205,124,58,0.06) 0%,transparent);border:1px solid rgba(205,124,58,0.15);border-bottom:none;border-radius:12px 12px 0 0;width:160px;"></div></div>
    </div>
    <div id="s8-table">
      <div class="bench-row" style="margin-bottom:4px;"><span class="rank" style="color:var(--cyan);">1</span><span class="model-name" style="color:var(--cyan);">DeepSeek V4 Flash</span><div class="bar-track"><div class="bar-fill" id="s8-bar1" style="width:0;background:linear-gradient(90deg,var(--cyan),var(--blue-300))"></div></div><span class="bar-score" style="color:var(--cyan);" id="s8-bs1">0</span></div>
      <div class="bench-row" style="margin-bottom:4px;"><span class="rank" style="color:var(--green);">2</span><span class="model-name" style="color:var(--green);">Big Pickle</span><div class="bar-track"><div class="bar-fill" id="s8-bar2" style="width:0;background:linear-gradient(90deg,var(--green),#4ade80)"></div></div><span class="bar-score" style="color:var(--green);" id="s8-bs2">0</span></div>
      <div class="bench-row" style="margin-bottom:4px;"><span class="rank" style="color:var(--orange);">3</span><span class="model-name" style="color:var(--orange);">MiMo v2.5</span><div class="bar-track"><div class="bar-fill" id="s8-bar3" style="width:0;background:linear-gradient(90deg,var(--orange),#fb923c)"></div></div><span class="bar-score" style="color:var(--orange);" id="s8-bs3">0</span></div>
      <div class="bench-row" style="margin-bottom:4px;"><span class="rank" style="color:var(--blue-300);">4</span><span class="model-name" style="color:var(--blue-300);">Gemma 4 31B</span><div class="bar-track"><div class="bar-fill" id="s8-bar4" style="width:0;background:linear-gradient(90deg,var(--blue-300),#60a5fa)"></div></div><span class="bar-score" style="color:var(--blue-300);" id="s8-bs4">0</span></div>
      <div class="bench-row"><span class="rank" style="color:var(--red);">5</span><span class="model-name" style="color:var(--gray-400);">Nemotron 3</span><div class="bar-track"><div class="bar-fill" id="s8-bar5" style="width:0;background:var(--gray-500)"></div></div><span class="bar-score" style="color:var(--gray-400);" id="s8-bs5">0</span></div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s8", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s8-title", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, 1.3);
tl1.from("#s8-podium", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, 1.8);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s8-s1').textContent = spring(this.progress(), { from: 0, to: 8.5 }).toFixed(1); },
  onComplete: function() { document.getElementById('s8-s1').textContent = '8.5'; }
}, 2.0);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s8-s2').textContent = spring(this.progress(), { from: 0, to: 8.0 }).toFixed(1); },
  onComplete: function() { document.getElementById('s8-s2').textContent = '8.0'; }
}, 2.0);
tl1.to({}, { duration: 1.2, ease: 'none',
  onUpdate: function() { document.getElementById('s8-s3').textContent = spring(this.progress(), { from: 0, to: 7.5 }).toFixed(1); },
  onComplete: function() { document.getElementById('s8-s3').textContent = '7.5'; }
}, 2.0);
tl1.call(animateBar(document.getElementById('s8-bar1'), 85, 0.8, 0), null, null, 3.0);
tl1.call(function() { document.getElementById('s8-bs1').textContent = '8.5'; }, null, null, 3.3);
tl1.call(animateBar(document.getElementById('s8-bar2'), 80, 0.8, 200), null, null, 3.0);
tl1.call(function() { document.getElementById('s8-bs2').textContent = '8.0'; }, null, null, 3.5);
tl1.call(animateBar(document.getElementById('s8-bar3'), 75, 0.8, 400), null, null, 3.0);
tl1.call(function() { document.getElementById('s8-bs3').textContent = '7.5'; }, null, null, 3.7);
tl1.call(animateBar(document.getElementById('s8-bar4'), 40, 0.8, 600), null, null, 3.0);
tl1.call(function() { document.getElementById('s8-bs4').textContent = '4.0'; }, null, null, 3.9);
tl1.call(animateBar(document.getElementById('s8-bar5'), 10, 0.8, 800), null, null, 3.0);
tl1.call(function() { document.getElementById('s8-bs5').textContent = '1.0'; }, null, null, 4.1);`
  },
  // Scene 9: Takeaways
  {
    num: 9, duration: 95.7, audio: '09-takeaways.mp3',
    html: `<div id="s9" class="scene clip" data-start="0" data-duration="95.7" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-2"></div>
  <div class="scene-content" style="gap:8px;">
    <h2 id="s9-title">Key <span class="gradient-text">Takeaways</span></h2>
    <div id="s9-sub" class="body-text" style="margin-bottom:4px;">What this test really revealed about AI coding</div>
    <div id="s9-grid" class="bento-grid bento-grid-3">
      <div class="bento-item" id="s9-c1">
        <div class="num">01</div>
        <div class="icon">🪄</div>
        <h4>The Universal Failure</h4>
        <p><strong>All 5 models</strong> produced invisible feature cards. Glassmorphism + IntersectionObserver is the hardest part of the prompt — nobody cracked it.</p>
      </div>
      <div class="bento-item" id="s9-c2">
        <div class="num">02</div>
        <div class="icon">🧮</div>
        <h4>SVG Math is the Real Test</h4>
        <p>Radar chart = trigonometry from scratch. DeepSeek & Big Pickle got it right. Gemma drew a hexagon. Nemotron drew a random shape.</p>
      </div>
      <div class="bento-item" id="s9-c3">
        <div class="num">03</div>
        <div class="icon">📏</div>
        <h4>Size ≠ Quality</h4>
        <p>Gemma 31B = 4/10. MiMo 7B = 7.5/10. Parameter count is not a reliable predictor of frontend coding performance.</p>
      </div>
      <div class="bento-item" id="s9-c4">
        <div class="num">04</div>
        <div class="icon">💥</div>
        <h4>One Bug Kills Everything</h4>
        <p>Nemotron's quoted CSS variable on line 3 destroyed 100% of the visual design. Self-review is not optional.</p>
      </div>
      <div class="bento-item" id="s9-c5">
        <div class="num">05</div>
        <div class="icon">🎨</div>
        <h4>Personality is Hard</h4>
        <p>Being funny AND correct simultaneously is rare. Big Pickle understood the joke — most models play it safe.</p>
      </div>
      <div class="bento-item" id="s9-c6">
        <div class="num">06</div>
        <div class="icon">🧠</div>
        <h4>Think Before You Code</h4>
        <p>"Think step by step" forces reasoning mode. MiMo's strongest sections show deep contextual understanding from planning first.</p>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s9", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s9-title", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, 1.3);
tl1.from("#s9-sub", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, 1.6);
tl1.from("#s9-grid .bento-item", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 2.0);`
  },
  // Scene 10: Verdict
  {
    num: 10, duration: 53.5, audio: '10-verdict.mp3',
    html: `<div id="s10" class="scene clip" data-start="0" data-duration="53.5" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="scene-content" style="gap:8px;">
    <h2 id="s10-title">Final <span class="gradient-text">Verdict</span></h2>
    <div id="s10-grid" class="bento-grid bento-grid-2" style="grid-template-columns:1fr 1fr; gap:8px;">
      <div class="bento-item" style="border-color:rgba(34,211,238,0.2);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--cyan);">For Frontend</span>
        </div>
        <h3 style="color:var(--cyan);">DeepSeek V4 Flash</h3>
        <p style="font-size:18px; color:var(--gray-300);">Reliable, multi-constraint code that follows complex briefs without going off the rails. Use it.</p>
      </div>
      <div class="bento-item" style="border-color:rgba(74,222,128,0.2);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--green);">For Creative</span>
        </div>
        <h3 style="color:var(--green);">Big Pickle</h3>
        <p style="font-size:18px; color:var(--gray-300);">Personality + technical requirements — holds both registers simultaneously. Exceptional.</p>
      </div>
      <div class="bento-item" style="border-color:rgba(251,146,60,0.2);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--orange);">For Small Models</span>
        </div>
        <h3 style="color:var(--orange);">MiMo v2.5</h3>
        <p style="font-size:18px; color:var(--gray-300);">7B parameters, 7.5/10. Remarkable. Punching way above its weight class.</p>
      </div>
      <div class="bento-item" style="border-color:rgba(239,68,68,0.2);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--red);">Avoid for Frontend</span>
        </div>
        <h3 style="color:var(--red);">Nemotron & Gemma 4</h3>
        <p style="font-size:18px; color:var(--gray-300);">Neither is ready for complex single-file frontend work. Gemma may surprise on other tasks — but not frontend.</p>
      </div>
    </div>
  </div>
</div>`,
    timeline: `tl1.from("#s10", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s10-title", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, 1.3);
tl1.from("#s10-grid .bento-item", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 1.8);`
  },
  // Scene 11: Outro
  {
    num: 11, duration: 27.9, audio: '11-outro.mp3',
    html: `<div id="s11" class="scene clip" data-start="0" data-duration="27.9" data-track-index="0">
  <div class="bg-grid"></div>
  <div class="bg-glow" style="width:600px;height:600px;background:radial-gradient(circle,rgba(33,150,243,0.08),transparent);top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(120px);"></div>
  <div class="scene-content" style="align-items:center; text-align:center;">
    <div id="s11-brand" style="font-size:18px; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:var(--gray-400); margin-bottom:8px;">AI Bench 2026</div>
    <h2 id="s11-title" style="font-size:64px;">That's the <span class="gradient-text">Test</span></h2>
    <div id="s11-body" class="body-text" style="max-width:1000px; margin-bottom:16px;">
      5 models, 1 prompt, very different results. Try it yourself — paste the prompt into any model and see what it builds.
    </div>
    <div id="s11-cta" class="info-card" style="display:inline-flex; align-items:center; gap:16px; padding:20px 40px; border-color:rgba(33,150,243,0.2);">
      <span style="font-size:20px; font-weight:600;">Which model wins in 6 months?</span>
      <span style="font-size:16px; color:var(--gray-400);">Drop your answer in the comments</span>
    </div>
    <div id="s11-thanks" style="margin-top:16px; font-size:18px; color:var(--gray-400);">
      Thanks for watching. See you in the next one.
    </div>
  </div>
</div>
<div id="s11-end" class="scene clip transition-overlay" data-start="0" data-duration="2" data-track-index="3" style="z-index:50;"></div>`,
    timeline: `tl1.from("#s11", { opacity: 0, duration: 0.3 }, 0);
tl1.from("#s11-brand", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, 1.3);
tl1.from("#s11-title", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, 1.6);
tl1.from("#s11-body", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, 2.0);
tl1.from("#s11-cta", { opacity: 0, scale: 0.9, duration: 0.6, ease: "back.out(1.5)" }, 2.5);
tl1.from("#s11-thanks", { opacity: 0, y: 15, duration: 0.5, ease: "power2.out" }, 3.0);
tl1.to("#s11-end", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 25.5);`
  }
];

// Generate all files
for (const s of scenes) {
  const padded = String(s.num).padStart(2, '0');
  const filePath = join(outDir, `scene-${padded}.html`);
  const content = template(s.num, s.duration, s.html, s.timeline, s.audio);
  writeFileSync(filePath, content, 'utf-8');
  console.log(`Wrote ${filePath}`);
}

console.log(`\nGenerated ${scenes.length} scene files in ${outDir}`);
