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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: i * 0.08,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="flex gap-4 items-start group"
      >
        <span className="text-lg mt-1 flex-shrink-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
          ◦
        </span>
        <p className="text-base leading-loose font-zen-mincho tracking-wide opacity-80">
          {desc}
        </p>
      </motion.div>
    ))}
  </motion.div>
);
