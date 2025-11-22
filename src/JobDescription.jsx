// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const JobDescription = ({ descriptions, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="space-y-6"
  >
    {descriptions.map((desc, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          delay: i * 0.15,
          ease: "easeOut",
        }}
        className="flex gap-4 items-start group"
      >
        <span className="text-2xl mt-[-6px] flex-shrink-0 text-zen-ink dark:text-zen-white opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          •
        </span>
        <p className="text-base leading-loose font-zen-mincho tracking-wide text-zen-ink/80 dark:text-zen-white/80">
          {desc}
        </p>
      </motion.div>
    ))}
  </motion.div>
);
