/**
 * Every word printed in the notebook lives here.
 * `images` lists files in /public. They are scattered junk-journal style: each
 * photo keeps its own shape, and portrait shots (phone screenshots) get pinned
 * small and at a steeper angle over the wide ones — so order them widest
 * first. An empty array falls back to the dashed `hint` placeholder, and
 * `caption` may then be null.
 *
 * Nothing here is numbered by hand: "Entry 04" and "fig. 04" are derived from
 * an entry's position, so adding or pulling one can never leave the page
 * counting wrong.
 */

export const profile = {
  fullName: "Ryan Anan Saputra Sinaga",
  handle: "ryanderon",
  /** One array per printed line; `italic` words are set in Newsreader italic. */
  nameLines: [
    [{ text: "Ryan Anan" }],
    [{ text: "Saputra " }, { text: "Sinaga", italic: true }],
  ],
  role: "Frontend Engineer",
  lede: "Frontend Web Developer with 6+ years of experience building scalable and high performance web applications. Experienced in Vue and React ecosystems, with strong focus on UI architecture, maintainability, and user experience.",
  place: "Tangerang",
  email: "ryansinaga59@gmail.com",
  portrait: "me.webp",
  /* fig. 01 is the author; entry plates carry on from 02 */
  portraitCaption: "fig. 01 — the author",
  yearsSpan: "2020 — 2026",
};

export const entries = [
  {
    id: "e-1",
    tabYear: "2023 →",
    short: "Siloam Hospitals",
    kind: "Current position",
    company: "PT Siloam International Hospitals Tbk.",
    role: "Software Engineer",
    span: "SEPT 2023 — PRESENT",
    place: "Jakarta",
    url: "https://www.siloamhospitals.com",
    urlLabel: "siloamhospitals.com ↗",
    caption: "siloam hospital page",
    hint: "Siloam AI screenshot",
    images: ["siloam.webp", "siloam-ai.webp"],
    stack: [
      "Vue.js",
      "Vite",
      "Pinia",
      "Tailwind CSS",
      "Next.js",
      "Nuxt.js",
      "Atomic Design",
      "Storybook",
      "Vitest",
    ],
    bullets: [
      "Developed a dedicated page for Siloam AI, an AI assistant that enables users to schedule hospital appointments seamlessly.",
      "Designed and implemented scalable frontend architecture using Vue 3, Vite, Pinia, TailwindCSS, and Atomic Design, ensuring long-term maintainability.",
      "Conducted performance research and optimization on siloamhospitals.com, improving page load speed and overall user engagement.",
      "Reviewed and refactored legacy codebase, enhancing readability, maintainability, and application performance.",
      "Developed high conversion campaign landing pages for national health awareness programs, improving engagement and page performance.",
      "Built responsive and visually consistent campaign pages aligned with corporate branding guidelines.",
      "Created a proof-of-concept frontend architecture using Next.js, TailwindCSS, and Atomic Design to explore best practices and performance optimization strategies.",
    ],
  },
  {
    id: "e-2",
    tabYear: "2025",
    short: "Sign World",
    kind: "Freelance",
    company: "Sign World",
    role: "Frontend Engineer · Freelance",
    span: "DEC 2025 — JAN 2026",
    place: "Remote",
    url: "https://sign-world.id",
    urlLabel: "sign-world.id ↗",
    caption: "marketing landing page",
    hint: "Landing page screenshot",
    images: ["signworld.webp", "signworld-mobile.webp"],
    stack: ["React", "Tailwind CSS", "GSAP", "Google Search Console"],
    bullets: [
      "Developed a responsive marketing landing page using React, TailwindCSS, and GSAP to deliver smooth animations and engaging user experience.",
      "Implemented SEO-friendly structure, optimized page performance, and ensured fast load times across devices.",
      "Handled deployment process and domain setup, ensuring production readiness and stability.",
      "Configured and submitted website to Google Search Console, enabling indexing, sitemap tracking, and search performance monitoring.",
      "Collaborated directly with client to translate business requirements into functional and user focused UI.",
    ],
  },
  {
    id: "e-3",
    tabYear: "2024",
    short: "Yesplis Indonesia",
    kind: "Freelance",
    company: "Yesplis Indonesia",
    role: "Frontend Engineer · Freelance",
    span: "MAR 2024 — MAR 2026",
    place: "Remote",
    url: "https://yesplis.com",
    urlLabel: "yesplis.com ↗",
    caption: "yesplis page",
    hint: "Seat map screenshot",
    images: ["yesplis.webp", "yeplis-seat.webp"],
    stack: ["Vue.js", "Pinia"],
    bullets: [
      "Built end-to-end ticketing platform from scratch using Vue.js, Pinia, including admin dashboard for event/seat/ticket management and client-facing platform for ticket purchase, transaction history, and account management.",
      "Implemented a seat management system supporting real-time availability updates and optimized event capacity handling.",
      "Collaborated with the product and development team to ideate and implement new features, enhancing overall platform usability.",
      "Participated in deployment and staging testing processes, ensuring feature stability and quality prior to production release.",
    ],
  },
  {
    id: "e-4",
    tabYear: "2023",
    short: "Namdeska Solution",
    kind: "Contract",
    company: "PT Namdeska Solution",
    role: "Frontend Developer · Contract",
    span: "MAR — SEPT 2023",
    place: "Jakarta (Remote)",
    url: "https://github.com/ryanderon",
    urlLabel: "github.com/ryanderon ↗",
    caption: null,
    hint: "No screenshot available",
    images: [],
    stack: ["Next.js", "Redux Thunk", "Styled Components", "Atomic Design"],
    bullets: [
      "Translated designs into responsive webpages, ensuring a seamless user experience.",
      "Contributed to API contract documentation, defining clear standards for frontend-backend integration.",
      "Integrated webpages with APIs, enabling efficient data exchange and interactivity.",
      "Refactored legacy code, improving performance, maintainability, and scalability.",
      "Gained hands-on experience collaborating with backend developers and QA teams to ensure smooth development and testing processes.",
      "Developed reusable components and functions, streamlining development and improving code reusability.",
      "Maintained and optimized the existing website, ensuring stability, performance, and security.",
    ],
  },
  {
    id: "e-5",
    tabYear: "2021",
    short: "Kulina.id",
    kind: "Position",
    company: "PT Jejaring Makanan Indonesia (Kulina.id)",
    role: "Frontend Developer",
    span: "APR 2021 — FEB 2023",
    place: "Yogyakarta (Remote)",
    url: "https://kulina.id",
    urlLabel: "kulina.id ↗",
    caption: null,
    hint: "No screenshot available",
    images: [],
    stack: ["Next.js", "Atomic Design", "Styled Components", "Storybook"],
    bullets: [
      "Translated designs into fully functional websites, ensuring responsiveness and a seamless user experience.",
      "Integrated websites with APIs, enabling efficient data flow and real-time functionality.",
      "Collaborated closely with backend developers to ensure smooth API integration and optimal system performance.",
      "Developed reusable functions and components, enhancing code maintainability and speeding up development.",
      "Assisted the project manager in team coordination, including refining ticket descriptions for clear task execution.",
    ],
  },
  {
    id: "e-6",
    tabYear: "2020",
    short: "Kaimana News",
    kind: "Side project",
    company: "Kaimana News",
    role: "Redesign & implementation",
    span: "SEP 2020 — NOV 2021",
    place: "Yogyakarta",
    url: "https://kaimananews.com",
    urlLabel: "kaimananews.com ↗",
    caption: "the new layout",
    hint: "New layout screenshot",
    images: ["kaimana.webp"],
    stack: ["WordPress"],
    bullets: [
      "Redesigned and implemented a new website layout for kaimananews.com using WordPress, improving user experience and visual appeal.",
    ],
  },
  {
    id: "e-7",
    tabYear: "2020",
    short: "Lumintu Logic",
    kind: "First position",
    company: "Lumintu Logic",
    role: "Frontend Developer",
    span: "OKT 2020 — FEB 2021",
    place: "Yogyakarta",
    url: "https://github.com/ryanderon",
    urlLabel: "github.com/ryanderon ↗",
    caption: null,
    hint: "No screenshot available",
    images: [],
    stack: ["HTML5", "jQuery", "CSS3"],
    bullets: [
      "Converted abstract designs into fully functional web pages using HTML5, jQuery, and CSS3, ensuring responsiveness and a visually appealing user experience.",
    ],
  },
  {
    id: "e-8",
    tabYear: "2020",
    short: "Samora Home Bakery",
    kind: "Side project",
    company: "Samora Home Bakery",
    role: "Full build & deploy",
    span: "JUL — AUG 2020",
    place: "Yogyakarta",
    url: "https://samorahomebakery.com",
    urlLabel: "samorahomebakery.com ↗",
    caption: null,
    hint: "No screenshot available",
    images: [],
    stack: ["Laravel", "Vue.js"],
    bullets: [
      "Designed, developed, and deployed samorahomebakery.com using Laravel (backend) and Vue.js (frontend), ensuring a seamless and dynamic user experience.",
    ],
  },
  // Held back until the NDA lifts — uncomment to publish, and put tanla.png
  // back in /public. The id only has to be unique; entry and plate numbers
  // come from this array's order.
  // {
  //   id: "e-tanla",
  //   tabYear: "2026",
  //   short: "Tanla Tescor Welindo",
  //   kind: "Freelance",
  //   company: "PT Tanla Tescor Welindo",
  //   role: "Frontend Engineer · Freelance",
  //   span: "JAN — FEB 2026",
  //   place: "Remote",
  //   url: "https://tanlatescorw.com",
  //   urlLabel: "tanlatescorw.com ↗",
  //   caption: "marketing landing page",
  //   hint: "Landing page screenshot",
  //   images: ["tanla.webp"],
  //   stack: ["Next.js", "TailwindCSS", "GSAP", "Search Console"],
  //   bullets: [
  //     "Developed a responsive marketing landing page using NextJS, TailwindCSS, and GSAP to deliver smooth animations and engaging user experience.",
  //     "Handled deployment process and domain setup, ensuring production readiness and stability.",
  //     "Configured and submitted website to Google Search Console, enabling indexing, sitemap tracking, and search performance monitoring.",
  //     "Collaborated directly with client to translate business requirements into functional and user focused UI.",
  //   ],
  // },
];

/** Loose leaves — things built outside of client work. */
export const projects = [
  {
    id: "p-1",
    name: "Venus",
    tag: "Gesture controlled musical instrument",
    url: "https://project-venus.ryansinaga59.workers.dev",
    urlLabel: "project-venus.ryansinaga59.workers.dev ↗",
    stack: ["React", "TypeScript", "Tone.js", "MediaPipe"],
    bullets: [
      "Browser based instrument using hand-tracking (MediaPipe Tasks Vision) to play chords via a circle-of-fifths wheel.",
      "Built with React, TypeScript, and Tone.js for real-time audio synthesis.",
    ],
  },
  {
    id: "p-2",
    name: "MyPenny",
    tag: "Personal finance tracker",
    url: "https://mypenny.id",
    urlLabel: "mypenny.id ↗",
    stack: ["React", "TypeScript", "Zustand", "shadcn/ui"],
    bullets: [
      "Budgeting app with transaction tracking, multi account management, category budgets, and chart based analytics.",
      "Built with React, TypeScript, Zustand, Tailwind + shadcn/ui. Installable offline-first PWA, Excel export.",
    ],
  },
];

/** The kit — what gets reached for, grouped the way the CV groups it. */
export const skills = [
  { label: "Frontend", items: ["Vue", "React", "Next.js", "Nuxt.js"] },
  { label: "State", items: ["Pinia", "Vuex", "Redux Thunk", "Zustand"] },
  { label: "Styling", items: ["Tailwind CSS", "Styled Components", "CSS3"] },
  { label: "Languages", items: ["JavaScript", "TypeScript"] },
  { label: "Database", items: ["MySQL", "PostgreSQL"] },
];

export const education = {
  school: "Universitas Atma Jaya",
  schoolAccent: "Yogyakarta",
  degree: "Bachelor of Informatics Engineering",
  years: "2016 — 2020",
  gpa: "GPA 3.41 / 4.00",
};

export const activities = [
  "Code Hackaton Team Univ. Atmajaya 2019",
  "Bebras Computational Thinking Trainer 2019",
  "Marshall Mandiri Jogja Marathon 2018",
  "Basketball Community Universitas Atma Jaya Yogyakarta",
];

export const band = [
  "Player Grand Prix Marching Band 2018 at Istora Senayan Jakarta (6th Place)",
  "Player Hamengkubuwono Cup 2018 (1st Place)",
  "Player Parade Senja 2017 at Istana Kepresidenan Yogyakarta",
];

export const contacts = [
  {
    label: "Email",
    value: "ryansinaga59@gmail.com",
    href: "mailto:ryansinaga59@gmail.com",
  },
  { label: "GitHub", value: "ryanderon", href: "https://github.com/ryanderon" },
  {
    label: "LinkedIn",
    value: "ryan-a-s-sinaga",
    href: "https://www.linkedin.com/in/ryan-a-s-sinaga-0017b9148",
  },
  {
    label: "Instagram",
    value: "ryanderon",
    href: "https://instagram.com/ryanderon",
  },
];
