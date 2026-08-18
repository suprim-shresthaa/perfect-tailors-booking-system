const Order = require("../models/Order");

// =====================================================
// CREATE ORDER
// =====================================================
const createOrder = async (req, res) => {
  try {
    const {
      customer,
      deliveryAddress,
      items,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
      promoCode,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!customer?.fullName || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Full name and phone number are required",
      });
    }

    if (
      !deliveryAddress?.city ||
      !deliveryAddress?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery city and address are required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // =================================================
    // CREATE ORDER
    // =================================================

    const order = await Order.create({
      customer: {
        fullName: customer.fullName,
        email: customer.email || "",
        phone: customer.phone,
        orderNote: customer.orderNote || "",
      },

      deliveryAddress: {
        city: deliveryAddress.city,
        address: deliveryAddress.address,
        landmark: deliveryAddress.landmark || "",
      },

      items,

      paymentMethod:
        paymentMethod || "Cash on Delivery",

      subtotal: Number(subtotal) || 0,

      deliveryCharge:
        Number(deliveryCharge) || 100,

      total: Number(total) || 0,

      promoCode: promoCode || "",

      status: "Pending",
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL ORDERS - ADMIN
// =====================================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// =====================================================
// GET SINGLE ORDER
// =====================================================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid order ID",
    });
  }
};

// =====================================================
// UPDATE ORDER STATUS - ADMIN
// =====================================================

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

// =====================================================
// DELETE ORDER - ADMIN
// =====================================================

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};