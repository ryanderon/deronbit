/**
 * Junk-journal scatter.
 *
 * Photos should look tossed onto the page rather than laid out on a grid, but
 * "random" must not mean "different on every render" — the numbers are derived
 * from the entry id, so a photo always lands in the same spot.
 */

const seedFrom = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** mulberry32 — small, fast, and evenly spread. */
const rngFrom = (seed) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const lerp = (a, b, t) => a + (b - a) * t;
const round1 = (n) => Math.round(n * 10) / 10;

/** Where the whole pile sits inside the right-hand column. */
export function pileAlign(id) {
  const spots = ["flex-start", "center", "flex-end"];
  return spots[seedFrom(`pile:${id}`) % spots.length];
}

/**
 * Loose index cards lean a touch more than photos, and alternate sides so the
 * spread reads as deliberate rather than as a wonky grid.
 */
export function cardScatter(id, index) {
  const random = rngFrom(seedFrom(`card:${id}`));
  const magnitude = round1(lerp(1.5, 3.1, random()));
  return {
    tilt: index % 2 === 0 ? -magnitude : magnitude,
    nudge: Math.round(lerp(-8, 8, random())),
    lift: index % 2 === 0 ? 0 : Math.round(lerp(26, 46, random())),
  };
}

/**
 * Resting placement for one photo, plus the angle it is tossed in from.
 * Values are handed to CSS as custom properties and to anime.js as the
 * `--tilt` tween endpoints.
 */
export function photoScatter(id, index, count) {
  const random = rngFrom(seedFrom(`${id}#${index}`));
  const tilt = round1(lerp(-3.4, 3.4, random()));
  const solo = count === 1;
  const first = index === 0;

  return {
    tilt,
    // tossed in from a wider angle, on the same side it settles
    tiltFrom: round1(tilt + (tilt >= 0 ? 1 : -1) * lerp(5, 11, random())),
    nudge: Math.round(lerp(-12, 12, random())),
    width: Math.round(solo ? lerp(92, 100, random()) : lerp(80, 96, random())),
    /* a phone screenshot is pinned on as a small snap, not a full plate */
    widthTall: Math.round(solo ? lerp(46, 56, random()) : lerp(36, 46, random())),
    overlapTall: first ? 0 : -Math.round(lerp(70, 130, random())),
    // alternating sides beats a coin flip: two snaps never pile up in a corner
    side: index % 2 === 0 ? "flex-start" : "flex-end",
    overlap: first ? 0 : -Math.round(lerp(6, 26, random())),
    drift: Math.round(lerp(6, 22, random())),
    // some photos are taped down twice, some just caught at one corner
    tapes: random() > 0.45 ? 2 : 1,
    cornerSide: random() > 0.5 ? "right" : "left",
  };
}
