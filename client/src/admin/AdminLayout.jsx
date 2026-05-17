import { LayoutDashboard, Boxes, ListTree, ShoppingBag, Users, MessagesSquare, Store } from "lucide-react";
import { NavLink, Outlet, Link } from "react-router-dom";

const links = [
  ["", "Dashboard", LayoutDashboard],
  ["products", "Products", Boxes],
  ["categories", "Categories", ListTree],
  ["orders", "Orders", ShoppingBag],
  ["customers", "Customers", Users],
  ["messages", "Messages", MessagesSquare]
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 lg:block">
        <Link to="/" className="flex items-center gap-2 text-2xl font900"><Store className="text-mint" /> Zayura</Link>
        <nav className="mt-8 grid gap-2">{links.map(([to, label, Icon]) => <NavLink key={label} end={to === ""} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 font700 ${isActive ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"}`}><Icon size={18} />{label}</NavLink>)}</nav>
      </aside>
      <main className="lg:pl-64">
        <div className="sticky top-0 z-20 border-b bg-white/90 p-4 backdrop-blur lg:hidden"><div className="flex gap-2 overflow-auto">{links.map(([to, label]) => <NavLink key={label} end={to === ""} to={to} className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font700">{label}</NavLink>)}</div></div>
        <div className="p-4 sm:p-6 lg:p-8"><Outlet /></div>
      </main>
    </div>
  );
}
