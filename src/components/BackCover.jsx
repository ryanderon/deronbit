import { useEffect, useRef } from "react";
import { activities, band, contacts, education, profile } from "../data";
import { revealAll } from "../lib/motion";

export default function BackCover() {
  const rootRef = useRef(null);

  useEffect(() => revealAll(rootRef.current), []);

  return (
    <footer className="back" ref={rootRef}>
      <p className="kicker mono" data-reveal>
        Inside back cover — where it started
      </p>
      <h2 data-reveal data-reveal-delay="60">
        {education.school} <em>{education.schoolAccent}</em>
      </h2>

      <div className="degree" data-reveal data-reveal-delay="120">
        <span>{education.degree}</span>
        <span className="meta mono tnum">{education.years}</span>
        <span className="gpa mono tnum">{education.gpa}</span>
      </div>

      <div className="edu-cols">
        <section>
          <h3>Activities</h3>
          <ul className="notes">
            {activities.map((item, index) => (
              <li className="note" key={item} data-reveal data-reveal-delay={index * 70}>
                <span className="mono" aria-hidden="true">
                  ·
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Marching Band Univ. Atmajaya</h3>
          <ul className="notes">
            {band.map((item, index) => (
              <li className="note" key={item} data-reveal data-reveal-delay={index * 70}>
                <span className="mono" aria-hidden="true">
                  ·
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <nav className="contact" aria-label="Contact">
        {contacts.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            data-reveal
            data-reveal-delay={index * 60}
            {...(item.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : null)}
          >
            <span className="lbl mono">{item.label}</span>
            <span className="dots" aria-hidden="true" />
            <span className="val mono tnum">{item.value}</span>
          </a>
        ))}
      </nav>

      <div className="colophon mono">
        <span>animated with anime.js</span>
        <span className="tnum">© 2026 {profile.handle}</span>
      </div>
    </footer>
  );
}
