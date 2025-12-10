import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JobDescription } from "./JobDescription";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const JobCard = ({ job, index }) => {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div ref={cardRef} className="relative pl-6 md:pl-16 group/card-container">
      <div className="absolute left-[-9px] top-1 w-5 h-5 z-10 transition-transform duration-500 group-hover/card-container:scale-125">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-zen-ink dark:fill-zen-white opacity-80"
        >
          <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 20 C65 20 75 30 75 45 C75 60 65 70 50 70 C35 70 25 60 25 45 C25 30 35 20 50 20 Z" />
        </svg>
      </div>

      <span className="text-sm font-zen-mincho tracking-[0.2em] uppercase mb-3 block text-zen-stone dark:text-zen-sage">
        {job.year}
      </span>

      <details className="group/card">
        <summary className="cursor-pointer relative list-none">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-zen-serif font-bold mb-2 tracking-wide text-zen-ink dark:text-zen-white group-hover/card:text-zen-stone transition-colors duration-300">
                {job.company}
              </h3>
              <p className="text-base font-zen-mincho text-zen-stone dark:text-zen-sage italic">
                {job.role}
              </p>
            </div>
            <div className="mt-2 opacity-40 text-zen-ink dark:text-zen-white transition-transform duration-400 group-open/card:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-zen-ink/20 dark:bg-zen-white/20 group-hover/card:w-full transition-all duration-700 ease-out"></div>
        </summary>

        <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div className="border-t border-zen-ink/10 dark:border-zen-white/10 pt-6 mt-6 pl-2 border-l-2 border-l-zen-red/50">
              <JobDescription descriptions={job.description} index={index} />
            </div>
        </div>
      </details>
    </div>
  );
};
