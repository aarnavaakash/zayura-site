import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true },
    usageInstructions: String,
    ingredients: String,
    images: [String],
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 }
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Product", productSchema);
