// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const JobDescription = ({ descriptions, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
    className="list-disc list-inside text-base leading-relaxed space-y-3"
  >
    {descriptions.map((desc, i) => (
      <p className="text-lg" key={i}>
        {desc}
      </p>
    ))}
  </motion.div>
);
