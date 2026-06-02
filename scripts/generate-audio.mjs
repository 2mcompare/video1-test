import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const AUDIO_DIR = join(PROJECT_ROOT, "assets", "audio");
const API_KEY = "AIzaSyAgM4RHPsZx1IplaDFPHmjiAxwFaigh0tU";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

mkdirSync(AUDIO_DIR, { recursive: true });

const sections = [
  {
    id: "01-hook",
    text: `So I gave five AI models the exact same coding prompt. Same task. Same rules. Same deadline. And I told them to fight. The prompt was brutal — build a full OS-style dashboard website, from scratch, in a single HTML file, with zero libraries, zero dependencies — pure code only. And the results? Completely different. Like, not even close. One model produced something genuinely impressive. Clean code, working animations, proper structure. And another one broke on line three. Line. Three. Out of eight hundred. Yeah. We need to talk about that. Stick around because by the end of this video you will know exactly which AI to use for frontend coding — and which one to never trust with a CSS file again. Let's get into it.`
  },
  {
    id: "02-setup",
    text: `Okay so before we get into the results, let me show you exactly what I asked these models to build. The prompt had eight mandatory sections. Every model got the same list. Number one — an OS-style topbar. With a live clock, a dark mode toggle that saves to localStorage, and a battery widget. Number two — a fake terminal that types out a boot sequence automatically when you open the page. Number three — this is the one that breaks models — a pure SVG radar chart. Six axes, animated on scroll, with zero libraries. Just math. Raw trigonometry in JavaScript. Then on top of that: an infinite scrolling stats ticker, six feature cards with staggered animations, a quiz section, a syntax-highlighted code block, and a footer. All of that. In one HTML file. Zero CDN links. Zero imports. And the most important rule? The models had to think step by step before writing a single line of code. That one instruction alone filters out the lazy outputs. Alright. Let's look at what they actually built.`
  },
  {
    id: "03-deepseek",
    text: `First up — DeepSeek V4 Flash. And honestly? This is the one that surprised me most. Look at that terminal. It has an actual file path in the title bar. Like a real terminal. Not just some placeholder text — it looks like you're actually running a program. The radar chart is working — all six axes are labeled, the values animate as you scroll, and the polygon is mathematically correct. That's harder than it sounds. This is pure JavaScript trigonometry, no library doing the work. The stats ticker uses these little dropdown pill things — I didn't ask for that. That's the model being creative with the brief. I like that. The code showcase? It's using async Python with proper streaming. Not a stub. Not fake code. Actual real implementation. Now — there is one bug. And it's a consistent bug across all five models actually. The feature cards section is basically invisible. The glassmorphism opacity is set too low on a dark background so you just get nothing. A blank section. That would have pushed this to a nine out of ten easily. But even with that — DeepSeek Flash is the strongest coder here. Clean IIFEs, proper CSS custom properties, readable structure. If you're using AI for frontend work, this is your model.`
  },
  {
    id: "04-bigpickle",
    text: `Okay. Big Pickle. So the brief for this one was intentionally weird. I asked the model to build something that was simultaneously technically serious AND themed like a deli pickle. Funny brand, real code. And somehow — it worked? Look at that terminal boot sequence. Loading brine one hundred percent. Fermenting reasoning engine. Ready. No cap. That is so good. The model understood the joke AND executed it with proper typewriter animation. The radar chart is fully working. The bubble background animation — where little fizz bubbles float up like a pickle jar — that's the most creative visual effect of all five submissions. I didn't ask for that specifically. The model invented it. The quiz questions are actual lateral thinking puzzles. Not trivia. Real logic problems wrapped in pickle metaphors. The code is also the most readable of all five. Good comments, clean structure, clear variable names. Now — same invisible cards bug. And it went way over the line limit. I said eight hundred lines, it gave me twelve hundred. But honestly the extra length came from good things, not padding. Eight out of ten. And in terms of personality and brand coherence? It's actually the best submission. No contest.`
  },
  {
    id: "05-mimo",
    text: `MiMo v2.5 from Xiaomi. And this one I want you to pay attention to because there's an important lesson here. MiMo is a seven billion parameter model. That's tiny compared to the others. And it scored seven point five out of ten. That terminal? Best terminal of the five. It uses these tag-style labels — boot, load, spec, core — that make it feel like an actual system log. Very detailed, very deliberate. The quiz questions are math problems. Real math. Because MiMo is a reasoning and math model, and the model knew that about itself and leaned into it. That's contextual intelligence. The radar chart is correct. Axis labels, values, proper animation. At seven billion parameters. Think about that. But the feature cards — invisible. Same bug. And the ticker is really sparse, like it only cycles through a few items before looping. That hurts it. Still — seven point five from a seven billion parameter model is genuinely impressive. Don't sleep on small reasoning models for coding tasks.`
  },
  {
    id: "06-gemma",
    text: `Gemma four, thirty-one billion parameters from Google DeepMind. And this one is a bit disappointing. The structure is there. The topbar is actually the cleanest of all five — minimal, well-designed. The terminal works. Dark mode toggle works. These basics are solid. But then you get to the radar chart. And look at this — it's just a solid blue hexagon. No axis labels. No score values. No grid lines. No animation. It drew a shape and called it a day. The JavaScript is there — the model wrote a function for the radar chart. But it skipped the actual trigonometry. It drew a fixed hexagon instead of computing the polygon from the axis values. The feature cards section is just a massive blank dark area. The ticker shows one line. The particle background effect that I specifically asked for — completely absent. And here's the thing that gets me — MiMo is seven billion parameters and outscored Gemma, which is thirty-one billion. Size is not quality. Remember that.`
  },
  {
    id: "07-nemotron",
    text: `And then there's Nemotron. I don't even know where to start. So here's what happened. On line three of the file — line THREE — Nemotron wrote this: double dash, a one, colon, quote, hash, number, quote. CSS custom properties with the hex color value wrapped in quotation marks. That is not how CSS variables work. A CSS custom property stores a value, not a string. The moment you wrap it in quotes, it becomes a string, and every single place in the file that uses that variable renders nothing. No color. Just empty. So the logo SVG renders as a black broken shape. The radar chart is just a random static polygon floating in the middle of the page. One of the feature cards is literally floating outside the grid because of an unclosed HTML tag. And the VRAM widget — which was supposed to be a cool monitoring indicator — is a banana emoji on a gray box. A. Banana. Emoji. The clock works. I will give it that. The clock ticks every second. The quiz questions about GPU parallelism are actually technically correct. So it gets one out of ten. But this is a model from NVIDIA — the company that makes the chips that run all these AI models — and it couldn't write a valid CSS variable on line three of the output. That's not a small bug. That's a fundamental failure.`
  },
  {
    id: "08-leaderboard",
    text: `Okay so let's recap the final rankings fast. First place — DeepSeek V4 Flash. Eight point five out of ten. Best code quality, most complete submission, most professional output. Second place — Big Pickle. Eight out of ten. Best personality, best creative execution, most readable code. Third place — MiMo v2.5. Seven point five. Punching massively above its weight class for a seven B model. Impressive. Fourth — Gemma four. Four out of ten. Structure without execution. Disappointing for a thirty-one B model. Fifth — Nemotron. One out of ten. A banana emoji. You understand. And interesting thing — there were a few places where your rating and my rating disagreed. You gave Big Pickle a six. I gave it an eight, because the code quality underneath the design issues is genuinely strong. You gave MiMo an eight — I went seven point five because the ticker and cards hurt it more in my view. Neither of us is wrong. These are judgment calls.`
  },
  {
    id: "09-takeaways",
    text: `Before the final verdict, let me hit you with the things this test actually revealed — because there are some surprises here. Takeaway one — every single model produced invisible feature cards. All five. Not one of them got it right. That specific combination — glassmorphism backgrounds plus IntersectionObserver plus hover glow — is the hardest part of the prompt. And it's the thing that would have separated a seven from a nine. Nobody cracked it in one shot. Takeaway two — the radar chart is the real test. It requires writing trigonometry from scratch. Sine, cosine, polygon math. DeepSeek and Big Pickle did it correctly. Gemma drew a hexagon. Nemotron drew something unrecognizable. That SVG math is where good models separate from great ones. Takeaway three — parameter count means nothing for frontend coding quality. A seven billion parameter model beat a thirty-one billion parameter model. If you're picking a model for a coding task, look at benchmarks for that specific task — not the raw parameter number. Takeaway four — one bug can collapse the whole thing. Nemotron's single CSS syntax error on line three destroyed every piece of styling in the file. Self-review is not optional. Always tell your AI to check its own output. And takeaway five — the instruction to think step by step before writing code genuinely matters. MiMo's terminal and quiz — its strongest sections — show deep contextual understanding that only happens when the model plans before executing. That single line in the prompt makes a real difference.`
  },
  {
    id: "10-verdict",
    text: `Alright. Final verdict. Here's the honest answer to — which model should you actually use? For frontend coding — DeepSeek V4 Flash. It's not even close. If you need reliable, multi-constraint code that follows a complex brief without going off the rails, this is your model. Use it. For creative briefs — when the project has personality, humor, or a specific brand voice alongside technical requirements — Big Pickle is exceptional. It held both registers at the same time, which is genuinely hard to do. If you're resource constrained and need a small model — MiMo. Seven billion parameters, seven point five out of ten. That's remarkable. And for this specific kind of complex single-file frontend work — skip Nemotron and skip Gemma four. Neither is ready for this use case in its current form. Gemma might surprise you on other tasks but frontend code is not it right now.`
  },
  {
    id: "11-outro",
    text: `And that's the test. Five models, one prompt, very different results. If you want to run this yourself — the full prompt is in the description. Just paste it into whichever model you want to test, save the output as an HTML file, and open it in your browser. It takes five minutes. Drop in the comments — which model do you think would win if we ran this test again in six months? If this was useful, hit the like button, it genuinely helps the channel, and I'll see you in the next one.`
  }
];

async function generateSpeech(text, outputPath, modelName) {
  const url = `${BASE_URL}/${modelName}:generateContent?key=${API_KEY}`;
  
  const requestBody = {
    contents: [{
      parts: [{ text }]
    }],
    generationConfig: {
      responseModalities: ["Audio"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "en-male-natural"
          }
        }
      }
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const audioData = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData;
  
  if (!audioData?.data) {
    console.error("Full response:", JSON.stringify(data, null, 2).slice(0, 500));
    throw new Error("No audio data in response");
  }

  const buffer = Buffer.from(audioData.data, "base64");
  writeFileSync(outputPath, buffer);
  console.log(`✓ Saved ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return true;
}

async function main() {
  const models = [
    "gemini-2.5-flash",  // Primary
    "gemini-2.5-flash-tts",  // Fallback
    "gemini-3.1-flash-tts",  // Second fallback
  ];

  for (const section of sections) {
    const outputPath = join(AUDIO_DIR, `${section.id}.mp3`);
    if (existsSync(outputPath)) {
      console.log(`✓ Already exists: ${section.id}.mp3, skipping`);
      continue;
    }

    let success = false;
    for (const model of models) {
      if (success) break;
      try {
        console.log(`\nGenerating ${section.id} with ${model}...`);
        await generateSpeech(section.text, outputPath, model);
        success = true;
      } catch (err) {
        console.error(`  ${model} failed: ${err.message.slice(0, 100)}`);
        if (err.message.includes("rate") || err.message.includes("429") || err.message.includes("quota")) {
          console.log(`  Rate limited on ${model}, trying next model...`);
          await new Promise(r => setTimeout(r, 2000));
        } else {
          console.log(`  Error on ${model}, trying next model...`);
        }
      }
    }
    if (!success) {
      console.error(`✗ Failed to generate ${section.id} after all models`);
    }
    // Small delay between sections
    await new Promise(r => setTimeout(r, 500));
  }
  console.log("\nDone! All audio files generated.");
}

main().catch(console.error);
