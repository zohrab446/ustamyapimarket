import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Aynı Gün Kargo", desc: "14:00'a kadar verilen siparişler" },
  { icon: ShieldCheck, title: "Güvenli Ödeme", desc: "256-bit SSL şifreleme" },
  { icon: CreditCard, title: "Toptan Fiyat", desc: "Tüm ürünlerde uygun fiyat" },
  { icon: Headphones, title: "7/24 Destek", desc: "WhatsApp & telefon desteği" },
];

const TrustBadges = () => {
  return (
    <section className="bg-card border-b border-border">
      <div className="container py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
