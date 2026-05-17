import { useEffect, useState } from "react";
import api from "../api/http";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/admin/customers").then(({ data }) => setCustomers(data)); }, []);
  const view = (id) => api.get(`/admin/customers/${id}/orders`).then(({ data }) => setOrders(data));
  return <div><h1 className="text-3xl font900">Customer Management</h1><div className="mt-6 grid gap-6 xl:grid-cols-2"><div className="grid gap-3">{customers.map((c) => <button key={c._id} onClick={() => view(c._id)} className="card p-4 text-left"><b>{c.name}</b><p className="text-sm text-slate-500">{c.email} {c.phone}</p></button>)}</div><div className="card p-5"><h2 className="text-xl font900">Customer order history</h2><div className="mt-4 grid gap-3">{orders.map((o) => <p key={o._id} className="border-b pb-3">#{o._id.slice(-8)} - {o.orderStatus} - ₹{o.totalAmount}</p>)}</div></div></div></div>;
}
