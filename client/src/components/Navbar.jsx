import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-700/40 bg-slate-950 text-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link to="/" className="flex items-center">
          <img
            src="/lo1.png"
            alt="Perfect Tailors"
            className="h-auto w-40 object-contain"
          />
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-6 lg:flex">

          <Link
            to="/"
            className="text-sm font-medium text-amber-500 transition hover:text-amber-400"
          >
            Home
          </Link>

          {/* MEN'S SUITS */}
          <Link
            to="/products?category=Men%27s%20Suits"
            className="text-sm text-gray-300 transition hover:text-amber-500"
          >
            Men's Suits
          </Link>

          {/* SHIRTS & PANTS */}
          <Link
            to="/products?category=Shirts%20%26%20Pants"
            className="text-sm text-gray-300 transition hover:text-amber-500"
          >
            Shirts & Pants
          </Link>

          {/* ACCESSORIES */}
          <Link
            to="/products?category=Accessories"
            className="text-sm text-gray-300 transition hover:text-amber-500"
          >
            Accessories
          </Link>

          {/* CUSTOM TAILORING */}
          <Link
            to="/products?category=Custom%20Tailoring"
            className="text-sm text-gray-300 transition hover:text-amber-500"
          >
            Custom Tailoring
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="text-sm text-gray-300 transition hover:text-amber-500"
          >
            Contact
          </Link>
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-4 lg:flex">

          {/* SEARCH */}
          <button
            type="button"
            aria-label="Search"
            className="text-gray-300 transition hover:text-amber-500"
          >
            <Search size={19} />
          </button>

          {/* LOGIN */}
          <Link
            to="/login"
            aria-label="Login"
            className="text-gray-300 transition hover:text-amber-500"
          >
            <User size={19} />
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="text-gray-300 transition hover:text-amber-500"
          >
            <ShoppingBag size={19} />
          </Link>

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ================= MOBILE NAVIGATION ================= */}
      {menuOpen && (
        <div className="border-t border-slate-800 px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">

            {/* HOME */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Home
            </Link>

            {/* MEN'S SUITS */}
            <Link
              to="/products?category=Men%27s%20Suits"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Men's Suits
            </Link>

            {/* SHIRTS & PANTS */}
            <Link
              to="/products?category=Shirts%20%26%20Pants"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Shirts & Pants
            </Link>

            {/* ACCESSORIES */}
            <Link
              to="/products?category=Accessories"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Accessories
            </Link>

            {/* CUSTOM TAILORING */}
            <Link
              to="/products?category=Custom%20Tailoring"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Custom Tailoring
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-amber-500"
            >
              Contact
            </Link>

            {/* MOBILE ICONS */}
            <div className="flex gap-5 border-t border-slate-800 pt-4">

              {/* SEARCH */}
              <button
                type="button"
                aria-label="Search"
                className="text-gray-300 transition hover:text-amber-500"
              >
                <Search size={19} />
              </button>

              {/* LOGIN */}
              <Link
                to="/login"
                aria-label="Login"
                onClick={closeMenu}
                className="text-gray-300 transition hover:text-amber-500"
              >
                <User size={19} />
              </Link>

              {/* CART */}
              <Link
                to="/cart"
                aria-label="Shopping cart"
                onClick={closeMenu}
                className="text-gray-300 transition hover:text-amber-500"
              >
                <ShoppingBag size={19} />
              </Link>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;