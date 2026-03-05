import React from "react";

export default function LogoSpin({
  size = 120,
  glow = true,
  className = "",
}) {
  return (
    <div
      className="logo-spin-wrapper"
      style={{ width: size, height: size }}
    >
      <img
        src="/alberto-logo.png"
        alt="Alberto Banos Logo"
        className={`nav-logo ${glow ? "logo-spin" : ""} ${className}`}
        draggable="false"
      />
    </div>
  );
}
