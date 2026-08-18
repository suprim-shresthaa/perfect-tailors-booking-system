const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const connectDB = require("./config/db");
const Appointment = require("./models/Appointment");

const productRoutes = require("./routes/productRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// =====================================================
// EXISTING ROUTES
// =====================================================

app.use("/api/admin", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


// =====================================================
// APPOINTMENT - CREATE
// =====================================================

app.post("/api/appointments", async (req, res) => {
  try {
    console.log("=================================");
    console.log("APPOINTMENT REQUEST RECEIVED");
    console.log(req.body);
    console.log("=================================");

    const {
      name,
      phone,
      date,
      time,
      notes,
      product,
    } = req.body;


    // -------------------------------------------------
    // NAME
    // -------------------------------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message:
          "Name can contain letters and spaces only",
      });
    }


    // -------------------------------------------------
    // PHONE
    // -------------------------------------------------

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits",
      });
    }


    // -------------------------------------------------
    // DATE
    // -------------------------------------------------

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Appointment date is required",
      });
    }


    // -------------------------------------------------
    // TIME
    // -------------------------------------------------

    if (!time) {
      return res.status(400).json({
        success: false,
        message: "Appointment time is required",
      });
    }


    // -------------------------------------------------
    // SAVE TO MONGODB
    // -------------------------------------------------

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

      status: "Pending",
    });


    console.log("=================================");
    console.log("APPOINTMENT SAVED SUCCESSFULLY");
    console.log(newAppointment);
    console.log("=================================");


    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });

  } catch (error) {
    console.error("=================================");
    console.error("APPOINTMENT ERROR");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =====================================================
// APPOINTMENT - GET ALL
// =====================================================

app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =====================================================
// APPOINTMENT - GET ONE
// =====================================================

app.get("/api/appointments/:id", async (req, res) => {
  try {
    const appointment =
      await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      appointment,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid appointment ID",
    });
  }
});


// =====================================================
// APPOINTMENT - UPDATE STATUS
// =====================================================

app.put(
  "/api/appointments/:id/status",
  async (req, res) => {
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

      return res.status(200).json({
        success: true,
        message: "Appointment status updated",
        appointment,
      });

    } catch (error) {
      console.error(
        "UPDATE APPOINTMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// =====================================================
// APPOINTMENT - DELETE
// =====================================================

app.delete(
  "/api/appointments/:id",
  async (req, res) => {
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

      return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });

    } catch (error) {
      console.error(
        "DELETE APPOINTMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.send("Perfect Tailors server is running");
});


// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("=================================");
      console.log("MongoDB connected successfully");
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Appointment API: http://localhost:${PORT}/api/appointments`
      );
      console.log("=================================");
    });

  } catch (error) {
    console.error("SERVER START ERROR:", error);
    process.exit(1);
  }
};

startServer();