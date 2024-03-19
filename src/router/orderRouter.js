const router = require("express").Router();
const orderController = require("../controller/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../config/verifyToken");

// create order
router.post("/", verifyToken, orderController.createOrder);

// update order
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);

// delete order
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);

// get all orders
router.get("/", verifyTokenAndAdmin, orderController.getOrders);

// get user orders
router.get( "/:userId", verifyTokenAndAuthorization, orderController.getUserOrders);

// get monthly income
router.get( "/income", verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;
