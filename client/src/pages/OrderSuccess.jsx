import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/http";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { api.get(`/orders/${id}`).then(({ data }) => setOrder(data)); }, [id]);
  return <main className="container-pad py-16"><div className="card mx-auto max-w-2xl p-8 text-center"><h1 className="text-4xl font900">Thank you</h1><p className="mt-3 text-slate-500">Your Zayura order has been placed successfully.</p><p className="mt-5 rounded-lg bg-aqua p-4 font900">Order ID: {id}</p>{order && <p className="mt-4">Total: ₹{order.totalAmount}</p>}<Link to="/my-orders" className="btn-primary mt-6">View my orders</Link></div></main>;
}
