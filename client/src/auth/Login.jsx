import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-6xl overflow-hidden rounded-lg border border-amber-700 bg-stone-50 shadow-2xl sm:min-h-[calc(100vh-48px)]">
        {/* Left image */}
        <section className="relative hidden w-1/2 lg:block">
          <img
            src="/suitImage.png"
            alt="Perfect Tailors navy suit"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="absolute bottom-10 left-10">
            <h2 className="font-serif text-3xl font-semibold text-white">
              Tailored to perfection.
            </h2>

            <p className="mt-2 text-sm text-stone-300">
              Premium craftsmanship for every occasion.
            </p>
          </div>
        </section>

        {/* Login section */}
        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link
              to="/"
              className=" py-10  mx-30 -mb-10 flex w-48 justify-center"
            >
              <img
                src="/logo.png"
                alt="Perfect Tailors"
                className="h-auto w-full object-contain"
              />
            </Link>

            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Log in to your account
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email or phone */}
              <div>
                <label
                  htmlFor="emailOrPhone"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email or Phone Number
                </label>

                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type="text"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder="Enter your email or phone"
                  autoComplete="username"
                  className="w-full rounded border border-stone-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} strokeWidth={1.8} />
                    ) : (
                      <Eye size={19} strokeWidth={1.8} />
                    )}
                  </button>
                </div>

                <div className="mt-2 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-amber-700 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer accent-slate-900"
                />

                Remember me
              </label>

              {/* Login button */}
              <button
                type="submit"
                className="w-full cursor-pointer rounded bg-slate-900 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800"
              >
                LOGIN
              </button>
            </form>

            {/* Separator */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-stone-300" />

              <span className="text-xs text-gray-500">or continue with</span>

              <span className="h-px flex-1 bg-stone-300" />
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded border border-stone-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-stone-100"
              >
                <span className="mr-2 font-bold text-blue-500">G</span>
                Google
              </button>

              <button
                type="button"
                className="rounded border border-stone-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-stone-100"
              >
                <span className="mr-2 font-bold text-blue-600">f</span>
                Facebook
              </button>
            </div>

            {/* Sign-up link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-amber-700 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;