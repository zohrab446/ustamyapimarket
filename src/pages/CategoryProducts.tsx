import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCardDb from "@/components/home/ProductCardDb";
import type { DbProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const categoryMap: Record<string, string> = {
  "elektrikli-aletler": "Elektrikli Aletler",
  "matkap": "Matkap",
  "vida-civata": "Vida & Civata",
  "boya-insaat": "Boya & İnşaat",
  "tesisat": "Tesisat",
  "bahce": "Bahçe",
  "kampanyalar": "Kampanyalar",
};

const CategoryProducts = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryName = slug ? categoryMap[slug] || slug : "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // First try to find category by slug in DB
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug || "")
        .maybeSingle();

      let query = supabase.from("products").select("*").order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category_id", category.id);
      }

      const { data } = await query;
      setProducts((data as DbProduct[]) || []);
      setLoading(false);
    };

    if (slug) fetchProducts();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-secondary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{categoryName}</span>
          </nav>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
            {categoryName}
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Bu kategoride henüz ürün bulunmamaktadır.</p>
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

export default CategoryProducts;
