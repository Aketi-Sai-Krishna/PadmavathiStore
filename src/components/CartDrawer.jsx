import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import QuantitySelector from "./QuantitySelector.jsx";

export default function CartDrawer({ open, onClose, onViewCart }) {
  const { items, setQuantity, removeItem, itemCount } = useCart();
  if (!open) return null;

  return (
    <div className="ps-drawer-backdrop" onClick={onClose}>
      <aside className="ps-cart-drawer" onClick={(event) => event.stopPropagation()}>
        <header>
          <h2><ShoppingCart size={19}/> Your cart ({itemCount})</h2>
          <button onClick={onClose} aria-label="Close cart"><X/></button>
        </header>
        {!items.length ? (
          <div className="ps-cart-empty">Your cart is empty. Explore the catalogue to add products.</div>
        ) : (
          <>
            <div className="ps-drawer-items">
              {items.map((item) => (
                <div className="ps-drawer-item" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{String(item.brand || "").toUpperCase()} · MRP {item.mrp == null ? "not provided" : `₹${item.mrp}`}</small>
                    <QuantitySelector value={item.quantity} onChange={(quantity) => setQuantity(item.id, quantity)}/>
                  </div>
                  <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title}`}><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <div className="ps-drawer-checkout-note">
              Add your delivery address before sending your order enquiry.
            </div>
            <button className="ps-view-cart" onClick={onViewCart}>Continue to checkout</button>
          </>
        )}
      </aside>
    </div>
  );
}
