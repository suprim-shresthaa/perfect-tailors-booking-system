import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  const [cart, setCart] = useState([]);

  // =====================================================
  // LOAD CART
  // =====================================================
  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================
  const updateCart = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];

    updatedCart[index].quantity = newQuantity;

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================
  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =====================================================
  // SUBTOTAL
  // =====================================================
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <Navbar />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        {/* CONTINUE SHOPPING */}

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-amber-600"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        {/* PAGE TITLE */}

        <h1 className="mt-8 font-serif text-4xl font-bold text-slate-900">
          Shopping Cart
        </h1>

        {/* ================================================= */}
        {/* EMPTY CART */}
        {/* ================================================= */}

        {cart.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">

            <h2 className="font-serif text-2xl font-semibold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to your cart.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-500"
            >
              Browse Products
            </Link>

          </div>
        ) : (

          /* ================================================= */
          /* CART CONTENT */
          /* ================================================= */

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">

            {/* ================================================= */}
            {/* CART ITEMS */}
            {/* ================================================= */}

            <div className="space-y-4">

              {cart.map((item, index) => (

                <div
                  key={
                    item.cartItemId ||
                    `${item._id}-${index}`
                  }
                  className="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-amber-300"
                >

                  {/* PRODUCT IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-24 rounded-lg object-cover"
                  />

                  {/* PRODUCT INFORMATION */}

                  <div className="min-w-0 flex-1">

                    {/* CATEGORY */}

                    <p className="text-xs uppercase tracking-wider text-amber-600">
                      {item.category}
                    </p>

                    {/* NAME */}

                    <h2 className="mt-1 font-serif text-xl font-semibold text-slate-900">
                      {item.name}
                    </h2>

                    {/* SIZE */}

                    {item.size && (
                      <p className="mt-2 text-sm text-gray-500">
                        Size: {item.size}
                      </p>
                    )}

                    {/* CUSTOM MEASUREMENTS */}

                    {item.useMeasurements && (
                      <p className="mt-1 text-sm font-medium text-amber-600">
                        Custom measurements
                      </p>
                    )}

                    {/* PRICE */}

                    <p className="mt-2 font-semibold text-slate-900">
                      Rs.{" "}
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </p>

                    {/* QUANTITY */}

                    <div className="mt-4 flex items-center gap-3">

                      {/* MINUS */}

                      <button
                        type="button"
                        onClick={() =>
                          updateCart(
                            index,
                            Number(item.quantity || 1) - 1
                          )
                        }
                        disabled={
                          Number(item.quantity || 1) <= 1
                        }
                        className="rounded-md border border-gray-300 p-2 text-slate-700 transition hover:border-amber-500 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      {/* QUANTITY */}

                      <span className="min-w-[25px] text-center font-medium text-slate-900">
                        {item.quantity || 1}
                      </span>

                      {/* PLUS */}

                      <button
                        type="button"
                        onClick={() =>
                          updateCart(
                            index,
                            Number(item.quantity || 1) + 1
                          )
                        }
                        className="rounded-md border border-gray-300 p-2 text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(index)
                    }
                    className="self-start text-gray-400 transition hover:text-red-500"
                    aria-label="Remove product"
                  >
                    <Trash2 size={19} />
                  </button>

                </div>

              ))}

            </div>

            {/* ================================================= */}
            {/* ORDER SUMMARY */}
            {/* ================================================= */}

            <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="font-serif text-2xl font-semibold text-slate-900">
                Order Summary
              </h2>

              {/* SUBTOTAL */}

              <div className="mt-6 flex justify-between border-b border-gray-200 pb-4">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold text-slate-900">
                  Rs.{" "}
                  {subtotal.toLocaleString()}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="mt-4 flex justify-between gap-4">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="text-right text-sm text-gray-500">
                  Calculated at checkout
                </span>

              </div>

              {/* TOTAL */}

              <div className="mt-6 flex justify-between border-t border-gray-200 pt-5 text-lg font-bold">

                <span className="text-slate-900">
                  Total
                </span>

                <span className="text-amber-600">
                  Rs.{" "}
                  {subtotal.toLocaleString()}
                </span>

              </div>

              {/* CHECKOUT */}

              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-lg bg-amber-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-amber-500"
              >
                Proceed to Checkout
              </Link>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/products"
                className="mt-3 block w-full rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <Footer />

    </div>
  );
}

export default Cart;