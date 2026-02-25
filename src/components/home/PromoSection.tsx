import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-xl overflow-hidden bg-gradient-hero p-8 flex flex-col justify-center min-h-[200px]">
            <span className="text-secondary font-bold text-sm mb-2">USTALARA ÖZEL</span>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
              Toplu Alımlarda %25'e Varan İndirim
            </h3>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Kurumsal hesap açın, özel fiyatlardan yararlanın.
            </p>
            <Link
              to="/"
              className="inline-flex items-center self-start px-5 py-2.5 rounded-lg bg-gradient-cta text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Hemen Başvur
            </Link>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-primary/5 border-2 border-secondary/20 p-8 flex flex-col justify-center min-h-[200px]">
            <span className="text-secondary font-bold text-sm mb-2">YENİ SEZON</span>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Bahçe Aletlerinde Bahar Kampanyası
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Bahçe bakım ürünlerinde seçili ürünlerde %30 indirim.
            </p>
            <Link
              to="/"
              className="inline-flex items-center self-start px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Kampanyayı Gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
