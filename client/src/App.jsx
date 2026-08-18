import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";

import Home from "./landing/Home.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminAddProduct from "./admin/AdminAddProduct.jsx";
import AdminEditProduct from "./admin/AdminEditProduct.jsx";

import Products from "./components/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import Appointment from "./components/Appointment.jsx";
import Checkout from "./components/Checkout.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import Appointments from "./admin/Appointments.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />


        {/* ================= ADMIN ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AdminAddProduct />}/>
        <Route path="/admin/products/edit/:id" element={<AdminEditProduct />}/>
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/appointments" element={<Appointments />} />

        {/* ================= PRODUCTS ================= */}

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />}
        />


        {/* ================= CART ================= */}

        <Route path="/cart" element={<Cart />} />


        {/* ================= APPOINTMENT ================= */}

        <Route path="/appointment" element={<Appointment />}
        />


        {/* ================= CHECKOUT ================= */}

        <Route path="/checkout"element={<Checkout />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;