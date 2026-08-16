import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, CalendarDays } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_URL = "http://localhost:5000/api/products";

const sizes = ["S", "M", "L", "XL", "XXL"];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Measurements are optional
  const [measurements, setMeasurements] = useState({
    length: "",
    chest: "",
    waist: "",
    shoulder: "",
    sleeve: "",
    neck: "",
    knee: "",
    bottom: "",
    hip: "",
    highThigh: "",
  });

  // =====================================================
  // FETCH PRODUCT
  // =====================================================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.product);
      } catch (error) {
        console.error("Fetch product error:", error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // HANDLE MEASUREMENT CHANGE
  // =====================================================
  const handleMeasurementChange = (field, value) => {
    setMeasurements((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // =====================================================
  // ADD TO CART
  // =====================================================
  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      alert("Please choose a size.");
      return;
    }

    if (!product.isAvailable) {
      alert("This product is currently out of stock.");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
      quantity,
      measurements,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.productId === product._id &&
        item.size === selectedSize
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
      existingCart[existingIndex].measurements = measurements;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Go to cart
    navigate("/cart");
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
          <p className="text-gray-500">
            Loading product...
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
          <h1 className="font-serif text-3xl font-bold">
            Product not found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "This product does not exist."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-500"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">

        {/* Back */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-amber-600"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}
          <div className="overflow-hidden rounded-xl bg-gray-100">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-cover ${
                  !product.isAvailable
                    ? "opacity-60"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}
          <div className="flex flex-col">

            {/* Category */}
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-6 text-2xl font-bold text-slate-900">
              Rs. {Number(product.price).toLocaleString()}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Shipping is calculated at checkout
            </p>

            {/* Availability */}
            <div className="mt-5">
              {product.isAvailable ? (
                <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  In Stock
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* =================================================
                SIZE
            ================================================= */}
            <div className="mt-8">

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Choose Size
                </h2>

                <span className="text-xs text-gray-500">
                  Required
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    disabled={!product.isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-12 items-center justify-center rounded-lg border px-4 text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-amber-600 bg-amber-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-amber-500"
                    } ${
                      !product.isAvailable
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                MEASUREMENTS
            ================================================= */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Custom Measurements (Optional)
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Optional. You can provide your measurements
                  if you want a more personalized fit.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                {/* Length */}
                <MeasurementInput
                  label="Length"
                  value={measurements.length}
                  onChange={(value) =>
                    handleMeasurementChange("length", value)
                  }
                />

                {/* Chest */}
                <MeasurementInput
                  label="Chest"
                  value={measurements.chest}
                  onChange={(value) =>
                    handleMeasurementChange("chest", value)
                  }
                />

                {/* Waist */}
                <MeasurementInput
                  label="Waist"
                  value={measurements.waist}
                  onChange={(value) =>
                    handleMeasurementChange("waist", value)
                  }
                />

                {/* Shoulder */}
                <MeasurementInput
                  label="Shoulder"
                  value={measurements.shoulder}
                  onChange={(value) =>
                    handleMeasurementChange("shoulder", value)
                  }
                />

                {/* Sleeve */}
                <MeasurementInput
                  label="Sleeve"
                  value={measurements.sleeve}
                  onChange={(value) =>
                    handleMeasurementChange("sleeve", value)
                  }
                />

                {/* Neck */}
                <MeasurementInput
                  label="Neck"
                  value={measurements.neck}
                  onChange={(value) =>
                    handleMeasurementChange("neck", value)
                  }
                />

                {/* Knee */}
                <MeasurementInput
                  label="Knee"
                  value={measurements.knee}
                  onChange={(value) =>
                    handleMeasurementChange("knee", value)
                  }
                />

                {/* Bottom */}
                <MeasurementInput
                  label="Bottom"
                  value={measurements.bottom}
                  onChange={(value) =>
                    handleMeasurementChange("bottom", value)
                  }
                />

                {/* Hip */}
                <MeasurementInput
                  label="Hip"
                  value={measurements.hip}
                  onChange={(value) =>
                    handleMeasurementChange("hip", value)
                  }
                />

                {/* High Thigh */}
                <MeasurementInput
                  label="High Thigh"
                  value={measurements.highThigh}
                  onChange={(value) =>
                    handleMeasurementChange(
                      "highThigh",
                      value
                    )
                  }
                />
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Measurements can be entered in inches or
                centimeters. Please use one unit consistently.
              </p>
            </div>

            {/* =================================================
                QUANTITY
            ================================================= */}
            <div className="mt-8">

              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Quantity
              </h2>

              <div className="mt-3 flex w-fit items-center rounded-lg border border-gray-300">

                <button
                  type="button"
                  disabled={!product.isAvailable}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="px-4 py-2 text-lg text-gray-600 hover:text-amber-600"
                >
                  −
                </button>

                <span className="min-w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  disabled={!product.isAvailable}
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="px-4 py-2 text-lg text-gray-600 hover:text-amber-600"
                >
                  +
                </button>

              </div>
            </div>

            {/* =================================================
                ADD TO CART
            ================================================= */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <ShoppingBag size={20} />

              {product.isAvailable
                ? "ADD TO CART"
                : "OUT OF STOCK"}
            </button>

            {/* =================================================
                BOOK APPOINTMENT
            ================================================= */}
            <Link
              to="/appointment"
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-amber-600 px-6 py-4 text-sm font-semibold text-amber-700 transition hover:bg-amber-600 hover:text-white"
            >
              <CalendarDays size={20} />
              BOOK APPOINTMENT
            </Link>

            {/* =================================================
                DESCRIPTION
            ================================================= */}
            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="text-xl font-semibold text-slate-900">
                Description
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                {product.description}
              </p>

            </div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}
            <div className="mt-8 border-t border-gray-200 pt-8">

              <h2 className="text-xl font-semibold text-slate-900">
                Details
              </h2>

              <div className="mt-5 space-y-3 text-sm">

                <div className="flex justify-between gap-5 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-medium text-slate-900">
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between gap-5 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">
                    SKU
                  </span>

                  <span className="font-medium text-slate-900">
                    {product.sku || "N/A"}
                  </span>
                </div>

                {product.availableColors?.length > 0 && (
                  <div className="flex justify-between gap-5 border-b border-gray-100 pb-3">
                    <span className="text-gray-500">
                      Colors
                    </span>

                    <span className="text-right font-medium text-slate-900">
                      {product.availableColors.join(", ")}
                    </span>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />
    </div>
  );
}

// =====================================================
// MEASUREMENT INPUT
// =====================================================
function MeasurementInput({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="cm"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
      />
    </div>
  );
}

export default ProductDetails;