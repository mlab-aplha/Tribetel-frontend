import React from "react";
import "./navbar.module.css";

type NavLink = { id: string; label: string; href?: string };

export type NavbarProps = {
  logo?: React.ReactNode; // optional custom SVG or element to render instead of placeholder
  links?: NavLink[]; // list of text links shown to the right of the logo
  onJoin?: () => void; // click handler for the Join button
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  links = [
    { id: "home", label: "Home", href: "#" },
    { id: "rooms", label: "Rooms", href: "#" },
    { id: "about", label: "About", href: "#" },
  ],
  onJoin,
  className = "",
}) => {
  return (
    // outer bar container with fixed size and background color
    <header className={`navWrapper ${className}`} role="navigation" aria-label="Main navigation">
      <div className="navInner">
        {/* Logo area: fixed 212x68, 48px from left edge */}
        <div className="logoWrap" aria-hidden={!logo}>
          {logo ? (
            // If caller provides an SVG or element, render it
            <div className="logoContent">{logo}</div>
          ) : (
            // Placeholder box that matches the requested dimensions
            <div className="logoPlaceholder" aria-hidden>
              {/* You can replace this with your SVG */}
              <svg width="212" height="68" viewBox="0 0 212 68" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo placeholder">
                <rect width="212" height="68" rx="8" fill="#ffffff20"/>
                <text x="50%" y="50%" fill="#fff" fontSize="18" fontFamily="Inter, sans-serif" textAnchor="middle" alignmentBaseline="central">Logo</text>
              </svg>
            </div>
          )}
        </div>

        {/* Navigation links: white text, spaced by 12px */}
        <nav className="linksWrap" aria-label="Primary">
          {links.map((link) => (
            <a key={link.id} className="navLink" href={link.href ?? "#"}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Join action button on the far right */}
        <div className="joinWrap">
          <button className="joinButton" onClick={onJoin} aria-label="Join">
            Join
          </button>
        </div>
      </div>
    </header>
  );
};