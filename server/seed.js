import "dotenv/config";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Coupon from "./models/Coupon.js";
import slugify from "slugify";

await connectDB();

const adminEmail = process.env.ADMIN_EMAIL || "admin@zayura.com";
const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
let admin = await User.findOne({ email: adminEmail });
if (!admin) {
  admin = new User({ email: adminEmail });
}
admin.name = process.env.ADMIN_NAME || "Zayura Admin";
admin.phone = process.env.ADMIN_PHONE || "9999999999";
admin.password = adminPassword;
admin.role = "admin";
await admin.save();

const names = ["Floor Cleaner", "Bathroom Cleaner", "Kitchen Cleaner", "Glass Cleaner", "Dishwash Liquid", "Handwash", "Disinfectant", "Toilet Cleaner"];
const categories = await Promise.all(names.map((name) => Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true })));
const image = "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80";
await Promise.all(
  categories.map((category, index) => {
    const name = `Zayura ${category.name}`;
    const slug = slugify(name, { lower: true, strict: true });
    return Product.findOneAndUpdate(
      { slug },
      {
        name,
        slug,
        category: category._id,
        price: 199 + index * 25,
        discountPrice: 149 + index * 20,
        stock: 40,
        description: "A premium cleaning formula made for everyday hygiene, fresh fragrance, and dependable results.",
        usageInstructions: "Dilute as needed, apply on the surface, scrub gently, and rinse or wipe clean.",
        ingredients: "Plant-based surfactants, fragrance, purified water, disinfecting agents.",
        images: [image],
        featured: index < 4,
        bestSeller: index % 2 === 0,
        rating: 4.6
      },
      { upsert: true, new: true }
    );
  })
);
await Coupon.findOneAndUpdate({ code: "ZAYURA10" }, { code: "ZAYURA10", discountPercent: 10, active: true }, { upsert: true });

console.log(`Seed complete. Admin: ${adminEmail}`);
process.exit(0);
