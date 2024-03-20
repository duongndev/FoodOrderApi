const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
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
    address: {
      type: Object,
      required: true,
      default: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      }
    },
    totalAmount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending" 
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Order", OrderSchema);
