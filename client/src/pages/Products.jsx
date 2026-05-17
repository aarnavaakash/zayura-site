import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/http";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = Object.fromEntries(params.entries());
  useEffect(() => { api.get("/categories").then(({ data }) => setCategories(data)); }, []);
  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: query }).then(({ data }) => setProducts(data)).finally(() => setLoading(false));
  }, [params.toString()]);
  const update = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); };
  return (
    <main className="container-pad py-10">
      <h1 className="text-4xl font900">Shop Zayura</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input className="input md:col-span-2" placeholder="Search products" defaultValue={query.search || ""} onKeyDown={(e) => e.key === "Enter" && update("search", e.currentTarget.value)} />
        <select className="input" value={query.category || ""} onChange={(e) => update("category", e.target.value)}><option value="">All categories</option>{categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select>
        <select className="input" value={query.sort || "newest"} onChange={(e) => update("sort", e.target.value)}><option value="newest">Newest</option><option value="popular">Popular</option><option value="price_low">Price low</option><option value="price_high">Price high</option></select>
      </div>
      {loading ? <p className="mt-10 text-slate-500">Loading products...</p> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p._id} product={p} />)}</div>}
    </main>
  );
}
