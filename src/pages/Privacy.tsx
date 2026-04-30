import { Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 container py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-secondary" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Gizlilik Politikası</h1>
      </div>
      <div className="max-w-3xl bg-card border border-border rounded-xl p-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Ustam Yapı Market olarak kişisel verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz.
          Bu politika, sitemizi kullanırken topladığımız bilgilerin nasıl işlendiğini açıklar.
        </p>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Toplanan Bilgiler</h3>
          <p>Ad, soyad, telefon, e-posta, teslimat adresi ve sipariş bilgileri yalnızca siparişinizi
          işleme almak ve sizinle iletişim kurmak amacıyla toplanır.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Bilgilerin Kullanımı</h3>
          <p>Verileriniz üçüncü şahıslarla paylaşılmaz; yalnızca kargo firması ve yasal yükümlülükler
          gereği yetkili makamlarla paylaşılabilir.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Çerezler</h3>
          <p>Site deneyiminizi iyileştirmek için çerezler kullanıyoruz. Tarayıcı ayarlarınızdan çerezleri
          devre dışı bırakabilirsiniz.</p>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">İletişim</h3>
          <p>Verileriniz hakkında her türlü talebiniz için <a href="mailto:muhamethulusi646@gmail.com" className="text-secondary hover:underline">muhamethulusi646@gmail.com</a> adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;