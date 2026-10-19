import { makeWhatsAppLink } from "../utils/whatsapp.js";

export default function WhatsAppButton({ message, children, className = "" }) {
  return (
    <button
      className={`btn btn-dark ${className}`}
      onClick={() => {
        const url = makeWhatsAppLink(message);
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }}
      type="button"
    >
      {children}
    </button>
  );
}
