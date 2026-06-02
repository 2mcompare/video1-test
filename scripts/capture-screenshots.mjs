import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const HTML_DIR = join(PROJECT_ROOT, "assets", "html");
const SCREENSHOT_DIR = join(PROJECT_ROOT, "assets", "screenshots");

mkdirSync(SCREENSHOT_DIR, { recursive: true });

const pages = [
  { file: "deepseek-flash.html", name: "deepseek", wait: 3000, fullPage: true },
  { file: "bigpickle.html", name: "bigpickle", wait: 3000, fullPage: true },
  { file: "mimo.html", name: "mimo", wait: 3000, fullPage: true },
  { file: "gemma.html", name: "gemma", wait: 3000, fullPage: true },
  { file: "nemotron.html", name: "nemotron", wait: 2000, fullPage: true },
  { file: "com-free-models.html", name: "comparison", wait: 3000, fullPage: true },
];

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: "C:\\Users\\pc\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe", args: ["--no-sandbox", "--disable-gpu"] });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  for (const page of pages) {
    const filePath = `file:///${join(HTML_DIR, page.file).replace(/\\/g, "/")}`;
    const screenshotPath = join(SCREENSHOT_DIR, `${page.name}.png`);
    
    const p = await context.newPage();
    try {
      await p.goto(filePath, { waitUntil: "load", timeout: 30000 });
      await p.waitForTimeout(page.wait);
      
      if (page.fullPage) {
        await p.screenshot({ path: screenshotPath, fullPage: true });
      } else {
        await p.screenshot({ path: screenshotPath });
      }
      console.log(`✓ Captured ${page.name}.png`);
    } catch (err) {
      console.error(`✗ Failed to capture ${page.file}: ${err.message}`);
    }
    await p.close();
  }

  console.log("\nAll screenshots captured!");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
