import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Award,
  Scissors,
  ShieldCheck,
  Truck,
  Ruler,
  Clock,
  Heart,
 
  
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const collections = [
    {
      title: "Men's Suits",
      description: "Timeless elegance",
      image: "/mensuits.png",
    },
    {
      title: "Shirts & Pants",
      description: "Comfort and style",
      image: "/shirts-pants.png",
    },
    {
      title: "School Uniforms",
      description: "Smart and durable",
      image: "/school-uniforms.png",
    },
    {
      title: "Custom Tailoring",
      description: "Tailored just for you",
      image: "/custom-tailoring.png",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Quality Materials",
      description: "We use only the finest fabrics for ultimate comfort.",
    },
    {
      icon: Scissors,
      title: "Skilled Tailors",
      description: "Experienced tailors ensure precise stitching and fit.",
    },
    {
      icon: Ruler,
      title: "Custom Fit",
      description: "Every piece is measured and made specifically for you.",
    },
    {
      icon: Heart,
      title: "Customer Satisfaction",
      description: "We are committed to your satisfaction and trust.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-amber-700/40 bg-slate-950 text-white">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link to="/" className="flex items-center">
  <img
    src="/lo1.png"
    alt="Perfect Tailors"
    className="h-15 w-25 "
  />
</Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link to="/" className="text-sm font-medium text-amber-500">
              Home
            </Link>

            <a
              href="#collection"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              Men&apos;s Suits
            </a>

            <a
              href="#collection"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              Shirts & Pants
            </a>

            <a
              href="#collection"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              School Uniforms
            </a>

            <a
              href="#tailoring"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              Custom Tailoring
            </a>

            <a
              href="#about"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              About Us
            </a>

            <a
              href="#contact"
              className="text-sm text-gray-300 transition hover:text-amber-500"
            >
              Contact
            </a>
          </div>

          {/* Desktop icons */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="cursor-pointer text-gray-300 transition hover:text-amber-500"
            >
              <Search size={19} />
            </button>

            <Link
              to="/login"
              aria-label="Login"
              className="text-gray-300 transition hover:text-amber-500"
            >
              <User size={19} />
            </Link>

            <button
              type="button"
              aria-label="Shopping bag"
              className="cursor-pointer text-gray-300 transition hover:text-amber-500"
            >
              <ShoppingBag size={19} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="cursor-pointer text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <Link
                to="/"
                className="text-amber-500"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <a
                href="#collection"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300"
              >
                Our Collection
              </a>

              <a
                href="#tailoring"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300"
              >
                Custom Tailoring
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300"
              >
                About Us
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-gray-300"
              >
                Contact
              </a>

              <div className="flex gap-5 border-t border-slate-800 pt-4 text-gray-300">
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
{/* Hero */}
<section className="relative min-h-[620px] overflow-hidden bg-slate-950">
  {/* Hero background */}
  <img
    src="/hero-suit.png"
    alt="Perfect Tailors premium navy suit"
    className="absolute inset-0 h-full w-full object-cover object-center"
  />

  {/* Hero content */}
  <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 lg:px-8">
    <div className="max-w-xl">
      <h1 className="font-serif text-5xl font-semibold uppercase leading-tight text-white sm:text-6xl">
        Tailored to
        <span className="block text-amber-500">Perfection</span>
      </h1>

      <p className="mt-6 max-w-md text-base leading-7 text-gray-300">
        Experience premium tailoring with impeccable fit and timeless style.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#collection"
          className="rounded bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
        >
          EXPLORE COLLECTION
        </a>

        <Link
          to="/booking"
          className="rounded border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
        >
          BOOK APPOINTMENT
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Service highlights */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-7 md:grid-cols-4 lg:px-8">
          <Service
            icon={Award}
            title="Premium Fabrics"
            text="Finest quality materials"
          />

          <Service
            icon={Scissors}
            title="Expert Tailors"
            text="Skilled and experienced"
          />

          <Service
            icon={ShieldCheck}
            title="Perfect Fit Guarantee"
            text="Made just for you"
          />

          <Service
            icon={Truck}
            title="On-Time Delivery"
            text="Always on schedule"
          />
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="bg-stone-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Crafted for you
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-900">
              Our Collection
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
              Explore our range of premium-quality tailoring.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-72 overflow-hidden bg-stone-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 text-center">
                  <h3 className="font-serif text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    className="mt-4 cursor-pointer text-xs font-semibold uppercase tracking-wider text-amber-700 hover:underline"
                  >
                    Shop Now →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section
        id="about"
        className="bg-slate-950 px-6 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
              Our Commitment
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Why Choose Us?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-600 text-amber-500">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 font-serif text-lg font-semibold">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section
        id="tailoring"
        className="border-y border-stone-200 bg-[#f5efe6] px-6 py-10 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5">
            <div className="text-amber-700">
              <Scissors size={44} strokeWidth={1.3} />
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Looking for something unique?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Get a custom design made exactly the way you want.
              </p>
            </div>
          </div>

          <Link
            to="/booking"
            className="rounded bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            BOOK A CONSULTATION
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[#061522] px-6 pt-14 text-white lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-slate-700 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2">
            <img
              src="/lo1.png"
              alt="Perfect Tailors"
              
            />

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Crafting elegance, one stitch at a time. Tailored to perfection,
              just for you.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-300 transition hover:text-amber-500"
              >
                <span className="font-bold">f</span>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-300 transition hover:text-amber-500"
              >
                <span className="font-bold">I</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <FooterColumn
            title="Quick Links"
            links={[
              "Home",
              "About Us",
              "Measurement Guide",
              "Blog",
              "Contact Us",
            ]}
          />

          {/* Categories */}
          <FooterColumn
            title="Categories"
            links={[
              "Men's Suits",
              "Shirts & Pants",
              "School Uniforms",
              "Custom Tailoring",
              "Accessories",
            ]}
          />

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-500">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              <p className="flex gap-3">
                <MapPin
                  size={18}
                  className="shrink-0 text-amber-500"
                />
                Kathmandu, Nepal
              </p>

              <p className="flex gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-amber-500"
                />
                +977 9841833031
              </p>

              <p className="flex gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-amber-500"
                />
                info@perfecttailors.com
              </p>

              <p className="flex gap-3">
                <Clock
                  size={18}
                  className="shrink-0 text-amber-500"
                />
                Sun–Fri: 10:00 AM–7:00 PM
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-7xl py-6 text-center text-xs text-gray-500">
          © 2026 Perfect Tailors. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function Service({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={25} className="shrink-0 text-amber-700" />

      <div>
        <h3 className="text-xs font-bold uppercase text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-serif text-lg font-semibold text-amber-500">
        {title}
      </h3>

      <ul className="mt-5 space-y-3 text-sm text-gray-400">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition hover:text-amber-500">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;