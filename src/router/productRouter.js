const router = require('express').Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} = require('../controller/productController');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../config/verifyToken");

// create product
router.post("/", verifyTokenAndAdmin, createProduct);

// update product
router.put("/:id", verifyTokenAndAuthorization, updateProduct);

// delete product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// get all products
router.get("/", verifyTokenAndAuthorization, getProducts);

// get product by id
router.get("/:id", verifyTokenAndAuthorization, getProductById);

module.exports = router;