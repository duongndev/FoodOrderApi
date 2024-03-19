const Cart = require("../model/cartModel");

module.exports = {
  // create cart
  createCart: async (req, res) => {
    try {
      const cart = await Cart.create(req.body);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update cart
  updateCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete cart
  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all carts
  getCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get user cart
  getUserCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
