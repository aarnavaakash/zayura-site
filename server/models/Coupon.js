import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercent: { type: Number, min: 1, max: 90, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
