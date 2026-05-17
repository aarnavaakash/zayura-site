import Product from "../models/Product.js";
import Review from "../models/Review.js";

export async function listProducts(req, res) {
  const { search, category, featured, bestSeller, sort = "newest" } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (featured) query.featured = featured === "true";
  if (bestSeller) query.bestSeller = bestSeller === "true";
  const sortMap = {
    newest: { createdAt: -1 },
    popular: { sold: -1, rating: -1 },
    price_low: { discountPrice: 1, price: 1 },
    price_high: { discountPrice: -1, price: -1 }
  };
  const products = await Product.find(query).populate("category").sort(sortMap[sort] || sortMap.newest);
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category");
  if (!product) return res.status(404).json({ message: "Product not found" });
  const reviews = await Review.find({ product: product._id }).populate("user", "name").sort({ createdAt: -1 });
  res.json({ product, reviews });
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
}

export async function addReview(req, res) {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await Review.findOneAndUpdate(
    { user: req.user._id, product: product._id },
    { rating, comment },
    { upsert: true, new: true, runValidators: true }
  );
  const reviews = await Review.find({ product: product._id });
  product.rating = reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  product.reviewCount = reviews.length;
  await product.save();
  res.status(201).json({ message: "Review saved" });
}
