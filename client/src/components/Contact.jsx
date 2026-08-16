import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Scissors,
  CalendarDays,
  ArrowUpRight,
  Copy,
  Check,
  Navigation,
} from "lucide-react";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Contact() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Kathmandu, Nepal",
      description: "Come in for a fitting or consultation.",
      action: "Get Directions",
      href: "https://www.google.com/maps/search/?api=1&query=Perfect+Tailors+Kathmandu+Nepal",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+977 9841833031",
      description: "We're happy to answer your questions.",
      action: "Call Now",
      href: "tel:+9779841833031",
      copyValue: "+977 9841833031",
      copyType: "phone",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "contact.perfecttailors@gmail.com",
      description: "For enquiries and tailoring requests.",
      action: "Send Email",
      href: "mailto:contact.perfecttailors@gmail.com",
      copyValue: "contact.perfecttailors@gmail.com",
      copyType: "email",
    },
  ];

  const services = [
    "Custom suits & formalwear",
    "Alterations & adjustments",
    "Wedding & occasion tailoring",
    "Personal fitting consultations",
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(245,158,11,0.12),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                <Scissors size={14} />
                Perfect Tailors
              </div>

              <h1 className="font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                Let's Create
                <span className="block text-amber-500">
                  Something Perfect
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
                Whether you need a custom suit, a perfect alteration, or a
                personal fitting, our team is ready to help.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="tel:+9779841833031"
                  className="group inline-flex items-center gap-2 rounded bg-amber-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  <Phone size={17} />
                  Call Us
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Perfect+Tailors+Kathmandu+Nepal"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-1 hover:border-amber-500 hover:text-amber-400"
                >
                  <Navigation size={17} />
                  Find Our Shop
                </a>
              </div>
            </div>

            <Scissors
              size={260}
              strokeWidth={0.7}
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-white/5 lg:block"
            />
          </div>
        </section>

        {/* Interactive contact cards */}
        <section className="px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                Get In Touch
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-900">
                Choose how you'd like to connect
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                No message form to fill out. Call, email, or visit us directly
                whenever it is convenient for you.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="group rounded-sm border border-stone-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700 transition duration-300 group-hover:bg-amber-500 group-hover:text-slate-950">
                        <Icon size={21} strokeWidth={1.6} />
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="text-stone-300 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-600"
                      />
                    </div>

                    <p className="mt-7 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {card.title}
                    </p>

                    <p className="mt-2 break-words font-serif text-xl font-semibold text-slate-900">
                      {card.value}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {card.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={card.href}
                        target={card.href.startsWith("http") ? "_blank" : undefined}
                        rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-700 transition hover:text-amber-900"
                      >
                        {card.action}
                        <ArrowUpRight size={15} />
                      </a>

                      {card.copyValue && (
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(card.copyValue, card.copyType)
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-slate-900"
                        >
                          {copied === card.copyType ? (
                            <>
                              <Check size={14} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Hours + services */}
        <section className="border-y border-stone-200 bg-[#f5efe6] px-6 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-amber-700">
                <Clock size={25} strokeWidth={1.5} />
                <p className="text-sm font-bold uppercase tracking-[0.2em]">
                  Opening Hours
                </p>
              </div>

              <h2 className="mt-4 font-serif text-4xl font-semibold text-slate-900">
                Visit when it suits you
              </h2>

              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Open Sunday – Friday
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p className="flex justify-between gap-8 border-b border-stone-200 pb-2">
                  <span>Sunday – Friday</span>
                  <span className="font-semibold text-slate-900">
                    10:00 AM – 7:00 PM
                  </span>
                </p>
                <p className="flex justify-between gap-8 pt-1">
                  <span>Saturday</span>
                  <span className="font-semibold text-slate-900">
                    Closed
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-sm bg-slate-950 p-8 text-white shadow-xl lg:p-10">
              <div className="flex items-center gap-3 text-amber-500">
                <CalendarDays size={25} />
                <p className="text-sm font-bold uppercase tracking-[0.2em]">
                  What We Do
                </p>
              </div>

              <h3 className="mt-4 font-serif text-3xl font-semibold">
                Tailoring made around you
              </h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition hover:border-amber-500/50 hover:bg-amber-500/10"
                  >
                    {service}
                  </div>
                ))}
              </div>

              <a
                href="tel:+9779841833031"
                className="mt-7 inline-flex items-center gap-2 rounded bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-400"
              >
                <Phone size={16} />
                Talk to a Tailor
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 text-center lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Scissors
              size={34}
              strokeWidth={1.2}
              className="mx-auto text-amber-700"
            />
            <h2 className="mt-5 font-serif text-4xl font-semibold text-slate-900">
              Crafted to Fit You.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600">
              Ready to discuss your next outfit? Give us a call or visit our
              Kathmandu shop and let's make something that fits perfectly.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+9779841833031"
                className="inline-flex items-center gap-2 rounded bg-slate-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:bg-slate-800"
              >
                <Phone size={17} />
                Call +977 9841833031
              </a>

              <a
                href="mailto:contact.perfecttailors@gmail.com"
                className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-900 transition hover:-translate-y-1 hover:border-amber-500 hover:text-amber-700"
              >
                <Mail size={17} />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;