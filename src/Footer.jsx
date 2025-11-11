export const Footer = () => (
  <footer className="py-16 text-center bg-zen-beige dark:bg-black text-zen-ink dark:text-zen-cream relative">
    <div className="bamboo-divider w-64 mx-auto mb-10 text-zen-stone dark:text-zen-sage dark:opacity-50"></div>

    <h3 className="mb-8 text-2xl font-zen-serif tracking-wider dark:text-zen-white">Connect</h3>
    <p className="text-xs mb-6 font-zen-mincho tracking-widest opacity-40 dark:opacity-70 dark:text-zen-beige">
      つながる
    </p>

    <div className="flex justify-center gap-12 flex-wrap mb-10">
      <a
        href="https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148/"
        target="_blank"
        rel="noopener noreferrer"
        className="brush-underline hover:text-zen-bamboo dark:hover:text-zen-gold transition-all duration-500 text-base font-zen-mincho tracking-wide dark:text-zen-cream"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="brush-underline hover:text-zen-bamboo dark:hover:text-zen-gold transition-all duration-500 text-base font-zen-mincho tracking-wide dark:text-zen-cream"
      >
        GitHub
      </a>
      <a
        href="https://instagram.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="brush-underline hover:text-zen-bamboo dark:hover:text-zen-gold transition-all duration-500 text-base font-zen-mincho tracking-wide dark:text-zen-cream"
      >
        Instagram
      </a>
    </div>

    <div className="bamboo-divider w-48 mx-auto my-8 text-zen-stone dark:text-zen-sage dark:opacity-50"></div>

    <p className="text-xs opacity-40 font-zen-mincho tracking-widest dark:opacity-60 dark:text-zen-beige">
      2024 · 静寂
    </p>
  </footer>
);
