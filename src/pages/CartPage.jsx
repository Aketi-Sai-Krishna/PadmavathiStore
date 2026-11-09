import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, MessageCircle, Trash2, ShieldCheck } from "lucide-react";
import Header from "../components/Header.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { useCart } from "../context/CartContext.jsx";
import { makeWhatsAppLink } from "../utils/whatsapp.js";

const initialAddress = {
  name: "",
  mobile: "",
  shopName: "",
  address: "",
  town: "",
  pinCode: "",
  landmark: "",
  instructions: "",
};

export default function CartPage() {
  const { items, setQuantity, removeItem, mrpTotal, clearCart, itemCount } = useCart();
  const [address, setAddress] = useState(initialAddress);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [touched, setTouched] = useState({});
  const markTouched = (field) => () => setTouched((current) => ({ ...current, [field]: true }));

  const errors = useMemo(() => ({
    name: !address.name.trim(),
    mobile: !/^[6-9]\d{9}$/.test(address.mobile.trim()),
    address: !address.address.trim(),
    town: !address.town.trim(),
    pinCode: !/^\d{6}$/.test(address.pinCode.trim()),
  }), [address]);

  const isAddressValid = !Object.values(errors).some(Boolean);
  const updateAddress = (field) => (event) => {
    const value = field === "mobile" || field === "pinCode"
      ? event.target.value.replace(/\D/g, "").slice(0, field === "mobile" ? 10 : 6)
      : event.target.value;
    setAddress((current) => ({ ...current, [field]: value }));
  };

  const send = () => {
    setAttemptedSubmit(true);
    if (!items.length || !isAddressValid) return;

    const productLines = items.map((product, index) => [
      `${index + 1}. ${product.title}`,
      `   Brand: ${String(product.brand || "Not specified").toUpperCase()}`,
      `   Quantity: ${product.quantity}`,
      `   MRP: ${product.mrp == null ? "Not provided" : `₹${product.mrp}`}`,
      product.packSize ? `   Pack size: ${product.packSize}` : "",
    ].filter(Boolean).join("\n")).join("\n\n");

    const message = [
      "Hello Padmavathi Stores!",
      "I would like to place an order enquiry.",
      "",
      "CUSTOMER DETAILS",
      `Name: ${address.name.trim()}`,
      `Mobile: ${address.mobile}`,
      address.shopName.trim() ? `Shop / Business: ${address.shopName.trim()}` : "",
      "",
      "DELIVERY ADDRESS",
      address.address.trim(),
      `Town / Village: ${address.town.trim()}`,
      `PIN Code: ${address.pinCode}`,
      address.landmark.trim() ? `Landmark: ${address.landmark.trim()}` : "",
      address.instructions.trim() ? `Delivery instructions: ${address.instructions.trim()}` : "",
      "",
      "ORDER DETAILS",
      productLines,
      "",
      `Total product types: ${items.length}`,
      `Total units: ${itemCount}`,
      `Estimated MRP subtotal: ${mrpTotal == null ? "To be confirmed" : `₹${mrpTotal.toFixed(2)}`}`,
      "",
      "Please confirm product availability, wholesale prices, delivery charges and expected delivery time.",
      "Thank you!",
    ].filter((line) => line !== null).join("\n");

    const url = makeWhatsAppLink(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldError = (field) => (attemptedSubmit || touched[field]) && errors[field];
  const fieldClass = (field) => `checkout-input${fieldError(field) ? " has-error" : ""}`;

  return <>
    <Header />
    <main className="catalogue-page">
      <div className="container ps-cart-page">
        <a className="catalogue-back" href="/catalogue"><ArrowLeft size={16}/> Continue shopping</a>
        <h1>Your shopping cart</h1>
        {!items.length ? (
          <div className="catalogue-empty">
            <h3>Your cart is empty</h3>
            <p>Browse products and add them to your enquiry.</p>
            <a className="btn btn-dark" href="/catalogue">Explore catalogue</a>
          </div>
        ) : (
          <div className="ps-cart-layout">
            <section className="ps-cart-list">
              {items.map((item) => (
                <article className="ps-cart-row" key={item.id}>
                  <div className="ps-cart-thumb">
                    {(item.image || item.imageUrl) ? <img src={item.image || item.imageUrl} alt={item.title}/> : "PS"}
                  </div>
                  <div className="ps-cart-description">
                    <strong>{item.title}</strong>
                    <small>{String(item.brand || "").toUpperCase()} · MRP {item.mrp == null ? "not provided" : `₹${item.mrp}`}</small>
                    <QuantitySelector value={item.quantity} onChange={(quantity) => setQuantity(item.id, quantity)}/>
                  </div>
                  <button className="ps-remove-item" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title}`}><Trash2 size={17}/></button>
                </article>
              ))}
            </section>

            <aside className="ps-cart-summary ps-checkout-summary">
              <h2>Order summary</h2>
              <p>{items.length} product types · {itemCount} total units</p>
              <div className="ps-cart-total-line">
                <span>Estimated MRP subtotal</span>
                <strong>{mrpTotal == null ? "To be confirmed" : `₹${mrpTotal.toFixed(2)}`}</strong>
              </div>
              <small className="ps-summary-note">Final stock, wholesale price and delivery details will be confirmed by the store.</small>

              <section className="ps-address-form" aria-labelledby="delivery-details-heading">
                <div className="ps-address-heading">
                  <span className="ps-address-icon"><MapPin size={18}/></span>
                  <div>
                    <h3 id="delivery-details-heading">Delivery details</h3>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-name">Customer name <span>*</span></label>
                  <input id="checkout-name" className={fieldClass("name")} value={address.name} onChange={updateAddress("name")} onBlur={markTouched("name")} placeholder="Enter your full name" autoComplete="name"/>
                  {fieldError("name") && <small className="ps-field-error">Please enter your name.</small>}
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-mobile">Mobile number <span>*</span></label>
                  <div className={`ps-mobile-input${fieldError("mobile") ? " has-error" : ""}`}>
                    <span>+91</span>
                    <input id="checkout-mobile" inputMode="numeric" type="tel" value={address.mobile} onChange={updateAddress("mobile")} onBlur={markTouched("mobile")} placeholder="10-digit mobile number" autoComplete="tel-national" maxLength={10}/>
                  </div>
                  {fieldError("mobile") && <small className="ps-field-error">Enter a valid 10-digit Indian mobile number.</small>}
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-shop">Shop / Business name <small>(optional)</small></label>
                  <input id="checkout-shop" value={address.shopName} onChange={updateAddress("shopName")} placeholder="Your shop or business name" autoComplete="organization"/>
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-address">House number, street and address <span>*</span></label>
                  <textarea id="checkout-address" className={fieldClass("address")} rows={3} value={address.address} onChange={updateAddress("address")} onBlur={markTouched("address")} placeholder="Enter your complete delivery address" autoComplete="street-address"/>
                  {fieldError("address") && <small className="ps-field-error">Please enter your delivery address.</small>}
                </div>

                <div className="ps-form-grid">
                  <div className="ps-form-field">
                    <label htmlFor="checkout-town">Village / Town <span>*</span></label>
                    <input id="checkout-town" className={fieldClass("town")} value={address.town} onChange={updateAddress("town")} onBlur={markTouched("town")} placeholder="Town or village" autoComplete="address-level2"/>
                    {fieldError("town") && <small className="ps-field-error">Required.</small>}
                  </div>
                  <div className="ps-form-field">
                    <label htmlFor="checkout-pin">PIN code <span>*</span></label>
                    <input id="checkout-pin" className={fieldClass("pinCode")} inputMode="numeric" value={address.pinCode} onChange={updateAddress("pinCode")} onBlur={markTouched("pinCode")} placeholder="6-digit PIN" maxLength={6} autoComplete="postal-code"/>
                    {fieldError("pinCode") && <small className="ps-field-error">Enter a valid 6-digit PIN.</small>}
                  </div>
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-landmark">Landmark <small>(optional)</small></label>
                  <input id="checkout-landmark" value={address.landmark} onChange={updateAddress("landmark")} placeholder="Nearby landmark"/>
                </div>

                <div className="ps-form-field">
                  <label htmlFor="checkout-instructions">Delivery instructions <small>(optional)</small></label>
                  <textarea id="checkout-instructions" rows={2} value={address.instructions} onChange={updateAddress("instructions")} placeholder="Any additional delivery instructions"/>
                </div>
              </section>

              <button className="ps-whatsapp-order ps-checkout-submit" onClick={send} disabled={!isAddressValid || !items.length}>
                <MessageCircle size={17}/> Send order on WhatsApp
              </button>
              <p className="ps-checkout-hint">
                <ShieldCheck size={14}/>
                {isAddressValid ? "Your delivery details are ready. WhatsApp will open with your order." : "Complete all required delivery details to enable WhatsApp."}
              </p>
              <button className="ps-clear-cart" onClick={clearCart}>Clear cart</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  </>;
}
