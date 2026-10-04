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

async function buildSmoothGif(keyframePaths, outputPath, artifactPath, width = 640, height = 478) {
  console.log(`\n--- Encoding GIF: ${path.basename(outputPath)} ---`);

  // Load and resize keyframe images
  const keyframeBuffers = [];
  for (const fp of keyframePaths) {
    const raw = await sharp(fp)
      .resize(width, height, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer();
    keyframeBuffers.push(raw);
  }

  const frameList = [];

  if (keyframeBuffers.length === 2) {
    // 2-Keyframe smooth loop (e.g. Sangeet dance twirl)
    const buf0 = keyframeBuffers[0];
    const buf1 = keyframeBuffers[1];

    // Hold Pose 1 (0.65 sec)
    frameList.push({ buf: buf0, delayCentisecs: 65 });
    // 5-step smooth easing transition Pose 1 -> Pose 2
    [0.15, 0.35, 0.55, 0.75, 0.90].forEach(r => {
      frameList.push({ buf: blendBuffers(buf0, buf1, r), delayCentisecs: 8 });
    });

    // Hold Pose 2 (0.65 sec)
    frameList.push({ buf: buf1, delayCentisecs: 65 });
    // 5-step smooth easing transition Pose 2 -> Pose 1
    [0.15, 0.35, 0.55, 0.75, 0.90].forEach(r => {
      frameList.push({ buf: blendBuffers(buf1, buf0, r), delayCentisecs: 8 });
    });

  } else if (keyframeBuffers.length >= 3) {
    // 3-Keyframe story loop (Haldi ceremony)
    const buf0 = keyframeBuffers[0];
    const buf1 = keyframeBuffers[1];
    const buf2 = keyframeBuffers[2];

    // Frame 1 hold
    frameList.push({ buf: buf0, delayCentisecs: 70 });
    [0.2, 0.45, 0.7, 0.9].forEach(r => frameList.push({ buf: blendBuffers(buf0, buf1, r), delayCentisecs: 7 }));

    // Frame 2 hold
    frameList.push({ buf: buf1, delayCentisecs: 65 });
    [0.2, 0.45, 0.7, 0.9].forEach(r => frameList.push({ buf: blendBuffers(buf1, buf2, r), delayCentisecs: 7 }));

    // Frame 3 hold
    frameList.push({ buf: buf2, delayCentisecs: 70 });
    [0.2, 0.45, 0.7, 0.9].forEach(r => frameList.push({ buf: blendBuffers(buf2, buf1, r), delayCentisecs: 7 }));

    // Frame 2 back hold
    frameList.push({ buf: buf1, delayCentisecs: 50 });
    [0.25, 0.5, 0.75, 0.95].forEach(r => frameList.push({ buf: blendBuffers(buf1, buf0, r), delayCentisecs: 7 }));
  }

  console.log(`Generating ${frameList.length} smooth frames...`);
  const gifFrames = frameList.map(f => new GifFrame(width, height, f.buf, { delayCentisecs: f.delayCentisecs }));

  GifUtil.quantizeDekker(gifFrames, 256);

  const codec = new GifCodec();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const encoded = await codec.encodeGif(gifFrames, { loops: 0 });
  fs.writeFileSync(outputPath, encoded.buffer);
  console.log(`Saved GIF at: ${outputPath} (${(encoded.buffer.length / 1024 / 1024).toFixed(2)} MB)`);

  if (artifactPath) {
    fs.writeFileSync(artifactPath, encoded.buffer);
  }
}

async function run() {
  // 1. Smooth Haldi GIF
  const haldiPaths = [
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame1_1791110720874.jpg",
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame2_1791110738454.jpg",
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_frame3_1791110763041.jpg"
  ];
  await buildSmoothGif(
    haldiPaths,
    path.join(process.cwd(), 'public/assets/haldi-ceremony.gif'),
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/haldi_ceremony_animated.gif"
  );

  // 2. Smooth Sangeet Night GIF
  const sangeetPaths = [
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/sangeet_frame1_1791111148527.jpg",
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/sangeet_frame2_1791111169469.jpg"
  ];
  await buildSmoothGif(
    sangeetPaths,
    path.join(process.cwd(), 'public/assets/sangeet-ceremony.gif'),
    "/Users/harshsharma/.gemini/antigravity-ide/brain/b79108b1-d425-4518-b07e-6538211ae6a4/sangeet_ceremony_animated.gif"
  );
}

run().catch(err => {
  console.error("Error generating GIFs:", err);
  process.exit(1);
});
