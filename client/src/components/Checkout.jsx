import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNote: "",
    city: "",
    address: "",
    landmark: "",
  });

  const DELIVERY_CHARGE = 100;

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const total = subtotal + DELIVERY_CHARGE;

  const handlePromo = () => {
    if (!promoCode.trim()) return;

    setPromoApplied(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const order = {
      customer: form,
      products: cart,
      paymentMethod: "Cash on Delivery",
      subtotal,
      deliveryCharge: DELIVERY_CHARGE,
      total,
      promoCode,
      createdAt: new Date().toISOString(),
    };

    console.log("Order:", order);

    // Clear cart after placing order
    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));

    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-10">
            <CheckCircle
              size={60}
              className="mx-auto text-green-600"
            />

            <h1 className="mt-6 font-serif text-3xl font-bold">
              Order Placed Successfully
            </h1>

            <p className="mt-3 text-gray-600">
              Thank you for your order. We will contact you
              shortly to confirm your order and delivery.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-500"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* ================= CHECKOUT HEADER ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-amber-600"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <h1 className="mt-6 font-serif text-4xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your information to place your order.
          </p>

        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {cart.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">

            <h2 className="font-serif text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-500"
            >
              Browse Products
            </Link>

          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-10 lg:grid-cols-[1fr_400px]"
          >

            {/* ================================================= */}
            {/* LEFT SIDE - INFORMATION */}
            {/* ================================================= */}

            <div className="space-y-8">

              {/* GENERAL INFORMATION */}
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="font-serif text-2xl font-semibold">
                  1. General Information
                </h2>

                <div className="mt-6 space-y-5">

                  {/* FULL NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>

                    <input
                      required
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="eg: Ram Bahadur"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
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
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* ORDER NOTE */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Order Note
                    </label>

                    <textarea
                      name="orderNote"
                      value={form.orderNote}
                      onChange={handleChange}
                      rows="4"
                      placeholder="eg: I was searching for this product from so long."
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                </div>
              </section>

              {/* DELIVERY ADDRESS */}
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="font-serif text-2xl font-semibold">
                  Delivery Address
                </h2>

                <div className="mt-6 space-y-5">

                  {/* CITY */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City/District *
                    </label>

                    <input
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="eg: Kathmandu (inside ring road)"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Address *
                    </label>

                    <textarea
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="eg: Kathmandu, Tinkune"
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* LANDMARK */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Landmark
                    </label>

                    <input
                      name="landmark"
                      value={form.landmark}
                      onChange={handleChange}
                      placeholder="eg: Madan Bhandari Park"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                </div>
              </section>

              {/* PAYMENT */}
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="font-serif text-2xl font-semibold">
                  Payment Methods
                </h2>

                <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4">

                  <label className="flex cursor-pointer items-center gap-3">

                    <input
                      type="radio"
                      checked
                      readOnly
                      className="h-4 w-4 accent-amber-600"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Pay when your order is delivered.
                      </p>
                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE - ORDER SUMMARY */}
            {/* ================================================= */}

            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">

              <h2 className="font-serif text-2xl font-semibold">
                Order Summary
              </h2>

              {/* PRODUCTS */}
              <div className="mt-6 space-y-5">

                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 border-b border-gray-200 pb-5"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-slate-900">
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

                      <p className="mt-2 text-sm text-gray-600">
                        Rs.{" "}
                        {Number(item.price).toLocaleString()} x{" "}
                        {item.quantity}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* SUBTOTAL */}
              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Sub-total
                  </span>

                  <span className="font-medium">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery Charge
                  </span>

                  <span className="font-medium">
                    Rs. {DELIVERY_CHARGE.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                  <span>Total</span>

                  <span className="text-amber-600">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* PROMO CODE */}
              <div className="mt-7">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Promo Code
                </label>

                <div className="flex gap-2">

                  <input
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    placeholder="eg: FREE30"
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-gray-400 focus:border-amber-500"
                  />

                  <button
                    type="button"
                    onClick={handlePromo}
                    className="rounded-lg border border-amber-600 px-4 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-600 hover:text-white"
                  >
                    APPLY
                  </button>

                </div>

                {promoApplied && (
                  <p className="mt-2 text-xs text-green-600">
                    Promo code applied.
                  </p>
                )}

              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-amber-600 px-5 py-4 font-semibold text-white transition hover:bg-amber-500"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                By placing your order, you agree to our
                terms and conditions.
              </p>

            </aside>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default Checkout;