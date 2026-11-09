import { useMemo, useState } from "react";
import { ArrowLeft, PackageSearch, SlidersHorizontal } from "lucide-react";
import Header from "../components/Header.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { catalogueBrands } from "../data/brands.js";

export default function CategoryPage({ slug }) {
  const category = categories.find((item) => item.slug === slug);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(() => new URLSearchParams(window.location.search).get("type") || "");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = product.category === slug;
      const matchesBrand = brand === "all" || product.brand === brand;
      const searchable = [product.title, product.description, product.brand, ...(product.flavours || [])].join(" ").toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesType = !type || searchable.includes(type.toLowerCase().replace(/s$/, "")) ||
        (type.toLowerCase().includes("chocolate") && product.category === "chocolates") ||
        (type.toLowerCase().includes("wafer") && product.category === "wafers") ||
        (type.toLowerCase().includes("candy") && product.category === "candies");
      const mrp = Number(product.mrp);
      const matchesMin = !minPrice || (product.mrp != null && mrp >= Number(minPrice));
      const matchesMax = !maxPrice || (product.mrp != null && mrp <= Number(maxPrice));
      const matchesStock = !inStock || product.availability === "available";
      return matchesCategory && matchesBrand && matchesSearch && matchesType && matchesMin && matchesMax && matchesStock;
    });
    if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "price-low") result.sort((a, b) => (a.mrp ?? Infinity) - (b.mrp ?? Infinity));
    if (sort === "price-high") result.sort((a, b) => (b.mrp ?? -Infinity) - (a.mrp ?? -Infinity));
    if (sort === "featured") result.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
    return result;
  }, [slug, search, type, brand, sort, minPrice, maxPrice, inStock]);
  if (!category) return <><Header/><main className="catalogue-page"><div className="container catalogue-empty"><h1>Category not found</h1><a className="btn btn-dark" href="/#categories">Back to categories</a></div></main></>;
  const brandNames = catalogueBrands.filter((item) => products.some((product) => product.category === slug && product.brand === item.id));
  return <>
    <Header/>
    <main className="catalogue-page">
      <div className="container">
        <a className="catalogue-back" href="/#categories"><ArrowLeft size={16}/> All categories</a>
        <section className="catalogue-hero">
          <div><span className="eyebrow">Padmavathi wholesale catalogue</span><h1>{type || category.title}</h1><p>{type ? `Browse ${type.toLowerCase()} in ${category.title}.` : category.description}</p><span className="catalogue-count">{filteredProducts.length} products listed</span></div>
          <div className="catalogue-hero-image"><img src={category.image} alt={`${category.title} range`}/></div>
        </section>
        <div className="catalogue-section-heading"><div><span className="eyebrow">Product catalogue</span><h2>Explore the <em>collection</em></h2></div><span className="catalogue-brand-note">{brandNames.map((item) => item.name).join(" · ") || "Product range"}</span></div>
        <button className="ps-mobile-filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/> {filtersOpen ? "Hide filters" : "Show filters"}</button>
        <div className={`ps-category-layout ${filtersOpen ? "ps-filters-visible" : ""}`}>
          <aside className="ps-filter-sidebar"><h3>Filters <button onClick={() => {setBrand("all");setSearch("");setType("");window.history.replaceState({}, "", `/category/${slug}`);setMinPrice("");setMaxPrice("");setInStock(false);}}>Clear all</button></h3><ProductFilters search={search} onSearchChange={setSearch} brand={brand} onBrandChange={setBrand} sort={sort} onSortChange={setSort} minPrice={minPrice} onMinPriceChange={setMinPrice} maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} inStock={inStock} onInStockChange={setInStock}/></aside>
          <div className="ps-category-results"><div className="ps-results-heading"><strong>{filteredProducts.length} results</strong><span>MRP shown where verified</span></div>
            {filteredProducts.length ? <div className="products-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={() => {window.location.href=`/product/${product.id}`;}}/>)}</div> : <div className="catalogue-empty"><PackageSearch size={34}/><h3>{products.some((p) => p.category === slug) ? "No matching products" : "Catalogue updates coming soon"}</h3><p>Try another filter or contact us about this category.</p><WhatsAppButton message={`Hello Padmavathi Stores! Please share the available products and wholesale prices for ${category.title}.`}>Enquire about this category</WhatsAppButton></div>}
          </div>
        </div>
        <p className="catalogue-disclaimer">MRP and pack details are displayed only when verified. Stock and wholesale pricing will be confirmed by Padmavathi Stores.</p>
      </div>
    </main>
  </>;
}
