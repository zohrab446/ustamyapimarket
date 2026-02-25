import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/908508501234?text=Merhaba,%20ürünler%20hakkında%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-success text-success-foreground font-semibold shadow-lg hover:scale-105 transition-transform"
      aria-label="WhatsApp ile iletişim"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">WhatsApp Destek</span>
    </a>
  );
};

export default WhatsAppButton;
