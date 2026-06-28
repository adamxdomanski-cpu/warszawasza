#!/usr/bin/env python3
"""Epistemic collapse visualization — chaos → correlation → one form → hold.

Optional artifact. Requires: pip install opencv-python numpy
Output: collapse.mp4 in cwd
"""

import cv2
import numpy as np

W, H, FPS = 1280, 720, 60
D_CHAOS, D_CORR, D_COLL, D_HOLD = 2, 3, 1, 3

out = cv2.VideoWriter(
    "collapse.mp4",
    cv2.VideoWriter_fourcc(*"mp4v"),
    FPS,
    (W, H),
)

mask = np.zeros((H, H), dtype=np.uint8)
font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(mask, "KOLAPS", (60, 320), font, 4.5, 255, 14, cv2.LINE_AA)
cv2.putText(mask, "W polu wszystko wyjdzie.", (60, 430), font, 1.3, 255, 3, cv2.LINE_AA)

N = 30000
p_x = np.random.uniform(0, W, N)
p_y = np.random.uniform(0, H, N)

y_idx, x_idx = np.where(mask > 0)
x_idx = x_idx + (W - H) // 2

t_idx = np.random.choice(len(x_idx), N)
t_x = x_idx[t_idx]
t_y = y_idx[t_idx]

nv_x = np.random.uniform(-5, 5, N)
nv_y = np.random.uniform(-5, 5, N)

for frame in range(FPS * (D_CHAOS + D_CORR + D_COLL + D_HOLD)):
    img = np.zeros((H, W, 3), dtype=np.uint8)
    t = frame / FPS

    if t < D_CHAOS:
        p_x = np.clip(p_x + nv_x, 0, W - 1)
        p_y = np.clip(p_y + nv_y, 0, H - 1)
    elif t < (D_CHAOS + D_CORR):
        prog = (t - D_CHAOS) / D_CORR
        p_x += (t_x - p_x) * (prog * 0.1)
        p_y += (t_y - p_y) * (prog * 0.1)
        if prog < 0.8:
            idx = np.random.choice(N, 300, replace=False)
            for i in range(0, len(idx) - 1, 2):
                x1, y1 = int(p_x[idx[i]]), int(p_y[idx[i]])
                x2, y2 = int(p_x[idx[i + 1]]), int(p_y[idx[i + 1]])
                dist = np.hypot(x1 - x2, y1 - y2)
                if dist < 60:
                    alpha = int((1 - prog) * 80 * (1 - dist / 60))
                    cv2.line(img, (x1, y1), (x2, y2), (alpha, alpha, alpha), 1)
    else:
        p_x, p_y = t_x, t_y

    py = np.clip(p_y, 0, H - 1).astype(np.int32)
    px = np.clip(p_x, 0, W - 1).astype(np.int32)
    img[py, px] = 255
    if t >= (D_CHAOS + D_CORR):
        img = cv2.GaussianBlur(img, (3, 3), 0)
    out.write(img)

out.release()
print("collapse.mp4 written.")
