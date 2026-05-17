import { useEffect, useState } from "react";
import api from "../api/http";

const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const load = () => api.get("/orders", { params: { search } }).then(({ data }) => setOrders(data));
  useEffect(() => { load(); }, []);
  const update = async (id, orderStatus) => { await api.put(`/orders/${id}/status`, { orderStatus }); load(); };
  return <div><h1 className="text-3xl font900">Order Management</h1><div className="mt-6 flex gap-3"><input className="input" placeholder="Search by name, phone or order ID" value={search} onChange={(e) => setSearch(e.target.value)} /><button className="btn-primary" onClick={load}>Search</button></div><div className="mt-6 grid gap-4">{orders.map((o) => <div key={o._id} className="card p-5"><div className="flex flex-wrap justify-between gap-3"><div><b>#{o._id}</b><p className="text-sm text-slate-500">{o.shippingAddress?.name} - {o.shippingAddress?.phone}</p></div><select className="input w-52" value={o.orderStatus} onChange={(e) => update(o._id, e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></div><div className="mt-4 grid gap-2 text-sm">{o.products.map((p) => <p key={p.product}>{p.name} x {p.quantity} - ₹{p.price * p.quantity}</p>)}</div><p className="mt-4 font900">Total ₹{o.totalAmount}</p></div>)}</div></div>;
}
