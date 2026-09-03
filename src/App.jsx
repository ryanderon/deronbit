import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import BackCover from "./components/BackCover";
import Cover from "./components/Cover";
import Kit from "./components/Kit";
import LooseLeaves from "./components/LooseLeaves";
import Notebook from "./components/Notebook";
import ProgressRail from "./components/ProgressRail";

/**
 * Safety net: if an animation is ever interrupted (a throttled tab, a
 * ScrollObserver that never fired), nothing is allowed to stay invisible.
 *
 * The notebook is deliberately left out — its pages are blank until the scroll
 * turns to them, and forcing those visible is what makes a page look like it
 * renders twice. Only the first leaf is covered, and only once it is on screen.
 */
function useNeverBlank() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const onScreen = (el) => {
        const box = el.getBoundingClientRect();
        return box.top < window.innerHeight && box.bottom > 0;
      };

      const targets = [
        ...document.querySelectorAll("[data-reveal], .name-char, .lede .word, .portrait"),
      ];

      // These only wait for a scroll trigger, so they are rescued once their
      // own section is on screen — never before, or a page would show twice.
      document
        .querySelectorAll(
          ".leaf:first-child [data-p], .leaf:first-child [data-shot], " +
            ".loose [data-card], .loose [data-c], .kit [data-k], .kit [data-chip]"
        )
        .forEach((el) => {
          const host = el.closest(".leaf, section");
          if (host && onScreen(host)) targets.push(el);
        });

      targets.forEach((el) => {
        if (Number.parseFloat(getComputedStyle(el).opacity) < 0.05) {
          el.style.removeProperty("opacity");
          el.style.removeProperty("filter");
          el.style.removeProperty("transform");
        }
      });
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);
}

/**
 * The browser resolves `#projects` before React has rendered it, so a shared
 * deep link would otherwise land at the top of the page.
 *
 * Landing once is not enough either: the notebook only takes its full height
 * once its pages have measured their photos, which shoves everything below it
 * down. The target is held in view until the page stops growing — or until the
 * visitor scrolls, which always wins.
 */
function useHashLanding() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;

    const target = document.getElementById(id);
    // A notebook page is absolutely positioned inside the pinned frame, so
    // scrolling to it lands nowhere useful. Notebook resolves those itself.
    if (!target || target.closest(".stack")) return undefined;

    let observer = null;
    const land = () => target.scrollIntoView({ behavior: "instant", block: "start" });
    const stop = () => {
      observer?.disconnect();
      observer = null;
      window.clearTimeout(timer);
      ["wheel", "touchstart", "keydown"].forEach((type) =>
        window.removeEventListener(type, stop)
      );
    };

    const frame = requestAnimationFrame(() => {
      land();
      observer = new ResizeObserver(land);
      observer.observe(document.body);
    });
    const timer = window.setTimeout(stop, 4000);
    ["wheel", "touchstart", "keydown"].forEach((type) =>
      window.addEventListener(type, stop, { passive: true, once: true })
    );

    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, []);
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useHashLanding();
  useNeverBlank();

  return (
    <>
      <a className="skip-link mono" href="#notebook">
        Skip to the log
      </a>
      <ProgressRail />
      <Cover theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Notebook />
        <LooseLeaves />
        <Kit />
      </main>
      <BackCover />
    </>
  );
}
