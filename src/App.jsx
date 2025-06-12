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
    <div className="min-h-screen transition-colors duration-300 bg-retro-light text-retro-brown dark:bg-retro-dark dark:text-retro-light relative scanlines">
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 px-3 py-1 text-md rounded-full pixel-border hover:shadow-retro-glow transition duration-300 ${
          dark ? "bg-retro-gold text-white" : "bg-retro-dark text-white"
        }`}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {dark ? "☀" : "🌙"}
      </button>

      <section className="h-screen flex flex-col items-center justify-center p-6 border-b-8 border-retro-gold">
        <motion.div
          className="w-60 h-60 mb-6 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, borderRadius: "0.5rem" }}
          animate={{ scale: 1, opacity: 1, borderRadius: "0.5rem" }}
          whileHover={{ scale: 1.05, borderRadius: "9999px" }}
          whileTap={{ scale: 0.95, borderRadius: "9999px" }}
          layout
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            layout: { duration: 0.3 },
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}/me.jpeg`}
            alt="myself"
            className="w-full h-full object-cover pixelated object-[50%_80%]"
          />
        </motion.div>

        <h3 className="text-base text-center max-w-xl leading-relaxed">
          Hi, I'm Ryan
          <br />A Frontend Engineer
        </h3>
      </section>

      <section
        className="h-screen flex flex-col justify-center items-center relative px-6 transition-colors duration-500"
        style={{
          backgroundColor: themePalette.bg,
          color: themePalette.text,
        }}
      >
        <div className="flex gap-2 mb-6">
          {jobHistory.map((_, i) => (
            <div
              key={i}
              className="w-6 h-4 border-2 transition-colors duration-300 cursor-pointer"
              style={{
                backgroundColor:
                  i <= index ? themePalette.accent : themePalette.bg,
                borderColor: themePalette.text,
                imageRendering: "pixelated",
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
          className="max-w-3xl text-center rounded-lg shadow-lg border-4 h-[65%] overflow-scroll transition-colors duration-500"
          style={{
            backgroundColor: themePalette.bg,
            color: themePalette.text,
            borderColor: themePalette.accent,
          }}
        >
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-6 sticky top-0 transition-colors duration-500 border-b-2"
            style={{
              backgroundColor: themePalette.bg,
              borderColor: themePalette.accent,
            }}
          >
            <motion.div className="flex justify-end" variants={itemVariants}>
              <p
                className="text-xs font-bold mb-2 font-pixel"
                style={{ color: themePalette.accent }}
              >
                {jobHistory[index].year}
              </p>
            </motion.div>
            <motion.h3
              className="text-lg font-semibold"
              variants={itemVariants}
            >
              {jobHistory[index].company}
            </motion.h3>
            <motion.p className="text-md italic" variants={itemVariants}>
              {jobHistory[index].role}
            </motion.p>
          </motion.div>

          <div className="p-4">
            <JobDescription
              descriptions={jobHistory[index].description}
              index={index}
            />
          </div>
        </div>

        <>
          <button
            onClick={goNext}
            className="absolute bottom-10 right-10 px-4 py-2 rounded transition duration-300 hover:brightness-110"
            style={navButtonStyle}
            aria-label="Next job"
            title="Next job"
          >
            Next
          </button>
          {index > 0 && (
            <button
              onClick={goPrevious}
              className="absolute bottom-10 left-10 px-4 py-2 rounded transition duration-300 hover:brightness-110"
              style={navButtonStyle}
              aria-label="Previous job"
              title="Previous job"
            >
              Previous
            </button>
          )}
        </>
      </section>

      <Footer />
    </div>
  );
}

export default App;
