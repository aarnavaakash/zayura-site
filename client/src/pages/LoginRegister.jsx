import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginRegister() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const user = mode === "login" ? await login(form.email, form.password) : await register(form);
    navigate(user.role === "admin" ? "/admin" : "/");
  };
  return <main className="container-pad py-16"><form onSubmit={submit} className="card mx-auto grid max-w-md gap-4 p-6"><h1 className="text-3xl font900">{mode === "login" ? "Login" : "Create account"}</h1>{mode === "register" && <><input className="input" required placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="input" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} /></>}<input className="input" required type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><input className="input" required type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><button disabled={loading} className="btn-primary">{mode === "login" ? "Login" : "Sign up"}</button><button type="button" className="text-sm font700 text-mint" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Need an account?" : "Already have an account?"}</button></form></main>;
}
