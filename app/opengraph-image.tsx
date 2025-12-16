import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Marouane LEMGHARI - Software Engineer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Marouane LEMGHARI
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: "500",
              opacity: 0.95,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Software Engineer & Full-Stack Developer
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
              fontSize: "24px",
              opacity: 0.9,
            }}
          >
            <span>React</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Node.js</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
