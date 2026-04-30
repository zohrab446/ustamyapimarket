import { useState } from "react";
import { Send, FileText } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const QuoteRequest = () => {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", products: "", note: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.products.trim()) {
      toast.error("Lütfen ad, telefon ve ürün listesini doldurun.");
      return;
    }
    setSending(true);
    const message =
      `*TEKLİF TALEBİ*%0A%0A` +
      `*Ad Soyad:* ${form.name}%0A` +
      `*Firma:* ${form.company || "-"}%0A` +
      `*Telefon:* ${form.phone}%0A` +
      `*E-posta:* ${form.email || "-"}%0A%0A` +
      `*Ürünler:*%0A${form.products}%0A%0A` +
      `*Not:* ${form.note || "-"}`;
    window.open(`https://wa.me/905385466562?text=${message}`, "_blank");
    toast.success("Teklif talebiniz WhatsApp üzerinden iletiliyor.");
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-secondary" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Teklif Al</h1>
        </div>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          İhtiyacınız olan ürünleri belirtin, en kısa sürede size özel fiyat teklifimizi hazırlayalım.
        </p>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 max-w-3xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Ad Soyad *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Firma</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Telefon *</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">E-posta</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Ürünler ve Adetler *</label>
            <textarea value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} required rows={5} placeholder="Örn: Bosch GSB 13 RE matkap x 2 adet" className="w-full px-4 py-3 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Notunuz</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-lg border-2 border-muted bg-background focus:border-secondary focus:outline-none resize-none" />
          </div>
          <button type="submit" disabled={sending} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90">
            <Send className="w-4 h-4" />
            {sending ? "Gönderiliyor..." : "Teklif İste"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default QuoteRequest;