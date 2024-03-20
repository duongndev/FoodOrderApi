const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Cart", CartSchema);
