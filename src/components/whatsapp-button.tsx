import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919650501173";
const WHATSAPP_MESSAGE =
  "Hi Admission Path4u, I'd like to know more about college admissions.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline-block">
        Chat with us
      </span>
    </a>
  );
}
