export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
  description?: string;
  specs?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "elektrikli", name: "Elektrikli El Aletleri", icon: "⚡", productCount: 256 },
  { id: "matkap", name: "Matkap & Vidalama", icon: "🔧", productCount: 189 },
  { id: "vida", name: "Vida & Civata", icon: "🔩", productCount: 1240 },
  { id: "boya", name: "Boya & İnşaat", icon: "🎨", productCount: 432 },
  { id: "tesisat", name: "Tesisat", icon: "🔧", productCount: 567 },
  { id: "bahce", name: "Bahçe Ürünleri", icon: "🌿", productCount: 321 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Profesyonel Akülü Matkap 20V",
    price: 2499,
    originalPrice: 3299,
    image: "/images/product-drill.jpg",
    category: "matkap",
    brand: "Bosch",
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    badge: "Çok Satan",
    description: "20V Li-Ion akülü şarjlı matkap vidalama. Profesyonel kullanım için ideal. 2 adet akü ve şarj cihazı ile birlikte.",
    specs: {
      "Voltaj": "20V",
      "Akü Tipi": "Li-Ion",
      "Devir": "0-1800 d/dk",
      "Tork": "65 Nm",
      "Ağırlık": "1.8 kg",
      "Mandren": "13 mm",
    },
  },
  {
    id: "2",
    name: "Endüstriyel Taşlama Makinesi 125mm",
    price: 1899,
    originalPrice: 2399,
    image: "/images/product-grinder.jpg",
    category: "elektrikli",
    brand: "Makita",
    rating: 4.6,
    reviewCount: 218,
    inStock: true,
    badge: "İndirim",
    description: "125mm profesyonel avuç taşlama. 1400W güçlü motor, titreşim önleyici sistem.",
    specs: {
      "Güç": "1400W",
      "Disk Çapı": "125 mm",
      "Devir": "11000 d/dk",
      "Ağırlık": "2.3 kg",
    },
  },
  {
    id: "3",
    name: "Profesyonel El Aleti Seti 12 Parça",
    price: 899,
    image: "/images/product-tools.jpg",
    category: "vida",
    brand: "Stanley",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    description: "12 parça profesyonel el aleti seti. Tornavida, pense, anahtar takımı.",
    specs: {
      "Parça Sayısı": "12",
      "Malzeme": "Krom Vanadyum",
      "Çanta": "Taşıma çantası dahil",
    },
  },
  {
    id: "4",
    name: "İç Cephe Boya Seti Premium",
    price: 649,
    originalPrice: 799,
    image: "/images/product-paint.jpg",
    category: "boya",
    brand: "Marshall",
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    badge: "Yeni",
    description: "15 litre premium iç cephe boyası, rulo ve fırça seti ile birlikte.",
    specs: {
      "Hacim": "15 L",
      "Kaplama": "120 m²",
      "Renk": "Beyaz",
      "Kat Sayısı": "2 kat",
    },
  },
  {
    id: "5",
    name: "Pirinç Vana Seti 1/2\"",
    price: 359,
    image: "/images/product-plumbing.jpg",
    category: "tesisat",
    brand: "Eca",
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    description: "1/2 inç pirinç küresel vana seti. 6 adet. Yüksek basınca dayanıklı.",
    specs: {
      "Çap": "1/2\"",
      "Malzeme": "Pirinç",
      "Basınç": "16 Bar",
      "Adet": "6",
    },
  },
  {
    id: "6",
    name: "Darbeli Matkap 850W",
    price: 1599,
    originalPrice: 1999,
    image: "/images/product-drill.jpg",
    category: "matkap",
    brand: "DeWalt",
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    badge: "Çok Satan",
    description: "850W darbeli matkap. Beton, metal ve ahşap delme için ideal.",
    specs: {
      "Güç": "850W",
      "Devir": "0-2800 d/dk",
      "Darbe": "44800 d/dk",
      "Mandren": "13 mm",
    },
  },
];

export const brands = [
  { name: "Bosch", logo: "BOSCH" },
  { name: "Makita", logo: "MAKITA" },
  { name: "DeWalt", logo: "DEWALT" },
  { name: "Stanley", logo: "STANLEY" },
  { name: "Black+Decker", logo: "B+D" },
  { name: "Hilti", logo: "HILTI" },
];

export const reviews = [
  {
    id: "1",
    name: "Mehmet Usta",
    role: "Elektrik Teknisyeni",
    text: "Siparişim aynı gün kargoya verildi. Ürün kalitesi mükemmel, fiyatlar piyasanın çok altında. Toptan alımlarda ekstra indirim yapıyorlar.",
    rating: 5,
  },
  {
    id: "2",
    name: "Ali Yılmaz",
    role: "İnşaat Mühendisi",
    text: "Şantiyemiz için tüm malzemeleri buradan alıyoruz. Kurumsal fatura kesiyorlar, teslimat hızlı. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ayşe Demir",
    role: "Ev Tadilat",
    text: "Evimizi boyarken ihtiyacımız olan her şeyi burada bulduk. Müşteri hizmetleri çok ilgili, WhatsApp'tan anında dönüş yapıyorlar.",
    rating: 4,
  },
];
