import { useState } from "react";
import { Package, Phone, Mail, CheckCircle2, Truck, Percent, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BulkOrder = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const company = fd.get("company");
    const phone = fd.get("phone");
    const email = fd.get("email");
    const products = fd.get("products");
    const note = fd.get("note");

    const message =
      `*TOPLU SİPARİŞ TALEBİ*%0A%0A` +
      `*Ad Soyad:* ${name}%0A` +
      `*Firma:* ${company}%0A` +
      `*Telefon:* ${phone}%0A` +
      `*E-posta:* ${email}%0A%0A` +
      `*Ürünler:*%0A${products}%0A%0A` +
      `*Not:* ${note || "-"}`;

    window.open(`https://wa.me/905551234567?text=${message}`, "_blank");
    toast.success("Talebiniz WhatsApp üzerinden iletiliyor");
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 sm:p-10 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-10 h-10 text-secondary" />
            <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase">Toplu Sipariş</h1>
          </div>
          <p className="text-base sm:text-lg opacity-90 max-w-2xl">
            Şantiye, proje, atölye ve kurumsal ihtiyaçlarınız için özel fiyatlı toplu alım çözümleri.
            Talebinizi iletin, ekibimiz size özel teklif hazırlasın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Percent, title: "%25'e Varan İndirim", desc: "Toplu alımlarda özel fiyat" },
            { icon: Truck, title: "Ücretsiz Teslimat", desc: "Şantiyenize kadar getiriyoruz" },
            { icon: FileText, title: "Kurumsal Fatura", desc: "E-fatura ve cari hesap" },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-5">
              <f.icon className="w-8 h-8 text-secondary mb-2" />
              <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Teklif Formu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="company">Firma Adı</Label>
                  <Input id="company" name="company" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" name="email" type="email" />
                </div>
              </div>
              <div>
                <Label htmlFor="products">İhtiyaç Listesi *</Label>
                <Textarea
                  id="products"
                  name="products"
                  required
                  rows={5}
                  placeholder="Örn: 50 adet matkap ucu seti, 100 kg vida, 20 lt boya..."
                />
              </div>
              <div>
                <Label htmlFor="note">Ek Notlar</Label>
                <Textarea id="note" name="note" rows={3} placeholder="Teslimat adresi, tarih vb." />
              </div>
              <Button type="submit" size="lg" variant="secondary" disabled={loading} className="w-full">
                {loading ? "Gönderiliyor..." : "Teklif Talep Et"}
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-bold text-foreground mb-3">Direkt İletişim</h3>
              <a href="tel:+905551234567" className="flex items-center gap-3 mb-3 text-foreground hover:text-secondary">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="font-semibold">+90 555 123 45 67</span>
              </a>
              <a href="mailto:toplu@ustamyapimarket.com" className="flex items-center gap-3 text-foreground hover:text-secondary">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-sm break-all">toplu@ustamyapimarket.com</span>
              </a>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-bold text-foreground mb-3">Avantajlar</h3>
              <ul className="space-y-2">
                {[
                  "Özel iskonto oranları",
                  "Vade seçenekleri",
                  "Şantiyeye teslim",
                  "Stok garantisi",
                  "Atanmış müşteri temsilcisi",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BulkOrder;