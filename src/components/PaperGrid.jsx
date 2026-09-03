import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { reducedMotion, watchMedia } from "../lib/motion";

const CELL = 44;

/**
 * Easter egg: the paper flips over in squares under the cursor — and under a
 * finger, where a tap turns a whole cluster over. The layer is
 * `pointer-events: none` and nothing here calls preventDefault, so it never
 * costs a tap or a scroll.
 */
export default function PaperGrid({ hostRef }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const host = hostRef.current;
    if (!layer || !host) return undefined;

    let cells = [];
    let cols = 0;
    let rows = 0;
    let lastIndex = -1;
    let enabled = false;
    let resizeTimer = 0;

    const build = () => {
      const rect = host.getBoundingClientRect();
      const nextCols = Math.max(1, Math.ceil(rect.width / CELL));
      const nextRows = Math.max(1, Math.ceil(rect.height / CELL));
      if (nextCols === cols && nextRows === rows) return;
      cols = nextCols;
      rows = nextRows;
      layer.textContent = "";
      cells = [];
      const frag = document.createDocumentFragment();
      for (let i = 0; i < cols * rows; i += 1) {
        const cell = document.createElement("i");
        cell.style.left = `${(i % cols) * CELL}px`;
        cell.style.top = `${Math.floor(i / cols) * CELL}px`;
        frag.appendChild(cell);
        cells.push(cell);
      }
      layer.appendChild(frag);
    };

    const teardown = () => {
      layer.textContent = "";
      cells = [];
      cols = 0;
      rows = 0;
    };

    const flip = (index, delay) => {
      const cell = cells[index];
      if (!cell || cell.dataset.busy) return;
      cell.dataset.busy = "1";
      cell.classList.add("on");
      animate(cell, {
        rotateY: [0, 180],
        scale: [1, 0.82],
        duration: 620,
        delay,
        ease: "inOutQuad",
        onComplete: () => {
          animate(cell, {
            rotateY: [180, 360],
            scale: [0.82, 1],
            duration: 700,
            delay: 140,
            ease: "inOutQuad",
            onComplete: () => {
              cell.classList.remove("on");
              cell.style.removeProperty("transform");
              delete cell.dataset.busy;
            },
          });
        },
      });
    };

    const spread = (event, always) => {
      const rect = host.getBoundingClientRect();
      const cx = Math.floor((event.clientX - rect.left) / CELL);
      const cy = Math.floor((event.clientY - rect.top) / CELL);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
      const index = cy * cols + cx;
      if (!always && index === lastIndex) return;
      lastIndex = index;
      flip(index, 0);
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([dx, dy], n) => {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
        // a finger gets the whole cluster; a cursor gets a sparser trail
        if (always || Math.random() > 0.55) flip(ny * cols + nx, 70 + n * 26);
      });
    };

    const onPointerMove = (event) => {
      if (!enabled) return;
      spread(event, false);
    };

    // touch has no hover, so a tap is the gesture that turns the paper over
    const onPointerDown = (event) => {
      if (!enabled || event.pointerType === "mouse") return;
      spread(event, true);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => enabled && build(), 160);
    };

    const sync = () => {
      const next = !reducedMotion();
      if (next === enabled) return;
      enabled = next;
      if (enabled) build();
      else teardown();
    };

    sync();
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("resize", onResize);
    const unwatchMotion = watchMedia("(prefers-reduced-motion: reduce)", sync);

    return () => {
      window.clearTimeout(resizeTimer);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      unwatchMotion();
      teardown();
    };
  }, [hostRef]);

  return <div className="egg" ref={layerRef} aria-hidden="true" />;
}
