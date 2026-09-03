import { useEffect, useRef, useState } from "react";
import { animate, onScroll } from "animejs";
import { reducedMotion } from "../lib/motion";

/** Hairline at the top of the viewport, scrubbed by the document scroll. */
export default function ProgressRail() {
  const barRef = useRef(null);
  const [enabled] = useState(() => !reducedMotion());

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !enabled) return undefined;

    const observer = onScroll({
      target: document.documentElement,
      sync: true,
      enter: "start start",
      leave: "end end",
    });
    const progress = animate(bar, {
      scaleX: [0, 1],
      ease: "linear",
      autoplay: observer,
    });

    return () => {
      observer.revert();
      progress.pause();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="rail" aria-hidden="true">
      <i ref={barRef} />
    </div>
  );
}
