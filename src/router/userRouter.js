const router = require("express").Router();
const userController = require("../controller/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/verifyToken");

// get all users
router.get("/",  verifyTokenAndAdmin, userController.getUsers);

// get user
router.get("/:id", verifyTokenAndAdmin, userController.getUserById);

// update user
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

// delete user
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

// get user stats
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);

module.exports = router;
