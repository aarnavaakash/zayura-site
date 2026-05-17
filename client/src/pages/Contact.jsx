import { MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/http";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const submit = async (e) => { e.preventDefault(); await api.post("/contact", form); toast.success("Message sent"); setForm({ name: "", email: "", phone: "", message: "" }); };
  return <main className="container-pad grid gap-10 py-12 lg:grid-cols-2"><div><h1 className="text-4xl font900">Contact Zayura</h1><p className="mt-4 text-slate-500">Phone: +91 99999 99999<br />Email: support@zayura.com<br />Address: Zayura Care, India</p><a className="btn-soft mt-6" target="_blank" href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}><MessageCircle size={18} /> WhatsApp</a></div><form onSubmit={submit} className="card grid gap-4 p-6">{["name","email","phone"].map((key) => <input key={key} className="input" required={key==="name"} placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />)}<textarea className="input min-h-36" required placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /><button className="btn-primary">Send message</button></form></main>;
}
