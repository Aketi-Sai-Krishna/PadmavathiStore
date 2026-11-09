import { Minus, Plus } from "lucide-react";
export default function QuantitySelector({ value, onChange }) {
  return <div className="ps-quantity">
    <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}><Minus size={14}/></button>
    <span>{value}</span>
    <button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)}><Plus size={14}/></button>
  </div>;
}
