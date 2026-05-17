import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  const { products, shippingAddress, paymentMethod = "Cash on Delivery" } = req.body;
  if (!products?.length) return res.status(400).json({ message: "Cart is empty" });
  const ids = products.map((item) => item.product);
  const dbProducts = await Product.find({ _id: { $in: ids } });
  const items = products.map((item) => {
    const product = dbProducts.find((p) => p._id.toString() === item.product);
    if (!product) throw new Error("Product not found");
    const price = product.discountPrice || product.price;
    return { product: product._id, name: product.name, image: product.images?.[0], price, quantity: item.quantity };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const order = await Order.create({
    user: req.user._id,
    products: items,
    totalAmount: subtotal + delivery,
    shippingAddress,
    paymentMethod
  });
  await Promise.all(items.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity, sold: item.quantity } })));
  res.status(201).json(order);
}

export async function myOrders(req, res) {
  res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
}

export async function getOrder(req, res) {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.user = req.user._id;
  const order = await Order.findOne(query).populate("user", "name email phone");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}

export async function listOrders(req, res) {
  const { search } = req.query;
  const orders = await Order.find().populate("user", "name email phone").sort({ createdAt: -1 });
  const filtered = search
    ? orders.filter((order) => {
        const text = `${order._id} ${order.shippingAddress?.name} ${order.shippingAddress?.phone}`.toLowerCase();
        return text.includes(search.toLowerCase());
      })
    : orders;
  res.json(filtered);
}

export async function updateOrderStatus(req, res) {
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}
