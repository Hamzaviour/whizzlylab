"""Inspect background color of animation frames."""
from PIL import Image
import os

src_dir = r"E:/Work/Whizzly Labs/Logo Animated Forming Frames/ezgif-450aa67d1a5d3dff-jpg"

img = Image.open(os.path.join(src_dir, "ezgif-frame-001.jpg"))
print(f"Mode: {img.mode}, Size: {img.size}")

w, h = img.size
corners = [
    ("top-left", img.getpixel((0, 0))),
    ("top-right", img.getpixel((w-1, 0))),
    ("bottom-left", img.getpixel((0, h-1))),
    ("bottom-right", img.getpixel((w-1, h-1))),
    ("center", img.getpixel((w//2, h//2))),
]
for name, px in corners:
    print(f"{name}: {px}")

# Check if all 4 corners are same color (uniform background)
tl = corners[0][1]
tr = corners[1][1]
bl = corners[2][1]
br = corners[3][1]
print(f"\nCorners match: {tl == tr == bl == br}")
print(f"Likely background: {tl}")

print("\nTop edge samples:")
for x in [10, 100, 500, 1000, 1200]:
    if x < w:
        print(f"  ({x}, 0): {img.getpixel((x, 0))}")

# Check a few inner pixels (away from logo)
print("\nBackground samples (away from center):")
for (x, y) in [(50, 50), (1200, 50), (50, 650), (1200, 650), (300, 100)]:
    print(f"  ({x}, {y}): {img.getpixel((x, y))}")
