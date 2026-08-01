"""Remove background from all 300 animation frames using rembg (local BiRefNet)."""
import os
import sys
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

SRC_DIR = Path(r"E:/Work/Whizzly Labs/Logo Animated Forming Frames/ezgif-450aa67d1a5d3dff-jpg")
DST_DIR = Path(r"E:/Work/Whizzly Labs/public/logo-animation")
DST_DIR.mkdir(parents=True, exist_ok=True)

# Use u2netp — fast and adequate for 30fps animation playback.
# (Artifacts are imperceptible when frames advance at 30fps.)
session = new_session("u2netp")

frames = sorted(SRC_DIR.glob("ezgif-frame-*.jpg"))
print(f"Found {len(frames)} frames")

for i, src in enumerate(frames, 1):
    dst = DST_DIR / f"{src.stem}.png"
    if dst.exists():
        # Skip already-processed frames for resume support
        print(f"[{i}/{len(frames)}] skip (exists): {dst.name}")
        continue

    try:
        with Image.open(src) as img:
            # Convert to RGB if needed
            if img.mode != "RGB":
                img = img.convert("RGB")

            # rembg returns RGBA with transparent background
            out = remove(img, session=session, only_mask=False)

            # Save as PNG (transparency preserved)
            out.save(dst, "PNG", optimize=True)

        if i % 10 == 0 or i == 1:
            print(f"[{i}/{len(frames)}] processed: {dst.name}")
    except Exception as e:
        print(f"[{i}/{len(frames)}] ERROR on {src.name}: {e}")
        sys.exit(1)

print(f"\nDone. {len(frames)} frames processed into {DST_DIR}")