import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./index.css";
import { jobHistory } from "./jobHistory";
import { JobMilestone, JobDetailContent } from "./JobCard";
import { Modal } from "./Modal";
import { Footer } from "./Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const container = useRef();
  const [dark, setDark] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to("#preloader-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
      })
        .to("#preloader", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            document.querySelector("#preloader").style.display = "none";
          },
        })
        .to("#theme-toggle-btn", {
          opacity: 1,
          duration: 0.5,
        })
        .from(
          "#hero-title .char",
          {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          "#hero-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".cyber-decoration",
          {
            scaleY: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.8"
        );

      const text = new SplitType("#hero-title", { types: "chars" });

      gsap.utils.toArray(".cyber-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      });

      const profile = document.querySelector(".profile-img-container");
      profile.addEventListener("mouseenter", () => {
        gsap.to(profile, { x: -5, duration: 0.1, yoyo: true, repeat: 5 });
      });

      return () => {
        text.revert();
      };
    },
    { scope: container }
  );

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div
      ref={container}
      className="text-cyber-text min-h-screen font-mono selection:bg-cyber-blue selection:text-black overflow-x-hidden"
    >
      <div
        id="preloader"
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        <div className="w-64 text-center">
          <div
            className="text-cyber-blue font-cyber text-4xl glitch"
            data-text="INITIALIZING..."
          >
            INITIALIZING...
          </div>
          <div className="h-1 w-full bg-cyber-blue/20 mt-4">
            <div
              id="preloader-bar"
              className="h-1 bg-cyber-blue"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>

      <button
        id="theme-toggle-btn"
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 cyber-btn text-sm p-2 opacity-0"
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
      </button>

      <section className="w-full h-screen relative flex flex-col justify-center items-center text-center bg-cyber-black border-b-2 border-cyber-blue/20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

        <div className="relative z-10 mb-8 profile-img-container group">
          <div className="w-64 h-64 relative">
            <div className="absolute inset-0 border-2 border-cyber-blue rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 border-2 border-cyber-accent rounded-full opacity-30 scale-95 group-hover:scale-105 transition-transform duration-500 delay-75"></div>
            <img
              src={`${import.meta.env.BASE_URL}/me.jpeg`}
              alt="Ryan"
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="relative z-10">
          <h1
            id="hero-title"
            className="text-6xl md:text-8xl font-cyber mb-4 glitch"
            data-text="RYAN"
          >
            RYAN
          </h1>
          <div className="cyber-decoration w-24 h-1 bg-cyber-accent mx-auto mb-6"></div>
          <p
            id="hero-subtitle"
            className="text-xl md:text-2xl font-mono tracking-[0.3em] uppercase"
          >
            Frontend Engineer
          </p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-cyber-blue/50">
          SCROLL TO EXPLORE
        </div>
      </section>

      <main
        id="experience-section"
        className="w-full min-h-screen bg-cyber-dark relative py-20 md:py-28"
      >
        <div className="max-w-2xl mx-auto px-4 md:px-6">
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
                onClick={() => setSelectedJob(job)}
              />
            ))}
          </div>
        </div>
      </main>

      <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
        <JobDetailContent job={selectedJob} />
      </Modal>

      <Footer />
    </div>
  );
}

export default App;
