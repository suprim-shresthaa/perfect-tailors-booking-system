import { Link } from "react-router-dom";
import {
  Award,
  Scissors,
  ShieldCheck,
  Truck,
  Ruler,
  Heart,
} from "lucide-react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
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
       title: "Accessories",
  description: "The perfect finishing touch",
  image: "/Tie.png",
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
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
          <img
            src="/hero-suit.png"
            alt="Perfect Tailors premium navy suit"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 lg:px-8">
            <div className="max-w-xl">
              <h1 className="font-serif text-5xl font-semibold uppercase leading-tight text-white sm:text-6xl">
                Tailored to
                <span className="block text-amber-500">Perfection</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-300">
                Experience premium tailoring with impeccable fit and timeless
                style.
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
        <section
          id="collection"
          className="bg-stone-50 px-6 py-20 lg:px-8"
        >
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
      </main>

      <Footer />
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

export default Home;