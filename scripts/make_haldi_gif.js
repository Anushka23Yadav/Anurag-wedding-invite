const sharp = require('sharp');
const { GifFrame, GifUtil, GifCodec } = require('gifwrap');
const path = require('path');
const fs = require('fs');

function blendBuffers(bufA, bufB, ratio) {
  const out = Buffer.alloc(bufA.length);
  const invRatio = 1 - ratio;
  for (let i = 0; i < bufA.length; i++) {
    out[i] = Math.round(bufA[i] * invRatio + bufB[i] * ratio);
  }
  return out;
}

async function createAnimatedGif() {
  const keyframePaths = [
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame1_1791110720874.jpg",
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame2_1791110738454.jpg",
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame3_1791110763041.jpg"
  ];

  const TARGET_WIDTH = 640;
  const TARGET_HEIGHT = 478;

  console.log("Loading and resizing keyframes...");
  const keyframeBuffers = [];
  for (const fp of keyframePaths) {
    const raw = await sharp(fp)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer();
    keyframeBuffers.push(raw);
  }

  // Define keyframe sequence loop: 0 -> 1 -> 2 -> 1 -> 0
  const seqIndices = [0, 1, 2, 1];
  
  const frameList = [];

  for (let s = 0; s < seqIndices.length; s++) {
    const currentIdx = seqIndices[s];
    const nextIdx = seqIndices[(s + 1) % seqIndices.length];

    const currentBuf = keyframeBuffers[currentIdx];
    const nextBuf = keyframeBuffers[nextIdx];

    // Hold main keyframe (delay = 70 cs = 0.7 seconds)
    frameList.push({ buf: currentBuf, delayCentisecs: 75 });

    // 2 crossfade transition frames (delay = 12 cs = 0.12 seconds each)
    const blend1 = blendBuffers(currentBuf, nextBuf, 0.33);
    frameList.push({ buf: blend1, delayCentisecs: 12 });

    const blend2 = blendBuffers(currentBuf, nextBuf, 0.66);
    frameList.push({ buf: blend2, delayCentisecs: 12 });
  }

  console.log(`Total frames to encode: ${frameList.length}`);

  const gifFrames = frameList.map(f => new GifFrame(TARGET_WIDTH, TARGET_HEIGHT, f.buf, { delayCentisecs: f.delayCentisecs }));

  console.log("Quantizing palette and encoding smooth GIF...");
  GifUtil.quantizeDekker(gifFrames, 256);

  const codec = new GifCodec();
  const outputGifPath = path.join(process.cwd(), 'public/assets/haldi-ceremony.gif');
  
  fs.mkdirSync(path.dirname(outputGifPath), { recursive: true });

  const encoded = await codec.encodeGif(gifFrames, { loops: 0 });
  fs.writeFileSync(outputGifPath, encoded.buffer);
  
  console.log(`Smooth Animated GIF generated at: ${outputGifPath} (${(encoded.buffer.length / 1024 / 1024).toFixed(2)} MB)`);

  const artifactGifPath = "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_ceremony_animated.gif";
  fs.writeFileSync(artifactGifPath, encoded.buffer);
  console.log(`Saved artifact copy to: ${artifactGifPath}`);
}

createAnimatedGif().catch(err => {
  console.error("Error creating GIF:", err);
  process.exit(1);
});
