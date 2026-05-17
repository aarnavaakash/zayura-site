import express from "express";
import { createOrder, getOrder, listOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/mine", protect, myOrders);
router.get("/", protect, adminOnly, listOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
