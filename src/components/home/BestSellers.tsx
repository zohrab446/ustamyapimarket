import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

const BestSellers = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">En Çok Satan Ürünler</h2>
          <a href="/" className="text-sm font-semibold text-secondary hover:underline">Tümünü Gör →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
