import { Briefcase, Mail, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Career = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-8 h-8 text-secondary" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Kariyer</h1>
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-bold text-xl text-foreground mb-3">Bizimle Çalışın</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Ustam Yapı Market olarak büyüyen ekibimize tutkulu, çözüm odaklı ve sektöre değer katmak isteyen
              arkadaşlar arıyoruz. Satış, lojistik, müşteri hizmetleri ve teknik destek başta olmak üzere
              farklı pozisyonlar için başvurularınızı bekliyoruz.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              CV'nizi aşağıdaki e-posta adresine "Kariyer Başvurusu" konusu ile iletmeniz yeterlidir.
            </p>
          </div>

          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary" />
              <a href="mailto:muhamethulusi646@gmail.com" className="font-medium text-foreground hover:text-secondary">muhamethulusi646@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary" />
              <a href="tel:05445318394" className="font-medium text-foreground hover:text-secondary">0544 531 83 94</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Career;