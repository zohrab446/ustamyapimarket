import { Search, ShoppingCart, Menu, Phone, User, X, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/arama?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:05445318394" className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">0544 531 83 94</span>
            </a>
            <span className="hidden md:inline">Aynı Gün Kargo • Toptan Fiyat</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/siparis-takip" className="hover:text-secondary transition-colors">Sipariş Takip</Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-secondary transition-colors flex items-center gap-1">
                    <Settings className="w-3 h-3" /> Admin
                  </Link>
                )}
                <button onClick={signOut} className="hover:text-secondary transition-colors flex items-center gap-1">
                  <LogOut className="w-3 h-3" /> Çıkış
                </button>
              </>
            ) : (
              <Link to="/giris" className="hover:text-secondary transition-colors flex items-center gap-1">
                <User className="w-3 h-3" /> Giriş
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container flex items-center gap-4 py-3">
          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo.png" alt="Ustam Yapı Market" className="h-16 sm:h-[175.5px] w-auto" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 hidden sm:flex">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün, marka veya kategori ara..."
                className="w-full h-11 pl-4 pr-12 rounded-lg border-2 border-muted bg-background text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-9 w-10 flex items-center justify-center bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/sepet"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Sepet</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full h-10 pl-4 pr-10 rounded-lg border-2 border-muted bg-background text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
              />
              <button type="submit" className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center bg-secondary text-secondary-foreground rounded-md">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Category nav */}
        <nav className="hidden md:block border-t border-border">
          <div className="container flex items-center gap-1 py-1">
            {[
              { name: "Elektrikli Aletler", slug: "elektrikli-aletler" },
              { name: "Matkap", slug: "matkap" },
              { name: "Vida & Civata", slug: "vida-civata" },
              { name: "Boya & İnşaat", slug: "boya-insaat" },
              { name: "Tesisat", slug: "tesisat" },
              { name: "Bahçe", slug: "bahce" },
              { name: "Kampanyalar", slug: "kampanyalar" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/kategori/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-secondary hover:bg-muted rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-card border-b border-border animate-slide-in-right">
          <div className="p-4 space-y-2">
            {[
              { name: "Elektrikli Aletler", slug: "elektrikli-aletler" },
              { name: "Matkap", slug: "matkap" },
              { name: "Vida & Civata", slug: "vida-civata" },
              { name: "Boya & İnşaat", slug: "boya-insaat" },
              { name: "Tesisat", slug: "tesisat" },
              { name: "Bahçe", slug: "bahce" },
              { name: "Kampanyalar", slug: "kampanyalar" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/kategori/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-secondary hover:bg-muted rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
