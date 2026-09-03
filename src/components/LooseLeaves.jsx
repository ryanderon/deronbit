import { useEffect, useRef } from "react";
import { createDraggable, createTimeline, spring, stagger, svg, utils } from "animejs";
import { projects } from "../data";
import { finePointer, playWhenSeen, reducedMotion, settle } from "../lib/motion";
import { cardScatter } from "../lib/scatter";

/** A paperclip, drawn on by anime.js when the card lands. */
function Paperclip() {
  return (
    <svg className="clip" viewBox="0 0 40 86" aria-hidden="true" focusable="false">
      <path
        data-clip
        d="M28.5 25v37a10.5 10.5 0 0 1-21 0V17.5a7 7 0 0 1 14 0V58a3.5 3.5 0 0 1-7 0V27"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Personal projects — index cards tucked into the back of the notebook. */
export default function LooseLeaves() {
  const rootRef = useRef(null);

  /* the whole spread lands as one choreographed timeline */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const rule = root.querySelector("[data-rule]");
    const words = root.querySelectorAll(".loose-lede .word");
    const cards = root.querySelectorAll("[data-card]");
    const bits = root.querySelectorAll("[data-c]");
    const clips = svg.createDrawable("[data-clip]");

    utils.set([...words, ...cards, ...bits], { opacity: 0 });
    utils.set(rule, { scaleX: 0 });
    utils.set(clips, { draw: "0 0" });

    const head = createTimeline({ autoplay: false, defaults: { ease: "outQuart" } })
      .add(rule, { scaleX: [0, 1], duration: 760, ease: "outExpo" }, 0)
      .add(words, { opacity: [0, 1], y: [14, 0], duration: 620, delay: stagger(24) }, 120);

    const timeline = createTimeline({ autoplay: false, defaults: { ease: "outQuart" } })
      .add(
        cards,
        {
          opacity: [0, 1],
          y: [72, 0],
          scale: [0.94, 1],
          "--tilt": { from: (el) => el.dataset.tiltFrom, to: (el) => el.dataset.tilt },
          duration: 1100,
          delay: stagger(150),
          ease: spring({ stiffness: 78, damping: 13 }),
        },
        0
      )
      .add(clips, { draw: ["0 0", "0 1"], duration: 900, delay: stagger(150), ease: "inOutQuad" }, 240)
      .add(bits, { opacity: [0, 1], y: [12, 0], duration: 540, delay: stagger(42) }, 380);

    // each half waits for its own content, so neither plays out under the fold
    const stopHead = playWhenSeen(root.querySelector(".loose-head"), head);
    const stopCards = playWhenSeen(root.querySelector(".cards"), timeline, {
      enter: "bottom-=60 top",
    });

    return () => {
      stopHead();
      stopCards();
      head.pause();
      timeline.pause();
      settle([words, bits, rule]);
      // `--tilt` is React's, so it is put back rather than stripped
      cards.forEach((card) => {
        settle(card, ["opacity", "transform"]);
        card.style.setProperty("--tilt", card.dataset.tilt);
      });
    };
  }, []);

  /* pick a card up by its clip and toss it — it springs back */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion() || !finePointer()) return undefined;

    const releaseSpring = spring({ stiffness: 92, damping: 12 });
    const drags = Array.from(root.querySelectorAll("[data-card]")).map((card) => {
      card.classList.add("is-draggable");
      return createDraggable(card, {
        trigger: card.querySelector("[data-grab]"),
        container: root,
        containerPadding: 24,
        releaseEase: releaseSpring,
        onRelease: (self) => {
          self.animate.x(0, 900, releaseSpring);
          self.animate.y(0, 900, releaseSpring);
        },
      });
    });

    return () => {
      drags.forEach((drag) => drag.revert());
      root.querySelectorAll("[data-card]").forEach((card) => {
        card.classList.remove("is-draggable");
        settle(card, ["transform", "touch-action", "user-select", "cursor"]);
      });
    };
  }, []);

  return (
    <section className="loose" id="projects" ref={rootRef}>
      <div className="loose-head">
        <p className="kicker mono loose-kicker">
          <i data-rule aria-hidden="true" />
          <span>Loose leaves — built for myself</span>
        </p>
        <p className="loose-lede">
          {"Side projects I keep on the workbench, outside of client work."
            .split(" ")
            .map((word, index) => (
              <span className="word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
        </p>
      </div>

      <div className="cards">
        {projects.map((project, index) => {
          const spot = cardScatter(project.id, index);
          return (
            <article
              className="card"
              key={project.id}
              data-card
              data-tilt={`${spot.tilt}deg`}
              data-tilt-from={`${spot.tilt + (spot.tilt >= 0 ? 6 : -6)}deg`}
              style={{
                "--tilt": `${spot.tilt}deg`,
                "--nudge": `${spot.nudge}px`,
                "--lift": `${spot.lift}px`,
              }}
            >
              <Paperclip />
              <div className="card-top" data-grab>
                <span className="card-no mono" data-c>
                  no. {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="card-name" data-c>
                  {project.name}
                </h3>
                <p className="card-tag mono" data-c>
                  {project.tag}
                </p>
              </div>
              <ul className="notes">
                {project.bullets.map((bullet) => (
                  <li className="note" data-c key={bullet.slice(0, 40)}>
                    <span className="mono" aria-hidden="true">
                      ·
                    </span>
                    <p>{bullet}</p>
                  </li>
                ))}
              </ul>
              <div className="chips" data-c>
                {project.stack.map((item) => (
                  <span className="chip mono" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <a
                className="card-link mono"
                data-c
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* the arrow is its own element here so it can lift on hover */}
                {project.urlLabel.replace(/\s*↗\s*$/, "")}
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
