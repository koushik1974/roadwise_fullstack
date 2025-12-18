import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const city = params.get("city");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/travel/search?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city]);

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          Trips in <span style={{ color: "#1b4965" }}>{city}</span>
        </h2>

        {/* 🔄 SKELETON LOADER */}
        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} style={skeletonCard} />
            ))}
          </>
        )}

        {/* ❌ EMPTY STATE */}
        {!loading && trips.length === 0 && (
          <div style={emptyState}>
            <div style={emptyIcon}>🌍</div>
            <h3>No trips found</h3>
            <p>
              No one has shared a trip for this city yet.
              <br />
              Be the first to add one!
            </p>
          </div>
        )}

        {/* ✅ TRIPS LIST */}
        {!loading &&
          trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/trip/${trip._id}`)}
              style={tripCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 14px rgba(0,0,0,0.15)";
              }}
            >
              <h3 style={{ marginBottom: 10 }}>
                {trip.title || "Trip Experience"}
              </h3>

              <div style={detailsGrid}>
                <div><strong>City:</strong> {trip.city}</div>
                <div><strong>Budget:</strong> ₹{trip.budget}</div>
                <div><strong>No. of days:</strong> {trip.days}</div>
                <div><strong>Travel mode:</strong> {trip.travelMode}</div>
              </div>

              <div style={{ marginTop: 10 }}>
                <strong>On-road stops:</strong>{" "}
                {trip.onRoadStops && trip.onRoadStops.length > 0 ? (
                  <div style={stopsContainer}>
                    {trip.onRoadStops.map((stop, i) => (
                      <span key={i} style={stopTag}>
                        {stop}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ color: "#777" }}>None</span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
};

const cardStyle = {
  width: "100%",
  maxWidth: 950,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: 30,
  fontSize: 26,
  fontWeight: 700,
};

/* 🧱 Skeleton */

const skeletonCard = {
  height: 140,
  borderRadius: 16,
  marginBottom: 22,
  background:
    "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.4s ease infinite",
};

/* 🧭 Empty State */

const emptyState = {
  textAlign: "center",
  padding: "40px 20px",
  color: "#444",
};

const emptyIcon = {
  fontSize: 64,
  marginBottom: 10,
};

/* 🎫 Trip Card */

const tripCard = {
  background: "rgba(255,255,255,0.95)",
  borderRadius: 16,
  padding: 22,
  marginBottom: 22,
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 8,
  fontSize: 14,
  color: "#555",
};

const stopsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 6,
};

const stopTag = {
  background: "rgba(27,73,101,0.1)",
  padding: "4px 10px",
  borderRadius: 12,
  fontSize: 13,
};

/* 🔄 Shimmer animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
`;
document.head.appendChild(style);

export default SearchResults;
