import { useState } from "react";
import { Link } from "react-router-dom";


function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);
  };

  const inputStyle =
    "w-full rounded border border-[#d9d1c7] px-4 py-3 text-sm text-[#1b2633] outline-none transition placeholder:text-gray focus:border-[#b89764] focus:ring-1 focus:ring-[#b89764]";

  return (
    <main className="min-h-screen bg-[#071827] p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-6xl overflow-hidden rounded-lg border border-[#9e835e] bg-[#f8f4ee] shadow-2xl sm:min-h-[calc(100vh-48px)]">
        {/* Left suit image */}
        <section className="relative hidden w-1/2 lg:block">
            <img
                src="/suitImage.png"
                alt="Perfect Tailors navy suit"
                className="h-full w-full object-cover object-center"
            />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="font-serif text-3xl">
              Crafted for your perfect fit.
            </p>

            <p className="mt-2 text-sm text-white/75">
              Premium tailoring, made personally for you.
            </p>
          </div>
        </section>

        {/* Sign-up form */}
        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
        <Link
  to="/"
  className="mx-auto -mb-2 flex w-48 justify-center"
>
  <img
    src="/logo.png"
    alt="Perfect Tailors"
    className="h-auto w-full object-contain"
  />
</Link>
            <h1 className="mt-0 font-serif text-3xl font-semibold text-[#172331]">
  Create Account
</h1>
            <p className="mt-2 text-sm text-[#77716a]">
              Sign up to book your perfect tailoring service.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#27323c]">
                  Full Name
                </label>

                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#27323c]">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#27323c]">
                  Phone Number
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputStyle}
                  required
                />
              </div>

              <div className="grid gap-4 ">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#27323c]">
                    Password
                  </label>

                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    minLength={8}
                    className={inputStyle}
                    required
                  />
                </div>

              
              </div>

              <label className="flex items-start gap-2 text-xs text-[#6f6a64]">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-[#092038]"
                  required
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-[#9b7548] hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded bg-[#071c30] py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#0e2b46]"
              >
                SIGN UP
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#d9d1c7]" />
              <span className="text-xs text-[#898078]">or continue with</span>
              <span className="h-px flex-1 bg-[#d9d1c7]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="rounded border border-[#d9d1c7] bg-white py-3 text-sm font-medium text-[#374151] transition hover:bg-[#f2eee8]">
                <span className="mr-2 font-bold text-[#4285f4]">G</span>
                Google
              </button>

              <button className="rounded border border-[#d9d1c7] bg-white py-3 text-sm font-medium text-[#374151] transition hover:bg-[#f2eee8]">
                <span className="mr-2 font-bold text-[#1877f2]">f</span>
                Facebook
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-[#77716a]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#9b7548] hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;