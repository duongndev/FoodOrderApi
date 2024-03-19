const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
} = require("../controller/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/verifyToken");

// get all users
router.get("/", getUsers);

// get user
router.get("/:id", verifyTokenAndAuthorization, getUser);

// update user
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// delete user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// get user stats
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
