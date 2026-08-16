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
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="sticky top-0 z-50 border-b border-amber-700/40 bg-slate-950">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* Logo */}

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


          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-7 lg:flex">

            {/* Dashboard */}

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-amber-500"
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Link>


            {/* Products */}

            <Link
              to="/admin/products"
              className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-amber-500"
            >
              <Package size={17} />
              Products
            </Link>


            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-red-400 disabled:opacity-50"
            >
              <LogOut size={17} />

              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </nav>


          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            className="lg:hidden"
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
          <div className="border-t border-slate-800 px-5 py-5 lg:hidden">

            <div className="flex flex-col gap-5">

              {/* Dashboard */}

              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-300 transition hover:text-amber-500"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>


              {/* Products */}

              <Link
                to="/admin/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-300 transition hover:text-amber-500"
              >
                <Package size={18} />
                Products
              </Link>


              {/* Add Product */}

              <Link
                to="/admin/products/add"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-300 transition hover:text-amber-500"
              >
                <Plus size={18} />
                Add Product
              </Link>


              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 text-left text-gray-300 transition hover:text-red-400 disabled:opacity-50"
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

          <p className="text-sm font-medium uppercase tracking-widest text-amber-500">
            Administration
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Manage your Perfect Tailors products,
            collections and store inventory from one
            place.
          </p>

        </section>


        {/* ================================================= */}
        {/* QUICK STATS */}
        {/* ================================================= */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Products */}

          <Link
            to="/admin/products"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-700/60"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-400">
                  Total Products
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <Package size={24} />
              </div>

            </div>

          </Link>


          {/* Men's Suits */}

          <Link
            to="/admin/products?category=Men%27s%20Suits"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-700/60"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-400">
                  Men's Suits
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <BriefcaseBusiness size={24} />
              </div>

            </div>

          </Link>


          {/* Shirts & Pants */}

          <Link
            to="/admin/products?category=Shirts%20%26%20Pants"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-700/60"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-400">
                  Shirts & Pants
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <Shirt size={24} />
              </div>

            </div>

          </Link>


          {/* Accessories */}

          <Link
            to="/admin/products?category=Accessories"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-700/60"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-400">
                  Accessories
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  —
                </p>

              </div>

              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <Gem size={24} />
              </div>

            </div>

          </Link>

        </section>


        {/* ================================================= */}
        {/* PRODUCT MANAGEMENT */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-serif text-2xl font-semibold text-white">
                Product Management
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Add new products or manage your existing
                products.
              </p>

            </div>


            {/* IMPORTANT:
                Add Product now goes to separate page
            */}

            <Link
              to="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>


          {/* ================================================= */}
          {/* PRODUCT CATEGORIES */}
          {/* ================================================= */}

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            {/* Men's Suits */}

            <Link
              to="/admin/products?category=Men%27s%20Suits"
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-amber-700/60"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <BriefcaseBusiness size={25} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Men's Suits
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Manage premium suits and formal wear.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-500 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>


            {/* Shirts & Pants */}

            <Link
              to="/admin/products?category=Shirts%20%26%20Pants"
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-amber-700/60"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Shirt size={25} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Shirts & Pants
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Add and manage shirts, trousers and pants.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-500 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>


            {/* Accessories */}

            <Link
              to="/admin/products?category=Accessories"
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-amber-700/60"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Gem size={25} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Accessories
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Manage ties, belts, watches and other
                accessories.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-amber-500 transition group-hover:translate-x-1">
                Manage →
              </span>

            </Link>

          </div>

        </section>


        {/* ================================================= */}
        {/* QUICK ACTION */}
        {/* ================================================= */}

        <section className="mt-10 rounded-xl border border-amber-700/30 bg-gradient-to-r from-slate-900 to-slate-950 p-7">

          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-serif text-xl font-semibold text-white">
                Ready to add a new product?
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Upload your product image directly to
                Cloudinary.
              </p>

            </div>


            {/* IMPORTANT:
                Add New Product goes to separate page
            */}

            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-600 px-5 py-3 text-sm font-semibold text-amber-500 transition hover:bg-amber-600 hover:text-white"
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