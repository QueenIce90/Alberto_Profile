import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook (no libraries)
 */
function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      options
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, visible };
}

/**
 * Wrapper component for scroll reveal
 */
function RevealSection({ children, className = "", delay = 0 }) {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export default function Resume() {
  const pdfUrl = "/Resume.pdf";

  // Put all editable content here (easy updates later)
  const RESUME = useMemo(
    () => ({
      name: "ALBERTO BANOS JR",
      title: "OPERATIONS & CUSTOMER SOLUTIONS LEAD | PRIVATE CONTRACTOR",
      tagline: "Leadership • Conflict Resolution • High-Pressure Problem Solving",

      contact: {
        phone: "(347) 783-4938",
        location: "Brooklyn, NY",
        email: "alberto.banos@yahoo.com",
      },

      summary: [
        "Operations and customer solutions leader with 10+ years of experience managing complex, high-pressure situations in client-facing, logistics, and contract-based environments. Known for taking control of challenging scenarios, communicating with clarity, and delivering solutions that protect customer trust and company reputation.",
        "Combines strong numerical skills, systems understanding, and hands-on technical experience (construction, wiring, and mechanical work) with exceptional customer service and leadership presence. Consistently recognized through top-rated Google reviews for professionalism, accountability, and results while representing leading moving companies as a private contractor.",
      ],

      skills: [
        "Leadership & de-escalation",
        "Customer service & communication",
        "High-pressure problem solving",
        "Math & numerical accuracy",
        "NOI / profit margin / profit summary support",
        "Computer systems & programs",
        "Operations & logistics coordination",
        "Construction / wiring / painting",
      ],

      experience: [
        {
          role: "OPERATIONS & CUSTOMER SOLUTIONS LEAD / PRIVATE CONTRACTOR",
          org: "Sophisticated Moves LLC — Contracted with Piece of Cake Moving & Storage",
          dates: "2022 – Present",
          bullets: [
            "Lead on-site operations for residential and commercial relocations, maintaining control of complex and time-sensitive situations.",
            "Act as the primary decision-maker during high-stress customer scenarios; de-escalate issues and deliver solutions.",
            "Represent partner company standards while operating independently as a business owner.",
            "Apply numerical accuracy for estimates, logistics coordination, and task execution.",
            "Consistently earn 5-star Google reviews for professionalism, leadership, and customer satisfaction.",
            "Resolve unforeseen challenges while maintaining efficiency, safety, and service quality.",
          ],
        },
        {
          role: "OPERATIONS & CUSTOMER SOLUTIONS LEAD / PRIVATE CONTRACTOR",
          org: "Rabbit Movers (Top 10 NYC Moving Company — Closed) — Prior Contract",
          dates: "",
          bullets: [
            "Served as a lead contractor for a top-rated NYC moving company.",
            "Managed difficult customer situations, logistics breakdowns, and last-minute operational changes.",
            "Recognized through strong Google and Yelp reviews for reliability, communication, and leadership under pressure.",
            "Maintained exceptional service standards aligned with a top-tier reputation.",
          ],
        },
        {
          role: "CLIENT SUCCESS / OPERATIONS SUPPORT",
          org: "Nature’s Love Touch Corporation",
          dates: "2019 – 2024",
          bullets: [
            "Supported business planning and reporting, including NOI, profit margin tracking, and profit summary planning.",
            "Assisted with marketing execution and customer engagement efforts to improve visibility and retention.",
            "Communicated directly with customers to resolve issues, clarify services, and maintain satisfaction.",
            "Partnered with internal stakeholders to improve workflows based on customer feedback.",
          ],
        },
        {
          role: "SALES REPRESENTATIVE",
          org: "Verizon Business Services",
          dates: "2018 – 2021",
          bullets: [
            "Ranked Top Seller in Manhattan, earning recognition, rewards, and performance incentives.",
            "Achieved top customer satisfaction scores while maintaining top sales performance in the department.",
            "Delivered consultative sales by identifying business needs and recommending Verizon solutions.",
            "Resolved customer concerns quickly and professionally, protecting retention and brand trust.",
          ],
        },
      ],

      education: [
        {
          years: "2018",
          school: "Building Works",
          detail: "Certificate — Carpenter",
        },
        {
          years: "2003–2007",
          school: "Canarsie High School",
          detail: "High School Diploma",
        },
      ],
    }),
    []
  );

  return (
    <div className="resumePage">
      {/* Top bar (header) */}
      <div className="resumeTopbar pageEnter">
        <div>
          <div className="resumeName">{RESUME.name}</div>
          <div className="resumeTitle">{RESUME.title}</div>
          <div className="resumeTagline">{RESUME.tagline}</div>
        </div>

        <a className="btnResume" href={pdfUrl} download>
          Download PDF
        </a>
      </div>

      {/* Two-column layout */}
      <div className="resumeGrid">
        {/* Sidebar */}
        <aside className="resumeSidebar pageEnter">
          <RevealSection className="sidebarBlock" delay={40}>
            <div className="blockTitle">CONTACT</div>
            <div className="contactLine">{RESUME.contact.phone}</div>
            <div className="contactLine">{RESUME.contact.location}</div>
            <div className="contactLine">{RESUME.contact.email}</div>
          </RevealSection>

          <RevealSection className="sidebarBlock" delay={100}>
            <div className="blockTitle">SUMMARY</div>
            {RESUME.summary.map((p) => (
              <p className="sidebarText" key={p}>
                {p}
              </p>
            ))}
          </RevealSection>

          <RevealSection className="sidebarBlock" delay={160}>
            <div className="blockTitle">SKILLS</div>
            <ul className="skillsList">
              {RESUME.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </RevealSection>
        </aside>

        {/* Main */}
        <section className="resumeMain pageEnter">
          <RevealSection className="mainBlock" delay={60}>
            <div className="blockTitle centerTitle">EXPERIENCE</div>

            {RESUME.experience.map((job, idx) => (
              <div className="role" key={job.role + job.org + idx}>
                <div className="roleTitle">{job.role}</div>
                <div className="roleMeta">
                  {job.org}
                  {job.dates ? <span className="dot">•</span> : null}
                  {job.dates}
                </div>

                <ul className="bulletList">
                  {job.bullets.map((b, i) => (
                    <li
                      key={b}
                      className="bullet"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealSection>

          <RevealSection className="mainBlock" delay={120}>
            <div className="blockTitle centerTitle">EDUCATION</div>

            <div className="eduGrid">
              {RESUME.education.map((e) => (
                <div className="eduItem" key={e.school}>
                  <div className="eduYears">{e.years}</div>
                  <div className="eduName">{e.school}</div>
                  <div className="eduDetail">{e.detail}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}
