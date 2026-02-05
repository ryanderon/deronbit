export const Footer = () => (
  <footer className="py-24 text-center relative overflow-hidden bg-cyber-dark border-t-2 border-cyber-blue/20">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent"></div>

    <div className="relative inline-block mb-12 group">
      <div className="w-16 h-16 border-2 border-primary dark:border-dark-primary rounded-none flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-all duration-700 cursor-pointer bg-primary/10 dark:bg-dark-primary/10 hover:bg-primary/20 dark:hover:bg-dark-primary/20 shadow-[0_0_15px_rgba(13,115,119,0.3)] dark:shadow-[0_0_15px_rgba(0,234,255,0.3)]">
        <span className="text-primary dark:text-dark-primary font-cyber font-bold text-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-700">
          RD
        </span>
      </div>
    </div>

    <h3
      className="mb-10 text-xl font-cyber tracking-[0.2em] text-cyber-text opacity-80 glitch"
      data-text="CONTACT ME"
    >
      CONTACT ME
    </h3>

    <div className="flex justify-center gap-8 flex-wrap mb-20">
      <a
        href="https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148/"
        target="_blank"
        rel="noopener noreferrer"
        className="cyber-btn text-sm"
      >
        LINKEDIN
      </a>
      <a
        href="https://github.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="cyber-btn text-sm"
      >
        GITHUB
      </a>
      <a
        href="https://instagram.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="cyber-btn text-sm"
      >
        INSTAGRAM
      </a>
    </div>

    <div className="text-xs font-mono text-cyber-text/40">© 2025 ryanderon</div>
  </footer>
);
