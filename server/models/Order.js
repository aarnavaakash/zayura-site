import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        image: String,
        price: Number,
        quantity: Number
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      state: String,
      pincode: String
    },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
