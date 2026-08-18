const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    size: {
      type: String,
      default: "",
    },

    useMeasurements: {
      type: Boolean,
      default: false,
    },

    measurements: {
      length: { type: String, default: "" },
      chest: { type: String, default: "" },
      waist: { type: String, default: "" },
      shoulder: { type: String, default: "" },
      sleeve: { type: String, default: "" },
      neck: { type: String, default: "" },
      knee: { type: String, default: "" },
      bottom: { type: String, default: "" },
      hip: { type: String, default: "" },
      highThigh: { type: String, default: "" },
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        required: true,
      },

      orderNote: {
        type: String,
        default: "",
      },
    },

    deliveryAddress: {
      city: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      landmark: {
        type: String,
        default: "",
      },
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 100,
    },

    total: {
      type: Number,
      required: true,
    },

    promoCode: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);