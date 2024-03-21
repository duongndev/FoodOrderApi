const router = require("express").Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
} = require("../controller/categoryController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/verifyToken");

// create category
router.post("/", verifyTokenAndAuthorization, createCategory);

// update category
router.put("/:id", verifyTokenAndAdmin, updateCategory);

// delete category
router.delete("/:id", verifyTokenAndAdmin, deleteCategory);

// get category
router.get("/:id", verifyTokenAndAuthorization, getCategory);

// get categories
router.get("/", verifyTokenAndAuthorization, getCategories);

module.exports = router;