import { useEffect, useRef } from "react";
import { createAnimatable, createTimeline, spring, stagger, svg, utils } from "animejs";
import { skills } from "../data";
import { finePointer, playWhenSeen, reducedMotion, settle } from "../lib/motion";

/** A ticked-off checkbox, inked in by anime.js as the row lands. */
function Tick() {
  return (
    <svg className="tick" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
      <rect x="1.2" y="1.2" width="19.6" height="19.6" rx="2" className="tick-box" />
      <path
        data-tick
        d="M4.5 11.4 9 16 17.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Technical skills, written up as a kit inventory. */
export default function Kit() {
  const rootRef = useRef(null);
  const rowsRef = useRef(null);

  /* the inventory checks itself off when you reach it */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const rule = root.querySelector("[data-rule]");
    const labels = root.querySelectorAll("[data-k]");
    const chips = root.querySelectorAll("[data-chip]");
    const ticks = svg.createDrawable("[data-tick]");
    const boxes = root.querySelectorAll(".tick-box");

    utils.set([...labels, ...chips], { opacity: 0 });
    utils.set(boxes, { opacity: 0 });
    utils.set(rule, { scaleX: 0 });
    utils.set(ticks, { draw: "0 0" });

    const head = createTimeline({ autoplay: false })
      .add(rule, { scaleX: [0, 1], duration: 720, ease: "outExpo" }, 0)
      .add(
        root.querySelector(".kit-kicker [data-k]"),
        { opacity: [0, 1], x: [-12, 0], duration: 520, ease: "outQuart" },
        120
      );

    const timeline = createTimeline({ autoplay: false, defaults: { ease: "outQuart" } })
      .add(boxes, { opacity: [0, 1], duration: 320, delay: stagger(90) }, 0)
      .add(
        root.querySelectorAll(".kit-label [data-k]"),
        { opacity: [0, 1], x: [-12, 0], duration: 520, delay: stagger(90) },
        40
      )
      .add(ticks, { draw: ["0 0", "0 1"], duration: 420, delay: stagger(90), ease: "outQuad" }, 180)
      .add(
        chips,
        {
          opacity: [0, 1],
          scale: [0.7, 1],
          duration: 700,
          delay: stagger(26),
          ease: spring({ stiffness: 130, damping: 14 }),
        },
        260
      );

    // the rows wait for the rows, not for the heading above them
    const stopHead = playWhenSeen(root.querySelector(".kit-kicker"), head);
    const stopRows = playWhenSeen(rowsRef.current, timeline, { enter: "bottom-=60 top" });

    return () => {
      stopHead();
      stopRows();
      head.pause();
      timeline.pause();
      settle([labels, chips, boxes, rule], ["opacity", "transform"]);
    };
  }, []);

  /**
   * Magnetic chips: everything within reach of the cursor leans towards it.
   * The entrance owns `scale`, this owns `x`/`y` — anime.js composes transform
   * properties per element, so the two never overwrite each other.
   */
  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows || reducedMotion() || !finePointer()) return undefined;

    const chips = Array.from(rows.querySelectorAll("[data-chip]"));
    if (chips.length === 0) return undefined;

    const movers = chips.map((chip) => createAnimatable(chip, { x: 420, y: 420, ease: "out(3)" }));
    let centres = [];

    // measured against the container once, so a pointer move costs one rect
    const measure = () => {
      centres = chips.map((chip) => ({
        x: chip.offsetLeft + chip.offsetWidth / 2,
        y: chip.offsetTop + chip.offsetHeight / 2,
      }));
    };

    const RADIUS = 150;
    const PULL = 0.28;

    const onMove = (event) => {
      const box = rows.getBoundingClientRect();
      const px = event.clientX - box.left;
      const py = event.clientY - box.top;
      centres.forEach((centre, i) => {
        const dx = px - centre.x;
        const dy = py - centre.y;
        const reach = 1 - Math.min(1, Math.hypot(dx, dy) / RADIUS);
        movers[i].x(dx * PULL * reach);
        movers[i].y(dy * PULL * reach);
      });
    };

    const release = () => {
      movers.forEach((mover) => {
        mover.x(0);
        mover.y(0);
      });
    };

    measure();
    rows.addEventListener("pointerenter", measure);
    rows.addEventListener("pointermove", onMove);
    rows.addEventListener("pointerleave", release);
    window.addEventListener("resize", measure);

    return () => {
      rows.removeEventListener("pointerenter", measure);
      rows.removeEventListener("pointermove", onMove);
      rows.removeEventListener("pointerleave", release);
      window.removeEventListener("resize", measure);
      movers.forEach((mover) => mover.revert());
      settle(chips, ["transform"]);
    };
  }, []);

  return (
    <section className="kit" id="skills" ref={rootRef}>
      <p className="kicker mono kit-kicker">
        <i data-rule aria-hidden="true" />
        <span data-k>The kit — what I reach for</span>
      </p>

      <dl className="kit-rows" ref={rowsRef}>
        {skills.map((row) => (
          <div className="kit-row" key={row.label}>
            <dt className="kit-label mono">
              <Tick />
              <span data-k>{row.label}</span>
            </dt>
            <dd className="kit-items">
              {row.items.map((item) => (
                <span className="chip mono" data-chip key={item}>
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
