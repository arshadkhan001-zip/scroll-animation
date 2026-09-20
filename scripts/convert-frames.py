"""Generate runtime WebP copies of the hero film.

READS  F:\\burger web\\frames\\ezgif-frame-###.png  (never modified)
WRITES F:\\burger web\\public\\frames\\frame-###.webp (q70, full 1280px)

Run: python scripts/convert-frames.py [--check-only]
"""
import os
import sys

SRC = r"F:\burger web\frames"
DST = r"F:\burger web\public\frames"
COUNT = 308
QUALITY = 70


def main() -> int:
    check_only = "--check-only" in sys.argv
    missing = [
        i
        for i in range(1, COUNT + 1)
        if not os.path.exists(os.path.join(SRC, f"ezgif-frame-{i:03d}.png"))
    ]
    if missing:
        print(f"MISSING source frames: {missing[:10]}")
        return 1
    print(f"Source OK: {COUNT} sequential PNGs in {SRC}")
    if check_only:
        return 0

    from PIL import Image

    os.makedirs(DST, exist_ok=True)
    done = 0
    for i in range(1, COUNT + 1):
        out = os.path.join(DST, f"frame-{i:03d}.webp")
        if os.path.exists(out):
            done += 1
            continue
        img = Image.open(os.path.join(SRC, f"ezgif-frame-{i:03d}.png"))
        img.save(out, "WEBP", quality=QUALITY, method=4)
        done += 1
        if done % 40 == 0:
            print(f"  {done}/{COUNT}")
    print(f"Done: {done}/{COUNT} WebP frames in {DST}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
