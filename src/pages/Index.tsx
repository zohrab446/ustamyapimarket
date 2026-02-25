import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import TrustBadges from "@/components/home/TrustBadges";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import PromoSection from "@/components/home/PromoSection";
import Brands from "@/components/home/Brands";
import Reviews from "@/components/home/Reviews";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <TrustBadges />
        <Categories />
        <BestSellers />
        <PromoSection />
        <Brands />
        <Reviews />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
