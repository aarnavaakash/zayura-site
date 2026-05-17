import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/http";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get("/products").then(({ data }) => setProducts(data));
    api.get("/categories").then(({ data }) => setCategories(data));
  }, []);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const best = products.filter((p) => p.bestSeller).slice(0, 4);
  return (
    <main>
      <section className="overflow-hidden bg-gradient-to-br from-white via-aqua to-mint/20">
        <div className="container-pad grid min-h-[640px] items-center gap-10 py-14 md:grid-cols-2">
          <div>
            <p className="text-sm font900 uppercase tracking-widest text-mint">Premium cleanware</p>
            <h1 className="mt-4 text-5xl font900 tracking-tight md:text-7xl">Zayura</h1>
            <p className="mt-4 text-2xl font800 text-slate-700">Clean Spaces, Healthy Living</p>
            <p className="mt-5 max-w-xl text-lg text-slate-600">Fresh, effective and affordable home-cleaning products for floors, kitchens, bathrooms, glass, dishes and everyday hygiene.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/products" className="btn-primary">Shop products <ArrowRight size={18} /></Link><Link to="/about" className="btn-soft">Why Zayura</Link></div>
          </div>
          <div className="relative">
            <img className="h-[460px] w-full rounded-lg object-cover shadow-soft" src="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80" alt="Zayura cleaning products" />
          </div>
        </div>
      </section>
      <section className="container-pad py-14">
        <SectionTitle eyebrow="Categories" title="Everything for a healthier home" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.slice(0, 8).map((c) => <Link key={c._id} to={`/products?category=${c._id}`} className="card p-5 transition hover:-translate-y-1 hover:shadow-soft"><div className="text-lg font900">{c.name}</div><p className="mt-2 text-sm text-slate-500">Shop {c.name.toLowerCase()} essentials</p></Link>)}</div>
      </section>
      <section className="container-pad py-10"><SectionTitle eyebrow="Featured" title="Customer favorites" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p._id} product={p} />)}</div></section>
      <section className="bg-white py-14"><div className="container-pad"><SectionTitle eyebrow="Best sellers" title="Proven daily cleaners" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{best.map((p) => <ProductCard key={p._id} product={p} />)}</div></div></section>
      <section className="container-pad grid gap-4 py-14 md:grid-cols-3">
        {[["Safe formulas", ShieldCheck], ["Fresh results", Sparkles], ["COD delivery", Truck]].map(([title, Icon]) => <div key={title} className="card p-6"><Icon className="text-mint" /><h3 className="mt-4 text-xl font900">{title}</h3><p className="mt-2 text-slate-500">Trusted cleaning performance designed for busy Indian homes.</p></div>)}
      </section>
    </main>
  );
}
