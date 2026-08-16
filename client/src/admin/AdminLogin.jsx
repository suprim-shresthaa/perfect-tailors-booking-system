import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Admin login failed");
      }

      // Admin login successful
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-6xl overflow-hidden rounded-lg border border-amber-700 bg-stone-50 shadow-2xl sm:min-h-[calc(100vh-48px)]">

        {/* Left Image */}
        <section className="relative hidden w-1/2 lg:block">
          <img
            src="/suitImage.png"
            alt="Perfect Tailors navy suit"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="absolute bottom-10 left-10">
            <h2 className="font-serif text-3xl font-semibold text-white">
              Perfect Tailors
            </h2>

            <p className="mt-2 text-sm text-stone-300">
              Administration Portal
            </p>
          </div>
        </section>

        {/* Admin Login Section */}
        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">

            {/* Logo */}
            <Link
              to="/"
              className="mx-auto mb-8 flex w-48 justify-center"
            >
              <img
                src="/logo.png"
                alt="Perfect Tailors"
                className="h-auto w-full object-contain"
              />
            </Link>

            {/* Heading */}
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage Perfect Tailors
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Admin Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
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
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="w-full rounded border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        size={19}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Eye
                        size={19}
                        strokeWidth={1.8}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded bg-slate-900 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "SIGNING IN..." : "ADMIN LOGIN"}
              </button>

            </form>

            {/* Back to Website */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-amber-700 hover:underline"
              >
                ← Back to Perfect Tailors
              </Link>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;