import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./index.css";
import { jobHistory } from "./jobHistory";
import { JobCard } from "./JobCard";
import { Footer } from "./Footer";

gsap.registerPlugin(useGSAP);

const isDarkPreferred = window.matchMedia?.(
  "(prefers-color-scheme: dark)"
).matches;

function App() {
  const container = useRef();
  const [dark, setDark] = useState(isDarkPreferred);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from("#hero-content", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power3.out",
      }).from(
        ["#hero-title", "#hero-separator", "#hero-subtitle"],
        {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=1"
      );

      // Ink drop animations
      gsap.utils.toArray(".ink-drop").forEach((drop) => {
        gsap.fromTo(
          drop,
          {
            scale: 0,
            x: `${gsap.utils.random(0, 100)}%`,
            y: `${gsap.utils.random(0, 100)}%`,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: gsap.utils.random(0.1, 0.4),
            duration: gsap.utils.random(10, 15),
            repeat: -1,
            yoyo: true,
            delay: gsap.utils.random(0, 5),
            ease: "power1.inOut",
            width: gsap.utils.random(200, 500),
            height: gsap.utils.random(200, 500),
          }
        );
      });

      // Profile image hover animation
      const profileImage = document.querySelector("#hero-content");
      const hoverCircle = document.querySelector("#profile-hover-circle");

      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(hoverCircle, {
        opacity: 0.5,
        scale: 1.1,
        duration: 0.6,
        ease: "power3.out",
      });

      profileImage.addEventListener("mouseenter", () => hoverTl.play());
      profileImage.addEventListener("mouseleave", () => hoverTl.reverse());
    },
    { scope: container }
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div ref={container} className="flex flex-col md:flex-row min-h-screen md:h-screen bg-zen-white dark:bg-zen-ink transition-colors duration-800 md:overflow-hidden">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="rough-edge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>

      <aside className="w-full md:w-5/12 lg:w-1/3 min-h-screen md:h-full relative z-10 flex flex-col justify-center items-center p-12 md:p-8 text-center transition-colors duration-800 bg-zen-white dark:bg-zen-ink text-zen-ink dark:text-zen-white border-b md:border-b-0 md:border-r border-zen-stone/20 shadow-2xl overflow-hidden shrink-0">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="ink-drop absolute rounded-full bg-zen-ink dark:bg-zen-white blur-xl"
            />
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="absolute top-6 left-6 p-3 rounded-full hover:bg-zen-stone/10 transition-colors z-50 text-zen-stone dark:text-zen-sage"
          aria-label="Toggle theme"
        >
          {dark ? (
            <span className="text-xl">○</span>
          ) : (
            <span className="text-xl">●</span>
          )}
        </button>

        <div id="hero-content" className="mb-8 relative cursor-pointer">
          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 flex items-center justify-center">
            <div
              id="profile-hover-circle"
              className="absolute inset-0 bg-zen-red rounded-full blur-2xl z-0 opacity-0 scale-90"
            />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full animate-spin-slow-reverse opacity-80 dark:opacity-60 text-zen-ink dark:text-zen-white z-10"
            >
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                style={{
                  stroke: "currentColor",
                  strokeWidth: "4",
                  strokeLinecap: "round",
                  strokeDasharray: "300 100",
                  fill: "none",
                  filter: "url(#rough-edge)",
                }}
              />
            </svg>

            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden relative z-20">
              <img
                src={`${import.meta.env.BASE_URL}/me.jpeg`}
                alt="Ryan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h1
            id="hero-title"
            className="text-5xl md:text-6xl font-zen-serif mb-2 tracking-widest text-zen-ink dark:text-zen-white"
          >
            Ryan
          </h1>
          <div
            id="hero-separator"
            className="w-16 h-1 bg-zen-red mx-auto mb-6 rounded-sm opacity-80"
          ></div>
          <p
            id="hero-subtitle"
            className="text-lg md:text-xl font-zen-mincho text-zen-stone dark:text-zen-sage tracking-[0.2em] uppercase"
          >
            Frontend Engineer
          </p>
        </div>
      </aside>

      <main className="w-full md:w-7/12 lg:w-2/3 h-auto md:h-full md:overflow-y-auto p-6 md:p-16 relative scroll-smooth bg-zen-cream dark:bg-zen-charcoal/50">
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-multiply dark:mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl font-zen-serif text-zen-ink dark:text-zen-white tracking-widest">
              Experience
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zen-ink/50 to-transparent dark:from-zen-white/50"></div>
          </div>

          <div className="relative border-l border-zen-ink/20 dark:border-zen-white/20 ml-3 md:ml-6 space-y-12 pb-24">
            {jobHistory.map((job, index) => (
              <JobCard key={index} job={job} index={index} />
            ))}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
