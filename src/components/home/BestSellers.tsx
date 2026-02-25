import { useProducts } from "@/hooks/useProducts";
import ProductCardDb from "./ProductCardDb";

const BestSellers = () => {
  const { products, loading } = useProducts();

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">En Çok Satan Ürünler</h2>
          <a href="/" className="text-sm font-semibold text-secondary hover:underline">Tümünü Gör →</a>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCardDb key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
