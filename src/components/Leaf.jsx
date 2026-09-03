import { pad2 } from "../lib/motion";
import { photoScatter, pileAlign } from "../lib/scatter";

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

/**
 * The photos pinned to a page. They are stacked, overlapped and tilted from a
 * seed so the pile looks tossed together but never moves between renders;
 * Notebook's timeline animates the same `--tilt` on the way in.
 */
/**
 * Photos keep their own shape rather than being cropped to one ratio, so the
 * pile only learns whether a shot is a phone screenshot once it has loaded.
 * Notebook watches the page height and re-scores the scroll when that shifts.
 */
function sizeShot(img) {
  const figure = img?.closest("[data-shot]");
  if (!figure || !img.naturalWidth) return;
  figure.dataset.orient = img.naturalHeight > img.naturalWidth * 1.15 ? "tall" : "wide";
}

/**
 * An image can finish loading before React attaches `onLoad` — the event is
 * then never delivered, and a phone screenshot would sit there rendered at
 * full plate width. Checking `complete` on the ref covers that race.
 */
const measureShot = (node) => {
  if (node?.complete) sizeShot(node);
};

function Pile({ entry, plate }) {
  const shots = entry.images ?? [];
  const count = Math.max(shots.length, 1);
  const placements = Array.from({ length: count }, (_, i) =>
    photoScatter(entry.id, i, count)
  );

  return (
    <div className="plates" style={{ "--align": pileAlign(entry.id) }}>
      {placements.map((spot, i) => {
        const src = shots[i];
        return (
          <figure
            className="plate"
            key={src ?? `${entry.id}-empty`}
            data-shot
            data-empty={src ? undefined : ""}
            data-tilt={`${spot.tilt}deg`}
            data-tilt-from={`${spot.tiltFrom}deg`}
            data-drift={spot.drift}
            style={{
              "--tilt": `${spot.tilt}deg`,
              "--nudge": `${spot.nudge}px`,
              "--w": `${spot.width}%`,
              "--w-tall": `${spot.widthTall}%`,
              "--overlap": `${spot.overlap}px`,
              "--overlap-tall": `${spot.overlapTall}px`,
              "--side": spot.side,
              zIndex: i + 1,
            }}
          >
            {spot.tapes === 2 ? (
              <>
                <i className="tape t1" aria-hidden="true" />
                <i className="tape t2" aria-hidden="true" />
              </>
            ) : (
              <i className={`tape corner ${spot.cornerSide}`} aria-hidden="true" />
            )}
            <div className="mat">
              <div className="shot">
                {src ? (
                  <img
                    src={asset(src)}
                    alt={entry.caption ? `${entry.company} — ${entry.caption}` : entry.company}
                    loading="lazy"
                    decoding="async"
                    ref={measureShot}
                    onLoad={(event) => sizeShot(event.currentTarget)}
                  />
                ) : (
                  <span className="hint mono">{entry.hint}</span>
                )}
              </div>
            </div>
          </figure>
        );
      })}

      <figcaption className="plates-cap mono">
        {/* the plate number tracks the entry's position, so it cannot drift */}
        <span>{shots.length > 0 && entry.caption ? `fig. ${plate} — ${entry.caption}` : ""}</span>
        <a href={entry.url} target="_blank" rel="noopener noreferrer">
          {entry.urlLabel}
        </a>
      </figcaption>
    </div>
  );
}

/**
 * One leaf (page) of the notebook.
 *
 * The frame (`.leaf`) is fixed to the pinned viewport; the ink (`[data-body]`)
 * is what travels as you scroll, and the whole leaf is what rotates on the
 * spine when the page turns. Both transforms belong to Notebook's scroll
 * timeline, which is why nothing here sets an inline `style` beyond the
 * static stacking order.
 */
export default function Leaf({ entry, index, total, isActive, setRef }) {
  return (
    <article
      className={`leaf${isActive ? " is-front" : ""}`}
      id={entry.id}
      ref={(node) => setRef(index, node)}
      style={{ zIndex: total - index }}
      role="tabpanel"
      aria-labelledby={`tab-${entry.id}`}
      aria-hidden={!isActive}
      /* The pages are a real stack — covered ones are opaque but still in the
         document, so without this the tab key walks into pages you cannot see. */
      inert={!isActive}
    >
      <i className="margin-a" aria-hidden="true" />
      <i className="margin-b" aria-hidden="true" />
      <div className="holes" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="leaf-scroll">
        <div className="leaf-body" data-body>
          <header className="leaf-head">
            <div className="leaf-title">
              <p className="leaf-kind mono kicker" data-p>
                {entry.kind} · Entry {pad2(index + 1)}
              </p>
              <h3 className="leaf-company" data-p>
                {entry.company}
              </h3>
              <p className="leaf-role mono" data-p>
                {entry.role}
              </p>
            </div>
            <p className="stamp mono" data-stamp>
              <b className="tnum">{entry.span}</b>
              <em>{entry.place}</em>
            </p>
          </header>

          <div className="leaf-cols">
            {/* fig. 01 is the frontispiece on the cover, so plates start at 02 */}
            <Pile entry={entry} plate={pad2(index + 2)} />

            <div className="leaf-main">
              <p className="notes-label mono kicker" data-p>
                Notes
              </p>
              <ul className="notes">
                {entry.bullets.map((bullet) => (
                  <li className="note" data-p key={bullet.slice(0, 48)}>
                    <span className="mono" aria-hidden="true">
                      ·
                    </span>
                    <p>{bullet}</p>
                  </li>
                ))}
              </ul>
              <div className="chips" data-p>
                {entry.stack.map((item) => (
                  <span className="chip mono" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="folio mono tnum" aria-hidden="true">
        — {pad2(index + 1)} —
      </div>
      <div className="leaf-fade" data-fade aria-hidden="true" />
      <div className="shade" data-shade aria-hidden="true" />
    </article>
  );
}
