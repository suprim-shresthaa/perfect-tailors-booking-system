import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

const initialForm = {
  name: "",
  category: "Men's Suits",
  description: "",
  price: "",
  availableColors: "",
  isAvailable: true,
  isFeatured: false,
};

function AdminAddProduct() {
  const [form, setForm] = useState(initialForm);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = () => {
    setImage(null);
    setImagePreview("");

    const input = document.getElementById("product-image");

    if (input) {
      input.value = "";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Product description is required.");
      return;
    }

    if (!form.price || Number(form.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!image) {
      setError("Product image is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price);

      const colors = form.availableColors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean);

      formData.append(
        "availableColors",
        JSON.stringify(colors)
      );

      formData.append(
        "isAvailable",
        String(form.isAvailable)
      );

      formData.append(
        "isFeatured",
        String(form.isFeatured)
      );

      formData.append("image", image);

      const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      setMessage("Product added successfully.");

      setForm(initialForm);
      setImage(null);
      setImagePreview("");

      const input = document.getElementById("product-image");

      if (input) {
        input.value = "";
      }
    } catch (error) {
      console.error("Add product error:", error);

      setError(
        error.message || "Failed to add product."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-amber-700/40 bg-slate-950">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

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

          <Link
            to="/admin/products"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-amber-500"
          >
            <ArrowLeft size={18} />
            All Products
          </Link>

        </div>

      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">

        <section className="mb-8">

          <p className="text-sm font-medium uppercase tracking-widest text-amber-500">
            Administration
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold">
            Add New Product
          </h1>

          <p className="mt-3 text-gray-400">
            Upload and add a new product to your store.
          </p>

        </section>

        {/* SUCCESS */}

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-700/40 bg-green-900/20 px-5 py-4 text-sm text-green-400">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-700/40 bg-red-900/20 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6 lg:p-8"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Premium Black Suit"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-500"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
              >
                <option value="Men's Suits">
                  Men's Suits
                </option>

                <option value="Shirts & Pants">
                  Shirts & Pants
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Custom Tailoring">
                  Custom Tailoring
                </option>
              </select>
            </div>

            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                placeholder="15000"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-500"
              />
            </div>

            {/* COLORS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Available Colors
              </label>

              <input
                type="text"
                name="availableColors"
                value={form.availableColors}
                onChange={handleChange}
                placeholder="Black, Navy Blue, Grey"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                Separate colors with commas.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the product..."
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-500"
              />
            </div>

            {/* IMAGE */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Product Image
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-950 text-sm text-gray-400 file:mr-4 file:border-0 file:bg-amber-600 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white"
              />

              {imagePreview && (
                <div className="relative mt-5 h-48 w-48">

                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-full w-full rounded-lg border border-slate-700 object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-500"
                  >
                    <X size={16} />
                  </button>

                </div>
              )}

            </div>

            {/* STATUS */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Product Status
              </label>

              <select
                name="isAvailable"
                value={String(form.isAvailable)}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    isAvailable:
                      e.target.value === "true",
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
              >

                <option value="true">
                  Available
                </option>

                <option value="false">
                  Out of Stock
                </option>

              </select>

            </div>

            {/* FEATURED */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Featured Product
              </label>

              <select
                name="isFeatured"
                value={String(form.isFeatured)}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    isFeatured:
                      e.target.value === "true",
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
              >

                <option value="false">
                  No
                </option>

                <option value="true">
                  Yes
                </option>

              </select>

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-8 flex gap-3">

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-500 disabled:opacity-50"
            >

              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Product
                </>
              )}

            </button>

            <Link
              to="/admin/products"
              className="inline-flex items-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-gray-300 hover:bg-slate-800"
            >
              Cancel
            </Link>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AdminAddProduct;