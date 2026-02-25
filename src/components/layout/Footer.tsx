import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/images/logo.png" alt="Ustam Yapı Market" className="h-14 w-auto" />
              <h3 className="font-display text-2xl font-bold uppercase">
                <span className="text-secondary">Ustam</span>{" "}
                <span className="text-primary-foreground">Yapı Market</span>
              </h3>
            </div>
            <p className="text-sm opacity-80 mb-4">
            Ustam Yapı Market - Türkiye'nin en güvenilir hırdavat ve yapı market e-ticaret platformu.
              Profesyoneller ve ustalar için toptan ve perakende satış.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Phone className="w-4 h-4 text-secondary" />
              <span>0538 546 65 62</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80 mt-1">
              <Mail className="w-4 h-4 text-secondary" />
              <span>muhamnethulusi646@gmail.com</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {["Elektrikli Aletler", "Matkap & Vidalama", "Vida & Civata", "Boya & İnşaat", "Tesisat", "Bahçe Ürünleri"].map(c => (
                <li key={c}><Link to="/" className="hover:text-secondary transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {["Hakkımızda", "İletişim", "Bayi Girişi", "Toplu Sipariş", "Teklif Al", "Kariyer"].map(c => (
                <li key={c}><Link to="/" className="hover:text-secondary transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Yardım</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {["Sipariş Takip", "İade & Değişim", "Kargo Bilgisi", "SSS", "Gizlilik Politikası", "Kullanım Koşulları"].map(c => (
                <li key={c}><Link to="/" className="hover:text-secondary transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
          © 2026 Ustam Yapı Market. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
