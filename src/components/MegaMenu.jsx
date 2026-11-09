import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categoryNavigation as menuGroups } from "../data/categories.js";

/* Hierarchical menu data lives in src/data/categories.js. */

export default function MegaMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0);
  const group = menuGroups[active];
  const item = group?.children[sub];
  return <div className="ps-mega-wrap">
    <button className="ps-mega-trigger" onClick={() => setOpen(!open)}>Categories <ChevronDown size={15}/></button>
    {open && <div className="ps-mega-overlay" onClick={() => setOpen(false)}>
      <div className="ps-mega-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ps-mega-col">{menuGroups.map((g, i) => <button className={active === i ? "active" : ""} key={g.title} onMouseEnter={() => { setActive(i); setSub(0); }} onClick={() => { setActive(i); setSub(0); }}>{g.title}<ChevronRight size={15}/></button>)}</div>
        <div className="ps-mega-col">{group?.children.map((c, i) => <button className={sub === i ? "active" : ""} key={c.slug} onMouseEnter={() => setSub(i)} onClick={() => { setOpen(false); onNavigate(c.slug); }}>{c.title}<ChevronRight size={15}/></button>)}</div>
        <div className="ps-mega-col ps-mega-leaves">{(item?.children || []).map((leaf) => <button key={leaf} onClick={() => { setOpen(false); onNavigate(item.slug, leaf); }}>{leaf}<ChevronRight size={14}/></button>)}<button className="ps-mega-all" onClick={() => { setOpen(false); onNavigate(item?.slug || ""); }}>View all {item?.title}</button></div>
      </div>
    </div>}
  </div>;
}
