import { useEffect, useState } from "react";
import api from "../api/http";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => { api.get("/admin/contacts").then(({ data }) => setMessages(data)); }, []);
  return <div><h1 className="text-3xl font900">Contact Messages</h1><div className="mt-6 grid gap-4">{messages.map((m) => <div key={m._id} className="card p-5"><b>{m.name}</b><p className="text-sm text-slate-500">{m.email} {m.phone}</p><p className="mt-3">{m.message}</p></div>)}</div></div>;
}
