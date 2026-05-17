import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, subtotal, delivery, total, updateQuantity, removeItem } = useCart();
  return (
    <main className="container-pad py-10">
      <h1 className="text-4xl font900">Cart</h1>
      {!items.length ? <p className="mt-6 text-slate-500">Your cart is empty.</p> : <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">{items.map((item) => <div key={item._id} className="card flex gap-4 p-4"><img className="h-24 w-24 rounded-lg object-cover" src={item.images?.[0]} /><div className="flex-1"><h3 className="font900">{item.name}</h3><p className="text-slate-500">₹{item.discountPrice || item.price}</p><div className="mt-3 flex items-center gap-2"><button className="btn-soft p-2" onClick={() => updateQuantity(item._id, item.quantity - 1)}><Minus size={16} /></button><b>{item.quantity}</b><button className="btn-soft p-2" onClick={() => updateQuantity(item._id, item.quantity + 1)}><Plus size={16} /></button><button className="ml-auto text-rose-500" onClick={() => removeItem(item._id)}><Trash2 /></button></div></div></div>)}</div>
        <aside className="card h-fit p-6"><h2 className="text-xl font900">Summary</h2><div className="mt-4 space-y-3 text-slate-600"><p className="flex justify-between"><span>Subtotal</span><b>₹{subtotal}</b></p><p className="flex justify-between"><span>Delivery</span><b>₹{delivery}</b></p><p className="flex justify-between border-t pt-3 text-lg text-ink"><span>Total</span><b>₹{total}</b></p></div><Link className="btn-primary mt-6 w-full" to="/checkout">Proceed to checkout</Link></aside>
      </div>}
    </main>
  );
}
