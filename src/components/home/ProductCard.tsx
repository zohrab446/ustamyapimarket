import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} sepete eklendi`);
  };

  return (
    <Link
      to={`/urun/${product.id}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-product-hover transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-background overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${
            product.badge === "Çok Satan"
              ? "bg-secondary text-secondary-foreground"
              : product.badge === "İndirim"
              ? "bg-destructive text-destructive-foreground"
              : "bg-success text-success-foreground"
          }`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 px-2 py-1 rounded bg-destructive text-destructive-foreground text-xs font-bold">
            %{discount}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <p className="text-xs text-muted-foreground font-medium mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {product.originalPrice.toLocaleString("tr-TR")} ₺
              </p>
            )}
            <p className="text-lg font-bold text-foreground">
              {product.price.toLocaleString("tr-TR")} ₺
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
            aria-label="Sepete Ekle"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
