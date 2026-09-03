import { useCallback, useEffect, useRef, useState } from "react";
import { animate, createTimeline, onScroll, stagger, utils } from "animejs";
import { entries } from "../data";
import { pad2, reducedMotion, settle, watchMedia } from "../lib/motion";
import Leaf from "./Leaf";

/** How far past the end of a page you scroll to complete the turn. */
const turnLengthFor = (frame) => Math.round(Math.min(Math.max(frame * 0.62, 300), 620));
const FLIP_DEG = -172;
/** Where in the turn the leaf's backface hides and the next page takes over. */
const FLIP_MID = 90 / Math.abs(FLIP_DEG);

export default function Notebook() {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(() => reducedMotion());

  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const stackRef = useRef(null);
  const tabsRef = useRef(null);
  const counterRef = useRef(null);
  const leavesRef = useRef([]);

  const activeRef = useRef(0);
  const counterValue = useRef({ n: 1 });
  const landingRef = useRef(
    (() => {
      if (typeof window === "undefined") return null;
      const wanted = entries.findIndex((entry) => entry.id === window.location.hash.slice(1));
      return wanted >= 0 ? wanted : null;
    })()
  );
  const scrollRef = useRef(null); // { observer, timeline, starts, reads, turns, total }

  const setLeafRef = useCallback((index, node) => {
    leavesRef.current[index] = node;
  }, []);

  const paintCounter = useCallback((index) => {
    const node = counterRef.current;
    if (!node) return;
    const write = (n) => {
      node.textContent = `${pad2(n)} / ${pad2(entries.length)}`;
    };
    if (reducedMotion()) {
      counterValue.current.n = index + 1;
      write(index + 1);
      return;
    }
    animate(counterValue.current, {
      n: index + 1,
      duration: 380,
      ease: "outQuart",
      onUpdate: () => write(Math.round(counterValue.current.n)),
      onComplete: () => write(index + 1),
    });
  }, []);

  const setActiveIndex = useCallback(
    (index) => {
      if (index === activeRef.current) return;
      activeRef.current = index;
      setActive(index);
      paintCounter(index);
    },
    [paintCounter]
  );

  /* ── the scroll score ────────────────────────────────────
     Each entry owns a slice of the page's scroll: first the ink travels up
     until the whole note has been read, then the leaf turns on its spine.
     anime.js plays the timeline back at exactly the scroll position, so it
     runs in both directions and never fights the browser's own scrolling. */
  const teardown = useCallback(({ keepHeight = false } = {}) => {
    const current = scrollRef.current;
    if (!current) {
      if (!keepHeight) rootRef.current?.style.removeProperty("height");
      return;
    }
    current.observer.revert();
    current.timeline.revert();
    scrollRef.current = null;
    leavesRef.current.forEach((leaf) => {
      if (!leaf) return;
      settle(leaf, ["transform"]);
      settle(
        leaf.querySelectorAll(
          "[data-body], [data-shade], [data-fade], [data-p], [data-stamp], [data-shot]"
        ),
        ["transform", "opacity", "--stamp-tilt"]
      );
      // `--tilt` comes from React's style prop, so it is restored rather than
      // stripped — removing it would flatten the scatter until the next render.
      leaf.querySelectorAll("[data-shot]").forEach((shot) => {
        shot.style.setProperty("--tilt", shot.dataset.tilt);
      });
      delete leaf.dataset.more;
    });
    /* Dropping the height would collapse the section by thousands of pixels.
       The browser clamps the scroll position to the shrunken document and then
       restores it to the new maximum once the height comes back — which is to
       say, it throws the reader to the bottom of the page. Rebuilds replace the
       height instead of removing it. */
    if (!keepHeight) rootRef.current?.style.removeProperty("height");
  }, []);

  /**
   * Where the reader is, in terms the next score will still understand: which
   * entry, and how far through its slice. A page can change height long after
   * it was first measured — a photo finally decoding, a rotation, a resize —
   * and re-scoring without this would slide the whole document under them.
   */
  const readAnchor = useCallback(() => {
    const score = scrollRef.current;
    const root = rootRef.current;
    if (!score || !root) return null;

    const px = -root.getBoundingClientRect().top;
    if (px <= 0 || px >= score.total) return null;

    for (let i = 0; i < score.starts.length; i += 1) {
      const span = score.reads[i] + score.turns[i];
      if (px < score.starts[i] + span) {
        return { index: i, fraction: span > 0 ? (px - score.starts[i]) / span : 0 };
      }
    }

    // the tail the last page rests in, which belongs to no entry's slice
    const last = score.starts.length - 1;
    const end = score.starts[last] + score.reads[last] + score.turns[last];
    const tail = score.total - end;
    return { index: score.starts.length, fraction: tail > 0 ? (px - end) / tail : 0 };
  }, []);

  const build = useCallback(() => {
    const anchor = readAnchor();
    teardown({ keepHeight: true });
    const root = rootRef.current;
    const pin = pinRef.current;
    const stack = stackRef.current;
    const leaves = leavesRef.current.filter(Boolean);
    if (!root || !pin || !stack || leaves.length === 0) return;

    const frame = stack.clientHeight;
    if (frame < 120) return;

    const reads = [];
    const turns = [];
    const starts = [];
    let total = 0;

    leaves.forEach((leaf, i) => {
      const body = leaf.querySelector("[data-body]");
      const read = Math.max(0, Math.ceil((body?.offsetHeight ?? 0) - frame));
      const turn = i < leaves.length - 1 ? turnLengthFor(frame) : 0;
      reads[i] = read;
      turns[i] = turn;
      starts[i] = total;
      total += read + turn;
      if (read > 0) leaf.dataset.more = "1";
      else delete leaf.dataset.more;
    });

    // the last page needs somewhere to rest before the section lets go
    const tail = Math.round(frame * 0.5);
    total += tail;

    root.style.height = `${pin.offsetHeight + total}px`;

    const observer = onScroll({
      target: root,
      sync: true,
      enter: "start start",
      leave: "end end",
      onUpdate: (self) => {
        const px = self.progress * total;
        let index = leaves.length - 1;
        for (let i = 0; i < leaves.length; i += 1) {
          const end = starts[i] + reads[i] + turns[i];
          if (px < end) {
            // once the leaf is past 90° the page underneath is the one you read
            index = turns[i] > 0 && px > starts[i] + reads[i] + turns[i] * FLIP_MID ? i + 1 : i;
            break;
          }
        }
        setActiveIndex(index);
      },
    });

    const timeline = createTimeline({
      defaults: { ease: "linear" },
      autoplay: observer,
    });

    leaves.forEach((leaf, i) => {
      const at = starts[i];
      const read = reads[i];
      const turn = turns[i];
      const body = leaf.querySelector("[data-body]");
      const fade = leaf.querySelector("[data-fade]");

      if (read > 0) {
        timeline.add(body, { y: [0, -read], duration: read }, at);
        if (fade) timeline.add(fade, { opacity: [1, 0], duration: read * 0.2 }, at + read * 0.8);
        // the pinned photos lag behind the text a little as it travels
        const shots = leaf.querySelectorAll("[data-shot]");
        if (shots.length) {
          timeline.add(
            shots,
            { y: { from: 0, to: (el) => Number(el.dataset.drift) || 0 }, duration: read },
            at
          );
        }
      }

      if (turn <= 0) return;

      const turnAt = at + read;
      timeline
        .add(leaf, { rotateY: [0, FLIP_DEG], duration: turn }, turnAt)
        .add(leaf.querySelector("[data-shade]"), { opacity: [0, 0.9], duration: turn }, turnAt);

      // The page underneath writes itself while the one above lifts away, so
      // nothing is ever shown twice.
      const next = leaves[i + 1];
      const bits = next.querySelectorAll("[data-p]");
      const stamp = next.querySelector("[data-stamp]");
      const nextShots = next.querySelectorAll("[data-shot]");

      // A timeline child that the playhead has not reached yet is never
      // rendered, so its "from" value would not apply and the page would show
      // itself in full before fading in again. Hide it up front instead.
      utils.set([...bits, ...nextShots, ...(stamp ? [stamp] : [])], { opacity: 0 });

      timeline.add(
        bits,
        {
          opacity: [0, 1],
          y: [16, 0],
          duration: turn * 0.42,
          delay: stagger(turn * 0.035),
          ease: "outQuart",
        },
        turnAt + turn * 0.26
      );
      if (stamp) {
        timeline.add(
          stamp,
          {
            opacity: [0, 1],
            scale: [1.4, 1],
            "--stamp-tilt": ["-16deg", "-4deg"],
            duration: turn * 0.34,
            ease: "outBack(2.4)",
          },
          turnAt + turn * 0.5
        );
      }

      // photos land last, dropped onto the page one after the other
      if (nextShots.length) {
        timeline.add(
          nextShots,
          {
            opacity: [0, 1],
            scale: [0.9, 1],
            y: [-26, 0],
            "--tilt": {
              from: (el) => el.dataset.tiltFrom,
              to: (el) => el.dataset.tilt,
            },
            duration: turn * 0.4,
            delay: stagger(turn * 0.09),
            ease: "outBack(1.7)",
          },
          turnAt + turn * 0.36
        );
      }
    });

    // An empty tail child stretches the timeline to the full scroll distance,
    // so scroll progress and the score below stay on the same ruler.
    if (tail > 0) timeline.add({ duration: tail }, total - tail);

    scrollRef.current = { observer, timeline, starts, reads, turns, total };

    /* Put the reader back where they were reading. Without this a page that
       grows or shrinks after being measured drags the document under them —
       on a phone that reads as being thrown to the bottom of the page. */
    if (anchor) {
      const last = starts.length - 1;
      const end = starts[last] + reads[last] + turns[last];
      const px =
        anchor.index > last
          ? end + (total - end) * anchor.fraction
          : starts[anchor.index] + (reads[anchor.index] + turns[anchor.index]) * anchor.fraction;
      const top = root.getBoundingClientRect().top + window.scrollY + px;
      // "auto" would inherit `scroll-behavior: smooth` from the stylesheet and
      // animate a correction the reader never asked for
      if (Math.abs(top - window.scrollY) > 1) window.scrollTo({ top, behavior: "instant" });
    }

    // Land on the current scroll position straight away rather than waiting for
    // the next scroll event — this is what keeps a resize from flashing.
    timeline.seek(Math.max(0, Math.min(total, -root.getBoundingClientRect().top)));

    /* A shared link like /#e-5 opens the notebook on that entry. The score is
       still provisional until every photo has reported its height, so the jump
       is repeated on each rebuild until it can no longer move under us. */
    if (landingRef.current !== null) {
      const wanted = landingRef.current;
      window.scrollTo({
        top: root.getBoundingClientRect().top + window.scrollY + starts[wanted],
        behavior: "instant",
      });
      timeline.seek(starts[wanted]);
      // A photo that has loaded but not yet been classified is still laid out
      // at full plate width, so the score it produced cannot be trusted.
      const settled = Array.from(root.querySelectorAll(".stack [data-shot] img")).every(
        (img) => img.complete && img.closest("[data-shot]").dataset.orient
      );
      if (settled) landingRef.current = null;
    }
  }, [readAnchor, setActiveIndex, teardown]);

  /* build once mounted, and again whenever the frame can have changed */
  useEffect(() => {
    if (still) {
      teardown();
      return undefined;
    }

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    };

    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    document.fonts?.ready.then(schedule).catch(() => {});

    /* A page grows when its photos finally land, and a note that is longer
       than the score allows for can never be scrolled to. Re-measure whenever
       a page changes height — images, fonts, a rewrapped title, anything. */
    const pages = new ResizeObserver(schedule);
    leavesRef.current.forEach((leaf) => {
      const body = leaf?.querySelector("[data-body]");
      if (body) pages.observe(body);
    });

    return () => {
      cancelAnimationFrame(frame);
      pages.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      teardown();
    };
  }, [build, still, teardown]);

  useEffect(() => watchMedia("(prefers-reduced-motion: reduce)", setStill), []);

  /**
   * Centres a tab inside the index without ever touching the document scroll —
   * `scrollIntoView` would bubble up and undo the jump we just made.
   */
  const centreTab = useCallback((index) => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector(`[data-tab="${index}"]`);
    if (!strip || !tab) return;

    if (strip.scrollWidth > strip.clientWidth + 1) {
      strip.scrollTo({
        left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
    }
    const column = strip.parentElement;
    if (column && column.scrollHeight > column.clientHeight + 1) {
      column.scrollTo({
        top: tab.offsetTop - (column.clientHeight - tab.offsetHeight) / 2,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
    }
  }, []);

  /* keep the current entry in view in the index while you scroll */
  useEffect(() => centreTab(active), [active, centreTab]);

  /* the first page is not uncovered by a turn, so it writes itself on entry */
  useEffect(() => {
    const first = leavesRef.current[0];
    if (!first || reducedMotion()) return undefined;
    const bits = first.querySelectorAll("[data-p]");
    const stamp = first.querySelector("[data-stamp]");
    const shots = first.querySelectorAll("[data-shot]");
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      utils.set(bits, { opacity: 0 });
      animate(bits, {
        opacity: [0, 1],
        y: [14, 0],
        duration: 620,
        delay: stagger(38, { start: 80 }),
        ease: "outQuart",
        onComplete: (self) => settle(self.targets),
      });
      if (stamp) {
        utils.set(stamp, { opacity: 0 });
        animate(stamp, {
          opacity: [0, 1],
          scale: [1.4, 1],
          "--stamp-tilt": ["-16deg", "-4deg"],
          duration: 640,
          delay: 320,
          ease: "outBack(2.4)",
          onComplete: () => settle(stamp, ["opacity", "transform", "--stamp-tilt"]),
        });
      }
      if (shots.length) {
        utils.set(shots, { opacity: 0 });
        animate(shots, {
          opacity: [0, 1],
          scale: [0.9, 1],
          y: [-26, 0],
          "--tilt": { from: (el) => el.dataset.tiltFrom, to: (el) => el.dataset.tilt },
          duration: 760,
          delay: stagger(110, { start: 260 }),
          ease: "outBack(1.7)",
          onComplete: (self) => settle(self.targets, ["opacity", "transform"]),
        });
      }
    };

    const observer = onScroll({ target: rootRef.current, enter: "bottom-=80 top", onEnter: play });
    const raf = requestAnimationFrame(() => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) play();
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.revert();
      if (!played) settle([bits, shots]);
    };
  }, []);

  /* jumping from the index: hand the scroll position to the browser */
  const goTo = useCallback(
    (index) => {
      const target = Math.max(0, Math.min(entries.length - 1, index));
      const root = rootRef.current;
      if (!root) return;

      const behavior = reducedMotion() ? "auto" : "smooth";
      const score = scrollRef.current;
      if (!score) {
        leavesRef.current[target]?.scrollIntoView({ behavior, block: "start" });
        setActiveIndex(target);
        return;
      }
      const top = root.getBoundingClientRect().top + window.scrollY + score.starts[target];
      window.scrollTo({ top, behavior });
    },
    [setActiveIndex]
  );

  const onTabsKeyDown = (event) => {
    const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in moves) next = activeRef.current + moves[event.key];
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = entries.length - 1;
    if (next === null) return;

    event.preventDefault();
    const clamped = Math.max(0, Math.min(entries.length - 1, next));
    goTo(clamped);
    tabsRef.current?.querySelector(`[data-tab="${clamped}"]`)?.focus({ preventScroll: true });
    centreTab(clamped);
  };

  return (
    <section className={`notebook${still ? " is-still" : ""}`} id="notebook" ref={rootRef}>
      <div className="notebook-pin" ref={pinRef}>
        <div className="log-head mono">
          <span>The log — newest first</span>
          <span className="nav">
            <button
              type="button"
              aria-label="Previous entry"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
            >
              ↑
            </button>
            <span className="counter tnum" ref={counterRef} aria-hidden="true">
              01 / {pad2(entries.length)}
            </span>
            <button
              type="button"
              aria-label="Next entry"
              onClick={() => goTo(active + 1)}
              disabled={active === entries.length - 1}
            >
              ↓
            </button>
          </span>
        </div>

        <div className="log-grid">
          <div className="index-col">
            <p className="idx-label mono">Index</p>
            <div
              className="tabs"
              role="tablist"
              aria-label="Notebook entries"
              ref={tabsRef}
              onKeyDown={onTabsKeyDown}
            >
              {entries.map((entry, index) => (
                <button
                  key={entry.id}
                  className="tab"
                  type="button"
                  role="tab"
                  id={`tab-${entry.id}`}
                  data-tab={index}
                  aria-selected={index === active}
                  aria-controls={entry.id}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => goTo(index)}
                >
                  <span className="tab-year mono tnum">{entry.tabYear}</span>
                  <span className="tab-name-wrap">
                    <i className="tab-bar" aria-hidden="true" />
                    <span className="tab-name">{entry.short}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="idx-hint mono">Keep scrolling — the page turns itself</p>
          </div>

          <div className="stack-clip">
            <div className="stack" ref={stackRef}>
              {entries.map((entry, index) => (
                <Leaf
                  key={entry.id}
                  entry={entry}
                  index={index}
                  total={entries.length}
                  isActive={index === active}
                  setRef={setLeafRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
