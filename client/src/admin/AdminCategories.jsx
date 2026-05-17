import { useEffect, useState } from "react";
import api from "../api/http";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", image: "" });
  const [editing, setEditing] = useState(null);
  const load = () => api.get("/categories").then(({ data }) => setCategories(data));
  useEffect(() => { load(); }, []);
  const save = async (e) => { e.preventDefault(); editing ? await api.put(`/categories/${editing}`, form) : await api.post("/categories", form); setForm({ name: "", image: "" }); setEditing(null); load(); };
  return <div><h1 className="text-3xl font900">Category Management</h1><form onSubmit={save} className="card mt-6 flex flex-col gap-3 p-5 md:flex-row"><input className="input" required placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /><button className="btn-primary">{editing ? "Update" : "Add"}</button></form><div className="mt-6 grid gap-3">{categories.map((c) => <div key={c._id} className="card flex items-center justify-between p-4"><b>{c.name}</b><span><button className="mr-3 text-mint font700" onClick={() => { setEditing(c._id); setForm(c); }}>Edit</button><button className="text-rose-500 font700" onClick={async () => { await api.delete(`/categories/${c._id}`); load(); }}>Delete</button></span></div>)}</div></div>;
}
