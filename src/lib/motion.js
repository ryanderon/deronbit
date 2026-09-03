import { animate, onScroll, stagger, utils } from "animejs";

/* ── environment probes ─────────────────────────────────── */

const mq = (query) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query)
    : null;

/** True when the visitor asked the OS to calm animations down. */
export const reducedMotion = () => mq("(prefers-reduced-motion: reduce)")?.matches ?? false;

/** True for mouse/trackpad pointers — the hover-only extras are gated on this. */
export const finePointer = () => mq("(hover: hover) and (pointer: fine)")?.matches ?? false;

/** Subscribes to a media query and returns an unsubscribe function. */
export const watchMedia = (query, handler) => {
  const list = mq(query);
  if (!list) return () => {};
  const listener = (event) => handler(event.matches);
  list.addEventListener("change", listener);
  return () => list.removeEventListener("change", listener);
};

/* ── helpers ────────────────────────────────────────────── */

/** Normalises elements / NodeLists / selectors / arrays into a flat element array. */
export const toEls = (targets) => {
  const items = Array.isArray(targets) ? targets : [targets];
  const out = [];
  for (const item of items) {
    if (!item) continue;
    if (typeof item === "string") out.push(...document.querySelectorAll(item));
    else if (item.nodeType === 1) out.push(item);
    else if (typeof item.length === "number") out.push(...item);
  }
  return out;
};

/**
 * Drops the inline styles an animation left behind so the stylesheet takes
 * over again (hover states, media queries, theme swaps keep working).
 */
export const settle = (targets, props = ["opacity", "transform", "filter"]) => {
  toEls(targets).forEach((el) => {
    props.forEach((prop) => el.style.removeProperty(prop));
  });
};

export const pad2 = (n) => String(n).padStart(2, "0");

/* ── reveals ────────────────────────────────────────────── */

const REVEAL_DEFAULTS = { y: 14, duration: 820, delay: 0, ease: "outQuart" };

/**
 * Fades an element up the first time it enters the viewport, driven by
 * anime.js' own ScrollObserver. Returns a disposer.
 *
 * The element is only hidden once the observer is live, so if this module
 * ever fails to load the copy still renders at full opacity.
 */
export function revealOnScroll(el, options = {}) {
  const { y, duration, delay, ease, step } = { ...REVEAL_DEFAULTS, ...options };

  if (reducedMotion()) return () => {};

  let played = false;
  let animation = null;

  // `step` cascades the element's children instead of the element itself, so a
  // group (the index) reveals as one unit even if part of it sits off-screen.
  const targets = step ? Array.from(el.children) : [el];
  if (!targets.length) return () => {};

  utils.set(targets, { opacity: 0 });

  const play = () => {
    if (played) return;
    played = true;
    animation = animate(targets, {
      opacity: [0, 1],
      y: [y, 0],
      duration,
      delay: step ? stagger(step, { start: delay }) : delay,
      ease,
      onComplete: () => settle(targets),
    });
  };

  const observer = onScroll({
    target: el,
    enter: "bottom-=60 top",
    onEnter: play,
  });

  // Elements already on screen at mount (deep link, restored scroll position,
  // short viewport) never get a scroll event — play them on the next frame.
  const frame = requestAnimationFrame(() => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) play();
  });

  return () => {
    cancelAnimationFrame(frame);
    observer.revert();
    animation?.pause();
    settle(el);
  };
}

/**
 * Plays a timeline the first time `target` is properly on screen.
 *
 * The trigger belongs on the thing being animated, not on its whole section: a
 * section's top edge can be in view while the content a few hundred pixels
 * below it — the cards, the rows — is still under the fold. On a phone that
 * means the animation is over before you ever see it.
 */
export function playWhenSeen(target, timeline, { enter = "bottom-=80 top" } = {}) {
  if (!target) return () => {};

  let played = false;
  const play = () => {
    if (played) return;
    played = true;
    timeline.play();
  };

  const observer = onScroll({ target, enter, onEnter: play });
  const frame = requestAnimationFrame(() => {
    const box = target.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.9 && box.bottom > 0) play();
  });

  return () => {
    cancelAnimationFrame(frame);
    observer.revert();
  };
}

/**
 * Wires every `[data-reveal]` inside `root`.
 *   data-reveal-delay="120"  — offset in ms, so siblings can cascade
 *   data-reveal-step="45"    — cascade this element's children instead
 */
export function revealAll(root) {
  if (!root) return () => {};
  const disposers = Array.from(root.querySelectorAll("[data-reveal]")).map((el) =>
    revealOnScroll(el, {
      delay: Number(el.dataset.revealDelay) || 0,
      step: Number(el.dataset.revealStep) || 0,
    })
  );
  return () => disposers.forEach((dispose) => dispose());
}
