import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(__dirname, "..", "assets", "audio");
mkdirSync(AUDIO_DIR, { recursive: true });

const sections = [
  {
    id: "01-hook",
    text: "So I gave five AI models the exact same coding prompt. Same task. Same rules. Same deadline. And I told them to fight. The prompt was brutal \u2014 build a full OS-style dashboard website, from scratch, in a single HTML file, with zero libraries, zero dependencies \u2014 pure code only. And the results? Completely different. Like, not even close. One model produced something genuinely impressive. Clean code, working animations, proper structure. And another one broke on line three. Line. Three. Out of eight hundred. Yeah. We need to talk about that. Stick around because by the end of this video you will know exactly which AI to use for frontend coding \u2014 and which one to never trust with a CSS file again. Let us get into it."
  },
  {
    id: "02-setup",
    text: "Okay so before we get into the results, let me show you exactly what I asked these models to build. The prompt had eight mandatory sections. Every model got the same list. Number one \u2014 an OS-style topbar. With a live clock, a dark mode toggle that saves to localStorage, and a battery widget. Number two \u2014 a fake terminal that types out a boot sequence automatically when you open the page. Number three \u2014 this is the one that breaks models \u2014 a pure SVG radar chart. Six axes, animated on scroll, with zero libraries. Just math. Raw trigonometry in JavaScript. Then on top of that: an infinite scrolling stats ticker, six feature cards with staggered animations, a quiz section, a syntax-highlighted code block, and a footer. All of that. In one HTML file. Zero CDN links. Zero imports. And the most important rule? The models had to think step by step before writing a single line of code. That one instruction alone filters out the lazy outputs. Alright. Let us look at what they actually built."
  },
  {
    id: "03-deepseek",
    text: "First up \u2014 DeepSeek V4 Flash. And honestly? This is the one that surprised me most. Look at that terminal. It has an actual file path in the title bar. Like a real terminal. Not just some placeholder text \u2014 it looks like you are actually running a program. The radar chart is working \u2014 all six axes are labeled, the values animate as you scroll, and the polygon is mathematically correct. That is harder than it sounds. This is pure JavaScript trigonometry, no library doing the work. The stats ticker uses these little dropdown pill things \u2014 I did not ask for that. That is the model being creative with the brief. I like that. The code showcase? It is using async Python with proper streaming. Not a stub. Not fake code. Actual real implementation. Now \u2014 there is one bug. And it is a consistent bug across all five models actually. The feature cards section is basically invisible. The glassmorphism opacity is set too low on a dark background so you just get nothing. A blank section. That would have pushed this to a nine out of ten easily. But even with that \u2014 DeepSeek Flash is the strongest coder here. Clean IIFEs, proper CSS custom properties, readable structure. If you are using AI for frontend work, this is your model."
  },
  {
    id: "04-bigpickle",
    text: "Okay. Big Pickle. So the brief for this one was intentionally weird. I asked the model to build something that was simultaneously technically serious AND themed like a deli pickle. Funny brand, real code. And somehow \u2014 it worked? Look at that terminal boot sequence. Loading brine one hundred percent. Fermenting reasoning engine. Ready. No cap. That is so good. The model understood the joke AND executed it with proper typewriter animation. The radar chart is fully working. The bubble background animation \u2014 where little fizz bubbles float up like a pickle jar \u2014 that is the most creative visual effect of all five submissions. I did not ask for that specifically. The model invented it. The quiz questions are actual lateral thinking puzzles. Not trivia. Real logic problems wrapped in pickle metaphors. The code is also the most readable of all five. Good comments, clean structure, clear variable names. Now \u2014 same invisible cards bug. And it went way over the line limit. I said eight hundred lines, it gave me twelve hundred. But honestly the extra length came from good things, not padding. Eight out of ten. And in terms of personality and brand coherence? It is actually the best submission. No contest."
  },
  {
    id: "05-mimo",
    text: "MiMo v2.5 from Xiaomi. And this one I want you to pay attention to because there is an important lesson here. MiMo is a seven billion parameter model. That is tiny compared to the others. And it scored seven point five out of ten. That terminal? Best terminal of the five. It uses these tag-style labels \u2014 boot, load, spec, core \u2014 that make it feel like an actual system log. Very detailed, very deliberate. The quiz questions are math problems. Real math. Because MiMo is a reasoning and math model, and the model knew that about itself and leaned into it. That is contextual intelligence. The radar chart is correct. Axis labels, values, proper animation. At seven billion parameters. Think about that. But the feature cards \u2014 invisible. Same bug. And the ticker is really sparse, like it only cycles through a few items before looping. That hurts it. Still \u2014 seven point five from a seven billion parameter model is genuinely impressive. Do not sleep on small reasoning models for coding tasks."
  },
  {
    id: "06-gemma",
    text: "Gemma four, thirty-one billion parameters from Google DeepMind. And this one is a bit disappointing. The structure is there. The topbar is actually the cleanest of all five \u2014 minimal, well-designed. The terminal works. Dark mode toggle works. These basics are solid. But then you get to the radar chart. And look at this \u2014 it is just a solid blue hexagon. No axis labels. No score values. No grid lines. No animation. It drew a shape and called it a day. The JavaScript is there \u2014 the model wrote a function for the radar chart. But it skipped the actual trigonometry. It drew a fixed hexagon instead of computing the polygon from the axis values. The feature cards section is just a massive blank dark area. The ticker shows one line. The particle background effect that I specifically asked for \u2014 completely absent. And here is the thing that gets me \u2014 MiMo is seven billion parameters and outscored Gemma, which is thirty-one billion. Size is not quality. Remember that."
  },
  {
    id: "07-nemotron",
    text: "And then there is Nemotron. I do not even know where to start. So here is what happened. On line three of the file \u2014 line THREE \u2014 Nemotron wrote this: double dash, a one, colon, quote, hash, number, quote. CSS custom properties with the hex color value wrapped in quotation marks. That is not how CSS variables work. A CSS custom property stores a value, not a string. The moment you wrap it in quotes, it becomes a string, and every single place in the file that uses that variable renders nothing. No color. Just empty. So the logo SVG renders as a black broken shape. The radar chart is just a random static polygon floating in the middle of the page. One of the feature cards is literally floating outside the grid because of an unclosed HTML tag. And the VRAM widget \u2014 which was supposed to be a cool monitoring indicator \u2014 is a banana emoji on a gray box. A. Banana. Emoji. The clock works. I will give it that. The clock ticks every second. The quiz questions about GPU parallelism are actually technically correct. So it gets one out of ten. But this is a model from NVIDIA \u2014 the company that makes the chips that run all these AI models \u2014 and it could not write a valid CSS variable on line three of the output. That is not a small bug. That is a fundamental failure."
  },
  {
    id: "08-leaderboard",
    text: "Okay so let us recap the final rankings fast. First place \u2014 DeepSeek V4 Flash. Eight point five out of ten. Best code quality, most complete submission, most professional output. Second place \u2014 Big Pickle. Eight out of ten. Best personality, best creative execution, most readable code. Third place \u2014 MiMo v2.5. Seven point five. Punching massively above its weight class for a seven B model. Impressive. Fourth \u2014 Gemma four. Four out of ten. Structure without execution. Disappointing for a thirty-one B model. Fifth \u2014 Nemotron. One out of ten. A banana emoji. You understand. And interesting thing \u2014 there were a few places where your rating and my rating disagreed. You gave Big Pickle a six. I gave it an eight, because the code quality underneath the design issues is genuinely strong. You gave MiMo an eight \u2014 I went seven point five because the ticker and cards hurt it more in my view. Neither of us is wrong. These are judgment calls."
  },
  {
    id: "09-takeaways",
    text: "Before the final verdict, let me hit you with the things this test actually revealed \u2014 because there are some surprises here. Takeaway one \u2014 every single model produced invisible feature cards. All five. Not one of them got it right. That specific combination \u2014 glassmorphism backgrounds plus IntersectionObserver plus hover glow \u2014 is the hardest part of the prompt. And it is the thing that would have separated a seven from a nine. Nobody cracked it in one shot. Takeaway two \u2014 the radar chart is the real test. It requires writing trigonometry from scratch. Sine, cosine, polygon math. DeepSeek and Big Pickle did it correctly. Gemma drew a hexagon. Nemotron drew something unrecognizable. That SVG math is where good models separate from great ones. Takeaway three \u2014 parameter count means nothing for frontend coding quality. A seven billion parameter model beat a thirty-one billion parameter model. If you are picking a model for a coding task, look at benchmarks for that specific task \u2014 not the raw parameter number. Takeaway four \u2014 one bug can collapse the whole thing. Nemotron single CSS syntax error on line three destroyed every piece of styling in the file. Self-review is not optional. Always tell your AI to check its own output. And takeaway five \u2014 the instruction to think step by step before writing code genuinely matters. MiMo terminal and quiz \u2014 its strongest sections \u2014 show deep contextual understanding that only happens when the model plans before executing. That single line in the prompt makes a real difference."
  },
  {
    id: "10-verdict",
    text: "Alright. Final verdict. Here is the honest answer to \u2014 which model should you actually use? For frontend coding \u2014 DeepSeek V4 Flash. It is not even close. If you need reliable, multi-constraint code that follows a complex brief without going off the rails, this is your model. Use it. For creative briefs \u2014 when the project has personality, humor, or a specific brand voice alongside technical requirements \u2014 Big Pickle is exceptional. It held both registers at the same time, which is genuinely hard to do. If you are resource constrained and need a small model \u2014 MiMo. Seven billion parameters, seven point five out of ten. That is remarkable. And for this specific kind of complex single-file frontend work \u2014 skip Nemotron and skip Gemma four. Neither is ready for this use case in its current form. Gemma might surprise you on other tasks but frontend code is not it right now."
  },
  {
    id: "11-outro",
    text: "And that is the test. Five models, one prompt, very different results. If you want to run this yourself \u2014 the full prompt is in the description. Just paste it into whichever model you want to test, save the output as an HTML file, and open it in your browser. It takes five minutes. Drop in the comments \u2014 which model do you think would win if we ran this test again in six months? If this was useful, hit the like button, it genuinely helps the channel, and I will see you in the next one."
  }
];

async function generateWithPuterJS(page, text, engine = "neural", voice = "Joanna") {
  return await page.evaluate(async (params) => {
    const { text, engine, voice } = params;
    try {
      // Try with gemini provider first for best quality
      const result = await puter.ai.txt2speech(text, {
        provider: "gemini",
        model: "gemini-2.5-flash-preview-tts",
        voice: "Puck",
        instructions: "Speak in a natural, conversational tone. Clear and engaging."
      });
      
      // Convert Audio object to blob
      // The response should be an Audio element; get the blob URL
      if (result instanceof Audio) {
        const response = await fetch(result.src);
        const blob = await response.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      
      // If it's already a blob response
      if (result instanceof Blob) {
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(result);
        });
      }
      
      // If result is a response object
      if (result.arrayBuffer) {
        const arrayBuffer = await result.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      
      // If result has blob/stream
      if (result.blob) {
        const blob = await result.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      
      // Fallback: try getting from src attribute
      if (result.src) {
        const response = await fetch(result.src);
        const blob = await response.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      
      throw new Error("Could not extract audio data from Puter.js response");
    } catch (err) {
      // Try with neural engine as fallback
      const fallbackResult = await puter.ai.txt2speech(text, {
        voice: voice,
        engine: engine,
        language: "en-US"
      });
      
      if (fallbackResult.src) {
        const response = await fetch(fallbackResult.src);
        const blob = await response.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
      throw err;
    }
  }, { text, engine, voice });
}

async function main() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true, executablePath: "C:\\Users\\pc\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe" });
  const page = await browser.newPage();
  
  // Set up page to capture console logs
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("  [page]", msg.text());
  });
  
  // Create a minimal HTML page with Puter.js
  await page.setContent(`
    <!DOCTYPE html>
    <html><head></head><body>
      <div id="status">Loading...</div>
      <script src="https://js.puter.com/v2/"></script>
    </body></html>
  `);
  
  // Wait for Puter.js to load
  await page.waitForFunction(() => window.puter && window.puter.ai, { timeout: 30000 });
  console.log("Puter.js loaded.");
  
  for (const section of sections) {
    const outputPath = join(AUDIO_DIR, `${section.id}.wav`);
    
    // Check if file already exists
    try {
      const fs = await import("fs");
      if (fs.existsSync(outputPath)) {
        console.log(`  Already exists: ${section.id}, skipping`);
        continue;
      }
    } catch {}
    
    console.log(`  Generating ${section.id}...`);
    
    try {
      const dataUrl = await generateWithPuterJS(page, section.text, "neural", "Joanna");
      
      // Convert data URL to buffer
      const matches = dataUrl.match(/^data:(audio\/\w+);base64,(.+)$/);
      if (!matches) throw new Error("Invalid data URL format: " + dataUrl.slice(0, 50));
      
      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, "base64");
      
      // Save as wav or mp3
      const extension = mimeType.includes("mpeg") ? ".mp3" : ".wav";
      const finalPath = join(AUDIO_DIR, `${section.id}${extension}`);
      writeFileSync(finalPath, buffer);
      
      console.log(`    \u2713 Saved ${section.id}${extension} (${(buffer.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`    \u2717 Error: ${err.message.slice(0, 100)}`);
    }
    
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1500));
  }
  
  await browser.close();
  console.log("\nDone! Check assets/audio/ for files.");
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
