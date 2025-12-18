import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: isActive ? "700" : "500",
    borderBottom: isActive ? "2px solid white" : "none",
    paddingBottom: "2px",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        background: "#b71c1c",
        color: "white",
      }}
    >
      {/* Logo + App Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            background: "white",
            padding: "6px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="RoadWise Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <h2 style={{ margin: 0 }}>RoadWise</h2>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>

        {token && (
          <NavLink to="/add" style={linkStyle}>
            Add Experience
          </NavLink>
        )}

        <NavLink to="/trips" style={linkStyle}>
          Trips
        </NavLink>

        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>

        {!token ? (
          <>
            <NavLink to="/login" style={linkStyle}>
              Login
            </NavLink>
            <NavLink to="/register" style={linkStyle}>
              Register
            </NavLink>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              background: "white",
              color: "#b71c1c",
              border: "none",
              padding: "6px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
