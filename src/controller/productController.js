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
    });
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
    });
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const products = await Product.find({ categories: { $in: [id] } });
    res.send({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// check count in stock for each product if count in stock is 0 then update status to false
const checkProductStock = async (req, res, next) => {
  try {
    const products = await Product.find();
    for (const product of products) {
      if (product.countInStock === 0) {
        await Product.findByIdAndUpdate(product._id, {
          status: "out of stock",
        });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

// if user by a product is deleting then decrease the count in stock

const decreaseProductStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const product = await Product.findById(id);
    if (product.countInStock > 0) {
      await Product.findByIdAndUpdate(product._id, {
        countInStock: product.countInStock - 1,
      });
    } else {
      await Product.findByIdAndUpdate(product._id, {
        status: "out of stock",
      });
    }
    
    next();
  } catch (err) {
    next(err);
  }
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
