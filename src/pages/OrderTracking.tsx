import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Search, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Order {
  id: string;
  status: string;
  total: number;
  phone: string | null;
  payment_method: string | null;
  shipping_address: string | null;
  created_at: string;
}

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "Beklemede", icon: <Clock className="w-5 h-5" />, color: "text-warning" },
  confirmed: { label: "Onaylandı", icon: <Package className="w-5 h-5" />, color: "text-primary" },
  shipped: { label: "Kargoda", icon: <Truck className="w-5 h-5" />, color: "text-secondary" },
  delivered: { label: "Teslim Edildi", icon: <CheckCircle className="w-5 h-5" />, color: "text-success" },
  cancelled: { label: "İptal Edildi", icon: <XCircle className="w-5 h-5" />, color: "text-destructive" },
};

const OrderTracking = () => {
  const { user } = useAuth();
  const [orderNo, setOrderNo] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loadedUserOrders, setLoadedUserOrders] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNo.trim()) return;
    setSearching(true);
    setSearchError("");
    setSearchedOrder(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderNo.trim())
      .maybeSingle();

    if (error || !data) {
      setSearchError("Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.");
    } else {
      setSearchedOrder(data as Order);
    }
    setSearching(false);
  };

  const loadUserOrders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setUserOrders(data as Order[]);
    setLoadedUserOrders(true);
  };

  if (user && !loadedUserOrders) {
    loadUserOrders();
  }

  const renderOrder = (order: Order) => {
    const status = statusMap[order.status] || statusMap.pending;
    return (
      <div key={order.id} className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Sipariş No</p>
            <p className="font-mono text-sm text-foreground">{order.id.slice(0, 8)}...</p>
          </div>
          <div className={`flex items-center gap-2 ${status.color}`}>
            {status.icon}
            <span className="font-semibold text-sm">{status.label}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Tarih</p>
            <p className="text-foreground">{new Date(order.created_at).toLocaleDateString("tr-TR")}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Toplam</p>
            <p className="text-foreground font-semibold">{Number(order.total).toLocaleString("tr-TR")} ₺</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Ödeme</p>
            <p className="text-foreground">{order.payment_method || "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Adres</p>
            <p className="text-foreground truncate">{order.shipping_address || "-"}</p>
          </div>
        </div>
        {/* Status timeline */}
        <div className="mt-4 flex items-center gap-1">
          {["pending", "confirmed", "shipped", "delivered"].map((s, i) => {
            const steps = ["pending", "confirmed", "shipped", "delivered"];
            const currentIdx = steps.indexOf(order.status);
            const isActive = i <= currentIdx && order.status !== "cancelled";
            return (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-3 h-3 rounded-full ${isActive ? "bg-secondary" : "bg-muted"}`} />
                {i < 3 && <div className={`flex-1 h-0.5 ${isActive && i < currentIdx ? "bg-secondary" : "bg-muted"}`} />}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>Beklemede</span>
          <span>Onaylandı</span>
          <span>Kargoda</span>
          <span>Teslim</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">Sipariş Takip</h1>

        {/* Search by order number */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-3">Sipariş Numarası ile Sorgula</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              placeholder="Sipariş numaranızı girin..."
              className="flex-1 h-11 px-4 rounded-lg border-2 border-muted bg-background text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-5 h-11 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {searching ? "Aranıyor..." : "Sorgula"}
            </button>
          </form>
          {searchError && <p className="mt-3 text-sm text-destructive">{searchError}</p>}
          {searchedOrder && <div className="mt-4">{renderOrder(searchedOrder)}</div>}
        </div>

        {/* User's orders */}
        {user ? (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Siparişlerim</h2>
            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map(renderOrder)}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
                Henüz siparişiniz bulunmuyor.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground mb-2">Tüm siparişlerinizi görmek için giriş yapın.</p>
            <a href="/giris" className="text-secondary font-semibold hover:underline">Giriş Yap</a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
