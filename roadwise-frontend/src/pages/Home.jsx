import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doodles from "../assets/doodles.png";

function Home() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");

  // 🔍 Filters
  const [showFilters, setShowFilters] = useState(false);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelMode, setTravelMode] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;

    const params = new URLSearchParams();
    params.append("city", city);

    if (minBudget) params.append("minBudget", minBudget);
    if (maxBudget) params.append("maxBudget", maxBudget);
    if (days) params.append("days", days);
    if (travelMode) params.append("travelMode", travelMode);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* 🖍️ DOODLE BACKGROUND */}
        <img
          src={doodles}
          alt="doodles"
          style={doodleStyle}
        />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={title}>ROADWISE</h1>
          <p style={subtitle}>Plan smarter. Travel wiser.</p>

          {/* SEARCH + FILTER */}
          <div style={searchRow}>
            <input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={filterButton}
              title="Filters"
            >
              ⚙️
            </button>
          </div>

          {/* FILTER PANEL */}
          {showFilters && (
            <div style={filterPanel}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  placeholder="Min budget"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  style={filterInput}
                />
                <input
                  placeholder="Max budget"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  style={filterInput}
                />
              </div>

              <input
                placeholder="No. of days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                style={filterInput}
              />

              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                style={filterInput}
              >
                <option value="">Travel mode</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Bus">Bus</option>
                <option value="Car">Car</option>
              </select>
            </div>
          )}

          <button onClick={handleSearch} style={primaryButton}>
            Search Trips
          </button>

          <div style={subtitle}>OR</div>

          <button
            onClick={() => navigate("/add")}
            style={secondaryButton}
          >
            Add Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  width: "100%",
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: 420,
  padding: 40,
  borderRadius: 20,
  background: "#fdfaf6",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const doodleStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.28,
  pointerEvents: "none",
};

const title = {
  textAlign: "center",
  marginBottom: 6,
  fontWeight: 900,
  letterSpacing: "2px",
};

const subtitle = {
  textAlign: "center",
  marginBottom: 22,
  color: "#555",
};


const searchRow = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

const inputStyle = {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
};

const filterButton = {
 padding: "14px 18px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const filterPanel = {
  marginTop: 14,
  padding: 14,
  borderRadius: 12,
  background: "rgba(255,255,255,0.9)",
  border: "1px solid #ddd",
};

const filterInput = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const primaryButton = {
  marginTop: 20,
  width: "100%",
  padding: "14px 18px",
  background: "#c62828",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  padding: "14px 18px",
  background: "#fff",
  color: "#c62828",
  border: "2px solid #c62828",
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer",
};

export default Home;
