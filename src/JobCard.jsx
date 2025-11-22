import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { JobDescription } from "./JobDescription";

export const JobCard = ({ job, index, isEven, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const palette = dark ? job.palette.dark : job.palette.light;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative mb-24 last:mb-0 flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } items-start group`}
    >
      
      <div
        className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 mt-8 z-10 transition-all duration-500 bg-zen-cream dark:bg-zen-charcoal group-hover:scale-125"
        style={{
          borderColor: palette.accent,
          backgroundColor: dark ? "#3a3a3a" : "#f5f2ed",
        }}
      ></div>

      
      <div
        className={`w-full md:w-1/2 pl-20 md:pl-0 ${
          isEven ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"
        } mb-2 md:mb-0 md:mt-6`}
      >
        <span
          className="font-zen-mincho tracking-wider opacity-60 text-sm block transition-colors duration-300"
          style={{ color: palette.accent }}
        >
          {job.year}
        </span>
      </div>

      
      <div
        className={`w-full md:w-1/2 pl-20 md:pl-0 ${
          isEven ? "md:pr-12" : "md:pl-12"
        }`}
      >
        <motion.div
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="p-8 rounded-sm zen-shadow-md washi-texture relative transition-all duration-500 hover:zen-shadow-lg border-l-2 cursor-pointer overflow-hidden"
          style={{
            backgroundColor: palette.bg,
            color: palette.text,
            borderColor: palette.accent,
          }}
          whileHover={{ y: -4 }}
        >
          <motion.div layout="position" className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-zen-serif mb-2 tracking-wide">
                {job.company}
              </h3>
              <p className="text-lg font-zen-mincho opacity-80">
                {job.role}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-1 opacity-60"
              style={{ color: palette.accent }}
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

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="bamboo-divider w-full my-6 opacity-30"
                  style={{
                    backgroundColor: palette.accent,
                    height: "1px",
                  }}
                ></div>

                <JobDescription
                  descriptions={job.description}
                  index={index}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
