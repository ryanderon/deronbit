import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { JobDescription } from "./JobDescription";

export const JobCard = ({ job, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-8 md:pl-16 group"
    >
      <div className="absolute left-[-9px] top-1 w-5 h-5 z-10 transition-transform duration-500 group-hover:scale-125">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-zen-ink dark:fill-zen-white opacity-80"
        >
          <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 20 C65 20 75 30 75 45 C75 60 65 70 50 70 C35 70 25 60 25 45 C25 30 35 20 50 20 Z" />
        </svg>
      </div>

      <span className="text-sm font-zen-mincho tracking-[0.2em] uppercase mb-3 block text-zen-stone dark:text-zen-sage">
        {job.year}
      </span>

      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative group/card"
      >
        <motion.div
          layout="position"
          className="flex justify-between items-start gap-4"
        >
          <div>
            <h3 className="text-2xl font-zen-serif font-bold mb-2 tracking-wide text-zen-ink dark:text-zen-white group-hover/card:text-zen-stone transition-colors duration-300">
              {job.company}
            </h3>
            <p className="text-base font-zen-mincho text-zen-stone dark:text-zen-sage italic">
              {job.role}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2 opacity-40 text-zen-ink dark:text-zen-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-zen-ink/20 dark:bg-zen-white/20 group-hover/card:w-full transition-all duration-700 ease-out"></div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-zen-ink/10 dark:border-zen-white/10 pt-6 pl-2 border-l-2 border-l-zen-red/50">
                <JobDescription descriptions={job.description} index={index} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
