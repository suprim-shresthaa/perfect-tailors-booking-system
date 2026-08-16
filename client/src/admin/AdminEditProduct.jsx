import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "Men's Suits",
    description: "",
    price: "",
    availableColors: "",
    isAvailable: true,
    isFeatured: false,
  });

  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // GET PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        const product = data.product;

        setForm({
          name: product.name || "",
          category:
            product.category || "Men's Suits",
          description: product.description || "",
          price: product.price || "",
          availableColors:
            Array.isArray(product.availableColors)
              ? product.availableColors.join(", ")
              : "",
          isAvailable:
            product.isAvailable !== false,
          isFeatured:
            product.isFeatured === true,
        });

        setOldImage(product.image || "");
      } catch (error) {
        console.error(
          "Fetch product error:",
          error
        );

        setError(
          error.message || "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeNewImage = () => {
    setNewImage(null);
    setImagePreview("");

    const input =
      document.getElementById("product-image");

    if (input) {
      input.value = "";
    }
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append(
        "description",
        form.description
      );
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

      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      alert("Product updated successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      setError(
        error.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <div className="text-center">

          <Loader2
            size={35}
            className="mx-auto animate-spin text-amber-500"
          />

          <p className="mt-4 text-gray-400">
            Loading product...
          </p>

        </div>

      </div>
    );
  }

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
            Edit Product
          </h1>

          <p className="mt-3 text-gray-400">
            Update product information and stock status.
          </p>

        </section>

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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
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
                min="0"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
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
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-500"
              />

            </div>

            {/* CURRENT IMAGE */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Current Image
              </label>

              {oldImage && (
                <img
                  src={oldImage}
                  alt={form.name}
                  className="h-48 w-48 rounded-lg border border-slate-700 object-cover"
                />
              )}

            </div>

            {/* NEW IMAGE */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Replace Image
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full rounded-lg border border-slate-700 bg-slate-950 text-sm text-gray-400 file:mr-4 file:border-0 file:bg-amber-600 file:px-4 file:py-3 file:text-white"
              />

              {imagePreview && (
                <div className="relative mt-4 h-48 w-48">

                  <img
                    src={imagePreview}
                    alt="New preview"
                    className="h-full w-full rounded-lg border border-slate-700 object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2"
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

          {/* SAVE */}

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
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Product
                </>
              )}

            </button>

            <Link
              to="/admin/products"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-gray-300 hover:bg-slate-800"
            >
              Cancel
            </Link>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AdminEditProduct;