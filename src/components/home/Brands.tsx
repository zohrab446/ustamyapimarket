import { brands } from "@/lib/data";

const Brands = () => {
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Markalar</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center h-16 rounded-lg border border-border bg-background hover:border-secondary hover:shadow-product-hover transition-all duration-200 cursor-pointer"
            >
              <span className="font-display text-sm sm:text-base font-bold text-muted-foreground hover:text-secondary transition-colors">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
