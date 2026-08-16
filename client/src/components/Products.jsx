import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error("Fetch products error:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category === selectedCategory
      )
    : products;

  // =====================================================
  // PAGE TITLE
  // =====================================================
  const pageTitle =
    selectedCategory || "All Products";

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-600">
            Perfect Tailors
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
            {pageTitle}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Explore our collection of premium tailoring
            and fashion products.
          </p>

        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* =================================================
            LOADING
        ================================================= */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            NO PRODUCTS
        ================================================= */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">

              <h2 className="font-serif text-2xl font-semibold text-slate-900">
                No products found
              </h2>

              <p className="mt-2 text-gray-500">
                Try another category or check back later.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-block rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
              >
                View All Products
              </Link>

            </div>
          )}

        {/* =================================================
            PRODUCT GRID
        ================================================= */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <>

              {/* PRODUCT COUNT */}
              <div className="mb-8 flex items-center justify-between">

                <div>
                  <h2 className="font-serif text-2xl font-semibold text-slate-900">
                    {pageTitle}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>

              </div>

              {/* GRID */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredProducts.map((product) => (

                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-600 hover:shadow-lg"
                  >

                    {/* =================================================
                        IMAGE
                    ================================================= */}
                    <div className="relative aspect-[3/3] overflow-hidden bg-gray-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                          !product.isAvailable
                            ? "opacity-60"
                            : ""
                        }`}
                      />

                      {/* FEATURED */}
                      {product.isFeatured && (
                        <div className="absolute left-3 top-3 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow">
                          Featured
                        </div>
                      )}

                      {/* OUT OF STOCK */}
                      {!product.isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow">
                            Out of Stock
                          </span>
                        </div>
                      )}

                    </div>

                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================= */}
                    <div className="p-5">

                      {/* CATEGORY */}
                      <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
                        {product.category}
                      </p>

                      {/* NAME */}
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">
                        {product.name}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      {/* PRICE + AVAILABILITY */}
                      <div className="mt-4 flex items-center justify-between">

                        <p className="text-lg font-bold text-slate-900">
                          Rs.{" "}
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </p>

                        {product.isAvailable ? (
                          <span className="text-xs font-medium text-green-600">
                            Available
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-red-600">
                            Out of Stock
                          </span>
                        )}

                      </div>

                      {/* =================================================
                          COLORS
                      ================================================= */}
                      {product.availableColors?.length > 0 && (
                        <div className="mt-4">

                          <p className="text-xs text-gray-500">
                            Available Colors
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">

                            {product.availableColors.map(
                              (color, index) => (
                                <span
                                  key={index}
                                  className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600"
                                >
                                  {color}
                                </span>
                              )
                            )}

                          </div>

                        </div>
                      )}

                      {/* VIEW PRODUCT */}
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <span className="text-sm font-semibold text-amber-600 transition group-hover:text-amber-500">
                          View Product →
                        </span>
                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            </>
          )}

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />

    </div>
  );
}

export default Products;