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

  return (
    <header className="sticky top-0 z-50 border-b border-amber-700/40 bg-slate-950 text-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src="/lo1.png"
            alt="Perfect Tailors"
            className="h-auto w-40 object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/" className="text-sm font-medium text-amber-500">
            Home
          </Link>

          <a
            href="#collection"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            Men&apos;s Suits
          </a>

          <a
            href="#collection"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            Shirts & Pants
          </a>

          <a
            href="#collection"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            School Uniforms
          </a>

          <a
            href="#tailoring"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            Custom Tailoring
          </a>

          <a
            href="#about"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            About Us
          </a>

          <a
            href="#contact"
            className="text-sm text-gray-300 hover:text-amber-500"
          >
            Contact
          </a>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button type="button" aria-label="Search">
            <Search size={19} />
          </button>

          <Link to="/login" aria-label="Login">
            <User size={19} />
          </Link>

          <button type="button" aria-label="Shopping bag">
            <ShoppingBag size={19} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-800 px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <a href="#collection">Our Collection</a>
            <a href="#tailoring">Custom Tailoring</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>

            <div className="flex gap-5 border-t border-slate-800 pt-4">
              <Search size={19} />
              <Link to="/login">
                <User size={19} />
              </Link>
              <ShoppingBag size={19} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;