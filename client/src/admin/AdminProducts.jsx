import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/http";

const empty = { name: "", category: "", price: "", discountPrice: "", stock: "", description: "", usageInstructions: "", ingredients: "", images: "", featured: false, bestSeller: false };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const load = () => api.get("/products").then(({ data }) => setProducts(data));
  useEffect(() => { load(); api.get("/categories").then(({ data }) => setCategories(data)); }, []);
  const set = (key, value) => setForm({ ...form, [key]: value });
  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, images: String(form.images).split(",").map((x) => x.trim()).filter(Boolean), price: Number(form.price), discountPrice: Number(form.discountPrice), stock: Number(form.stock) };
    editing ? await api.put(`/products/${editing}`, payload) : await api.post("/products", payload);
    toast.success("Product saved"); setForm(empty); setEditing(null); load();
  };
  const edit = (p) => { setEditing(p._id); setForm({ ...p, category: p.category?._id || p.category, images: p.images?.join(", ") || "" }); };
  const del = async (id) => { if (confirm("Delete product?")) { await api.delete(`/products/${id}`); load(); } };
  const upload = async (file) => {
    if (!file) return;
    const body = new FormData(); body.append("image", file); setUploading(true);
    try { const { data } = await api.post("/upload", body); set("images", form.images ? `${form.images}, ${data.url}` : data.url); toast.success("Image uploaded"); }
    catch (e) { toast.error(e.response?.data?.message || "Upload failed"); }
    finally { setUploading(false); }
  };
  return <div><h1 className="text-3xl font900">Product Management</h1><form onSubmit={save} className="card mt-6 grid gap-4 p-5 md:grid-cols-3"><input className="input" required placeholder="Product name" value={form.name} onChange={(e) => set("name", e.target.value)} /><select className="input" required value={form.category} onChange={(e) => set("category", e.target.value)}><option value="">Category</option>{categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}</select>{["price","discountPrice","stock"].map((k) => <input key={k} className="input" type="number" required={k !== "discountPrice"} placeholder={k} value={form[k]} onChange={(e) => set(k, e.target.value)} />)}<textarea className="input md:col-span-3" required placeholder="Description" value={form.description} onChange={(e) => set("description", e.target.value)} /><input className="input" placeholder="Usage instructions" value={form.usageInstructions} onChange={(e) => set("usageInstructions", e.target.value)} /><input className="input" placeholder="Ingredients" value={form.ingredients} onChange={(e) => set("ingredients", e.target.value)} /><input className="input" placeholder="Image URLs, comma separated" value={form.images} onChange={(e) => set("images", e.target.value)} /><input className="input" type="file" accept="image/*" onChange={(e) => upload(e.target.files[0])} disabled={uploading} /><label className="flex items-center gap-2 font700"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured</label><label className="flex items-center gap-2 font700"><input type="checkbox" checked={form.bestSeller} onChange={(e) => set("bestSeller", e.target.checked)} /> Best seller</label><button className="btn-primary">{editing ? "Update" : "Add"} product</button></form><div className="mt-6 overflow-auto card"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Flags</th><th>Action</th></tr></thead><tbody>{products.map((p) => <tr key={p._id} className="border-t"><td className="p-3 font700">{p.name}</td><td>{p.category?.name}</td><td>₹{p.discountPrice || p.price}</td><td className={p.stock <= 10 ? "font900 text-rose-500" : ""}>{p.stock}</td><td>{p.featured && "Featured "} {p.bestSeller && "Best"}</td><td><button onClick={() => edit(p)} className="mr-3 font700 text-mint">Edit</button><button onClick={() => del(p._id)} className="font700 text-rose-500">Delete</button></td></tr>)}</tbody></table></div></div>;
}
