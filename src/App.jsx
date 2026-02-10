import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import "./index.css";
import { jobHistory } from "./jobHistory";
import { JobMilestone, JobDetailContent } from "./JobCard";
import { Footer } from "./Footer";
import { Skills } from "./Skills";

const heroTitle = "RYAN";

function PreloaderBar({ onDone }) {
  const [done, setDone] = useState(false);

  return (
    <motion.div
      className="h-1 bg-cyber-blue"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (!done) {
          setDone(true);
          onDone();
        }
      }}
    />
  );
}

function App() {
  const [dark, setDark] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedJob(null);
    };
    if (selectedJob) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [selectedJob]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div className="text-cyber-text min-h-screen font-mono selection:bg-cyber-blue selection:text-black overflow-x-hidden">
      <AnimatePresence
        onExitComplete={() => {
          setPreloaderDone(true);
          setShowContent(true);
        }}
      >
        {!preloaderDone && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-64 text-center">
              <div
                className="text-cyber-blue font-cyber text-4xl glitch"
                data-text="INITIALIZING..."
              >
                INITIALIZING...
              </div>
              <div className="h-1 w-full bg-cyber-blue/20 mt-4">
                <PreloaderBar onDone={() => setPreloaderDone(true)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 cyber-btn text-sm p-2"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        aria-label="Toggle theme"
      >
        {dark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </motion.button>

      <section className="w-full h-screen relative flex flex-col justify-center items-center text-center bg-cyber-black border-b-2 border-cyber-blue/20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

        <motion.div
          className="relative z-10 mb-8 group"
          whileHover={{
            x: [-5, 5, -5, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          <div className="w-64 h-64 relative">
            <div className="absolute inset-0 border-2 border-cyber-blue rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 border-2 border-cyber-accent rounded-full opacity-30 scale-95 group-hover:scale-105 transition-transform duration-500 delay-75"></div>
            <img
              src={`${import.meta.env.BASE_URL}/me.jpeg`}
              alt="Ryan"
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        <div className="relative z-10">
          <h1
            className="text-6xl md:text-8xl font-cyber mb-4 glitch"
            data-text={heroTitle}
          >
            {showContent
              ? heroTitle.split("").map((char, i) => (
                  <motion.span key={i} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))
              : heroTitle}
          </h1>

          <motion.div
            className="w-24 h-1 bg-cyber-accent mx-auto mb-6"
            initial={{ scaleY: 0 }}
            animate={showContent ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
          />

          <motion.p
            className="text-xl md:text-2xl font-mono tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Frontend Engineer
          </motion.p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-cyber-blue/50">
          SCROLL TO EXPLORE
        </div>
      </section>

      <LayoutGroup>
        <main
          id="experience-section"
          className="w-full min-h-screen bg-cyber-dark relative py-20 md:py-28"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <header className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-cyber tracking-wide text-cyber-text">
                Experience
              </h2>
            </header>

            <div>
              {jobHistory.map((job, index) => (
                <JobMilestone
                  key={index}
                  job={job}
                  index={index}
                  onClick={() => setSelectedJob(job)}
                />
              ))}
            </div>
          </div>
        </main>

        <AnimatePresence>
          {selectedJob && (
            <>
              <motion.div
                key={`backdrop-${selectedJob.company}`}
                className="fixed inset-0 z-50 bg-gray-100/10 backdrop-blur-sm"
                onClick={() => setSelectedJob(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <motion.div
                key={`modal-${selectedJob.company}`}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none"
              >
                <motion.div
                  className="relative w-full max-w-3xl max-h-[85vh] bg-dark-bg/100 border border-primary-adaptive/30 overflow-hidden flex flex-col pointer-events-auto overscroll-contain"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-text/50 hover:text-primary-adaptive transition-colors focus:outline-none"
                    aria-label="Close"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <JobDetailContent job={selectedJob} />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <Skills />

      <Footer />
    </div>
  );
}

export default App;
