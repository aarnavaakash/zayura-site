import { useEffect, useState } from "react";
import api from "../api/http";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get("/admin/dashboard").then(({ data }) => setStats(data)); }, []);
  if (!stats) return <p>Loading dashboard...</p>;
  const cards = [["Products", stats.totalProducts], ["Orders", stats.totalOrders], ["Customers", stats.totalCustomers], ["Revenue", `₹${stats.totalRevenue}`]];
  return <div><h1 className="text-3xl font900">Dashboard</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="card p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font900">{value}</p></div>)}</div><div className="mt-8 grid gap-6 xl:grid-cols-2"><section className="card p-6"><h2 className="text-xl font900">Recent orders</h2><div className="mt-4 grid gap-3">{stats.recentOrders.map((o) => <div key={o._id} className="flex justify-between border-b pb-3 text-sm"><span>#{o._id.slice(-8)} {o.user?.name}</span><b>{o.orderStatus}</b></div>)}</div></section><section className="card p-6"><h2 className="text-xl font900">Low stock warning</h2><div className="mt-4 grid gap-3">{stats.lowStock.map((p) => <div key={p._id} className="flex justify-between border-b pb-3 text-sm"><span>{p.name}</span><b>{p.stock} left</b></div>)}</div></section></div></div>;
}
