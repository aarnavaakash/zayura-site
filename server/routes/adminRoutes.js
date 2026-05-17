import express from "express";
import { contactMessages, customerOrders, customers, dashboard } from "../controllers/adminController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
router.use(protect, adminOnly);
router.get("/dashboard", dashboard);
router.get("/customers", customers);
router.get("/customers/:id/orders", customerOrders);
router.get("/contacts", contactMessages);

export default router;
