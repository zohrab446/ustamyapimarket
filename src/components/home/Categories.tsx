import { Link } from "react-router-dom";
import { categories } from "@/lib/data";

const Categories = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Kategoriler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/kategori/${cat.id}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-product-hover transition-all duration-200"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cat.productCount} ürün</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
