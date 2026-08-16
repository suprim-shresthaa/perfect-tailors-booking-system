import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Appointment() {
  const [searchParams] = useSearchParams();

  const productName = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderNote: "",
    city: "",
    address: "",
    landmark: "",
    date: "",
    time: "",
    paymentMethod: "Cash on Delivery",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      product: productName,
      ...form,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">

        {/* ================= TITLE ================= */}
        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
            Perfect Tailors
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
            Book Appointment
          </h1>

          <p className="mt-3 text-gray-500">
            Book your fitting, measurement, or tailoring
            appointment with us.
          </p>

        </div>

        {/* ================= PRODUCT ================= */}
        {productName && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">

            <p className="text-sm text-gray-500">
              Appointment for
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {productName}
            </p>

          </div>
        )}

        {/* ================= SUCCESS ================= */}
        {submitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl text-green-600">
                ✓
              </span>
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-gray-900">
              Appointment Request Sent
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Thank you for choosing Perfect Tailors.
              We have received your appointment request
              and will contact you to confirm the details.
            </p>

          </div>
        ) : (

          <form onSubmit={handleSubmit}>

            {/* ================================================= */}
            {/* GENERAL INFORMATION */}
            {/* ================================================= */}

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="font-serif text-2xl font-semibold text-gray-900">
                1. General Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Please provide your contact information.
              </p>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">

                {/* FULL NAME */}
                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>

                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="eg: Ram Bahadur"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="eg: john@gmail.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* PHONE */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="eg: 9862200000"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* ORDER NOTE */}
                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Order Note
                    <span className="ml-1 font-normal text-gray-400">
                      (any message for us)
                    </span>
                  </label>

                  <textarea
                    name="orderNote"
                    value={form.orderNote}
                    onChange={handleChange}
                    rows="4"
                    placeholder="eg: I was searching for this product from so long."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

              </div>

            </section>


            {/* ================================================= */}
            {/* DELIVERY ADDRESS */}
            {/* ================================================= */}

            <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="font-serif text-2xl font-semibold text-gray-900">
                2. Delivery Address
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where should we deliver your order?
              </p>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">

                {/* CITY */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City / District *
                  </label>

                  <input
                    required
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="eg: Kathmandu"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* ADDRESS */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Address *
                  </label>

                  <input
                    required
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="eg: Kathmandu, Tinkune"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* LANDMARK */}
                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Landmark
                  </label>

                  <input
                    type="text"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="eg: Madan Bhandari Park"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

              </div>

            </section>


            {/* ================================================= */}
            {/* APPOINTMENT */}
            {/* ================================================= */}

            <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="font-serif text-2xl font-semibold text-gray-900">
                3. Appointment Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose your preferred appointment date and time.
              </p>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">

                {/* DATE */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Appointment Date *
                  </label>

                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

                {/* TIME */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Preferred Time *
                  </label>

                  <input
                    required
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />

                </div>

              </div>

            </section>


            {/* ================================================= */}
            {/* PAYMENT */}
            {/* ================================================= */}

            <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="font-serif text-2xl font-semibold text-gray-900">
                4. Payment Methods
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select your preferred payment method.
              </p>

              <div className="mt-6">

                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-amber-500 bg-amber-50 p-5">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={
                      form.paymentMethod === "Cash on Delivery"
                    }
                    onChange={handleChange}
                    className="h-4 w-4 accent-amber-600"
                  />

                  <div>

                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order is delivered.
                    </p>

                  </div>

                </label>

              </div>

            </section>


            {/* ================================================= */}
            {/* SUBMIT */}
            {/* ================================================= */}

            <div className="mt-8">

              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-amber-600"
              >
                BOOK APPOINTMENT
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                By booking this appointment, you agree to
                our terms and conditions.
              </p>

            </div>

          </form>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default Appointment; 