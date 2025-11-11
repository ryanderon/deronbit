// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const JobDescription = ({ descriptions, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="space-y-4"
  >
    {descriptions.map((desc, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="flex gap-3 items-start"
      >
        <span className="text-2xl mt-1 flex-shrink-0 opacity-60">•</span>
        <p className="text-lg leading-relaxed font-sketch">
          {desc}
        </p>
      </motion.div>
    ))}
  </motion.div>
);
