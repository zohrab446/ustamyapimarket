import { RefreshCcw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Returns = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 container py-8">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCcw className="w-8 h-8 text-secondary" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">İade & Değişim</h1>
      </div>
      <div className="max-w-3xl bg-card border border-border rounded-xl p-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Satın aldığınız ürünleri teslim aldığınız tarihten itibaren <strong className="text-foreground">14 gün içinde</strong>,
          orijinal ambalajında ve kullanılmamış olması koşuluyla iade edebilirsiniz.
        </p>
        <div>
          <h3 className="text-foreground font-semibold mb-2">İade Koşulları</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ürün orijinal ambalajında ve hasarsız olmalıdır.</li>
            <li>Fatura veya sipariş bilgileri ibraz edilmelidir.</li>
            <li>Kişiye özel üretim ve toplu sipariş ürünleri iade kapsamı dışındadır.</li>
            <li>Elektrikli aletlerde garanti şartları üretici firmaya bağlıdır.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-foreground font-semibold mb-2">Nasıl İade Ederim?</h3>
          <p>
            İade talebinizi <a href="tel:05445318394" className="text-secondary hover:underline">0544 531 83 94</a> numaralı
            telefondan veya <a href="mailto:muhamethulusi646@gmail.com" className="text-secondary hover:underline">muhamethulusi646@gmail.com</a> adresinden iletebilirsiniz.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Returns;