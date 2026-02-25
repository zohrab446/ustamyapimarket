import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Building2, Truck, MessageCircle, CheckCircle } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı").max(100),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin").max(15),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(255),
  city: z.string().trim().min(2, "Şehir seçin").max(50),
  district: z.string().trim().min(2, "İlçe girin").max(50),
  address: z.string().trim().min(10, "Adres en az 10 karakter olmalı").max(500),
  billingAddress: z.string().max(500).optional(),
  companyName: z.string().max(100).optional(),
  taxNumber: z.string().max(20).optional(),
  notes: z.string().max(500).optional(),
});

type PaymentMethod = "credit_card" | "bank_transfer" | "cash_on_delivery";

const Checkout = () => {
  const { items, total, count, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderSummary, setOrderSummary] = useState("");
  const [isCorporate, setIsCorporate] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: user?.email || "",
    city: "",
    district: "",
    address: "",
    billingAddress: "",
    companyName: "",
    taxNumber: "",
    notes: "",
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (items.length === 0 && !success) {
    navigate("/sepet");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Lütfen formu eksiksiz doldurun");
      return;
    }

    if (!user) {
      toast.error("Sipariş vermek için giriş yapmalısınız");
      navigate("/giris");
      return;
    }

    setSubmitting(true);

    const shippingAddress = `${form.address}, ${form.district}, ${form.city}`;
    const billingAddr = sameBilling ? shippingAddress : form.billingAddress;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: "pending",
        total,
        shipping_address: shippingAddress,
        billing_address: billingAddr,
        phone: form.phone,
        notes: form.notes || null,
        payment_method: paymentMethod,
      })
      .select("id")
      .single();

    if (orderError) {
      toast.error("Sipariş oluşturulamadı: " + orderError.message);
      setSubmitting(false);
      return;
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      unit_price: item.product.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      toast.error("Sipariş kalemleri kaydedilemedi: " + itemsError.message);
      setSubmitting(false);
      return;
    }

    // Build WhatsApp message before clearing cart
    const itemLines = items.map(i => `• ${i.product.name} x${i.quantity} = ${(i.product.price * i.quantity).toLocaleString("tr-TR")} ₺`).join("\n");
    const paymentLabels: Record<string, string> = { credit_card: "Kredi Kartı", bank_transfer: "Havale/EFT", cash_on_delivery: "Kapıda Ödeme" };
    const summary = `🛒 Yeni Sipariş #${order.id.slice(0, 8)}\n\n` +
      `👤 ${form.fullName}\n📞 ${form.phone}\n📧 ${form.email}\n` +
      `📍 ${form.address}, ${form.district}, ${form.city}\n\n` +
      `📦 Ürünler:\n${itemLines}\n\n` +
      `💳 Ödeme: ${paymentLabels[paymentMethod]}\n` +
      `💰 Toplam: ${finalTotal.toLocaleString("tr-TR")} ₺`;

    setOrderSummary(summary);
    setOrderId(order.id);
    setSuccess(true);
    clear();
    toast.success("Siparişiniz başarıyla oluşturuldu!");
    setSubmitting(false);

    // Auto-open WhatsApp with order details
    const waUrl = `https://wa.me/908508501234?text=${encodeURIComponent(summary)}`;
    window.open(waUrl, "_blank");
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md mx-auto text-center space-y-6 p-8">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Siparişiniz Alındı!</h1>
            <p className="text-muted-foreground">
              Sipariş numaranız: <span className="font-mono font-semibold text-foreground">{orderId.slice(0, 8)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Siparişiniz onaylandıktan sonra kargoya verilecektir. Sipariş durumunuzu takip edebilirsiniz.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity">
                Alışverişe Devam Et
              </Link>
              <a
                href={`https://wa.me/908508501234?text=${encodeURIComponent(orderSummary || `Merhaba, ${orderId.slice(0, 8)} numaralı siparişim hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-success text-success-foreground font-bold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp ile İletişim
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paymentMethods: { value: PaymentMethod; label: string; icon: typeof CreditCard; desc: string }[] = [
    { value: "credit_card", label: "Kredi Kartı", icon: CreditCard, desc: "Visa, Mastercard, Troy" },
    { value: "bank_transfer", label: "Havale / EFT", icon: Building2, desc: "Banka havalesi ile ödeme" },
    { value: "cash_on_delivery", label: "Kapıda Ödeme", icon: Truck, desc: "+15 ₺ kapıda ödeme ücreti" },
  ];

  const finalTotal = paymentMethod === "cash_on_delivery" ? total + 15 : total;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/sepet" className="hover:text-secondary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Sepete Dön
            </Link>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-6">Siparişi Tamamla</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left - Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display font-bold text-foreground mb-4">İletişim Bilgileri</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Ad Soyad *</label>
                      <input value={form.fullName} onChange={e => updateField("fullName", e.target.value)} className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none text-sm ${errors.fullName ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="Ad Soyad" />
                      {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Telefon *</label>
                      <input value={form.phone} onChange={e => updateField("phone", e.target.value)} className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none text-sm ${errors.phone ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="05XX XXX XX XX" />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">E-posta *</label>
                      <input type="email" value={form.email} onChange={e => updateField("email", e.target.value)} className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none text-sm ${errors.email ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="ornek@email.com" />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display font-bold text-foreground mb-4">Teslimat Adresi</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">İl *</label>
                      <input value={form.city} onChange={e => updateField("city", e.target.value)} className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none text-sm ${errors.city ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="İstanbul" />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">İlçe *</label>
                      <input value={form.district} onChange={e => updateField("district", e.target.value)} className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none text-sm ${errors.district ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="Kadıköy" />
                      {errors.district && <p className="text-xs text-destructive mt-1">{errors.district}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">Açık Adres *</label>
                      <textarea value={form.address} onChange={e => updateField("address", e.target.value)} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none text-sm resize-none ${errors.address ? "border-destructive" : "border-input focus:border-secondary"}`} placeholder="Mahalle, sokak, bina no, daire no..." />
                      {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </div>

                {/* Corporate */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <input type="checkbox" id="corporate" checked={isCorporate} onChange={e => setIsCorporate(e.target.checked)} className="rounded" />
                    <label htmlFor="corporate" className="text-sm font-medium text-foreground">Kurumsal Fatura İstiyorum</label>
                  </div>
                  {isCorporate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Firma Adı</label>
                        <input value={form.companyName} onChange={e => updateField("companyName", e.target.value)} className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Vergi Numarası</label>
                        <input value={form.taxNumber} onChange={e => updateField("taxNumber", e.target.value)} className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm" />
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex items-center gap-3 mb-2">
                          <input type="checkbox" id="sameBilling" checked={sameBilling} onChange={e => setSameBilling(e.target.checked)} className="rounded" />
                          <label htmlFor="sameBilling" className="text-sm text-foreground">Fatura adresi teslimat adresi ile aynı</label>
                        </div>
                        {!sameBilling && (
                          <textarea value={form.billingAddress} onChange={e => updateField("billingAddress", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm resize-none" placeholder="Fatura adresi..." />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display font-bold text-foreground mb-4">Ödeme Yöntemi</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {paymentMethods.map(pm => (
                      <button
                        type="button"
                        key={pm.value}
                        onClick={() => setPaymentMethod(pm.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === pm.value
                            ? "border-secondary bg-secondary/5"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <pm.icon className={`w-6 h-6 ${paymentMethod === pm.value ? "text-secondary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-semibold ${paymentMethod === pm.value ? "text-secondary" : "text-foreground"}`}>{pm.label}</span>
                        <span className="text-xs text-muted-foreground">{pm.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display font-bold text-foreground mb-4">Sipariş Notu</h2>
                  <textarea value={form.notes} onChange={e => updateField("notes", e.target.value)} rows={2} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none text-sm resize-none" placeholder="Siparişinizle ilgili eklemek istediğiniz not (opsiyonel)" />
                </div>
              </div>

              {/* Right - Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-40 bg-card border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-display font-bold text-foreground">Sipariş Özeti</h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded bg-background border border-border object-contain p-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} adet</p>
                        </div>
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                          {(item.product.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-foreground">
                      <span>Ara Toplam ({count} ürün)</span>
                      <span>{total.toLocaleString("tr-TR")} ₺</span>
                    </div>
                    <div className="flex justify-between text-success font-medium">
                      <span>Kargo</span>
                      <span>Ücretsiz</span>
                    </div>
                    {paymentMethod === "cash_on_delivery" && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Kapıda Ödeme Ücreti</span>
                        <span>15 ₺</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-2 flex justify-between text-lg font-bold text-foreground">
                      <span>Toplam</span>
                      <span>{finalTotal.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  </div>

                  {!user && (
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <p className="text-xs text-warning font-medium">
                        Sipariş vermek için <Link to="/giris" className="underline font-bold">giriş yapmanız</Link> gerekiyor.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !user}
                    className="w-full py-3.5 rounded-lg bg-gradient-cta text-secondary-foreground font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {submitting ? "İşleniyor..." : `Siparişi Onayla (${finalTotal.toLocaleString("tr-TR")} ₺)`}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Siparişi onaylayarak satış sözleşmesini kabul etmiş olursunuz.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Checkout;
