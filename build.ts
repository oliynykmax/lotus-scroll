import { Glob } from "bun";

const glob = new Glob("memes/*.{jpg,jpeg,png,webp,gif}");
const photos = [...glob.scanSync(import.meta.dir)];

// Simple Shuffle (Bag)
photos.sort(() => Math.random() - 0.5);

const renderSlides = (list) => list.map(p => `    <div class="slide"><img src="${p}" loading="lazy" alt=""></div>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lotus Scroll</title>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; overflow: hidden; background: #000; font-family: sans-serif; }
  .scroll-container { position: fixed; inset: 0; display: flex; width: max-content; }
  @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .slide { flex: 0 0 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; padding: 3vw; }
  .slide img { width: 80vw; height: 80vh; object-fit: contain; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.6); }
  .vignette { position: fixed; inset: 0; pointer-events: none; background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%); z-index: 10; }
  .title { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.3); font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; z-index: 20; }
</style>
</head>
<body>
  <div class="vignette"></div>
  <div class="title">Lotus Scroll</div>
  <div class="scroll-container" id="scroller">
${renderSlides(photos)}
${renderSlides(photos)}
  </div>
  <audio id="bgm" src="audio/track.mp3" loop></audio>
  <div id="play-btn" style="position:fixed;inset:0;z-index:30;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);color:#fff;font-size:2rem">tap to vibe</div>
  <script>
    const scroller = document.getElementById('scroller');
    const duration = (scroller.scrollWidth / 2) / 80;
    scroller.style.animation = "scroll " + duration + "s linear infinite";
    
    let isPlaying = false;
    document.body.onclick = () => {
      const bgm = document.getElementById('bgm');
      const btn = document.getElementById('play-btn');
      if (!isPlaying) { bgm.play(); btn.style.display = 'none'; isPlaying = true; }
      else { bgm.pause(); btn.style.display = 'flex'; btn.innerText = 'tap to resume'; isPlaying = false; }
    };
  </script>
</body>
</html>`;

await Bun.write("index.html", html);
console.log("Done. Photos shuffled in a bag.");
