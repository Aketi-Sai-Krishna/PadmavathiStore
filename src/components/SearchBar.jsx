import { useMemo, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
export default function SearchBar({ onProduct, onCategory, compact = false }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], categories: [] };
    return {
      products: products.filter((p) => [p.title, p.brand, p.description, p.category, ...(p.flavours || [])].join(" ").toLowerCase().includes(q)).slice(0, 6),
      categories: categories.filter((c) => `${c.title} ${c.description}`.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);
  const chooseProduct = (p) => { onProduct(p); setQuery(""); setOpen(false); };
  return <div className={`ps-search ${compact ? "ps-search-compact" : ""}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <Search size={18}/>
    <input value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setOpen(true)} onKeyDown={(e) => { if (e.key === "Enter" && matches.products[0]) chooseProduct(matches.products[0]); }} placeholder="Search products, brands and categories..." aria-label="Search products, brands and categories"/>
    {query && <button type="button" className="ps-search-clear" onClick={() => setQuery("")}><X size={15}/></button>}
    <button type="button" className="ps-search-button" onClick={() => matches.products[0] && chooseProduct(matches.products[0])}>Search</button>
    {open && query.trim() && <div className="ps-search-results">
      {matches.categories.length > 0 && <section><small>Categories</small>{matches.categories.map((c) => <button key={c.slug} onClick={() => { onCategory(c.slug); setQuery(""); setOpen(false); }}>{c.title}<ArrowUpRight size={14}/></button>)}</section>}
      {matches.products.length > 0 && <section><small>Products</small>{matches.products.map((p) => <button key={p.id} onClick={() => chooseProduct(p)}><span><strong>{p.title}</strong><small>{p.brand?.toUpperCase()} · {p.category}</small></span><ArrowUpRight size={14}/></button>)}</section>}
      {!matches.products.length && !matches.categories.length && <p>No matches found. Try another product or brand.</p>}
    </div>}
  </div>;
}
