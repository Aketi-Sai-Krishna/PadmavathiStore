import { useMemo, useState } from "react";
import { ArrowRight, PackageSearch } from "lucide-react";
import Header from "../components/Header.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { catalogueBrands } from "../data/brands.js";
export default function CataloguePage() {
  const [search,setSearch]=useState("");
  const [brand,setBrand]=useState("all");
  const [sort,setSort]=useState("featured");
  const [minPrice,setMinPrice]=useState("");
  const [maxPrice,setMaxPrice]=useState("");
  const [inStock,setInStock]=useState(false);
  const list=useMemo(()=>{
    let result=products.filter((p)=>{
      const q=search.trim().toLowerCase();
      const text=[p.title,p.description,p.brand,p.category,...(p.flavours||[])].join(" ").toLowerCase();
      const mrp=Number(p.mrp);
      return (!q||text.includes(q))&&(brand==="all"||p.brand===brand)&&(!minPrice||(p.mrp!=null&&mrp>=Number(minPrice)))&&(!maxPrice||(p.mrp!=null&&mrp<=Number(maxPrice)))&&(!inStock||p.availability==="available");
    });
    if(sort==="name") result.sort((a,b)=>a.title.localeCompare(b.title));
    if(sort==="price-low") result.sort((a,b)=>(a.mrp??Infinity)-(b.mrp??Infinity));
    if(sort==="price-high") result.sort((a,b)=>(b.mrp??-Infinity)-(a.mrp??-Infinity));
    if(sort==="featured") result.sort((a,b)=>Number(b.featured)-Number(a.featured)||a.title.localeCompare(b.title));
    return result;
  },[search,brand,sort,minPrice,maxPrice,inStock]);
  return <><Header/><main className="catalogue-page"><div className="container">
    <div className="ps-catalogue-intro"><span className="eyebrow">Padmavathi wholesale catalogue</span><h1>Explore our <em>products.</em></h1><p>Discover products by category and brand. Add the quantities you need to your enquiry cart.</p></div>
    <div className="ps-category-shortcuts">{categories.map((c)=><a key={c.slug} href={`/category/${c.slug}`}>{c.title}<ArrowRight size={13}/></a>)}</div>
    <div className="catalogue-section-heading"><div><span className="eyebrow">Product catalogue</span><h2>All <em>products</em></h2></div><span className="catalogue-brand-note">{catalogueBrands.map((b)=>b.name).join(" · ")}</span></div>
    <div className="ps-category-layout"><aside className="ps-filter-sidebar"><h3>Filters <button onClick={()=>{setSearch("");setBrand("all");setMinPrice("");setMaxPrice("");setInStock(false);}}>Clear all</button></h3><ProductFilters search={search} onSearchChange={setSearch} brand={brand} onBrandChange={setBrand} sort={sort} onSortChange={setSort} minPrice={minPrice} onMinPriceChange={setMinPrice} maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} inStock={inStock} onInStockChange={setInStock}/></aside>
      <section className="ps-category-results"><div className="ps-results-heading"><strong>{list.length} results</strong><span>MRP shown where verified</span></div>{list.length?<div className="products-grid">{list.map((p)=><ProductCard key={p.id} product={p} onOpen={()=>{window.location.href=`/product/${p.id}`;}}/>)}</div>:<div className="catalogue-empty"><PackageSearch/><h3>No matching products</h3><p>Try changing your search or filters.</p></div>}</section></div>
  </div></main></>;
}
