import { useEffect, useState } from "react";
import api from "../api/http";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders/mine").then(({ data }) => setOrders(data)); }, []);
  return <main className="container-pad py-10"><h1 className="text-4xl font900">My Orders</h1><div className="mt-8 grid gap-4">{orders.map((o) => <div key={o._id} className="card p-5"><div className="flex flex-wrap justify-between gap-3"><b>#{o._id}</b><span className="rounded-full bg-aqua px-3 py-1 text-sm font900">{o.orderStatus}</span></div><p className="mt-2 text-slate-500">{new Date(o.createdAt).toLocaleString()}</p><p className="mt-3 font900">₹{o.totalAmount}</p></div>)}</div></main>;
}
