import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [["/", "Home"], ["/products", "Products"], ["/about", "About"], ["/contact", "Contact"]];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="container-pad flex h-18 items-center justify-between gap-4 py-3">
          <Link to="/" className="text-2xl font900 tracking-tight text-ink">Zayura</Link>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm font700 ${isActive ? "text-ink" : "text-slate-500 hover:text-ink"}`}>{label}</NavLink>)}
            {user?.role === "admin" && <NavLink to="/admin" className="text-sm font700 text-mint">Admin</NavLink>}
          </nav>
          <form onSubmit={submit} className="hidden max-w-xs flex-1 items-center rounded-lg bg-slate-50 px-3 ring-1 ring-slate-100 lg:flex">
            <Search size={18} className="text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent px-2 py-2 outline-none" placeholder="Search cleaners" />
          </form>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative rounded-lg p-2 hover:bg-slate-100"><ShoppingBag size={22} />{items.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-mint px-1.5 text-xs font700">{items.length}</span>}</Link>
            <Link to={user ? "/my-orders" : "/login"} className="rounded-lg p-2 hover:bg-slate-100"><UserRound size={22} /></Link>
            {user && <button onClick={logout} className="hidden text-sm font700 text-slate-500 md:block">Logout</button>}
            <button onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && <div className="container-pad grid gap-3 pb-4 md:hidden">{links.map(([to, label]) => <Link key={to} onClick={() => setOpen(false)} to={to} className="font700">{label}</Link>)}</div>}
      </header>
      <Outlet />
      <footer className="mt-16 border-t border-slate-100 bg-white">
        <div className="container-pad grid gap-8 py-10 md:grid-cols-4">
          <div><div className="text-2xl font900">Zayura</div><p className="mt-3 text-sm text-slate-500">Clean Spaces, Healthy Living.</p></div>
          <div><b>Shop</b><p className="mt-3 text-sm text-slate-500">Floor, kitchen, glass, toilet, disinfectant and personal hygiene cleaners.</p></div>
          <div><b>Support</b><p className="mt-3 text-sm text-slate-500">COD orders, WhatsApp help, fast local delivery.</p></div>
          <div><b>Newsletter</b><div className="mt-3 flex gap-2"><input className="input" placeholder="Email" /><button className="btn-primary">Join</button></div></div>
        </div>
      </footer>
    </div>
  );
}
