import { useEffect, useRef } from "react";
import {
  animate,
  createDraggable,
  createTimeline,
  onScroll,
  spring,
  stagger,
  text,
  utils,
} from "animejs";
import { entries, profile } from "../data";
import { finePointer, reducedMotion, settle } from "../lib/motion";
import PaperGrid from "./PaperGrid";

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

/** Renders one line of the masthead as individually animatable characters. */
function NameLine({ parts }) {
  return (
    <span className="name-line">
      {parts.map((part, partIndex) => {
        const chars = Array.from(part.text).map((char, charIndex) => (
          <span className="name-char" key={`${char}-${charIndex}`}>
            {char === " " ? " " : char}
          </span>
        ));
        return part.italic ? (
          <em key={part.text + partIndex}>{chars}</em>
        ) : (
          <span key={part.text + partIndex}>{chars}</span>
        );
      })}
    </span>
  );
}

export default function Cover({ theme, onToggleTheme }) {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const portrait = portraitRef.current;
    if (!root) return undefined;

    const pick = (selector) => Array.from(root.querySelectorAll(selector));
    const cleanups = [];
    const reduced = reducedMotion();

    if (!reduced) {
      const chars = pick(".name-char");
      const words = pick(".lede .word");
      const rules = pick("[data-rule]");
      const buttons = pick(".cta-row > *");
      const metaItems = pick(".cover-meta > *");
      const eyebrowLabel = root.querySelector("[data-scramble]");
      const eyebrowText = eyebrowLabel?.textContent ?? "";
      const blur = finePointer();

      utils.set([...chars, ...words, ...buttons, ...metaItems], { opacity: 0 });
      utils.set(rules, { scaleX: 0 });
      if (portrait) utils.set(portrait, { opacity: 0 });

      const intro = createTimeline({ defaults: { ease: "outQuart" } })
        .add(
          rules,
          { scaleX: [0, 1], duration: 900, ease: "outExpo", onComplete: (self) => settle(self.targets) },
          0
        )
        .add(
          chars,
          {
            opacity: [0, 1],
            y: [48, 0],
            ...(blur ? { filter: ["blur(9px)", "blur(0px)"] } : null),
            duration: 1200,
            delay: stagger(22),
            ease: "outExpo",
            onComplete: (self) => settle(self.targets),
          },
          120
        )
        .add(
          words,
          {
            opacity: [0, 1],
            y: [10, 0],
            duration: 620,
            delay: stagger(11),
            onComplete: (self) => settle(self.targets),
          },
          620
        )
        .add(
          buttons,
          {
            opacity: [0, 1],
            y: [12, 0],
            duration: 620,
            delay: stagger(80),
            onComplete: (self) => settle(self.targets),
          },
          760
        )
        .add(
          metaItems,
          {
            opacity: [0, 1],
            y: [8, 0],
            duration: 560,
            delay: stagger(60),
            onComplete: (self) => settle(self.targets),
          },
          900
        );

      if (portrait) {
        intro.add(
          portrait,
          {
            opacity: [0, 1],
            scale: [0.92, 1],
            y: [-22, 0],
            "--tilt": ["-7deg", "-1.6deg"],
            ease: spring({ stiffness: 70, damping: 12 }),
            onComplete: () => settle(portrait, ["opacity", "--tilt"]),
          },
          260
        );
      }

      cleanups.push(() => {
        intro.pause();
        settle([...chars, ...words, ...buttons, ...metaItems, ...rules]);
        if (portrait) settle(portrait, ["opacity", "transform", "--tilt"]);
      });

      if (eyebrowLabel) {
        const scramble = animate(eyebrowLabel, {
          innerHTML: text.scrambleText({ chars: "uppercase", settleDuration: 260 }),
          duration: 1100,
          ease: "linear",
        });
        cleanups.push(() => {
          scramble.pause();
          eyebrowLabel.textContent = eyebrowText;
        });
      }

      // The whole masthead drifts away as the log comes up.
      const coverRow = root.querySelector(".cover-row");
      const parallaxScroll = onScroll({
        target: root,
        sync: true,
        enter: "start start",
        leave: "start end",
      });
      const parallax = animate(coverRow, {
        opacity: [1, 0.3],
        y: [0, -40],
        ease: "linear",
        autoplay: parallaxScroll,
      });
      cleanups.push(() => {
        parallaxScroll.revert();
        parallax.pause();
        settle(coverRow);
      });

      const cue = root.querySelector("[data-cue]");
      if (cue) {
        const cueLoop = animate(cue, {
          scaleY: [0.15, 1],
          opacity: [0.2, 0.8],
          duration: 1500,
          loop: true,
          alternate: true,
          ease: "inOutQuad",
        });
        cleanups.push(() => {
          cueLoop.pause();
          settle(cue);
        });
      }
    }

    // Drag the photo around; it springs back to its taped-down spot.
    if (portrait && finePointer() && !reduced) {
      portrait.classList.add("is-draggable");
      const releaseSpring = spring({ stiffness: 90, damping: 11 });
      const drag = createDraggable(portrait, {
        container: root,
        containerPadding: 12,
        releaseEase: releaseSpring,
        // Fires after the built-in release animation, so this overrides it:
        // the photo always drifts back to where it was taped down.
        onRelease: (self) => {
          self.animate[self.xProp](0, 900, releaseSpring);
          self.animate[self.yProp](0, 900, releaseSpring);
        },
      });
      cleanups.push(() => {
        drag.revert();
        portrait.classList.remove("is-draggable");
        settle(portrait, ["transform", "touch-action", "user-select", "cursor"]);
      });
    }

    return () => cleanups.forEach((dispose) => dispose());
  }, []);

  return (
    <section className="cover" id="cover" ref={rootRef}>
      <PaperGrid hostRef={rootRef} />

      <div className="cover-row">
        <div className="cover-col">
          <p className="eyebrow mono kicker">
            <i data-rule />
            <span className="nw" data-scramble>
              Field notes
            </span>
          </p>

          <h1 className="name" aria-label={profile.fullName}>
            <span aria-hidden="true">
              {profile.nameLines.map((parts) => (
                <NameLine key={parts.map((p) => p.text).join("")} parts={parts} />
              ))}
            </span>
          </h1>

          <p className="role-rule">
            <i data-rule />
            <span className="mono">{profile.role}</span>
          </p>

          <p className="lede">
            {profile.lede.split(" ").map((word, index) => (
              <span className="word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </p>

          <div className="cta-row">
            <a className="btn mono" href="#notebook">
              Open the notebook <span aria-hidden="true">→</span>
            </a>
            <button className="btn btn-quiet mono" type="button" onClick={onToggleTheme}>
              {theme === "light" ? "Kraft / Night" : "Night / Kraft"}
            </button>
          </div>
        </div>

        <figure className="portrait" ref={portraitRef}>
          <i className="tape t1" aria-hidden="true" />
          <i className="tape t2" aria-hidden="true" />
          <div className="mat">
            <img src={asset(profile.portrait)} alt={profile.fullName} width="640" height="800" />
          </div>
          <figcaption className="mono">
            <span>{profile.portraitCaption}</span>
            <em className="nw">drag me</em>
          </figcaption>
        </figure>
      </div>

      <div className="cover-meta mono">
        <span className="tnum">
          {entries.length} entries · {profile.yearsSpan}
        </span>
        <span>{profile.place}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>

      <span className="scroll-cue" aria-hidden="true">
        <i data-cue />
      </span>
    </section>
  );
}
