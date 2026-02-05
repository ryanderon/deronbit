export const JobDescription = ({ descriptions }) => {
  return (
    <ul className="space-y-4">
      {descriptions.map((desc, i) => (
        <li
          key={i}
          className="flex gap-3 items-start text-sm md:text-base leading-relaxed"
        >
          <span 
            className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" 
            aria-hidden="true" 
          />
          <span className="font-mono text-text">
            {desc}
          </span>
        </li>
      ))}
    </ul>
  );
};

