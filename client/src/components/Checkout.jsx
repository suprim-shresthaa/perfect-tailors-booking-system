import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api/orders";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNote: "",
    city: "",
    address: "",
    landmark: "",
    paymentMethod: "Cash on Delivery",
    promoCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // =====================================================
  // LOAD CART
  // =====================================================

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // FULL NAME - LETTERS AND SPACES ONLY
    if (name === "fullName") {
      const onlyLettersAndSpaces = value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );

      setForm({
        ...form,
        fullName: onlyLettersAndSpaces,
      });

      return;
    }

    // PHONE - NUMBERS ONLY, MAXIMUM 10 DIGITS
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
  // CALCULATE SUBTOTAL
  // =====================================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );

  // =====================================================
  // DELIVERY CHARGE
  // =====================================================

  const deliveryCharge = cart.length > 0 ? 100 : 0;

  const total = subtotal + deliveryCharge;

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CHECK CART
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // CHECK NAME
    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // CHECK PHONE
    if (!/^\d{10}$/.test(form.phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Convert cart into order items
      const orderItems = cart.map((item) => ({
        productId: item.productId || item._id,
        name: item.name,
        image: item.image || "",
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        size: item.size || "",
        useMeasurements:
          item.useMeasurements || false,

        measurements:
          item.measurements || {
            length: "",
            chest: "",
            waist: "",
            shoulder: "",
            sleeve: "",
            neck: "",
            knee: "",
            bottom: "",
            hip: "",
            highThigh: "",
          },
      }));

      // SEND ORDER TO BACKEND
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            orderNote: form.orderNote,
          },

          deliveryAddress: {
            city: form.city,
            address: form.address,
            landmark: form.landmark,
          },

          items: orderItems,

          paymentMethod: form.paymentMethod,

          subtotal,

          deliveryCharge,

          total,

          promoCode: form.promoCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      // SAVE ORDER ID
      setOrderNumber(
        data.order?._id || ""
      );

      // CLEAR CART
      localStorage.removeItem("cart");

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      setOrderPlaced(true);
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      setError(
        error.message ||
          "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (!orderPlaced && cart.length === 0) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add a product before proceeding
            to checkout.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-500"
          >
            Browse Products
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  // =====================================================
  // ORDER SUCCESS
  // =====================================================

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-10">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
              ✓
            </div>

            <h1 className="mt-6 font-serif text-4xl font-bold text-green-700">
              Order Placed Successfully
            </h1>

            <p className="mt-4 text-gray-600">
              Thank you for your order.
              We will contact you shortly
              to confirm your order.
            </p>

            {orderNumber && (
              <p className="mt-4 text-sm text-gray-500">
                Order ID:

                <span className="ml-2 font-semibold text-slate-900">
                  {orderNumber}
                </span>
              </p>
            )}

            <Link
              to="/products"
              className="mt-8 inline-block rounded-lg bg-amber-600 px-7 py-3 font-semibold text-white hover:bg-amber-500"
            >
              Continue Shopping
            </Link>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // =====================================================
  // CHECKOUT PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-white text-slate-900">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-600">
            Perfect Tailors
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your information to place
            your order.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1fr_400px]"
        >

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="space-y-8">

            {/* GENERAL INFORMATION */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-serif text-2xl font-semibold">
                1. General Information
              </h2>

              <div className="mt-6 space-y-5">

                {/* FULL NAME */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Full Name *
                  </label>

                  <input
                    required
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="eg: Ram Bahadur"
                    pattern="[A-Za-z\s]+"
                    title="Name can contain letters and spaces only"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Letters and spaces only
                  </p>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="eg: john@gmail.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

                {/* PHONE */}

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
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Enter exactly 10 digits
                  </p>

                </div>

                {/* ORDER NOTE */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Order Note
                  </label>

                  <textarea
                    name="orderNote"
                    value={form.orderNote}
                    onChange={handleChange}
                    rows="4"
                    placeholder="eg: I was searching for this product from so long."
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

              </div>

            </section>

            {/* DELIVERY ADDRESS */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-serif text-2xl font-semibold">
                Delivery Address
              </h2>

              <div className="mt-6 space-y-5">

                {/* CITY */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    City / District *
                  </label>

                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Kathmandu inside ring road"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Address *
                  </label>

                  <input
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="eg: Kathmandu, Tinkune"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

                {/* LANDMARK */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Landmark
                  </label>

                  <input
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="eg: Madan Bhandari Park"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

              </div>

            </section>

            {/* PAYMENT */}

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-serif text-2xl font-semibold">
                Payment Methods
              </h2>

              <div className="mt-6">

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-amber-500 bg-amber-50 p-4">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={
                      form.paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={handleChange}
                  />

                  <span className="font-medium">
                    Cash on Delivery
                  </span>

                </label>

              </div>

            </section>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE - ORDER SUMMARY */}
          {/* ================================================= */}

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="font-serif text-2xl font-semibold">
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div className="mt-6 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 border-b border-slate-200 pb-5"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    {item.size && (
                      <p className="mt-1 text-sm text-gray-500">
                        Variant: {item.size}
                      </p>
                    )}

                    {item.useMeasurements && (
                      <p className="mt-1 text-xs text-amber-600">
                        Custom measurements
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      Rs.{" "}
                      {Number(
                        item.price
                      ).toLocaleString()}{" "}
                      x {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    Rs.{" "}
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>

            {/* SUBTOTAL */}

            <div className="mt-6 flex justify-between border-b border-slate-200 pb-4">

              <span className="text-gray-500">
                Sub-total
              </span>

              <span className="font-semibold">
                Rs.{" "}
                {subtotal.toLocaleString()}
              </span>

            </div>

            {/* DELIVERY */}

            <div className="mt-4 flex justify-between">

              <span className="text-gray-500">
                Delivery Charge
              </span>

              <span className="font-semibold">
                Rs.{" "}
                {deliveryCharge.toLocaleString()}
              </span>

            </div>

            {/* TOTAL */}

            <div className="mt-6 flex justify-between border-t border-slate-200 pt-5 text-xl font-bold">

              <span>Total</span>

              <span>
                Rs.{" "}
                {total.toLocaleString()}
              </span>

            </div>

            {/* PROMO CODE */}

            <div className="mt-7">

              <label className="mb-2 block text-sm font-medium">
                Promo Code
              </label>

              <div className="flex gap-2">

                <input
                  name="promoCode"
                  value={form.promoCode}
                  onChange={handleChange}
                  placeholder="eg: FREE30"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-amber-500"
                />

                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold hover:bg-slate-100"
                >
                  APPLY
                </button>

              </div>

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-lg bg-amber-600 px-5 py-4 font-semibold text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </aside>

        </form>

      </main>

      <Footer />

    </div>
  );
}

export default Checkout;