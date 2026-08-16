const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Men's Suits",
        "Shirts & Pants",
        "Accessories",
        "Custom Tailoring",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    // Available standard sizes
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],

    // Whether customer can enter custom measurements
    allowCustomMeasurements: {
      type: Boolean,
      default: false,
    },

    // Whether customer can book a tailoring appointment
    allowAppointment: {
      type: Boolean,
      default: true,
    },

    availableColors: [
      {
        type: String,
        trim: true,
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    sku: {
      type: String,
      trim: true,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);