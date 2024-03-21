const Category = require("../model/categoryModel");

const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.save({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    })
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    })
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send({
      success: true,
      message: "Category fetched successfully",
      data: category,
    })
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    })
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
};
