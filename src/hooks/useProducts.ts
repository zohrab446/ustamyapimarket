import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category_id: string | null;
  brand: string | null;
  badge: string | null;
  in_stock: boolean;
  description: string | null;
  specs: Record<string, string> | null;
  rating: number;
  review_count: number;
}

export function useProducts() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });
      if (data) setProducts(data as DbProduct[]);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return { products, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (data) setProduct(data as DbProduct);
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  return { product, loading };
}
