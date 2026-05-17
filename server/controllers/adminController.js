import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import ContactMessage from "../models/ContactMessage.js";

export async function dashboard(req, res) {
  const [totalProducts, totalOrders, totalCustomers, delivered, recentOrders, lowStock] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: "user" }),
    Order.find({ orderStatus: "Delivered" }),
    Order.find().populate("user", "name").sort({ createdAt: -1 }).limit(8),
    Product.find({ stock: { $lte: 10 } }).limit(10)
  ]);
  res.json({
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue: delivered.reduce((sum, order) => sum + order.totalAmount, 0),
    recentOrders,
    lowStock
  });
}

export async function customers(req, res) {
  res.json(await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 }));
}

export async function customerOrders(req, res) {
  res.json(await Order.find({ user: req.params.id }).sort({ createdAt: -1 }));
}

export async function contactMessages(req, res) {
  res.json(await ContactMessage.find().sort({ createdAt: -1 }));
}
