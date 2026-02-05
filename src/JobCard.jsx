import { JobDescription } from "./JobDescription";

export const JobMilestone = ({ job, onClick }) => {
  return (
    <div className="relative">
      <button onClick={onClick} className="relative w-full text-left group focus:outline-none">
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3 sm:block sm:flex-shrink-0 sm:w-[140px] md:w-[160px] mb-2 sm:mb-0">
            <span className="text-xs sm:text-sm font-mono text-primary-adaptive-60 group-hover:text-cyber-cyan group-hover:scale-105 transition-all origin-left whitespace-nowrap">
              {job.year}
            </span>

            <div className="flex-1 h-px bg-primary-adaptive-20 group-hover:bg-primary-adaptive transition-colors sm:hidden" />
          </div>

          <div className="flex-1 relative pb-8 sm:pb-10">
            <div className="cyber-card-border sm:-ml-3 p-3 sm:p-4 bg-dark-bg/50 group-hover:bg-primary-adaptive-5 transition-all duration-200 group-hover:translate-x-1 group-hover:shadow-cyber">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-cyber font-bold text-text group-hover:text-primary-adaptive transition-colors leading-tight">
                    {job.company}
                  </h3>
                  <p className="text-sm font-mono text-text/50 group-hover:text-text/70 mt-1 transition-colors">
                    {job.role}
                  </p>
                </div>

                <span className="flex-shrink-0 text-primary-adaptive-30 group-hover:text-primary-adaptive group-hover:translate-x-1 transition-all mt-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export const JobDetailContent = ({ job }) => {
  if (!job) return null;

  return (
    <>
      <div className="flex-shrink-0 p-6 md:p-8 border-b border-primary-adaptive-10">
        <span className="text-sm font-mono text-primary-adaptive-60 block mb-2">
          {job.year}
        </span>
        <h2
          className="text-2xl md:text-3xl font-cyber font-bold tracking-wide text-primary-adaptive glitch pr-10"
          data-text={job.company}
        >
          {job.company}
        </h2>
        <p className="text-base md:text-lg font-mono text-text/70 mt-1">
          {job.role}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
        <JobDescription descriptions={job.description} />
      </div>
    </>
  );
};
