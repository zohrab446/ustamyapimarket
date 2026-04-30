import { Award, Truck, Users, Wrench } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">Hakkımızda</h1>

        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Ustam Yapı Market</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ustam Yapı Market'in temelleri, inşaat ve yapı sektöründeki yılların birikimini dijital
            dünyaya taşımak amacıyla tam 10 yıl önce atıldı. Ancak bizim hikayemiz, sadece on yıllık
            bir ticari geçmişten ibaret değil; tozlu şantiyelerden, ter dökülen atölyelerden ve işine
            tutkuyla bağlı bir usta-çırak disiplininden doğdu.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Türkiye'nin güvenilir hırdavat ve yapı market e-ticaret platformu olarak; profesyonel
            ustalar, müteahhitler ve ev kullanıcıları için geniş ürün yelpazemizle hizmet veriyoruz.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Elektrikli aletlerden vida-civataya, boya malzemelerinden tesisat ürünlerine kadar
            ihtiyacınız olan her şeyi toptan ve perakende fiyatlarla sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Award, title: "Kaliteli Ürünler", desc: "Orijinal ve garantili markalar" },
            { icon: Truck, title: "Hızlı Kargo", desc: "Aynı gün kargo imkanı" },
            { icon: Users, title: "Uzman Ekip", desc: "Profesyonel destek hizmeti" },
            { icon: Wrench, title: "Geniş Ürün", desc: "Binlerce çeşit hırdavat" },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-5 text-center">
              <f.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-bold text-foreground mb-2">Misyonumuz</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ustaların ve yapı sektörü profesyonellerinin işlerini kolaylaştırmak için
              kaliteli ürünleri uygun fiyatlarla, hızlı ve güvenilir şekilde ulaştırmak.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-bold text-foreground mb-2">Vizyonumuz</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Türkiye'nin lider hırdavat e-ticaret platformu olarak sektöre yön vermek
              ve her ustanın ilk tercihi olmak.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;