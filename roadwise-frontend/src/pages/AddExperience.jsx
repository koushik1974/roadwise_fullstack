import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import hotelIcon from "../assets/icons/hotel.png";
import beachIcon from "../assets/icons/beach.png";
import templeIcon from "../assets/icons/temple.png";
import hillIcon from "../assets/icons/hill.png";
import lakeIcon from "../assets/icons/lake.png";

/* ICON CONFIG */
const ICONS = {
  hotel: hotelIcon,
  beach: beachIcon,
  temple: templeIcon,
  hill: hillIcon,
  lake: lakeIcon,
  custom: null,
};

function AddExperience() {
  const navigate = useNavigate();

  /* BASIC INFO */
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelMode, setTravelMode] = useState("");
  const [saving, setSaving] = useState(false);


  /* 🛣️ ON ROAD STOPS */
  const [onRoadStopInput, setOnRoadStopInput] = useState("");
  const [onRoadStops, setOnRoadStops] = useState([]);

  /* NODES */
  const [nodes, setNodes] = useState([]);
  const [activeNodeIndex, setActiveNodeIndex] = useState(null);

  /* AUTH GUARD */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* 🛣️ ON ROAD HANDLERS */
  const addOnRoadStop = () => {
    if (!onRoadStopInput.trim()) return;
    setOnRoadStops([...onRoadStops, onRoadStopInput.trim()]);
    setOnRoadStopInput("");
  };

  const removeOnRoadStop = (i) => {
    setOnRoadStops(onRoadStops.filter((_, idx) => idx !== i));
  };

  /* DROP NODE */
  const handleDrop = (e) => {
    e.preventDefault();
    let type = e.dataTransfer.getData("type");
    if (!type) type = "custom";

    const rect = e.currentTarget.getBoundingClientRect();

    const newNode = {
      type,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name: "",
      mapUrl: "",
    };

    setNodes((prev) => [...prev, newNode]);
    setActiveNodeIndex(nodes.length);
  };

  const updateNode = (field, value) => {
    setNodes((prev) =>
      prev.map((n, i) =>
        i === activeNodeIndex ? { ...n, [field]: value } : n
      )
    );
  };

  const deleteActiveNode = () => {
    setNodes((prev) => prev.filter((_, i) => i !== activeNodeIndex));
    setActiveNodeIndex(null);
  };

  const drawPath = (a, b) => {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2 - 40;
    return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
  };

  /* SAVE */
  const saveExperience = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!title || !city) {
      toast.error("Title and City are required");

      return;
    }

    if (nodes.length === 0) {
    toast.error("Add at least one place on the map");
      return;
    }

    const connections = nodes.slice(1).map((_, i) => [i, i + 1]);

    const body = {
      title,
      city,
      budget: Number(budget || 0),
      days: Number(days || 0),
      travelMode,
      onRoadStops,
      nodes,
      connections,
    };

    const res = await fetch("http://localhost:5000/api/travel/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Failed to save experience");
      return;
    }
    toast.success("Experience added successfully!");
    navigate("/");
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          ADD TRAVEL EXPERIENCE
        </h2>

        <input style={inputStyle} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input style={inputStyle} placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input style={inputStyle} placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
        <input style={inputStyle} placeholder="Days" onChange={(e) => setDays(e.target.value)} />
        <input style={inputStyle} placeholder="Travel Mode" onChange={(e) => setTravelMode(e.target.value)} />

        {/* 🛣️ ON ROAD STOPS */}
        <label style={labelStyle}>On-road stops</label>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={onRoadStopInput}
            onChange={(e) => setOnRoadStopInput(e.target.value)}
            placeholder="e.g. Tea break near highway"
            style={{ ...inputStyle, marginBottom: 0 }}
          />
          <button onClick={addOnRoadStop} style={smallButton}>Add</button>
        </div>

        {onRoadStops.map((s, i) => (
          <span key={i} style={tagStyle}>
            {s}
            <span onClick={() => removeOnRoadStop(i)} style={{ marginLeft: 6, cursor: "pointer" }}>✕</span>
          </span>
        ))}

        {/* ICON BAR */}
        <div style={iconBar}>
          {Object.keys(ICONS).map((type) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("type", type)}
              style={iconBox}
            >
              {type === "custom" ? <div style={customIcon}>＋</div> : <img src={ICONS[type]} alt="" width={60} />}
              <span style={{ fontSize: 14, fontWeight: 500, textTransform: "capitalize" }}>
  {type}
</span>

            </div>
          ))}
        </div>

        {/* CANVAS */}
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} style={canvasStyle}>
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            {nodes.map(
              (n, i) =>
                i > 0 && (
                  <path
                    key={i}
                    d={drawPath(nodes[i - 1], n)}
                    stroke="#1b4965"
                    strokeDasharray="6,6"
                    fill="none"
                  />
                )
            )}
          </svg>

          {nodes.map((node, i) => (
            <div
              key={i}
              onClick={() => setActiveNodeIndex(i)}
              style={{ ...nodeStyle, left: node.x, top: node.y }}
            >
              {node.type === "custom" ? <div style={customNodeIcon}>＋</div> : <img src={ICONS[node.type]} alt="" width={40} />}
              <div>{node.name || "Add name"}</div>
            </div>
          ))}
        </div>

        <button onClick={saveExperience} style={bigButton}>
          SAVE EXPERIENCE
        </button>
      </div>

      {/* SIDE EDITOR */}
      {activeNodeIndex !== null && nodes[activeNodeIndex] && (
        <div style={editorStyle}>
          <label>Name</label>
          <input
            style={editorInput}
            value={nodes[activeNodeIndex].name}
            onChange={(e) => updateNode("name", e.target.value)}
          />
          <label>Google Maps</label>
          <input
            style={editorInput}
            value={nodes[activeNodeIndex].mapUrl}
            onChange={(e) => updateNode("mapUrl", e.target.value)}
          />
          <button onClick={() => setActiveNodeIndex(null)} style={editorButton}>Done</button>
          <button onClick={deleteActiveNode} style={deleteButton}>Delete</button>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  width: "100%",
maxWidth: 1000,
  minHeight: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
   padding: "20px", 
};

const cardStyle = {
  width: 1000,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  marginBottom: 30,
  marginTop: 30,
};

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  border: "none",
};

const labelStyle = { fontSize: 13, fontWeight: 600 };
const smallButton = { padding: "14px 18px", background: "#1b4965", color: "white", border: "none", borderRadius: 10 };
const tagStyle = { display: "inline-block", background: "#fff", padding: "6px 12px", borderRadius: 14, margin: 6 };

const iconBar = {
  display: "flex",
  gap: 20,
  margin: "20px 0",
  flexWrap: "wrap",        
  justifyContent: "center" 
};
const iconBox = {
  display: "flex",
  flexDirection: "column",      
  alignItems: "center",         
  justifyContent: "center",
  gap: 8,                       // space between icon & text
  cursor: "grab",
  padding: 14,
  borderRadius: 14,
  border: "2px solid rgba(27,73,101,0.3)",
  background: "rgba(255,255,255,0.9)",
  minWidth: 100,
  transition: "all 0.2s ease",
};


const customIcon = { width: 60, height: 60, border: "2px dashed #1b4965", display: "flex", alignItems: "center", justifyContent: "center" };

const canvasStyle = {
  height: 360,
  background: "#fff",
  borderRadius: 16,
  position: "relative",
  overflow: "hidden",   // 🔥 stops nodes going out
};
const nodeStyle = {
  position: "absolute",
  background: "#fff",
  padding: 10,
  borderRadius: 12,
  minWidth: 100,
  textAlign: "center",
  border: "1px solid rgba(0,0,0,0.1)",
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  cursor: "pointer",
};

const customNodeIcon = { width: 40, height: 40, border: "2px dashed #1b4965", display: "flex", alignItems: "center", justifyContent: "center" };

const bigButton = { marginTop: 20, padding: "14px 18px", width: "100%", background: "#1b4965", color: "#fff", border: "none", borderRadius: 10 };

const editorStyle = {
  position: "fixed",
  right: 10,
  top: 80,
  width: "90%",         
  maxWidth: 320,
  background: "rgba(255,255,255,0.95)",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
};


const editorInput = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
};

const editorButton = {
  padding: "14px 18px",
  background: "#1b4965",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
};

const deleteButton = {
  padding: "14px 18px",
  background: "#fff",
  color: "#b71c1c",
  border: "1px solid #b71c1c",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  marginLeft: 8,
};


export default AddExperience;
