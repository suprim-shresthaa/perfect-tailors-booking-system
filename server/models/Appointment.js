const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // =====================================================
    // CUSTOMER
    // =====================================================

    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },
    },

    // =====================================================
    // APPOINTMENT
    // =====================================================

    appointment: {
      date: {
        type: String,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
        default: "",
      },
    },

    // =====================================================
    // PRODUCT
    // =====================================================

    productName: {
      type: String,
      default: "",
    },

    // =====================================================
    // STATUS
    // =====================================================

    status: {
      type: String,

      enum: [
        "Pending",
        "Confirmed",
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

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);