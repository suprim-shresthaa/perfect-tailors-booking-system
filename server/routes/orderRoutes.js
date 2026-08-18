const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Customer places order
router.post("/", createOrder);

// Admin gets all orders
router.get("/", getOrders);

// Admin gets one order
router.get("/:id", getOrderById);

// Admin changes order status
router.put("/:id/status", updateOrderStatus);

// Admin deletes order
router.delete("/:id", deleteOrder);

module.exports = router;