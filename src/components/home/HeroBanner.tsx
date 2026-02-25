import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img
          src="/images/hero-banner.jpg"
          alt="Profesyonel hırdavat ve yapı market ürünleri"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>
      <div className="container relative py-12 md:py-20 lg:py-28">
        <div className="max-w-xl space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
            🔧 Ustalara Özel İndirimler
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            Profesyonel Aletler,{" "}
            <span className="text-secondary">Toptan Fiyatlarla</span>
          </h2>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-md">
            Binlerce ürün, aynı gün kargo ve güvenli ödeme seçenekleri ile
            Ustam Yapı Market'te toptan fiyatlarla alışveriş yapın.
          </p>
          <img
            src="/images/hero-banner.jpg"
            alt="Profesyonel hırdavat ve yapı market ürünleri"
            className="hidden"
          />
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-cta text-secondary-foreground font-bold text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              Ürünleri İncele <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-colors"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
