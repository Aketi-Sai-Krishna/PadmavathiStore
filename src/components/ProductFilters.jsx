import { Search, SlidersHorizontal } from "lucide-react";
import { catalogueBrands } from "../data/brands.js";
export default function ProductFilters({ search, onSearchChange, brand, onBrandChange, sort, onSortChange, minPrice, onMinPriceChange, maxPrice, onMaxPriceChange, inStock, onInStockChange }) {
  return <div className="ps-filter-toolbar">
    <label className="catalogue-search"><Search size={17}/><input type="search" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search products..." aria-label="Search products"/></label>
    <label className="catalogue-select"><SlidersHorizontal size={16}/><select value={brand} onChange={(e) => onBrandChange(e.target.value)}><option value="all">All brands</option>{catalogueBrands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></label>
    <label className="catalogue-select"><select value={sort} onChange={(e) => onSortChange(e.target.value)}><option value="featured">Featured first</option><option value="name">Name: A to Z</option><option value="price-low">MRP: Low to high</option><option value="price-high">MRP: High to low</option></select></label>
    <div className="ps-extra-filters"><label>Min MRP <input type="number" min="0" value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} placeholder="₹0"/></label><label>Max MRP <input type="number" min="0" value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} placeholder="Any"/></label><label className="ps-stock-check"><input type="checkbox" checked={inStock} onChange={(e) => onInStockChange(e.target.checked)}/> Listed as available</label></div>
  </div>;
}
