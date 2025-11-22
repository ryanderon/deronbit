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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-zen-cream text-zen-ink dark:bg-zen-charcoal dark:text-zen-white relative overflow-x-hidden">
      <button
        onClick={toggleTheme}
        className={`fixed top-8 right-8 z-50 px-5 py-2 text-sm font-zen-serif tracking-wider rounded-sm zen-shadow-md hover:zen-shadow-lg transition-all duration-500 border ${
          dark
            ? "bg-zen-ink text-zen-cream border-zen-gold border-opacity-30"
            : "bg-zen-white text-zen-ink border-zen-stone border-opacity-20"
        }`}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {dark ? "☀ 昼" : "☾ 夜"}
      </button>

      <section className="h-screen flex flex-col items-center justify-center p-6 relative">
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="283"
              strokeDashoffset="30"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

        <motion.div
          className="mb-12 relative enso-circle zen-float"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="w-72 h-72 overflow-hidden zen-shadow-lg washi-texture relative"
            style={{
              clipPath:
                "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}/me.jpeg`}
              alt="myself"
              className="w-full h-full object-cover object-[50%_80%] grayscale-[20%] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-zen-white/5 to-transparent pointer-events-none"></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl font-zen-serif mb-4 text-zen-ink dark:text-zen-cream tracking-wide">
            Ryan
          </h1>
          <div className="bamboo-divider w-24 mx-auto my-6 text-zen-stone dark:text-zen-sage"></div>
          <p className="text-xl font-zen-mincho text-zen-stone dark:text-zen-sage tracking-wider">
            Frontend Engineer
          </p>
          <p className="text-sm mt-4 text-zen-sage dark:text-zen-stone opacity-60 tracking-widest">
            フロントエンドエンジニア
          </p>
        </motion.div>
      </section>

      <section className="min-h-screen py-20 px-4 md:px-10 relative">
        <div className="max-w-5xl mx-auto relative">
          
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zen-stone opacity-30 transform md:-translate-x-1/2"></div>

          {jobHistory.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              index={index}
              isEven={index % 2 === 0}
              dark={dark}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
