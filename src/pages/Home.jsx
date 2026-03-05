import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ✅ Simple scroll helper
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  // Contact form
  const [formData, setFormData] = useState({ Name: "", Email: "", Message: "" });
  const [statusMsg, setStatusMsg] = useState("");

  // ✅ If you ever use hashes like /#contact
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const t = setTimeout(() => scrollToId(id), 50);
    return () => clearTimeout(t);
  }, [location.hash]);

  // ✅ Reveal on scroll (IntersectionObserver)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("active");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ✅ Close menu on route change (GUARDED so it won't warn)
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("Sending...");

    setTimeout(() => {
      setStatusMsg("✅ Message sent! I’ll get back to you soon.");
      setFormData({ Name: "", Email: "", Message: "" });
    }, 700);
  };

  const heroButtons = useMemo(
    () => (
      <div className="hero-actions">
        <button className="btn" onClick={() => scrollToId("about")}>
          About
        </button>

        <button className="btn" onClick={() => scrollToId("services")}>
          Services
        </button>

        <button className="btn" onClick={() => scrollToId("contact")}>
          Contact
        </button>

        <Link className="btn" to="/resume">
          View Resume
        </Link>

        {/* Put Resume.pdf inside /public */}
        <a className="btn" href="/Resume.pdf" download>
          Download Resume
        </a>
      </div>
    ),
    []
  );

  return (
    <>
      {/* NAVBAR */}
      <header className="topnav">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => {
              setMenuOpen(false);
              scrollToId("header");
            }}
            aria-label="Go to top"
          >
            <span className="logo-wrap" aria-hidden="true">
              <img
                src="/LOGO2.png"
                alt="Alberto Banos logo"
                className="nav-logo logo-spin"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </span>

            <span className="brand-text">
              ALBERTO <span>BANOS</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="nav-desktop" aria-label="Primary navigation">
            <button className="nav-btn" onClick={() => scrollToId("about")}>
              About
            </button>
            <button className="nav-btn" onClick={() => scrollToId("services")}>
              Services
            </button>
            <button className="nav-btn" onClick={() => scrollToId("projects")}>
              Highlights
            </button>
            <button className="nav-btn" onClick={() => scrollToId("contact")}>
              Contact
            </button>

            <Link className="nav-link" to="/resume">
              Resume
            </Link>

            <a className="AA nav-pill" href="/Resume.pdf" download>
              Download
            </a>
          </nav>

          {/* Burger */}
          <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            ☰
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      {menuOpen && (
        <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu backdrop" />
      )}

      {/* Mobile drawer */}
      <aside className={`nav-drawer ${menuOpen ? "open" : ""}`} aria-label="Mobile menu">
        <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>

        <button className="drawer-link" onClick={() => scrollToId("about")}>
          About
        </button>
        <button className="drawer-link" onClick={() => scrollToId("services")}>
          Services
        </button>
        <button className="drawer-link" onClick={() => scrollToId("projects")}>
          Highlights
        </button>
        <button className="drawer-link" onClick={() => scrollToId("contact")}>
          Contact
        </button>

        <Link className="drawer-link" to="/resume" onClick={() => setMenuOpen(false)}>
          Resume
        </Link>

        <a className="drawer-pill" href="/Resume.pdf" download onClick={() => setMenuOpen(false)}>
          Download Resume
        </a>
      </aside>

      {/* HERO (IMPORTANT: add className="hero") */}
      <section id="header" className="hero reveal">
        <div className="container">
          <div className="header-text fade-in">
            <p className="kicker">Hi there, I’m</p>
            <h1>Alberto Banos Jr</h1>

            <p className="title">Operations & Customer Solutions Lead • Private Contractor • NYC</p>

            <p className="hero-sub">
              Leadership • Conflict Resolution • High-Pressure Problem Solving • Customer Satisfaction • Numbers & Planning
            </p>

            {heroButtons}

            <div className="hero-badges">
              <span className="badge">Top Seller (Manhattan) — Verizon</span>
              <span className="badge">5★ Google Reviews — Contractor Work</span>
              <span className="badge">Logistics + On-Site Leadership</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal">
        <div className="container">
          <div className="section-head">
            <h2 className="sub-title">
              About <span>Me</span>
            </h2>
            <p className="section-sub">
              Known for taking control of tough situations, communicating clearly, and delivering solutions that protect customer
              trust and company reputation.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card glass">
              <h3>What I’m known for</h3>
              <ul className="clean-list">
                <li>Leading high-pressure moves and client situations with calm control</li>
                <li>De-escalating conflict and protecting customer satisfaction</li>
                <li>Strong math & planning: estimates, timing, logistics coordination</li>
                <li>Hands-on technical background: painting, wiring, construction support</li>
                <li>Systems comfort: tools, programs, workflows, and process improvement</li>
              </ul>
            </div>

            <div className="about-card glass">
              <div className="tab-titles">
                <button
                  type="button"
                  className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
                  onClick={() => setActiveTab("skills")}
                >
                  Skills
                </button>
                <button
                  type="button"
                  className={`tab-links ${activeTab === "experience" ? "active-link" : ""}`}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </button>
                <button
                  type="button"
                  className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>
              </div>

              <div className={`tab-contents ${activeTab === "skills" ? "active-tab" : ""}`}>
                <ul>
                  <li>
                    <span>Leadership</span>
                    <br />
                    Situational control, team direction, accountability, calm under pressure.
                  </li>
                  <li>
                    <span>Customer Solutions</span>
                    <br />
                    De-escalation, communication, retention mindset, trust-building.
                  </li>
                  <li>
                    <span>Operations</span>
                    <br />
                    Logistics, estimates, workflow coordination, time-sensitive execution.
                  </li>
                  <li>
                    <span>Technical / Hands-on</span>
                    <br />
                    Construction support, wiring assistance, painting, tools & safety compliance.
                  </li>
                </ul>
              </div>

              <div className={`tab-contents ${activeTab === "experience" ? "active-tab" : ""}`}>
                <ul>
                  <li>
                    <span>Operations & Customer Solutions Lead | Sophisticated Moves LLC (2022 – Present)</span>
                    <br />
                    Lead relocations; decision-maker during high-stress customer scenarios; consistent 5-star reviews.
                  </li>

                  <li>
                    <span>Private Contractor | Piece of Cake Moving & Storage (Partner)</span>
                    <br />
                    Resolve unforeseen challenges while maintaining safety and service quality.
                  </li>

                  <li>
                    <span>Sales Representative | Verizon Business Services (2018 – 2021)</span>
                    <br />
                    Top seller in Manhattan; high customer satisfaction while leading sales.
                  </li>
                </ul>
              </div>

              <div className={`tab-contents ${activeTab === "education" ? "active-tab" : ""}`}>
                <ul>
                  <li>
                    <span>Building Works</span>
                    <br />
                    Certificate — Carpenter
                  </li>
                  <li>
                    <span>Canarsie High School</span>
                    <br />
                    High School Diploma
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section reveal">
        <div className="container">
          <h2 className="sub-title">
            What I <span>Do</span>
          </h2>

          <div className="services-list">
            <div className="service-item">
              <h3 className="service-title">Operations Leadership</h3>
              <p className="service-desc">On-site control, time-sensitive execution, coordination, accountability.</p>
            </div>

            <div className="service-item">
              <h3 className="service-title">Customer Solutions</h3>
              <p className="service-desc">De-escalation, problem-solving, customer satisfaction protection.</p>
            </div>

            <div className="service-item">
              <h3 className="service-title">Estimates & Planning</h3>
              <p className="service-desc">Math accuracy for timing, scope, logistics, and operational planning.</p>
            </div>

            <div className="service-item">
              <h3 className="service-title">Hands-on Technical Work</h3>
              <p className="service-desc">Construction support, wiring assistance, painting, tools, safety compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="projects" className="section reveal">
        <div className="container">
          <h2 className="sub-title">
            Career <span>Highlights</span>
          </h2>

          <div className="highlight-grid">
            <div className="glass highlight-card">
              <h3>Verizon — Performance</h3>
              <p>Top seller in Manhattan, rewards for performance, top customer satisfaction while leading sales.</p>
            </div>

            <div className="glass highlight-card">
              <h3>Customer Trust</h3>
              <p>Consistent 5★ reviews for professionalism, accountability, and results.</p>
            </div>

            <div className="glass highlight-card">
              <h3>Business Planning</h3>
              <p>Supported profit planning, summaries, and operational workflow improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal">
        <div className="container">
          <div className="section-head">
            <h2 className="sub-title">
              Contact <span>Me</span>
            </h2>
            <p className="section-sub">Reach out here, or download the resume directly.</p>
          </div>

          <div className="contact-grid">
            <div className="glass contact-card">
              <h3>Direct</h3>

              <div className="contact-item">
                <div className="contact-ico" aria-hidden="true">
                  ✉
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <a className="contact-link" href="mailto:Alberto.Banos@yahoo.com">
                    Alberto.Banos@yahoo.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-ico" aria-hidden="true">
                  ☎
                </div>
                <div>
                  <p className="contact-label">Phone</p>
                  <a className="contact-link" href="tel:+13476201188">
                    +1 (347) 620-1188
                  </a>
                </div>
              </div>

              <div className="contact-cta">
                <Link className="btn" to="/resume">
                  View Resume
                </Link>
                <a className="btn" href="/Resume.pdf" download>
                  Download Resume
                </a>
              </div>
            </div>

            <div className="glass contact-card">
              <h3>Send a message</h3>

              <form onSubmit={onSubmit} className="contact-form">
                <div className="form-row">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Your name"
                      required
                      value={formData.Name}
                      onChange={onChange}
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="Email"
                      placeholder="you@email.com"
                      required
                      value={formData.Email}
                      onChange={onChange}
                    />
                  </label>
                </div>

                <label>
                  <span>Message</span>
                  <textarea
                    name="Message"
                    rows="6"
                    placeholder="Tell me what role you’re hiring for and the best time to connect."
                    value={formData.Message}
                    onChange={onChange}
                  />
                </label>

                <button type="submit" className="btn btn2">
                  Submit
                </button>

                <span id="msg">{statusMsg}</span>
              </form>
            </div>
          </div>

          <footer className="copyright">
            <p>© {new Date().getFullYear()} Alberto Banos Jr • Built with care</p>
          </footer>
        </div>
      </section>
    </>
  );
}
