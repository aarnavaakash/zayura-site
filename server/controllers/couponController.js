import Coupon from "../models/Coupon.js";

export async function validateCoupon(req, res) {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), active: true });
  if (!coupon) return res.status(404).json({ message: "Invalid coupon" });
  res.json(coupon);
}
