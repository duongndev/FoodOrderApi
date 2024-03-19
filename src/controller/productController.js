const Product = require("../model/productModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    })
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const product = await Product.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "Product deleted successfully",
      data: product,
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.send({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const product = await Product.findById(id);
    if (!product) {
      res.send({
        success: false,
        message: "Product not found",
      });
    }
    res.send({
      success: true,
      message: "Product fetched successfully",
      data: product,
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
