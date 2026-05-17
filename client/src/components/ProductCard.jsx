import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.some((item) => item._id === product._id);
  const price = product.discountPrice || product.price;
  return (
    <div className="card group overflow-hidden">
      <Link to={`/products/${product.slug}`} className="block aspect-square overflow-hidden bg-aqua">
        <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`} className="font800 leading-snug hover:text-mint">{product.name}</Link>
          <button onClick={() => toggleWishlist(product)} className={`rounded-lg p-2 ${wished ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-500"}`}><Heart size={18} fill={wished ? "currentColor" : "none"} /></button>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-amber-500"><Star size={16} fill="currentColor" /> {product.rating?.toFixed?.(1) || product.rating}</div>
        <div className="mt-3 flex items-end gap-2"><span className="text-xl font900">₹{price}</span>{product.discountPrice > 0 && <span className="text-sm text-slate-400 line-through">₹{product.price}</span>}</div>
        <button onClick={() => addToCart(product)} className="mt-4 w-full btn-primary"><ShoppingCart size={18} /> Add to cart</button>
      </div>
    </div>
  );
}
