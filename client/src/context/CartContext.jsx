import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { readJson } from "../utils/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readJson("zayura_cart", []));
  const [wishlist, setWishlist] = useState(() => readJson("zayura_wishlist", []));

  const persist = (next) => {
    setItems(next);
    localStorage.setItem("zayura_cart", JSON.stringify(next));
  };

  function addToCart(product, quantity = 1) {
    const next = [...items];
    const found = next.find((item) => item._id === product._id);
    if (found) found.quantity += quantity;
    else next.push({ ...product, quantity });
    persist(next);
    toast.success("Added to cart");
  }

  function updateQuantity(id, quantity) {
    persist(items.map((item) => (item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }

  function removeItem(id) {
    persist(items.filter((item) => item._id !== id));
  }

  function clearCart() {
    persist([]);
  }

  function toggleWishlist(product) {
    const exists = wishlist.some((item) => item._id === product._id);
    const next = exists ? wishlist.filter((item) => item._id !== product._id) : [...wishlist, product];
    setWishlist(next);
    localStorage.setItem("zayura_wishlist", JSON.stringify(next));
  }

  const subtotal = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const delivery = items.length ? (subtotal >= 499 ? 0 : 49) : 0;
  const value = useMemo(() => ({ items, wishlist, subtotal, delivery, total: subtotal + delivery, addToCart, updateQuantity, removeItem, clearCart, toggleWishlist }), [items, wishlist, subtotal, delivery]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
