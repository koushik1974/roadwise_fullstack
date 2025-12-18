import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import doodles from "../assets/doodles.png";

import hotelIcon from "../assets/icons/hotel.png";
import beachIcon from "../assets/icons/beach.png";
import templeIcon from "../assets/icons/temple.png";
import hillIcon from "../assets/icons/hill.png";
import lakeIcon from "../assets/icons/lake.png";

const shimmerAnimation = {
  background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.4s ease infinite",
};


/* ICON MAP */
const ICONS = {
  hotel: hotelIcon,
  beach: beachIcon,
  temple: templeIcon,
  hill: hillIcon,
  lake: lakeIcon,
  custom: null,
};

const BASE_WIDTH = 1000;
const BASE_HEIGHT = 360;

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/travel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const scaleX = (x) => (x / BASE_WIDTH) * 100;
  const scaleY = (y) => (y / BASE_HEIGHT) * 100;

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back
        </button>

        {/* 🔥 SKELETON LOADER */}
        {loading && (
          <>
            <div style={skeletonInfo} />
            <div style={skeletonMap} />
          </>
        )}

        {/* ===== REAL CONTENT ===== */}
        {!loading && trip && (
          <>
            {/* INFO */}
            <div style={infoCard}>
              <h2 style={{ marginBottom: 12 }}>{trip.title}</h2>

              <div style={infoGrid}>
                <div><strong>Place:</strong> {trip.city}</div>
                <div><strong>Budget:</strong> ₹{trip.budget}</div>
                <div><strong>Duration:</strong> {trip.days} days</div>
                <div><strong>Travel mode:</strong> {trip.travelMode}</div>
              </div>
            </div>

            {/* MAP */}
            <div style={canvasWrapper}>
              <img src={doodles} alt="" style={doodleStyle} />

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: "absolute", zIndex: 1 }}
              >
                {trip.nodes?.map(
                  (node, i) =>
                    i > 0 && (
                      <path
                        key={i}
                        d={`
                          M ${scaleX(trip.nodes[i - 1].x)} ${scaleY(trip.nodes[i - 1].y)}
                          Q ${(scaleX(trip.nodes[i - 1].x) + scaleX(node.x)) / 2}
                            ${(scaleY(trip.nodes[i - 1].y) + scaleY(node.y)) / 2 - 6}
                            ${scaleX(node.x)} ${scaleY(node.y)}
                        `}
                        stroke="#1b4965"
                        strokeDasharray="6,6"
                        fill="none"
                      />
                    )
                )}
              </svg>

              {trip.nodes?.map((node, i) => (
                <div
                  key={i}
                  style={{
                    ...nodeStyle,
                    left: `${scaleX(node.x)}%`,
                    top: `${scaleY(node.y)}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                >
                  {ICONS[node.type] ? (
                    <img src={ICONS[node.type]} alt="" style={{ width: 36 }} />
                  ) : (
                    <div style={customNodeIcon}>＋</div>
                  )}

                  <div style={nodeText}>
                    {node.name || node.type}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <style>
{`
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
`}
</style>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const skeletonInfo = {
  height: 140,
  borderRadius: 16,
  marginBottom: 24,
  ...shimmerAnimation,
};

const skeletonMap = {
  height: 380,
  borderRadius: 18,
  ...shimmerAnimation,
};


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
   padding: "20px", 
};

const cardStyle = {
  width: "100%",
  maxWidth: 900,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const backBtn = {
  marginBottom: 20,
  padding: "12px 16px",
  borderRadius: 8,
  border: "none",
  background: "#1b4965",
  color: "white",
  cursor: "pointer",
};

const infoCard = {
  background: "rgba(255,255,255,0.95)",
  padding: 20,
  borderRadius: 16,
  marginBottom: 24,
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  fontSize: 15,
};


const canvasWrapper = {
  width: "100%",
  height: 380,
  background: "rgba(255,255,255,0.95)",
  borderRadius: 18,
  position: "relative",
  padding: 30,
};

const doodleStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.18,
  pointerEvents: "none",
  zIndex: 0,
};

/* ---------- NODES ---------- */

const nodeStyle = {
  position: "absolute",
  background: "#ffffff",
  padding: "10px",
  borderRadius: 14,
  minWidth: 90,
  textAlign: "center",
  border: "1px solid rgba(0,0,0,0.1)",
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
};

const nodeText = {
  marginTop: 6,
  fontSize: 13,
  fontWeight: 500,
};

const customNodeIcon = {
  width: 36,
  height: 36,
  border: "2px dashed #1b4965",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  color: "#1b4965",
};

export default TripDetail;
