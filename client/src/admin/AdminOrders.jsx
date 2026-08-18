import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Package,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/orders";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderNumber = (order, index) => {
    return (
      order.orderNumber ||
      `PT-${String(index + 1).padStart(4, "0")}`
    );
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Perfect Tailors
            </p>

            <h1 className="mt-1 font-serif text-3xl font-bold">
              Orders
            </h1>
          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={fetchOrders}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

          </div>

        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* PAGE INTRO */}
        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Package size={24} />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold">
              Customer Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage orders placed by customers.
            </p>
          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <p className="text-slate-500">
              Loading orders...
            </p>

          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">

            <p className="font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Package size={30} />
              </div>

              <h2 className="mt-5 font-serif text-2xl font-semibold">
                No Orders Yet
              </h2>

              <p className="mt-2 text-slate-500">
                Customer orders will appear here when they place an order.
              </p>

            </div>
          )}

        {/* ================= ORDERS TABLE ================= */}
        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">

                <h2 className="font-serif text-xl font-semibold">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {orders.length} order
                  {orders.length !== 1 ? "s" : ""} found
                </p>

              </div>

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">

                <table className="w-full text-left">

                  <thead className="border-b border-slate-200 bg-slate-50">

                    <tr>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Order
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Phone
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Total
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-200">

                    {orders.map((order, index) => (

                      <tr
                        key={order._id}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <p className="font-semibold text-slate-900">
                            {getOrderNumber(order, index)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : ""}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <p className="font-medium text-slate-900">
                            {order.name ||
                              order.fullName ||
                              order.customerName ||
                              "N/A"}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {order.email || "No email"}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {order.phone || "N/A"}
                        </td>

                        <td className="px-6 py-5">

                          <p className="font-semibold text-slate-900">
                            Rs.{" "}
                            {Number(
                              order.total ||
                                order.totalAmount ||
                                0
                            ).toLocaleString()}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status || "Pending"}
                          </span>

                        </td>

                        <td className="px-6 py-5 text-right">

                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
                          >
                            <Eye size={16} />
                            View
                          </Link>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* MOBILE CARDS */}
              <div className="space-y-4 p-4 md:hidden">

                {orders.map((order, index) => (

                  <div
                    key={order._id}
                    className="rounded-xl border border-slate-200 p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="font-semibold">
                          {getOrderNumber(order, index)}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>

                    </div>

                    <div className="mt-5 space-y-2">

                      <p className="text-sm">
                        <span className="text-slate-500">
                          Customer:
                        </span>{" "}
                        <span className="font-medium">
                          {order.name ||
                            order.fullName ||
                            order.customerName ||
                            "N/A"}
                        </span>
                      </p>

                      <p className="text-sm">
                        <span className="text-slate-500">
                          Phone:
                        </span>{" "}
                        {order.phone || "N/A"}
                      </p>

                      <p className="text-sm">
                        <span className="text-slate-500">
                          Total:
                        </span>{" "}
                        <span className="font-semibold">
                          Rs.{" "}
                          {Number(
                            order.total ||
                              order.totalAmount ||
                              0
                          ).toLocaleString()}
                        </span>
                      </p>

                    </div>

                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <Eye size={16} />
                      View Order
                    </Link>

                  </div>

                ))}

              </div>

            </div>
          )}

      </main>

    </div>
  );
}

export default AdminOrders;