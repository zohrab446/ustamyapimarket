import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories: { name: string; slug: string }[] = [
    { name: "Elektrikli Aletler", slug: "elektrikli-aletler" },
    { name: "Matkap & Vidalama", slug: "matkap" },
    { name: "Vida & Civata", slug: "vida-civata" },
    { name: "Boya & İnşaat", slug: "boya-insaat" },
    { name: "Tesisat", slug: "tesisat" },
    { name: "Bahçe Ürünleri", slug: "bahce" },
  ];

  const corporate: { name: string; to: string }[] = [
    { name: "Hakkımızda", to: "/iletisim" },
    { name: "İletişim", to: "/iletisim" },
    { name: "Bayi Girişi", to: "/giris" },
    { name: "Toplu Sipariş", to: "/iletisim" },
    { name: "Teklif Al", to: "/iletisim" },
    { name: "Kariyer", to: "/iletisim" },
  ];

  const help: { name: string; to: string }[] = [
    { name: "Sipariş Takip", to: "/siparis-takip" },
    { name: "İade & Değişim", to: "/iletisim" },
    { name: "Kargo Bilgisi", to: "/iletisim" },
    { name: "SSS", to: "/iletisim" },
    { name: "Gizlilik Politikası", to: "/iletisim" },
    { name: "Kullanım Koşulları", to: "/iletisim" },
  ];

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
              <span>muhamethulusi646@gmail.com</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {categories.map(c => (
                <li key={c.slug}><Link to={`/kategori/${c.slug}`} className="hover:text-secondary transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {corporate.map(c => (
                <li key={c.name}><Link to={c.to} className="hover:text-secondary transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Yardım</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {help.map(c => (
                <li key={c.name}><Link to={c.to} className="hover:text-secondary transition-colors">{c.name}</Link></li>
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
