import { useState } from "react";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { categories } from "../data/categories.js";
import { catalogueBrands } from "../data/brands.js";
import { useCart } from "../context/CartContext.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
export default function ProductCard({ product, onOpen }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const category = categories.find((item) => item.slug === product.category);
  const brand = catalogueBrands.find((item) => item.id === product.brand);
  const image = product.image || category?.image;
  return <article className="product-card ps-product-card">
    <button type="button" className="product-card-image ps-product-image" onClick={onOpen} aria-label={`View ${product.title}`}>
      {image ? <img src={image} alt={product.title} loading="lazy"/> : <div className="product-image-placeholder"><span>PS</span></div>}
      <span className="product-brand-tag">{brand?.name || product.brand}</span><span className="product-card-arrow"><ArrowUpRight size={18}/></span>
    </button>
    <div className="product-card-content">
      <span className="product-category-label">{category?.title || "Product"}</span>
      <button className="ps-product-title" type="button" onClick={onOpen}>{product.title}</button>
      <p>{product.description}</p>
      {product.packSize && <small className="ps-pack-size">{product.packSize}</small>}
      <div className="product-card-bottom ps-product-bottom">
        <strong>{product.mrp != null ? `MRP ₹${product.mrp}` : "MRP not provided"}</strong>
      </div>
      <div className="ps-product-actions">
        <QuantitySelector value={quantity} onChange={setQuantity}/>
        <button className="ps-add-cart" onClick={() => { addItem(product, quantity); setQuantity(1); }}><ShoppingCart size={14}/> Add to cart</button>
      </div>
    </div>
  </article>;
}
