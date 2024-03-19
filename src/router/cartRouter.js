const router = require("express").Router();
const cartController = require("../controller/cartController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/verifyToken");

// create cart
router.post("/", verifyToken, cartController.createCart);

// update cart
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);

// delete cart
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);

// get user cart
router.get("/:userId", verifyTokenAndAuthorization, cartController.getUserCart);

// get all carts
router.get("/", verifyTokenAndAdmin, cartController.getCarts);


module.exports = router;
