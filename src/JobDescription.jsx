import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const JobDescription = ({ descriptions }) => {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(
      ".description-item",
      {
        opacity: 0,
        filter: "blur(4px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, { scope: container });


  return (
  <div ref={container} className="space-y-6">
    {descriptions.map((desc, i) => (
      <div
        key={i}
        className="description-item flex gap-4 items-start group"
      >
        <span className="text-2xl mt-[-6px] flex-shrink-0 text-zen-ink dark:text-zen-white opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          •
        </span>
        <p className="text-base leading-loose font-zen-mincho tracking-wide text-zen-ink/80 dark:text-zen-white/80">
          {desc}
        </p>
      </div>
    ))}
  </div>
)};
