import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("https://roadwise-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
       toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch {
      toast.error("Backend not reachable");
    }
  };

  return (
    <div style={pageStyle}>
      {/* Glass Card */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>LOGIN</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={login} style={buttonStyle}>
          Login
        </button>

        <p style={footerText}>
          Don’t have an account?{" "}
          <span style={registerLink} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  width: "100%",

  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')", // SAME background
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const cardStyle = {
  width: 420,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const titleStyle = {
  marginBottom: 24,
  fontSize: 26,
  fontWeight: 800,
  letterSpacing: 1.5,
  color: "#0d1b2a",
};

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
  border: "none",
  fontSize: 14,
  background: "rgba(255,255,255,0.9)",
};

const buttonStyle = {
  width: "100%",
  padding: "14px 18px",
  marginTop: 10,
  background: "linear-gradient(135deg, #c62828, #b71c1c)",
  color: "white",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
};

const footerText = {
  marginTop: 18,
  fontSize: 14,
};

const registerLink = {
  color: "#b71c1c",
  cursor: "pointer",
  fontWeight: 600,
};

export default Login;
