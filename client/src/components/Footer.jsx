import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/#about" },
    { name: "Measurement Guide", path: "/measurement-guide" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/#contact" },
  ];

  const categories = [
    { name: "Men's Suits", path: "/mens-suits" },
    { name: "Shirts & Pants", path: "/shirts-pants" },
    { name: "Custom Tailoring", path: "/custom-tailoring" },
    { name: "Accessories", path: "/accessories" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icon: FaInstagram,
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-slate-950 px-6 pt-14 text-white lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-slate-700 pb-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Logo and description */}
        <div className="sm:col-span-2">
          <Link to="/" className="inline-block">
            <img
              src="/lo1.png"
              alt="Perfect Tailors"
              className="h-auto w-56 object-contain"
            />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
            Crafting elegance, one stitch at a time. Tailored to perfection,
            just for you.
          </p>

          {/* Social media */}
          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-gray-300 transition hover:border-amber-500 hover:text-amber-500"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <FooterColumn title="Quick Links" links={quickLinks} />

        {/* Categories */}
        <FooterColumn title="Categories" links={categories} />

        {/* Contact information */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-amber-500">
            Contact
          </h3>

          <div className="mt-5 space-y-4 text-sm text-gray-400">
            <p className="flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <span>Kathmandu, Nepal</span>
            </p>

            <a
              href="tel:+9779841833031"
              className="flex items-center gap-3 transition hover:text-amber-500"
            >
              <Phone
                size={18}
                className="shrink-0 text-amber-500"
              />

              <span>+977 9841833031</span>
            </a>

            <a
              href="mailto:info@perfecttailors.com"
              className="flex items-center gap-3 transition hover:text-amber-500"
            >
              <Mail
                size={18}
                className="shrink-0 text-amber-500"
              />

              <span>contact.perfecttailors@gmail.com</span>
            </a>

            <p className="flex items-start gap-3">
              <Clock
                size={18}
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <span>Sun–Fri: 10:00 AM–7:00 PM</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-6 text-xs text-gray-500 sm:flex-row">
        <p>© 2026 Perfect Tailors. All rights reserved.</p>

        <div className="flex gap-5">
          <Link
            to="/privacy-policy"
            className="transition hover:text-amber-500"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="transition hover:text-amber-500"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
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
          <li key={link.name}>
            <Link
              to={link.path}
              className="transition hover:text-amber-500"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;