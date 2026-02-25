import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCardDb from "@/components/home/ProductCardDb";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading } = useProduct(id || "");
  const { products: allProducts } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Ürün Bulunamadı</h2>
            <Link to="/" className="text-secondary hover:underline">Ana Sayfaya Dön</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const similarProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price ?? undefined,
      image: product.image_url || "/placeholder.svg",
      category: "",
      brand: product.brand || "",
      rating: product.rating,
      reviewCount: product.review_count,
      inStock: product.in_stock,
    };
    for (let i = 0; i < quantity; i++) addItem(cartProduct);
    toast.success(`${quantity} adet ${product.name} sepete eklendi`);
  };

  const specs = product.specs as Record<string, string> | null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-secondary transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center">
              <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-full max-w-md object-contain" />
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.review_count} değerlendirme)</span>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{Number(product.price).toLocaleString("tr-TR")} ₺</span>
                  {product.original_price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">{Number(product.original_price).toLocaleString("tr-TR")} ₺</span>
                      <span className="px-2 py-0.5 rounded bg-destructive text-destructive-foreground text-xs font-bold">%{discount}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">KDV Dahil</p>
              </div>

              {product.in_stock && <p className="text-sm font-medium text-success">✓ Stokta Mevcut</p>}
              {product.description && <p className="text-sm text-foreground leading-relaxed">{product.description}</p>}

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-foreground hover:bg-muted transition-colors rounded-l-lg">-</button>
                  <span className="px-4 py-2 text-sm font-semibold text-foreground border-x border-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-foreground hover:bg-muted transition-colors rounded-r-lg">+</button>
                </div>
                <button onClick={handleAddToCart} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity">
                  <ShoppingCart className="w-5 h-5" /> Sepete Ekle
                </button>
                <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                  Hemen Al
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4 text-secondary" /> Aynı gün kargo
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-secondary" /> Güvenli ödeme
                </div>
              </div>
            </div>
          </div>

          {specs && Object.keys(specs).length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Teknik Özellikler</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {Object.entries(specs).map(([key, value], idx) => (
                  <div key={key} className={`flex ${idx % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <div className="w-1/3 px-4 py-3 text-sm font-medium text-muted-foreground">{key}</div>
                    <div className="w-2/3 px-4 py-3 text-sm text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similarProducts.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Benzer Ürünler</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarProducts.map(p => <ProductCardDb key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
