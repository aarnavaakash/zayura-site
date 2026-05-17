import express from "express";
import { addReview, createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/", listProducts);
router.get("/:slug", getProduct);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.post("/:id/reviews", protect, addReview);

export default router;
