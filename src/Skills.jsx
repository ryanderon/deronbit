import { motion } from "motion/react";

const skills = [
  "Vue",
  "React",
  "Nuxt.js",
  "Next.js",
  "TailwindCSS",
  "Styled Components",
  "Pinia",
  "Zustand",
];
export const Skills = () => {
  return (
    <section className="w-full bg-cyber-dark relative py-20 md:py-28 border-t-2 border-cyber-blue/20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <header className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-cyber tracking-wide text-cyber-text">
            Skills
          </h2>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="cyber-card-border p-4 md:p-5 bg-dark-bg/50 hover:bg-primary-adaptive-5 transition-all duration-300 hover:shadow-cyber group cursor-default flex flex-col items-center gap-3 text-center hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <span className="font-mono text-xs md:text-sm text-text/70 group-hover:text-primary-adaptive transition-colors duration-300">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
