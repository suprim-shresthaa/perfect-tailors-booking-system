import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api/appointments";

function Appointment() {
  const [searchParams] = useSearchParams();

  // If appointment comes from a product page:
  // /appointment?product=Coat
  // productName will be "Coat"
  //
  // If appointment comes from Home/Dashboard:
  // /appointment
  // productName will be ""
  const productName = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    hour: "",
    minute: "",
    period: "AM",
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

      setForm((current) => ({
        ...current,
        name: onlyLettersAndSpaces,
      }));

      return;
    }

    // PHONE - NUMBERS ONLY, MAX 10 DIGITS
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      setForm((current) => ({
        ...current,
        phone: onlyNumbers.slice(0, 10),
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitted(false);

    // =====================================================
    // VALIDATE PHONE
    // =====================================================

    if (!/^\d{10}$/.test(form.phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    // =====================================================
    // VALIDATE NAME
    // =====================================================

    if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      setError(
        "Name can contain letters and spaces only."
      );
      return;
    }

    // =====================================================
    // VALIDATE DATE
    // =====================================================

    if (!form.date) {
      setError("Please select an appointment date.");
      return;
    }

    // =====================================================
    // VALIDATE TIME
    // =====================================================

    if (!form.hour || !form.minute || !form.period) {
      setError("Please select an appointment time.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // CREATE TIME
      // Example: 10:30 PM
      // =====================================================

      const appointmentTime = `${form.hour}:${form.minute} ${form.period}`;

      // =====================================================
      // DATA SENT TO BACKEND
      // =====================================================

      const appointmentData = {
        product: productName,
        name: form.name.trim(),
        phone: form.phone,
        date: form.date,
        time: appointmentTime,
        notes: form.notes.trim(),
        status: "Pending",
      };

      console.log(
        "Sending appointment to backend:",
        appointmentData
      );

      // =====================================================
      // SEND TO BACKEND
      // =====================================================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(appointmentData),
      });

      // =====================================================
      // READ RESPONSE SAFELY
      // =====================================================

      const contentType =
        response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          `Server returned an unexpected response (${response.status}).`
        );
      }

      console.log("Backend response:", data);

      // =====================================================
      // BACKEND ERROR
      // =====================================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create appointment."
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

      // =====================================================
      // CLEAR FORM
      // =====================================================

      setForm({
        name: "",
        phone: "",
        date: "",
        hour: "",
        minute: "",
        period: "AM",
        notes: "",
      });

    } catch (err) {
      console.error(
        "Appointment submission error:",
        err
      );

      // Handle internet/backend connection problem
      if (
        err.message === "Failed to fetch"
      ) {
        setError(
          "Unable to connect to the server. Please make sure the backend server is running on port 5000."
        );
      } else {
        setError(
          err.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // TODAY'S DATE
  // =====================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =====================================================
  // RENDER
  // =====================================================

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
            {/* DATE */}
            {/* ================================================= */}

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
                min={today}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
              />

            </div>

            {/* ================================================= */}
            {/* TIME */}
            {/* ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Preferred Time *
              </label>

              <div className="grid grid-cols-3 gap-2">

                {/* HOUR */}

                <select
                  required
                  value={form.hour}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      hour: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-500"
                >

                  <option value="">
                    Hour
                  </option>

                  {Array.from(
                    { length: 12 },
                    (_, index) => {
                      const hour = String(
                        index + 1
                      ).padStart(2, "0");

                      return (
                        <option
                          key={hour}
                          value={hour}
                        >
                          {hour}
                        </option>
                      );
                    }
                  )}

                </select>

                {/* MINUTE */}

                <select
                  required
                  value={form.minute}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      minute: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-500"
                >

                 <option value="">
  Minute
</option>

{Array.from({ length: 60 }, (_, index) => {
  const minute = String(index).padStart(2, "0");

  return (
    <option key={minute} value={minute}>
      {minute}
    </option>
  );
})}

                </select>

                {/* AM / PM */}

                <select
                  required
                  value={form.period}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      period: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-500"
                >

                  <option value="AM">
                    AM
                  </option>

                  <option value="PM">
                    PM
                  </option>

                </select>

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Select your preferred time in AM/PM format.
              </p>

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
            {/* APPOINTMENT SUMMARY */}
            {/* ================================================= */}

            {form.hour &&
              form.minute &&
              form.period && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">

                  <p className="text-sm text-gray-500">
                    Selected appointment time
                  </p>

                  <p className="mt-1 text-lg font-semibold text-amber-700">
                    {form.hour}:{form.minute}{" "}
                    {form.period}
                  </p>

                </div>
              )}

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