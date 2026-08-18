const express = require("express");

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();


// =====================================================
// CREATE APPOINTMENT
// POST /api/appointments
// =====================================================

router.post("/", createAppointment);


// =====================================================
// GET ALL APPOINTMENTS
// GET /api/appointments
// =====================================================

router.get("/", getAppointments);


// =====================================================
// GET ONE APPOINTMENT
// GET /api/appointments/:id
// =====================================================

router.get("/:id", getAppointmentById);


// =====================================================
// UPDATE STATUS
// PUT /api/appointments/:id/status
// =====================================================

router.put("/:id/status", updateAppointmentStatus);


// =====================================================
// DELETE
// DELETE /api/appointments/:id
// =====================================================

router.delete("/:id", deleteAppointment);


module.exports = router;