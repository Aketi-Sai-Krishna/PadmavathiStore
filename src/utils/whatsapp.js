import { store } from "../data/store.js";

export function makeWhatsAppLink(message) {
  if (!/^\d{10,15}$/.test(store.whatsappNumber)) {
    window.alert("Please add the store's real WhatsApp number in src/data/store.js.");
    return null;
  }

  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
