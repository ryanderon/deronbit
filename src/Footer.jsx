export const Footer = () => (
  <footer className="py-24 text-center relative overflow-hidden">
    {/* Divider */}
    <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-zen-ink/20 dark:via-zen-white/20 to-transparent mx-auto mb-16"></div>

    {/* Hanko */}
    <div className="relative inline-block mb-12 group">
      <div className="w-16 h-16 border-[3px] border-zen-red/70 rounded-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-700 cursor-pointer bg-zen-red/5 hover:bg-zen-red/10">
        <span className="text-zen-red font-zen-serif font-bold text-2xl writing-vertical-rl opacity-90">
          デロン
        </span>
      </div>
    </div>

    <h3 className="mb-10 text-xl font-zen-serif tracking-[0.2em] text-zen-ink dark:text-zen-white opacity-80">
      Connect
    </h3>

    <div className="flex justify-center gap-12 flex-wrap mb-20">
      <a
        href="https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-2 py-1"
      >
        <span className="relative z-10 text-sm font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage group-hover:text-zen-white dark:group-hover:text-zen-ink transition-colors duration-500">
          LinkedIn
        </span>
        <span className="absolute inset-0 bg-zen-ink dark:bg-zen-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -skew-x-12 opacity-90"></span>
      </a>
      <a
        href="https://github.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-2 py-1"
      >
        <span className="relative z-10 text-sm font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage group-hover:text-zen-white dark:group-hover:text-zen-ink transition-colors duration-500">
          GitHub
        </span>
        <span className="absolute inset-0 bg-zen-ink dark:bg-zen-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -skew-x-12 opacity-90"></span>
      </a>
      <a
        href="https://instagram.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-2 py-1"
      >
        <span className="relative z-10 text-sm font-zen-mincho tracking-widest text-zen-stone dark:text-zen-sage group-hover:text-zen-white dark:group-hover:text-zen-ink transition-colors duration-500">
          Instagram
        </span>
        <span className="absolute inset-0 bg-zen-ink dark:bg-zen-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -skew-x-12 opacity-90"></span>
      </a>
    </div>
  </footer>
);
