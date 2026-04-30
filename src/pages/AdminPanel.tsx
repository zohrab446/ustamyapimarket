import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Package, ShoppingCart, LogOut, ArrowLeft, Upload, Image, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  brand: string | null;
  image_url: string | null;
  badge: string | null;
  in_stock: boolean;
  category_id: string | null;
  description: string | null;
  created_at: string;
}

interface OrderRow {
  id: string;
  status: string;
  total: number;
  phone: string | null;
  payment_method: string | null;
  created_at: string;
}

interface BannerRow {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const AdminPanel = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders" | "banners">("products");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [banners, setBanners] = useState<BannerRow[]>([]);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    original_price: "",
    brand: "",
    image_url: "",
    badge: "",
    description: "",
    in_stock: true,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [loading, user, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchBanners();
    }
  }, [isAdmin]);

  const fetchBanners = async () => {
    const { data } = await supabase.from("banners").select("*").order("sort_order", { ascending: true });
    if (data) setBanners(data as BannerRow[]);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data as ProductRow[]);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data as OrderRow[]);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({ name: "", slug: "", price: "", original_price: "", brand: "", image_url: "", badge: "", description: "", in_stock: true });
    setImagePreview(null);
    setShowForm(true);
  };

  const openEditForm = (p: ProductRow) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      brand: p.brand || "",
      image_url: p.image_url || "",
      badge: p.badge || "",
      description: p.description || "",
      in_stock: p.in_stock,
    });
    setImagePreview(p.image_url || null);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      brand: formData.brand || null,
      image_url: formData.image_url || null,
      badge: formData.badge || null,
      description: formData.description || null,
      in_stock: formData.in_stock,
    };

    if (editingProduct) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Ürün güncellendi");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Ürün eklendi");
    }
    setShowForm(false);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Ürün silindi");
    fetchProducts();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Sipariş durumu güncellendi");
    fetchOrders();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Yükleniyor...</p></div>;

  const statusMap: Record<string, string> = {
    pending: "Beklemede",
    confirmed: "Onaylandı",
    shipped: "Kargoda",
    delivered: "Teslim Edildi",
    cancelled: "İptal",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm hover:text-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Siteye Dön
            </Link>
            <h1 className="font-display text-lg font-bold">Admin Panel</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-1 text-sm hover:text-secondary transition-colors">
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>
      </header>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("products")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${tab === "products" ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"}`}>
            <Package className="w-4 h-4" /> Ürünler ({products.length})
          </button>
          <button onClick={() => setTab("orders")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${tab === "orders" ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"}`}>
            <ShoppingCart className="w-4 h-4" /> Siparişler ({orders.length})
          </button>
          <button onClick={() => setTab("banners")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${tab === "banners" ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"}`}>
            <ImagePlus className="w-4 h-4" /> Banner ({banners.length})
          </button>
        </div>

        {/* Products tab */}
        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Ürün Yönetimi</h2>
              <button onClick={openAddForm} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" /> Ürün Ekle
              </button>
            </div>

            {showForm && (
              <div className="mb-6 p-6 bg-card border border-border rounded-xl">
                <h3 className="font-display font-bold text-foreground mb-4">
                  {editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                </h3>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Ürün Adı *</label>
                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
                    <input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" placeholder="otomatik oluşturulur" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Fiyat (₺) *</label>
                    <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Eski Fiyat (₺)</label>
                    <input type="number" step="0.01" value={formData.original_price} onChange={e => setFormData({ ...formData, original_price: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Marka</label>
                    <input value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Ürün Görseli</label>
                    <div className="flex items-start gap-4">
                      {(imagePreview || formData.image_url) && (
                        <div className="relative w-24 h-24 rounded-lg border border-border overflow-hidden bg-background flex-shrink-0">
                          <img src={imagePreview || formData.image_url} alt="Önizleme" className="w-full h-full object-contain p-1" />
                          <button
                            type="button"
                            onClick={() => { setFormData(prev => ({ ...prev, image_url: "" })); setImagePreview(null); }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                            aria-label="Fotoğrafı kaldır"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <label className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:border-secondary cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {uploading ? "Yükleniyor..." : "Fotoğraf Yükle"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              const ext = file.name.split(".").pop();
                              const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
                              const { data, error } = await supabase.storage
                                .from("product-images")
                                .upload(fileName, file);
                              if (error) {
                                toast.error("Yükleme hatası: " + error.message);
                                setUploading(false);
                                return;
                              }
                              const { data: urlData } = supabase.storage
                                .from("product-images")
                                .getPublicUrl(data.path);
                              setFormData(prev => ({ ...prev, image_url: urlData.publicUrl }));
                              setImagePreview(urlData.publicUrl);
                              toast.success("Fotoğraf yüklendi!");
                              setUploading(false);
                            }}
                          />
                        </label>
                        <p className="text-xs text-muted-foreground">veya URL girin:</p>
                        <input value={formData.image_url} onChange={e => { setFormData({ ...formData, image_url: e.target.value }); setImagePreview(e.target.value); }} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Etiket</label>
                    <input value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" placeholder="Çok Satan, İndirim, Yeni" />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" checked={formData.in_stock} onChange={e => setFormData({ ...formData, in_stock: e.target.checked })} id="in_stock" className="rounded" />
                    <label htmlFor="in_stock" className="text-sm text-foreground">Stokta Mevcut</label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Açıklama</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm resize-none" />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button type="submit" className="px-6 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                      {editingProduct ? "Güncelle" : "Ekle"}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors">
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto bg-card border border-border rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Ürün</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Marka</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Fiyat</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Stok</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded object-contain bg-background border border-border" />
                          ) : (
                            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                              <Image className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <span className="text-foreground font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                      <td className="px-4 py-3 text-right text-foreground font-semibold">{Number(p.price).toLocaleString("tr-TR")} ₺</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${p.in_stock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                          {p.in_stock ? "Stokta" : "Tükendi"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEditForm(p)} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Henüz ürün yok</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Sipariş Yönetimi</h2>
            <div className="overflow-x-auto bg-card border border-border rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Sipariş No</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Tarih</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Toplam</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Ödeme</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Durum</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 text-foreground font-mono text-xs">{o.id.slice(0, 8)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground">{Number(o.total).toLocaleString("tr-TR")} ₺</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.payment_method || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          o.status === "delivered" ? "bg-success/10 text-success" :
                          o.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                          o.status === "shipped" ? "bg-primary/10 text-primary" :
                          "bg-warning/10 text-warning"
                        }`}>
                          {statusMap[o.status] || o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <select
                          value={o.status}
                          onChange={e => updateOrderStatus(o.id, e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-input bg-background text-foreground"
                        >
                          {Object.entries(statusMap).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Henüz sipariş yok</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Banners tab */}
        {tab === "banners" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Banner Yönetimi</h2>
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                <Upload className="w-4 h-4" />
                {bannerUploading ? "Yükleniyor..." : "Banner Ekle"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={bannerUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setBannerUploading(true);
                    const ext = file.name.split(".").pop();
                    const fileName = `banner-${Date.now()}.${ext}`;
                    const { data, error } = await supabase.storage
                      .from("product-images")
                      .upload(fileName, file);
                    if (error) {
                      toast.error("Yükleme hatası: " + error.message);
                      setBannerUploading(false);
                      return;
                    }
                    const { data: urlData } = supabase.storage
                      .from("product-images")
                      .getPublicUrl(data.path);
                    const { error: insertError } = await supabase.from("banners").insert({
                      image_url: urlData.publicUrl,
                      sort_order: banners.length,
                    });
                    if (insertError) {
                      toast.error(insertError.message);
                    } else {
                      toast.success("Banner eklendi!");
                      fetchBanners();
                    }
                    setBannerUploading(false);
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((b) => (
                <div key={b.id} className="relative group rounded-xl overflow-hidden border border-border bg-card">
                  <img src={b.image_url} alt={b.title || "Banner"} className="w-full h-48 object-cover" />
                  <button
                    onClick={async () => {
                      if (!confirm("Bu banner'ı silmek istediğinize emin misiniz?")) return;
                      const { error } = await supabase.from("banners").delete().eq("id", b.id);
                      if (error) { toast.error(error.message); return; }
                      toast.success("Banner silindi");
                      fetchBanners();
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 shadow-lg"
                    aria-label="Banner sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="p-3 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${b.is_active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {b.is_active ? "Aktif" : "Pasif"}
                    </span>
                    <button
                      onClick={async () => {
                        const { error } = await supabase.from("banners").update({ is_active: !b.is_active }).eq("id", b.id);
                        if (error) { toast.error(error.message); return; }
                        fetchBanners();
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {b.is_active ? "Pasife Al" : "Aktife Al"}
                    </button>
                  </div>
                </div>
              ))}
              {banners.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Henüz banner eklenmedi. Yukarıdaki butona tıklayarak banner ekleyin.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
