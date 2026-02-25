import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { items, removeItem, updateQuantity, total, count, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto" />
            <h2 className="font-display text-2xl font-bold text-foreground">Sepetiniz Boş</h2>
            <p className="text-muted-foreground">Hemen ürün ekleyin!</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity">
              <ArrowLeft className="w-4 h-4" /> Alışverişe Başla
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = `Merhaba, sipariş vermek istiyorum:%0A${items.map(i => `- ${i.product.name} x${i.quantity} = ${(i.product.price * i.quantity).toLocaleString("tr-TR")} ₺`).join("%0A")}%0AToplam: ${total.toLocaleString("tr-TR")} ₺`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">
            Sepetim ({count} ürün)
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
                  <Link to={`/urun/${item.product.id}`} className="flex-shrink-0 w-20 h-20 bg-background rounded-lg overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-1" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/urun/${item.product.id}`} className="text-sm font-semibold text-foreground hover:text-secondary transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-foreground hover:bg-muted rounded-l-lg">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold text-foreground border-x border-border">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-foreground hover:bg-muted rounded-r-lg">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">
                          {(item.product.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-display font-bold text-foreground">Sipariş Özeti</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-foreground">
                    <span>Ara Toplam</span>
                    <span>{total.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <div className="flex justify-between text-success font-medium">
                    <span>Kargo</span>
                    <span>Ücretsiz</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-lg font-bold text-foreground">
                    <span>Toplam</span>
                    <span>{total.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>

                <Link to="/siparis" className="w-full flex items-center justify-center py-3 rounded-lg bg-gradient-cta text-secondary-foreground font-bold hover:opacity-90 transition-opacity">
                  Siparişi Tamamla
                </Link>

                <a
                  href={`https://wa.me/908508501234?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-success text-success-foreground font-bold hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp ile Sipariş Ver
                </a>

                <p className="text-xs text-center text-muted-foreground">
                  Kredi kartı, havale veya kapıda ödeme
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Cart;
