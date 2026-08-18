const Appointment = require("../models/Appointment");

// =====================================================
// CREATE APPOINTMENT
// =====================================================

const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      date,
      time,
      notes,
      product,
      status,
    } = req.body;

    console.log("Appointment request received:");
    console.log(req.body);

    // =====================================================
    // CHECK NAME
    // =====================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Name can contain letters and spaces only",
      });
    }

    // =====================================================
    // CHECK PHONE
    // =====================================================

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits",
      });
    }

    // =====================================================
    // CHECK DATE
    // =====================================================

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Appointment date is required",
      });
    }

    // =====================================================
    // CHECK TIME
    // =====================================================

    if (!time) {
      return res.status(400).json({
        success: false,
        message: "Appointment time is required",
      });
    }

    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    const newAppointment = await Appointment.create({
      customer: {
        fullName: name.trim(),
        phone: phone,
        email: "",
      },

      appointment: {
        date: date,
        time: time,
        notes: notes ? notes.trim() : "",
      },

      productName: product || "",

      status: status || "Pending",
    });

    console.log(
      "Appointment saved successfully:",
      newAppointment
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });

  } catch (error) {
    console.error(
      "Create appointment error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL APPOINTMENTS - ADMIN
// =====================================================

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error(
      "Get appointments error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ONE APPOINTMENT
// =====================================================

const getAppointmentById = async (req, res) => {
  try {
    const appointment =
      await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid appointment ID",
    });
  }
};


// =====================================================
// UPDATE APPOINTMENT STATUS
// =====================================================

const updateAppointmentStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });

  } catch (error) {
    console.error(
      "Update appointment status error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE APPOINTMENT
// =====================================================

const deleteAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete appointment error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
};

