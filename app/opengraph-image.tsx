import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ÖTK — Österreichisch-Tadschikische Kulturgemeinde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#15110d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle geometric background accent */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(184,146,74,0.12)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "1px solid rgba(184,146,74,0.08)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Top gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #b8924a, transparent)",
            display: "flex",
          }}
        />

        {/* ÖTK monogram */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 300,
            color: "#b8924a",
            letterSpacing: "0.1em",
            lineHeight: 1,
            marginBottom: 24,
            display: "flex",
          }}
        >
          ÖTK
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "#b8924a",
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Full name */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 300,
            color: "rgba(250,246,238,0.85)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Österreichisch-Tadschikische Kulturgemeinde
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "rgba(250,246,238,0.45)",
            letterSpacing: "0.08em",
            display: "flex",
          }}
        >
          Wien · Austria · Tajikistan
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 15,
            color: "rgba(184,146,74,0.6)",
            letterSpacing: "0.12em",
            display: "flex",
          }}
        >
          nasim.at
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #b8924a, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
