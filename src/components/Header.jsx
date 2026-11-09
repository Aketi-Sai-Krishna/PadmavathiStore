import { useState } from "react";
import { ArrowUpRight, Menu, X, ShoppingCart } from "lucide-react";
import img from "../img/favicon.ico";
import SearchBar from "./SearchBar.jsx";
import MegaMenu from "./MegaMenu.jsx";
import CartDrawer from "./CartDrawer.jsx";
import { useCart } from "../context/CartContext.jsx";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const links = [["Home", "/#home"], ["Categories", "/#categories"], ["Wholesale", "/#wholesale"], ["About us", "/#about"], ["Contact", "/#contact"]];
  const { itemCount } = useCart();
  const go = (path) => { window.location.href = path; };
  return <>
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="/#home" aria-label="Padmavathi Stores home">
          <span className="brand-mark"><img src={img} alt="Padmavathi Stores logo"/></span>
          <span className="brand-text"><strong>Padmavathi Stores</strong><small>WHOLESALE & DISTRIBUTION</small></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="/catalogue" onClick={() => setMenuOpen(false)}>Shop products</a>
        </nav>
        <div className="nav-right">
          <a className="btn btn-dark nav-cta" href="/catalogue">Shop products <ArrowUpRight size={16}/></a>
          <button className="ps-header-cart" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}><ShoppingCart size={19}/><span>Cart</span><b>{itemCount}</b></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
      </div>
      <div className="ps-header-search-row container">
        <MegaMenu onNavigate={(slug, type) => go(`/category/${slug}${type ? `?type=${encodeURIComponent(type)}` : ""}`)}/>
        <SearchBar compact onProduct={(p) => go(`/product/${p.id}`)} onCategory={(slug) => go(`/category/${slug}`)}/>
      </div>
    </header>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onViewCart={() => go("/cart")}/>
  </>;
}
