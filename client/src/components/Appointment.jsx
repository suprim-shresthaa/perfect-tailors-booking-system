import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api/appointments";

function Appointment() {
  const [searchParams] = useSearchParams();

  const productName = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // NAME - LETTERS AND SPACES ONLY
    if (name === "name") {
      const onlyLettersAndSpaces = value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );

      setForm({
        ...form,
        name: onlyLettersAndSpaces,
      });

      return;
    }

    // PHONE - NUMBERS ONLY, MAX 10 DIGITS
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      setForm({
        ...form,
        phone: onlyNumbers.slice(0, 10),
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitted(false);

    // CHECK PHONE
    if (!/^\d{10}$/.test(form.phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    // CHECK NAME
    if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      setError(
        "Name can contain letters and spaces only."
      );
      return;
    }

    // CHECK DATE
    if (!form.date) {
      setError("Please select an appointment date.");
      return;
    }

    // CHECK TIME
    if (!form.time) {
      setError("Please select an appointment time.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // DATA SENT TO BACKEND
      // =====================================================

      const appointmentData = {
        product: productName,
        name: form.name.trim(),
        phone: form.phone,
        date: form.date,
        time: form.time,
        notes: form.notes.trim(),
        status: "Pending",
      };

      console.log(
        "Sending appointment to backend:",
        appointmentData
      );

      // =====================================================
      // SEND TO MONGODB THROUGH BACKEND
      // =====================================================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      // =====================================================
      // BACKEND ERROR
      // =====================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create appointment."
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      console.log(
        "Appointment successfully saved:",
        data
      );

      setSubmitted(true);

      // Clear form
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      });

    } catch (err) {
      console.error(
        "Appointment submission error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      <Navbar />

      <main className="mx-auto max-w-3xl px-5 py-14 lg:px-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div>

          <p className="text-sm uppercase tracking-[0.2em] text-amber-600">
            Perfect Tailors
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold">
            Book an Appointment
          </h1>

          <p className="mt-3 text-gray-500">
            Book a professional fitting or tailoring
            consultation with us.
          </p>

        </div>

        {/* ================================================= */}
        {/* PRODUCT */}
        {/* ================================================= */}

        {productName && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm text-gray-500">
              Appointment for
            </p>

            <p className="mt-1 font-semibold text-amber-600">
              {productName}
            </p>

          </div>
        )}

        {/* ================================================= */}
        {/* SUCCESS */}
        {/* ================================================= */}

        {submitted ? (

          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white">
              ✓
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-green-700">
              Appointment Request Sent
            </h2>

            <p className="mt-3 text-gray-600">
              Thank you. We will contact you to confirm
              your appointment.
            </p>

          </div>

        ) : (

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">

                <p className="text-sm text-red-600">
                  {error}
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* NAME */}
            {/* ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name *
              </label>

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="eg: Ram Bahadur"
                pattern="[A-Za-z\s]+"
                title="Name can contain letters and spaces only"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Letters and spaces only
              </p>

            </div>

            {/* ================================================= */}
            {/* PHONE */}
            {/* ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Phone Number *
              </label>

              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="eg: 9862200000"
                inputMode="numeric"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                title="Phone number must contain exactly 10 digits"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Enter exactly 10 digits
              </p>

            </div>

            {/* ================================================= */}
            {/* DATE + TIME */}
            {/* ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* DATE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Appointment Date *
                </label>

                <input
                  required
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                />

              </div>

              {/* TIME */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Preferred Time *
                </label>

                <input
                  required
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                />

              </div>

            </div>

            {/* ================================================= */}
            {/* NOTES */}
            {/* ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us anything we should know..."
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500"
              />

            </div>

            {/* ================================================= */}
            {/* SUBMIT */}
            {/* ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg px-5 py-4 font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-amber-600 hover:bg-amber-500"
              }`}
            >
              {loading
                ? "Sending Appointment..."
                : "Request Appointment"}
            </button>

          </form>

        )}

      </main>

      <Footer />

    </div>
  );
}

export default Appointment;

