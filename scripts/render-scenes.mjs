import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = join(__dirname, '..');

const scenes = [
  { num: '01', name: 'hook', duration: '48.3s' },
  { num: '02', name: 'setup', duration: '64.5s' },
  { num: '03', name: 'deepseek', duration: '73.1s' },
  { num: '04', name: 'bigpickle', duration: '76.1s' },
  { num: '05', name: 'mimo', duration: '62.1s' },
  { num: '06', name: 'gemma', duration: '65.0s' },
  { num: '07', name: 'nemotron', duration: '82.3s' },
  { num: '08', name: 'leaderboard', duration: '60.4s' },
  { num: '09', name: 'takeaways', duration: '95.7s' },
  { num: '10', name: 'verdict', duration: '53.5s' },
  { num: '11', name: 'outro', duration: '27.9s' },
];

const rendersDir = join(projectDir, 'renders');
mkdirSync(rendersDir, { recursive: true });

// Backup original index.html
const originalIndex = readFileSync(join(projectDir, 'index.html'), 'utf-8');

const quality = process.argv.find(a => a.startsWith('--quality='))?.split('=')[1] || 'draft';
const startFrom = process.argv.find(a => a.startsWith('--from='))?.split('=')[1];
const singleScene = process.argv.find(a => a.startsWith('--scene='))?.split('=')[1];

let toRender = scenes;
if (singleScene) {
  toRender = scenes.filter(s => s.num === singleScene);
} else if (startFrom) {
  toRender = scenes.filter(s => s.num >= startFrom);
}

for (const scene of toRender) {
  const sceneFile = join(projectDir, `compositions/scene-${scene.num}.html`);
  const outputFile = join(rendersDir, `scene-${scene.num}-${scene.name}.mp4`);

  // Replace index.html with scene composition
  const sceneContent = readFileSync(sceneFile, 'utf-8');
  writeFileSync(join(projectDir, 'index.html'), sceneContent);

  const cmd = `npx --yes hyperframes@0.6.69 render --output "${outputFile}" --quality ${quality}`;

  console.log(`\n═══════════════════════════════════════`);
  console.log(`🎬 Rendering Scene ${scene.num}: ${scene.name} (${scene.duration})`);
  console.log(`   ${cmd}`);
  console.log(`═══════════════════════════════════════\n`);

  try {
    execSync(cmd, {
      cwd: projectDir,
      stdio: 'inherit',
      timeout: 1800000, // 30 min per scene
    });
    console.log(`\n✅ Scene ${scene.num} done → ${outputFile}`);
  } catch (err) {
    console.error(`\n❌ Scene ${scene.num} failed: ${err.message}`);
  }
}

// Restore original index.html
writeFileSync(join(projectDir, 'index.html'), originalIndex);
console.log(`\n🏁 All done. Original index.html restored.`);
console.log(`   Renders in: ${rendersDir}`);
