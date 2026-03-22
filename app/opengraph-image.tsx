import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Marouane LEMGHARI | Computer Engineering & Cybersecurity";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #1a1e51 0%, #0d0f28 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
      }}
    >
      {/* Subtle decorative elements for a more tech/security feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "84px",
            fontWeight: "bold",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
            textShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          Marouane LEMGHARI
        </h1>
        <p
          style={{
            fontSize: "38px",
            fontWeight: "600",
            color: "#ff7a45", // Using your accent color
            marginBottom: "40px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Computer Engineering & Cybersecurity
        </p>
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "24px",
            fontWeight: "500",
            opacity: 0.8,
            padding: "12px 32px",
            borderRadius: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span>Full-Stack</span>
          <span>•</span>
          <span>AI</span>
          <span>•</span>
          <span>CTF Exploits</span>
          <span>•</span>
          <span>Containerized Systems</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
