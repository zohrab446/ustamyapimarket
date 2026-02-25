import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setSending(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: form,
      });
      if (error) throw error;
      toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">İletişim</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display font-bold text-foreground mb-4">Bize Ulaşın</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Telefon</p>
                    <a href="tel:05445318394" className="text-sm text-muted-foreground hover:text-secondary">0544 531 83 94</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">E-posta</p>
                    <a href="mailto:info@ustamarket.com" className="text-sm text-muted-foreground hover:text-secondary">info@ustamarket.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Adres</p>
                    <p className="text-sm text-muted-foreground">Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Çalışma Saatleri</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Pazartesi - Cumartesi: 08:00 - 19:00</p>
                <p>Pazar: Kapalı</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display font-bold text-foreground mb-4">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Ad Soyad *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      maxLength={100}
                      className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background text-foreground focus:border-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">E-posta *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      maxLength={255}
                      className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background text-foreground focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      maxLength={20}
                      className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background text-foreground focus:border-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Konu</label>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      maxLength={200}
                      className="w-full h-11 px-4 rounded-lg border-2 border-muted bg-background text-foreground focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Mesajınız *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    maxLength={2000}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 border-muted bg-background text-foreground focus:border-secondary focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
