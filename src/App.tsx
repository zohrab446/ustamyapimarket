import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import CategoryProducts from "./pages/CategoryProducts";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BulkOrder from "./pages/BulkOrder";
import QuoteRequest from "./pages/QuoteRequest";
import Career from "./pages/Career";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kategori/:slug" element={<CategoryProducts />} />
            <Route path="/urun/:id" element={<ProductDetail />} />
            <Route path="/sepet" element={<Cart />} />
            <Route path="/siparis" element={<Checkout />} />
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/siparis-takip" element={<OrderTracking />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/toplu-siparis" element={<BulkOrder />} />
            <Route path="/teklif-al" element={<QuoteRequest />} />
            <Route path="/kariyer" element={<Career />} />
            <Route path="/iade-degisim" element={<Returns />} />
            <Route path="/kargo" element={<Shipping />} />
            <Route path="/sss" element={<Faq />} />
            <Route path="/gizlilik" element={<Privacy />} />
            <Route path="/kullanim-kosullari" element={<Terms />} />
            <Route path="/arama" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
