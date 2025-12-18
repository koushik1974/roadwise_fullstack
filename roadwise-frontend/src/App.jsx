import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import AddExperience from "./pages/AddExperience.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import Trips from "./pages/Trips";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/add" element={<AddExperience />} />
        <Route path="/trip/:id" element={<TripDetail />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
