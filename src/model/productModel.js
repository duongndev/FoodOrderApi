const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      unique: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    imgUrl: { 
      type: String, 
    },
    categories: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    size: { 
      type: String,
    },
    price: { 
      type: Number, 
      required: true 
    },
    countInStock: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["new", "hot", "sale", "out of stock"],
      default: "new",
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Products", ProductSchema);
