export const Footer = () => (
  <footer className="py-12 text-center bg-paper-tan dark:bg-paper-brown text-paper-ink dark:text-paper-cream relative paper-texture">
    <div className="absolute top-0 left-0 right-0 h-px bg-paper-brown dark:bg-paper-tan opacity-30"></div>
    <h3 className="mb-6 text-3xl font-handwritten">Let's Connect</h3>
    <div className="flex justify-center gap-8 flex-wrap">
      <a
        href="https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148/"
        target="_blank"
        rel="noopener noreferrer"
        className="handwritten-underline hover:text-paper-blue transition-colors text-xl font-sketch"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="handwritten-underline hover:text-paper-blue transition-colors text-xl font-sketch"
      >
        GitHub
      </a>
      <a
        href="https://instagram.com/ryanderon"
        target="_blank"
        rel="noopener noreferrer"
        className="handwritten-underline hover:text-paper-blue transition-colors text-xl font-sketch"
      >
        Instagram
      </a>
    </div>
    <p className="mt-8 text-sm opacity-60 font-sketch">Made with ❤️ on paper</p>
  </footer>
);
