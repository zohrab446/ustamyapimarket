import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Banner {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
}

const HeroBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) {
        setBanners(data);
      }
    };
    fetchBanners();
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % Math.max(banners.length, 1));
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + Math.max(banners.length, 1)) % Math.max(banners.length, 1));
  }, [banners.length]);

  // Auto-slide
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [banners.length, next]);

  const bgImage = banners.length > 0 ? banners[current]?.image_url : "/images/hero-banner.jpg";

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 transition-all duration-700">
        <img
          key={bgImage}
          src={bgImage}
          alt="Profesyonel hırdavat ve yapı market ürünleri"
          className="w-full h-full object-cover opacity-30 transition-opacity duration-700"
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

        {/* Carousel controls */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-secondary" : "bg-primary-foreground/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
