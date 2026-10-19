import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Home", "#home"], ["Categories", "#categories"],
    ["Wholesale", "#wholesale"], ["About us", "#about"], ["Contact", "#contact"]
  ];
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Padmavathi Stores home">
          <span className="brand-mark">P</span>
          <span className="brand-text">
            <strong>Padmavathi Stores</strong>
            <small>WHOLESALE & DISTRIBUTION</small>
          </span>
        </a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="btn btn-dark nav-cta" href="#contact">Partner with us <ArrowUpRight size={16} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
