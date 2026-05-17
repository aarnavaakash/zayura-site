import { MessageCircle, Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/http";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => {
      setData(data);
      api.get("/products", { params: { category: data.product.category?._id } }).then((res) => setRelated(res.data.filter((p) => p._id !== data.product._id).slice(0, 4)));
    });
  }, [slug]);
  if (!data) return <main className="container-pad py-10">Loading...</main>;
  const p = data.product;
  const price = p.discountPrice || p.price;
  const buy = () => { addToCart(p, qty); navigate("/checkout"); };
  const whatsapp = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`I want to order ${p.name}`)}`;
  return (
    <main className="container-pad py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid gap-3"><img className="aspect-square w-full rounded-lg object-cover shadow-soft" src={p.images?.[0]} alt={p.name} /><div className="grid grid-cols-4 gap-3">{p.images?.map((img) => <img key={img} className="aspect-square rounded-lg object-cover" src={img} />)}</div></div>
        <div>
          <p className="text-sm font900 uppercase tracking-widest text-mint">{p.category?.name}</p>
          <h1 className="mt-2 text-4xl font900">{p.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-amber-500"><Star fill="currentColor" size={18} /> {p.rating?.toFixed?.(1) || p.rating} ({p.reviewCount || 0} reviews)</div>
          <div className="mt-5 flex items-end gap-3"><span className="text-3xl font900">₹{price}</span>{p.discountPrice > 0 && <span className="text-slate-400 line-through">₹{p.price}</span>}</div>
          <p className="mt-5 text-slate-600">{p.description}</p>
          <div className="mt-6 grid gap-4 rounded-lg bg-white p-5 ring-1 ring-slate-100"><div><b>Usage</b><p className="text-slate-500">{p.usageInstructions}</p></div><div><b>Ingredients</b><p className="text-slate-500">{p.ingredients}</p></div></div>
          <div className="mt-6 flex items-center gap-3"><button className="btn-soft px-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={18} /></button><span className="text-xl font900">{qty}</span><button className="btn-soft px-3" onClick={() => setQty(qty + 1)}><Plus size={18} /></button></div>
          <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => addToCart(p, qty)} className="btn-primary">Add to cart</button><button onClick={buy} className="btn-soft">Buy now</button><a href={whatsapp} target="_blank" className="btn-soft"><MessageCircle size={18} /> WhatsApp</a></div>
        </div>
      </div>
      <h2 className="mt-16 text-3xl font900">Related products</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <ProductCard key={item._id} product={item} />)}</div>
    </main>
  );
}
