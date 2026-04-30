import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCardDb from "@/components/home/ProductCardDb";
import type { DbProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Search } from "lucide-react";

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      if (!q.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const term = `%${q}%`;
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .or(`name.ilike.${term},brand.ilike.${term},description.ilike.${term}`)
        .order("created_at", { ascending: false });
      setProducts((data as DbProduct[]) || []);
      setLoading(false);
    };
    run();
  }, [q]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-secondary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Arama</span>
          </nav>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Search className="w-6 h-6 text-secondary" /> Arama Sonuçları
          </h1>
          <p className="text-muted-foreground mb-6">
            "{q}" için {products.length} sonuç bulundu.
          </p>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Aramanızla eşleşen ürün bulunamadı.</p>
              <Link to="/" className="inline-block mt-4 text-secondary hover:underline font-medium">
                Ana Sayfaya Dön
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCardDb key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;