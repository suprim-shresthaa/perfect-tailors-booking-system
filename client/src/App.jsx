import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";
import Home from "./landing/Home.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;