import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./index.css";
import { jobHistory } from "./jobHistory";
import { JobCard } from "./JobCard";
import { Footer } from "./Footer";

const isDarkPreferred = window.matchMedia?.(
  "(prefers-color-scheme: dark)"
).matches;

function App() {
  const [dark, setDark] = useState(isDarkPreferred);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-zen-white dark:bg-zen-ink transition-colors duration-800 md:overflow-hidden">
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
            <motion.div
              key={i}
              className="absolute rounded-full bg-zen-ink dark:bg-zen-white blur-xl"
              initial={{
                width: 0,
                height: 0,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                width: [0, 200 + Math.random() * 300],
                height: [0, 200 + Math.random() * 300],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
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

        <motion.div
          className="mb-8 relative cursor-pointer"
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onHoverStart={() => setIsProfileHovered(true)}
          onHoverEnd={() => setIsProfileHovered(false)}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 flex items-center justify-center">
            <motion.div
              animate={{
                opacity: isProfileHovered ? 0.5 : 0,
                scale: isProfileHovered ? 1.1 : 0.8,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 bg-zen-red rounded-full blur-2xl z-0"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-zen-serif mb-2 tracking-widest text-zen-ink dark:text-zen-white">
            Ryan
          </h1>
          <div className="w-16 h-1 bg-zen-red mx-auto mb-6 rounded-sm opacity-80"></div>
          <p className="text-lg md:text-xl font-zen-mincho text-zen-stone dark:text-zen-sage tracking-[0.2em] uppercase">
            Frontend Engineer
          </p>
        </motion.div>
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
              <JobCard key={index} job={job} index={index} dark={dark} />
            ))}
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
