import { HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Sipariş verdikten sonra ne kadar sürede kargolanır?", a: "14:00'a kadar verilen siparişler aynı gün kargoya teslim edilir. Sonraki saatlerde verilen siparişler bir sonraki iş gününde gönderilir." },
  { q: "Toplu sipariş için indirim alabilir miyim?", a: "Evet, toplu siparişlerde %25'e varan indirimler sunuyoruz. Toplu Sipariş veya Teklif Al sayfasından talep oluşturabilirsiniz." },
  { q: "Kurumsal fatura kesiyor musunuz?", a: "Evet, tüm siparişlerde kurumsal fatura keserek gönderiyoruz. Sipariş sırasında firma bilgilerinizi girmeniz yeterlidir." },
  { q: "Ürünlerin garantisi var mı?", a: "Tüm elektrikli aletler ve makinalar üretici garantisi ile satılır. Garanti süresi ürün ve markaya göre değişir." },
  { q: "Ödeme yöntemleri nelerdir?", a: "Kredi kartı, havale/EFT ve kapıda ödeme seçeneklerini kullanabilirsiniz." },
  { q: "Siparişimi nasıl takip edebilirim?", a: "Sipariş Takip sayfasından sipariş numaranız ile durumu kontrol edebilirsiniz." },
  { q: "Satılan ürünler orijinal mi?", a: "Evet, mağazamızda yer alan tüm markalar %100 orijinaldir ve resmi distribütör garantisi altındadır." },
  { q: "Neden Ustam Yapı Market'i tercih etmeliyim?", a: "Biz sadece ürün satmıyoruz; işin mutfağından geldiğimiz için hangi ürünün hangi projede en iyi sonucu vereceğini biliyoruz. \"Kötü malzeme ustayı rezil eder\" ilkesiyle, kendi projelerimizde kullanmayacağımız hiçbir ürünü mağazamızda bulundurmuyoruz." },
  { q: "Arızalı çıkan ürünlerde nasıl bir yol izlemeliyim?", a: "Ürününüzde üretimden kaynaklı bir sorun olması durumunda, markanın yetkili servis noktalarından destek alabilir veya bizimle iletişime geçerek garanti süreçlerini başlatabilirsiniz." },
  { q: "Hangi ürünün işime daha uygun olduğunu nasıl öğrenebilirim?", a: "Teknik ekibimiz size destek olmaktan mutluluk duyar. İletişim sayfamız üzerinden bize ulaşarak projeniz veya ihtiyacınız olan iş kolu hakkında bilgi verirseniz, size en doğru ekipman önerisini sunabiliriz." },
];

const Faq = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 container py-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-secondary" />
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Sıkça Sorulan Sorular</h1>
      </div>
      <div className="max-w-3xl bg-card border border-border rounded-xl p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-foreground">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
    <Footer />
  </div>
);

export default Faq;