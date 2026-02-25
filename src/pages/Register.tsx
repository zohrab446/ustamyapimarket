import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
      navigate("/giris");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto p-8 bg-card border border-border rounded-xl">
          <h1 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Kayıt Ol</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none"
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:border-secondary focus:outline-none"
                placeholder="En az 6 karakter"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Zaten hesabınız var mı?{" "}
            <Link to="/giris" className="text-secondary hover:underline font-medium">Giriş Yap</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
