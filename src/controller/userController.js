const User = require("../model/userModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const getUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.send({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    })
  } catch (err) {
    res.send({
      status: "failed",
      message: err.message,
    })
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params;
    validateMongoDbId(userId);
    const user = await User.findById(userId);
    const { password, ...others } = user._doc;
    res.send({
      status: "success",
      message: "User fetched successfully",
      data: others,
    })
  } catch (err) {
    res.send({
      status: "failed",
      message: err.message,
    })
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params;
    validateMongoDbId(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    })
  } catch (err) {
    res.send({
      status: "failed",
      message: err.message,
    })
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params;
    validateMongoDbId(userId);
    const user = await User.findById(userId);
    res.send({
      status: "success",
      message: "User deleted successfully",
      data: user,
    })
  } catch (err) {
    res.send({
      status: "failed",
      message: err.message,
    })
  }
};

const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.send({
      status: "failed",
      message: err.message,
    })
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
};
