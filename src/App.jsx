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
    <div className="min-h-screen transition-colors duration-300 bg-paper-cream text-paper-ink dark:bg-paper-dark dark:text-paper-white relative">
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 px-4 py-2 text-xl font-handwritten rounded-lg paper-shadow hover:paper-shadow-lg transition-all duration-300 ${
          dark ? "bg-paper-tan text-paper-ink" : "bg-paper-white text-paper-ink border-2 border-paper-brown"
        }`}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <section className="h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <motion.div
          className="w-64 h-64 mb-8 overflow-hidden paper-shadow-lg paper-texture rounded-sm relative paper-float"
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 2 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}/me.jpeg`}
            alt="myself"
            className="w-full h-full object-cover object-[50%_80%]"
          />
          <div className="absolute inset-0 border-8 border-paper-white dark:border-paper-tan pointer-events-none"></div>
        </motion.div>

        <div className="text-center max-w-xl">
          <h3 className="text-4xl font-handwritten mb-3 text-paper-ink dark:text-paper-cream">
            Hi, I'm Ryan
          </h3>
          <p className="text-2xl font-sketch text-paper-brown dark:text-paper-tan">
            A Frontend Engineer
          </p>
          <div className="mt-4 w-32 h-1 bg-paper-brown dark:bg-paper-tan mx-auto opacity-40" style={{ transform: 'rotate(-1deg)' }}></div>
        </div>
      </section>

      <section
        className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20 transition-colors duration-500"
        style={{
          backgroundColor: themePalette.bg,
          color: themePalette.text,
        }}
      >
        <div className="flex gap-3 mb-8">
          {jobHistory.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-125"
              style={{
                backgroundColor:
                  i <= index ? themePalette.accent : "transparent",
                borderColor: themePalette.text,
                boxShadow: i === index ? `0 0 0 3px ${themePalette.accent}40` : "none",
              }}
              onClick={() => setIndex(i)}
              aria-label={`Select job ${i + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIndex(i);
                }
              }}
            />
          ))}
        </div>

        <div
          key={index}
          className="max-w-4xl w-full text-left rounded-sm paper-texture paper-shadow-lg h-[65vh] overflow-auto transition-all duration-500 relative"
          style={{
            backgroundColor: themePalette.bg,
            color: themePalette.text,
            transform: "rotate(-0.5deg)",
          }}
        >
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-8 sticky top-0 transition-colors duration-500 border-b-2 torn-edge"
            style={{
              backgroundColor: themePalette.bg,
              borderColor: themePalette.accent,
            }}
          >
            <motion.div className="flex justify-between items-start mb-3" variants={itemVariants}>
              <div className="stamp-effect bg-transparent text-xs font-handwritten" style={{ color: themePalette.accent }}>
                Experience
              </div>
              <p
                className="text-sm font-handwritten"
                style={{ color: themePalette.accent }}
              >
                {jobHistory[index].year}
              </p>
            </motion.div>
            <motion.h3
              className="text-3xl font-handwritten mb-2"
              variants={itemVariants}
            >
              {jobHistory[index].company}
            </motion.h3>
            <motion.p className="text-xl font-sketch italic opacity-80" variants={itemVariants}>
              {jobHistory[index].role}
            </motion.p>
          </motion.div>

          <div className="p-8">
            <JobDescription
              descriptions={jobHistory[index].description}
              index={index}
            />
          </div>
        </div>

        <>
          <button
            onClick={goNext}
            className="absolute bottom-10 right-10 px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 paper-shadow hover:paper-shadow-lg font-handwritten text-lg"
            style={navButtonStyle}
            aria-label="Next job"
            title="Next job"
          >
            Next →
          </button>
          {index > 0 && (
            <button
              onClick={goPrevious}
              className="absolute bottom-10 left-10 px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 paper-shadow hover:paper-shadow-lg font-handwritten text-lg"
              style={navButtonStyle}
              aria-label="Previous job"
              title="Previous job"
            >
              ← Previous
            </button>
          )}
        </>
      </section>

      <Footer />
    </div>
  );
}

export default App;
