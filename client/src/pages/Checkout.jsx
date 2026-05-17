import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/http";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "", address: "", city: "", state: "", pincode: "" });
  const submit = async (e) => {
    e.preventDefault();
    if (!items.length) return toast.error("Cart is empty");
    const { data } = await api.post("/orders", { products: items.map((i) => ({ product: i._id, quantity: i.quantity })), shippingAddress: form, paymentMethod: "Cash on Delivery" });
    clearCart();
    navigate(`/order-success/${data._id}`);
  };
  return (
    <main className="container-pad py-10">
      <h1 className="text-4xl font900">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card grid gap-4 p-6 md:grid-cols-2">{["name","phone","email","address","city","state","pincode"].map((key) => <label key={key} className={key === "address" ? "md:col-span-2" : ""}><span className="label capitalize">{key}</span><input required className="input mt-1" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}<div className="md:col-span-2 rounded-lg bg-aqua p-4 font700">Payment method: Cash on Delivery</div></div>
        <aside className="card h-fit p-6"><h2 className="text-xl font900">Order total</h2><p className="mt-4 flex justify-between text-lg"><span>Total</span><b>₹{total}</b></p><button className="btn-primary mt-6 w-full">Place order</button></aside>
      </form>
    </main>
  );
}
