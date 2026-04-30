import { Truck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Shipping = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 container py-8">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-8 h-8 text-secondary" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Kargo Bilgisi</h1>
      </div>
      <div className="max-w-3xl bg-card border border-border rounded-xl p-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Türkiye'nin her noktasına anlaşmalı kargo firmalarımızla hızlı ve güvenli teslimat yapıyoruz.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Aynı gün kargo:</strong> 14:00'a kadar verilen siparişler aynı gün kargoya teslim edilir.</li>
          <li><strong className="text-foreground">Teslim süresi:</strong> Şehir içi 1, şehir dışı 1-3 iş günü.</li>
          <li><strong className="text-foreground">Ücretsiz kargo:</strong> 1.500 TL ve üzeri siparişlerde kargo ücretsizdir.</li>
          <li><strong className="text-foreground">Toplu siparişler:</strong> Palet ve hacimli ürünler için özel nakliye organize edilir.</li>
        </ul>
        <p>
          Kargo durumunuzu <a href="/siparis-takip" className="text-secondary hover:underline">Sipariş Takip</a> sayfasından
          öğrenebilirsiniz.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Shipping;