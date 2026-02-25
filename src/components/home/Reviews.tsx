import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  created_at: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, name, role, text, rating, created_at")
      .order("created_at", { ascending: false })
      .limit(12);
    setReviews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Yorum yapmak için giriş yapmalısınız");
      return;
    }
    if (form.text.trim().length < 10) {
      toast.error("Yorum en az 10 karakter olmalı");
      return;
    }
    if (form.name.trim().length < 2) {
      toast.error("Adınızı girin");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      name: form.name.trim(),
      role: form.role.trim(),
      text: form.text.trim(),
      rating: form.rating,
    });

    if (error) {
      toast.error("Yorum gönderilemedi: " + error.message);
    } else {
      toast.success("Yorumunuz başarıyla eklendi!");
      setForm({ name: "", role: "", text: "", rating: 5 });
      setShowForm(false);
      fetchReviews();
    }
    setSubmitting(false);
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground text-center flex-1">Müşteri Yorumları</h2>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {showForm ? "Kapat" : "Yorum Yaz"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Adınız *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:border-secondary focus:outline-none"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Meslek / Rol</label>
                <input
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:border-secondary focus:outline-none"
                  placeholder="Elektrik Teknisyeni"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Puan *</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setForm(f => ({ ...f, rating: s }))}
                    className="p-1"
                  >
                    <Star className={`w-6 h-6 ${s <= form.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Yorumunuz *</label>
              <textarea
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:border-secondary focus:outline-none resize-none"
                placeholder="Deneyiminizi paylaşın..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Gönderiliyor..." : "Yorum Gönder"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground py-8">Yükleniyor...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Henüz yorum yok. {user ? "İlk yorumu siz yazın!" : "Yorum yapmak için giriş yapın."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  {review.role && <p className="text-xs text-muted-foreground">{review.role}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
