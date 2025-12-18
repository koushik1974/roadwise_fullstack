import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div style={footerStyle}>
      {/* LEFT (social icons) */}
      <div style={iconGroup}>
        <a href="#"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
   style={iconStyle} title="GitHub">
          <FaGithub />
        </a>
        <a href="#" 
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  style={iconStyle} title="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="#" 
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  style={iconStyle} title="Instagram">
          <FaInstagram />
        </a>
      </div>

      {/* CENTER (empty, for spacing) */}
      <div />

      {/* RIGHT (copyright) */}
      <div style={copyright}>
        © {new Date().getFullYear()} RoadWise
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const footerStyle = {
  position: "static",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px 30px",
  background: "#b71c1c",
  backdropFilter: "blur(12px)",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  zIndex: 100,
};

const iconGroup = {
  display: "flex",
  gap: 14,
};

const iconStyle = {
  color: "#fcfcfcff",
  fontSize: 18,
  cursor: "pointer",
  textDecoration: "none",
  transition: "transform 0.2s",
};


const copyright = {
  textAlign: "right",
  fontSize: 13,
  color: "#ffffffff",
};

export default Footer;
