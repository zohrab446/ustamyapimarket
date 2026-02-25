import { Star } from "lucide-react";
import { reviews } from "@/lib/data";

const Reviews = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Müşteri Yorumları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
