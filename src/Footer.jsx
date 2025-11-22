export const Footer = () => (
  <footer className="py-24 text-center relative overflow-hidden">
    <div className="w-32 h-1 bg-zen-ink/10 dark:bg-zen-white/10 mx-auto mb-12 rounded-full"></div>

    <div className="relative inline-block mb-12">
      <div className="w-16 h-16 border-4 border-zen-red rounded-sm flex items-center justify-center transform rotate-3 mx-auto hover:rotate-0 transition-transform duration-500 cursor-pointer bg-zen-red/5">
        <span className="text-zen-red font-zen-serif font-bold text-2xl writing-vertical-rl">
          デロン
        </span>
      </div>
    </div>

    <h3 className="mb-8 text-2xl font-zen-serif tracking-widest text-zen-ink dark:text-zen-white">
      Connect
    </h3>

    <div className="flex justify-center gap-12 flex-wrap mb-16">
      <a
        href="https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative text-base font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage hover:text-zen-ink dark:hover:text-zen-white transition-colors duration-500"
      >
        LinkedIn
        <span className="absolute -bottom-2 left-0 w-0 h-px bg-zen-red transition-all duration-500 group-hover:w-full"></span>
      </a>
      <a
        href="https://github.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative text-base font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage hover:text-zen-ink dark:hover:text-zen-white transition-colors duration-500"
      >
        GitHub
        <span className="absolute -bottom-2 left-0 w-0 h-px bg-zen-red transition-all duration-500 group-hover:w-full"></span>
      </a>
      <a
        href="https://instagram.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative text-base font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage hover:text-zen-ink dark:hover:text-zen-white transition-colors duration-500"
      >
        Instagram
        <span className="absolute -bottom-2 left-0 w-0 h-px bg-zen-red transition-all duration-500 group-hover:w-full"></span>
      </a>
    </div>

    <p className="text-xs text-zen-stone/40 dark:text-zen-sage/40 font-zen-mincho tracking-[0.3em]">
      2024 · 静寂 (Silence)
    </p>
  </footer>
);
