import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { ensureAdminUser } from "./config/ensureAdmin.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import { errorHandler, notFound } from "./middleware/error.js";

const app = express();
const allowedOrigins = process.env.CLIENT_URL
  ?.split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin || !allowedOrigins?.length || allowedOrigins.includes("*")) return true;
  return allowedOrigins.some((allowedOrigin) => {
    if (allowedOrigin.includes("*")) {
      const pattern = new RegExp(`^${allowedOrigin
        .split("*")
        .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*")}$`);
      return pattern.test(origin);
    }
    return allowedOrigin === origin;
  });
}

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  }
}));
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => res.json({ name: "Zayura API", status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/coupons", couponRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB()
  .then(ensureAdminUser)
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)));
