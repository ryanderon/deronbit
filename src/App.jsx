import { useEffect, useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./index.css";
import { jobHistory } from "./jobHistory";
import { JobDescription } from "./JobDescription";
import { Footer } from "./Footer";

const isDarkPreferred = window.matchMedia?.(
  "(prefers-color-scheme: dark)"
).matches;

function App() {
  const [index, setIndex] = useState(0);
  const [dark, setDark] = useState(isDarkPreferred);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleTheme = () => setDark((d) => !d);

  const themePalette = useMemo(() => {
    const job = jobHistory[index];
    return dark ? job.palette.dark : job.palette.light;
  }, [index, dark]);

  const navButtonStyle = useMemo(
    () => ({
      backgroundColor: themePalette.accent,
      color: themePalette.text,
      border: `2px solid ${themePalette.text}`,
    }),
    [themePalette]
  );

  const goNext = () => {
    setIndex((prev) => (prev + 1) % jobHistory.length);
  };

  const goPrevious = () => {
    setIndex((prev) => (prev - 1 + jobHistory.length) % jobHistory.length);
  };

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
        {/* Zen circle decoration */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" 
                    strokeDasharray="283" strokeDashoffset="30" transform="rotate(-90 50 50)" />
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
              clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)" 
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

      <section
        className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20 transition-colors duration-500"
        style={{
          backgroundColor: themePalette.bg,
          color: themePalette.text,
        }}
      >
        {/* Progress indicators */}
        <div className="flex gap-4 mb-12">
          {jobHistory.map((_, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer"
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role="button"
              tabIndex={0}
              aria-label={`Select job ${i + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIndex(i);
                }
              }}
            >
              <div
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i <= index ? themePalette.accent : "transparent",
                  border: `1px solid ${themePalette.text}`,
                  opacity: i === index ? 1 : 0.4,
                }}
              />
              {i === index && (
                <motion.div
                  className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border"
                  style={{ borderColor: themePalette.accent }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Job card */}
        <motion.div
          key={index}
          className="max-w-4xl w-full text-left washi-texture zen-shadow-lg h-[65vh] overflow-auto transition-all duration-500 relative"
          style={{
            backgroundColor: themePalette.bg,
            color: themePalette.text,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="p-10 sticky top-0 z-10 transition-colors duration-500 border-b calligraphy-accent"
            style={{
              backgroundColor: themePalette.bg,
              borderColor: `${themePalette.accent}20`,
            }}
          >
            <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
              <span 
                className="text-xs font-zen-serif tracking-widest uppercase opacity-50"
                style={{ color: themePalette.accent }}
              >
                Experience
              </span>
              <p
                className="text-sm font-zen-mincho tracking-wider opacity-60"
              >
                {jobHistory[index].year}
              </p>
            </motion.div>
            
            <motion.h3
              className="text-3xl font-zen-serif mb-3 tracking-wide"
              variants={itemVariants}
            >
              {jobHistory[index].company}
            </motion.h3>
            
            <motion.p 
              className="text-lg font-zen-mincho opacity-70 tracking-wide" 
              variants={itemVariants}
            >
              {jobHistory[index].role}
            </motion.p>

            <motion.div 
              className="bamboo-divider w-full mt-6"
              variants={itemVariants}
              style={{ color: themePalette.accent }}
            />
          </motion.div>

          {/* Content */}
          <div className="p-10 pt-8">
            <JobDescription
              descriptions={jobHistory[index].description}
              index={index}
            />
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {index > 0 && (
            <button
              onClick={goPrevious}
              className="px-8 py-3 rounded-sm transition-all duration-500 hover:scale-105 zen-shadow hover:zen-shadow-md font-zen-serif text-sm tracking-widest border"
              style={{
                ...navButtonStyle,
                borderColor: `${navButtonStyle.border.split(' ')[2]}40`,
              }}
              aria-label="Previous job"
              title="Previous job"
            >
              ← 前
            </button>
          )}
          <button
            onClick={goNext}
            className="px-8 py-3 rounded-sm transition-all duration-500 hover:scale-105 zen-shadow hover:zen-shadow-md font-zen-serif text-sm tracking-widest border"
            style={{
              ...navButtonStyle,
              borderColor: `${navButtonStyle.border.split(' ')[2]}40`,
            }}
            aria-label="Next job"
            title="Next job"
          >
            次 →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
