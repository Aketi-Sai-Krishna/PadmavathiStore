import { createContext, useContext, useEffect, useMemo, useState } from "react";
const CartContext = createContext(null);
const KEY = "padmavathi-wholesale-cart";
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const addItem = (product, quantity = 1) => setItems((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing
      ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current, { ...product, quantity }];
  });
  const setQuantity = (id, quantity) => setItems((current) => quantity < 1
    ? current.filter((item) => item.id !== id)
    : current.map((item) => item.id === id ? { ...item, quantity } : item));
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const mrpTotal = items.length && items.every((item) => item.mrp != null && Number.isFinite(Number(item.mrp)))
    ? items.reduce((sum, item) => sum + Number(item.mrp) * item.quantity, 0)
    : null;
  const value = useMemo(() => ({ items, addItem, setQuantity, removeItem, clearCart, itemCount, mrpTotal }), [items, itemCount, mrpTotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
