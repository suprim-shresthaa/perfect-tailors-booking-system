import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Shirt,
  BriefcaseBusiness,
  Gem,
  LogOut,
  Plus,
  LayoutDashboard,
  Menu,
  X,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-950">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}

          <Link
            to="/admin/dashboard"
            className="flex items-center"
          >
            <img
              src="/lo1.png"
              alt="Perfect Tailors"
              className="h-auto w-40 object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-7 lg:flex">

            {/* Dashboard */}

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-amber-600"
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Link>

            {/* Orders */}

            <Link
              to="/admin/orders"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
            >
              <ShoppingBag size={17} />
              Orders
            </Link>

            {/* Appointments */}

            <Link
              to="/admin/appointments"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
            >
              <CalendarDays size={17} />
              Appointments
            </Link>

            {/* Products */}

            <Link
              to="/admin/products"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-amber-600"
            >
              <Package size={17} />
              Products
            </Link>

            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-red-500 disabled:opacity-50"
            >
              <LogOut size={17} />

              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </nav>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            className="text-slate-700 lg:hidden"
            aria-label="Toggle admin menu"
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

        {/* ================================================= */}
        {/* MOBILE NAVIGATION */}
        {/* ================================================= */}

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">

            <div className="flex flex-col gap-5">

              {/* Dashboard */}

              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-700 transition hover:text-amber-600"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              {/* Orders */}

              <Link
                to="/admin/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-700 transition hover:text-amber-600"
              >
                <ShoppingBag size={18} />
                Orders
              </Link>

              {/* Appointments */}

              <Link
                to="/admin/appointments"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-700 transition hover:text-amber-600"
              >
                <CalendarDays size={18} />
                Appointments
              </Link>

              {/* Products */}

              <Link
                to="/admin/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-700 transition hover:text-amber-600"
              >
                <Package size={18} />
                Products
              </Link>

              {/* Add Product */}

              <Link
                to="/admin/products/add"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-700 transition hover:text-amber-600"
              >
                <Plus size={18} />
                Add Product
              </Link>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 text-left text-slate-700 transition hover:text-red-500 disabled:opacity-50"
              >
                <LogOut size={18} />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>

            </div>

          </div>
        )}

      </header>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* ================================================= */}
        {/* WELCOME */}
        {/* ================================================= */}

        <section className="mb-10">

          <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
            Administration
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Manage your Perfect Tailors products,
            customer orders, appointments and store
            inventory from one place.
          </p>

        </section>

        {/* ================================================= */}
        {/* QUICK STATS */}
        {/* ================================================= */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL PRODUCTS */}

          <Link
            to="/admin/products"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Products
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <Package size={24} />
              </div>

            </div>

          </Link>

          {/* ORDERS */}

          <Link
            to="/admin/orders"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Customer Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <ShoppingBag size={24} />
              </div>

            </div>

          </Link>

          {/* APPOINTMENTS */}

          <Link
            to="/admin/appointments"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Appointments
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <CalendarDays size={24} />
              </div>

            </div>

          </Link>

          {/* ACCESSORIES */}

          <Link
            to="/admin/products?category=Accessories"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Accessories
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <Gem size={24} />
              </div>

            </div>

          </Link>

        </section>

        {/* ================================================= */}
        {/* ORDERS & APPOINTMENTS */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="border-b border-slate-200 pb-5">

            <h2 className="font-serif text-2xl font-semibold text-slate-900">
              Customer Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View customer orders and appointment requests.
            </p>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {/* ORDERS */}

            <Link
              to="/admin/orders"
              className="group rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ShoppingBag size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Customer Orders
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View customer information, ordered products,
                delivery address, payment method and order
                status.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-600 transition group-hover:translate-x-1">
                View Orders →
              </span>

            </Link>

            {/* APPOINTMENTS */}

            <Link
              to="/admin/appointments"
              className="group rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <CalendarDays size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Customer Appointments
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View customer name, phone number, appointment
                date, preferred time, product and additional
                notes.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-600 transition group-hover:translate-x-1">
                View Appointments →
              </span>

            </Link>

          </div>

        </section>

        {/* ================================================= */}
        {/* PRODUCT MANAGEMENT */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-serif text-2xl font-semibold text-slate-900">
                Product Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add new products or manage your existing
                products.
              </p>

            </div>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>

          {/* PRODUCT CATEGORIES */}

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            {/* MEN'S SUITS */}

            <Link
              to="/admin/products?category=Men%27s%20Suits"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <BriefcaseBusiness size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Men's Suits
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage premium suits and formal wear.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-600 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>

            {/* SHIRTS & PANTS */}

            <Link
              to="/admin/products?category=Shirts%20%26%20Pants"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Shirt size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Shirts & Pants
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add and manage shirts, trousers and pants.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-600 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>

            {/* ACCESSORIES */}

            <Link
              to="/admin/products?category=Accessories"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Gem size={25} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Accessories
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage ties, belts, watches and other
                accessories.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-600 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>

          </div>

        </section>

        {/* ================================================= */}
        {/* QUICK ACTION */}
        {/* ================================================= */}

        <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-7">

          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Ready to add a new product?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload your product image directly to
                Cloudinary.
              </p>

            </div>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-600 px-5 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-600 hover:text-white"
            >
              <Plus size={18} />
              Add New Product
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;