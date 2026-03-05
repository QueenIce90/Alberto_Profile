import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div className="brand-text">
            <div className="brand-name">Alberto Banos Jr.</div>
            <div className="brand-sub">Operations & Customer Solutions Lead</div>
          </div>
        </div>

        <nav className="links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/resume" className={({ isActive }) => (isActive ? "active" : "")}>
            Resume
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
