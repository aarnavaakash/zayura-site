import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/http";
import { readJson } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson("zayura_user", null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("zayura_token");
    if (!token) return;
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => logout());
  }, []);

  async function login(email, password) {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("zayura_token", data.token);
      localStorage.setItem("zayura_user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Logged in");
      return data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      localStorage.setItem("zayura_token", data.token);
      localStorage.setItem("zayura_user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Account created");
      return data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("zayura_token");
    localStorage.removeItem("zayura_user");
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
