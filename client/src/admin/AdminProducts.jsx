import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Star,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

const categories = [
  "All",
  "Men's Suits",
  "Shirts & Pants",
  "Accessories",
  "Custom Tailoring",
];

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] =
    useSearchParams();

  const categoryFromUrl =
    searchParams.get("category");

  const selectedCategory =
    categoryFromUrl || "All";


  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category,
      });
    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      setProducts((current) =>
        current.filter(
          (product) => product._id !== id
        )
      );

    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.message || "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };


  // =====================================================
  // SEARCH + CATEGORY FILTER
  // =====================================================

  const filteredProducts = products.filter(
    (product) => {

      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchText = search.toLowerCase();

      const searchMatch =
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.description
          ?.toLowerCase()
          .includes(searchText);

      return categoryMatch && searchMatch;
    }
  );


  // =====================================================
  // CATEGORY COUNT
  // =====================================================

  const getCategoryCount = (category) => {
    if (category === "All") {
      return products.length;
    }

    return products.filter(
      (product) =>
        product.category === category
    ).length;
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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


          <div className="flex items-center gap-4">

            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500"
            >
              <Plus size={17} />
              Add Product
            </Link>


            <Link
              to="/admin/dashboard"
              className="hidden items-center gap-2 text-sm text-gray-300 transition hover:text-amber-500 sm:flex"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>

          </div>

        </div>

      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <section className="mb-8">

          <p className="text-sm font-medium uppercase tracking-widest text-amber-500">
            Administration
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold">
            All Products
          </h1>

          <p className="mt-3 text-gray-400">
            Manage all products in your store.
          </p>

        </section>


        {/* ================================================= */}
        {/* FILTER + SEARCH */}
        {/* ================================================= */}

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex flex-col gap-5">

            {/* CATEGORY BUTTONS */}

            <div className="flex flex-wrap gap-2">

              {categories.map((category) => {

                const active =
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-amber-600 text-white"
                        : "border border-slate-700 bg-slate-950 text-gray-400 hover:border-amber-600 hover:text-amber-500"
                    }`}
                  >

                    {category}

                    <span className="ml-2 text-xs opacity-70">
                      {getCategoryCount(
                        category
                      )}
                    </span>

                  </button>
                );
              })}

            </div>


            {/* SEARCH */}

            <div className="relative max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-amber-500"
              />

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* PRODUCT LIST */}
        {/* ================================================= */}

        <section className="mt-6">

          {loading ? (

            <div className="rounded-xl border border-slate-800 bg-slate-900 py-20 text-center">

              <Loader2
                size={30}
                className="mx-auto animate-spin text-amber-500"
              />

              <p className="mt-4 text-sm text-gray-400">
                Loading products...
              </p>

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="rounded-xl border border-slate-800 bg-slate-900 py-20 text-center">

              <Package
                size={45}
                className="mx-auto text-gray-600"
              />

              <h2 className="mt-4 text-lg font-semibold">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another category or search term.
              </p>

              <Link
                to="/admin/products/add"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
              >
                <Plus size={17} />
                Add Product
              </Link>

            </div>

          ) : (

            <div className="overflow-hidden rounded-xl border border-slate-800">

              {/* TABLE HEADER */}

              <div className="hidden grid-cols-[80px_1fr_170px_130px_190px] items-center gap-5 border-b border-slate-800 bg-slate-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:grid">

                <span>Image</span>

                <span>Product</span>

                <span>Category</span>

                <span>Price</span>

                <span className="text-right">
                  Actions
                </span>

              </div>


              {/* PRODUCTS */}

              <div className="divide-y divide-slate-800">

                {filteredProducts.map(
                  (product) => (

                    <div
                      key={product._id}
                      className="bg-slate-950 px-5 py-5 transition hover:bg-slate-900 lg:px-6"
                    >

                      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[80px_1fr_170px_130px_190px] lg:items-center lg:gap-5">

                        {/* IMAGE */}

                        <div className="h-20 w-20 overflow-hidden rounded-lg border border-slate-800">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />

                        </div>


                        {/* PRODUCT */}

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <h3 className="truncate font-semibold text-white">
                              {product.name}
                            </h3>

                            {product.isFeatured && (
                              <Star
                                size={15}
                                className="shrink-0 fill-amber-500 text-amber-500"
                              />
                            )}

                          </div>

                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {product.description}
                          </p>

                          <p
                            className={`mt-2 text-xs font-medium ${
                              product.isAvailable
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {product.isAvailable
                              ? "Available"
                              : "Unavailable"}
                          </p>

                        </div>


                        {/* CATEGORY */}

                        <div>

                          <span className="inline-block rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-gray-400">
                            {product.category}
                          </span>

                        </div>


                        {/* PRICE */}

                        <div className="font-semibold text-white">

                          Rs.{" "}
                          {Number(
                            product.price
                          ).toLocaleString()}

                        </div>


                        {/* ACTIONS */}

                        <div className="flex gap-2 lg:justify-end">

                          {/* EDIT */}

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-amber-600/60 px-4 py-2.5 text-sm font-medium text-amber-500 transition hover:bg-amber-600 hover:text-white"
                          >
                            <Pencil size={16} />
                            Edit
                          </Link>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            disabled={
                              deletingId ===
                              product._id
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-red-700/60 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {deletingId ===
                            product._id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}

                            Delete

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminProducts;