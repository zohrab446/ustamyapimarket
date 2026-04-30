import { FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 container py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-secondary" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Kullanım Koşulları</h1>
      </div>
      <div className="max-w-3xl bg-card border border-border rounded-xl p-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Ustam Yapı Market web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
        </p>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Genel Kullanım</h3>
          <p>Site içeriği bilgilendirme ve satış amaçlıdır. Tüm ürün görselleri, açıklamaları ve
          fiyat bilgileri Ustam Yapı Market'e aittir. İzinsiz kullanılamaz.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Sipariş ve Ödeme</h3>
          <p>Verilen tüm siparişler, ödeme onayı sonrası işleme alınır. Stok ve fiyat değişiklik
          hakkımız saklıdır. Hatalı fiyat veya stok bilgisi durumunda sipariş iptal edilebilir.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Sorumluluk</h3>
          <p>Ürünlerin yanlış kullanımından doğacak hasar ve zararlardan firmamız sorumlu tutulamaz.
          Profesyonel ekipmanlar yalnızca yetkili kişilerce kullanılmalıdır.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Değişiklikler</h3>
          <p>Bu koşullar önceden haber verilmeksizin güncellenebilir. Güncel sürüm her zaman bu
          sayfada yayınlanır.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;