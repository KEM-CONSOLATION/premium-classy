import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Premium&Classy - Professional Event Planning Services";
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
          background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "60px",
            textAlign: "center",
            maxWidth: "900px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 20px 0",
              lineHeight: "1.1",
            }}
          >
            Premium&Classy
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#6b7280",
              margin: "0",
              fontWeight: "400",
            }}
          >
            Professional Event Planning Services
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              gap: "30px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#d97706",
                fontWeight: "600",
              }}
            >
              Weddings
            </span>
            <span
              style={{
                fontSize: "24px",
                color: "#d97706",
                fontWeight: "600",
              }}
            >
              •
            </span>
            <span
              style={{
                fontSize: "24px",
                color: "#d97706",
                fontWeight: "600",
              }}
            >
              Corporate Events
            </span>
            <span
              style={{
                fontSize: "24px",
                color: "#d97706",
                fontWeight: "600",
              }}
            >
              •
            </span>
            <span
              style={{
                fontSize: "24px",
                color: "#d97706",
                fontWeight: "600",
              }}
            >
              Celebrations
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
