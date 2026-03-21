import { Glob } from "bun";

const glob = new Glob("photos/*.{jpg,jpeg,png,webp,gif}");
const photos = [...glob.scanSync(import.meta.dir)].sort();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>vita-22</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    height: 100%;
    overflow: hidden;
    background: #000;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .scroll-container {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    animation: scroll ${photos.length * 5}s linear infinite;
  }

  @keyframes scroll {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  .slide {
    flex: 0 0 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .slide img {
    max-width: min(90vw, 600px);
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  }

  .vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%);
    z-index: 10;
  }

  .title {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.3);
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    z-index: 20;
    user-select: none;
  }
</style>
</head>
<body>
  <div class="vignette"></div>
  <div class="title">vita-22</div>
  <div class="scroll-container">
${photos.map(p => `    <div class="slide"><img src="${p}" loading="lazy" alt=""></div>`).join("\n")}
${photos.map(p => `    <div class="slide"><img src="${p}" loading="lazy" alt=""></div>`).join("\n")}
  </div>
</body>
</html>`;

await Bun.write(Bun.file(`${import.meta.dir}/index.html`), html);
console.log(`Built index.html with ${photos.length} photos (doubled for seamless loop)`);
