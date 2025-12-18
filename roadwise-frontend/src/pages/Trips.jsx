import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 🔥 SHIMMER */
const shimmerAnimation = {
  background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.4s ease infinite",
};

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/travel/search")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          All Trips
        </h2>

        {/* 🔥 SKELETON LOADER */}
        {loading && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={skeletonCard} />
            ))}
          </>
        )}

        {/* EMPTY STATE */}
        {!loading && trips.length === 0 && (
  <div style={emptyState}>
    <div style={emptyIcon}>🧭</div>
    <h3>No trips yet</h3>
    <p>
      Be the first to share a travel experience!
    </p>
  </div>
)}


        {/* REAL DATA */}
        {!loading &&
          trips.map((trip) => (
            <div
              key={trip._id}
              style={tripCard}
              onClick={() => navigate(`/trip/${trip._id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(0,0,0,0.12)";
              }}
            >
              <h3 style={{ marginBottom: 6 }}>
                {trip.title || "Trip Experience"}
              </h3>

              <p style={pStyle}>📍 <b>City:</b> {trip.city}</p>
              <p style={pStyle}>💰 <b>Budget:</b> ₹{trip.budget}</p>
              <p style={pStyle}>🗓 <b>Days:</b> {trip.days}</p>
              <p style={pStyle}>🚆 <b>Travel mode:</b> {trip.travelMode}</p>

              {trip.onRoadStops?.length > 0 && (
                <p style={{ marginTop: 6, color: "#666" }}>
                  🛣 <b>On-road stops:</b> {trip.onRoadStops.join(", ")}
                </p>
              )}
            </div>
          ))}

        {/* SHIMMER KEYFRAMES */}
        <style>
          {`
            @keyframes shimmer {
              0% { background-position: -400px 0; }
              100% { background-position: 400px 0; }
            }
          `}
        </style>
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
  alignItems: "flex-start",
   padding: "20px", 
};

const cardStyle = {
  width: "80%",
  maxWidth: 900,
  padding: 30,
  borderRadius: 22,
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const tripCard = {
  background: "white",
  padding: 18,
  borderRadius: 16,
  marginBottom: 16,
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const pStyle = {
  margin: "4px 0",
  color: "#555",
};
const emptyState = {
  textAlign: "center",
  padding: "40px 20px",
  color: "#444",
};

const emptyIcon = {
  fontSize: 64,
  marginBottom: 10,
};

/* ---------- SKELETON ---------- */

const skeletonCard = {
  height: 140,
  borderRadius: 16,
  marginBottom: 16,
  ...shimmerAnimation,
};

export default Trips;
