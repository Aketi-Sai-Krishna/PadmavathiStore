import { useState } from "react";
import { ArrowLeft, CheckCircle2, MessageCircle, Package, ShoppingCart } from "lucide-react";
import Header from "../components/Header.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import { catalogueBrands } from "../data/brands.js";
import { useCart } from "../context/CartContext.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { makeWhatsAppLink } from "../utils/whatsapp.js";
export default function ProductDetails({ productId }) {
  const product = products.find((item) => item.id === productId);
  const [quantity,setQuantity]=useState(1);
  const {addItem}=useCart();
  if (!product) return <><Header/><main className="catalogue-page"><div className="container catalogue-empty"><h1>Product not found</h1><a className="btn btn-dark" href="/catalogue">Browse catalogue</a></div></main></>;
  const category=categories.find((item)=>item.slug===product.category);
  const brand=catalogueBrands.find((item)=>item.id===product.brand);
  const image=product.image||category?.image;
  const message=[`Hello Padmavathi Stores! I am interested in ${product.title}.`,`Brand: ${brand?.name||product.brand}`,`Category: ${category?.title||product.category}`,`Quantity: ${quantity}`,`MRP: ${product.mrp==null?"Not provided":`₹${product.mrp}`}`,"Please confirm current availability and wholesale price."].join("\n");
  const enquire=()=>{const url=makeWhatsAppLink(message);if(url)window.open(url,"_blank","noopener,noreferrer");};
  return <><Header/><main className="catalogue-page product-detail-page"><div className="container">
    <a className="catalogue-back" href={`/category/${product.category}`}><ArrowLeft size={16}/> Back to {category?.title||"products"}</a>
    <div className="product-detail-layout"><div className="product-detail-image">{image?<img src={image} alt={product.title}/>:<div className="product-image-placeholder"><span>PS</span></div>}</div>
      <div className="product-detail-copy"><span className="eyebrow">{brand?.name||product.brand}</span><h1>{product.title}</h1><p className="product-detail-description">{product.description}</p>
        <div className="product-detail-price">{product.mrp!=null?`MRP ₹${product.mrp}`:"MRP not provided"}{product.mrp!=null&&<small>Wholesale pricing may differ and will be confirmed by the store.</small>}</div>
        {product.flavours?.length>0&&<div className="product-detail-block"><h3>Flavours / variants</h3><div className="product-flavours">{product.flavours.map((f)=><span key={f}>{f}</span>)}</div></div>}
        <div className="product-detail-facts"><div><Package size={17}/><span><small>Category</small><strong>{category?.title||product.category}</strong></span></div><div><CheckCircle2 size={17}/><span><small>Catalogue status</small><strong>{product.availability==="available"?"Available":"Confirm availability"}</strong></span></div>{product.packSize&&<div><Package size={17}/><span><small>Pack size</small><strong>{product.packSize}</strong></span></div>}</div>
        <div className="ps-detail-quantity"><strong>Quantity</strong><QuantitySelector value={quantity} onChange={setQuantity}/></div>
        <div className="ps-detail-actions"><button className="ps-add-cart" onClick={()=>addItem(product,quantity)}><ShoppingCart size={16}/> Add to cart</button><button className="ps-whatsapp-order" onClick={enquire}><MessageCircle size={16}/> Enquire on WhatsApp</button></div>
        <p className="product-detail-note">Please contact us to confirm stock, pack quantity and wholesale pricing.</p>
      </div>
    </div>
  </div></main></>;
}
