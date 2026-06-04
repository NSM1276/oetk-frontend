import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ÖTK — Österreichisch-Tadschikische Kulturgemeinde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoUrl = "https://nasim.at/logo-gold.png";

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

        {/* Actual logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          width={220}
          height={220}
          style={{ objectFit: "contain" }}
          alt="ÖTK"
        />

        {/* Gold divider */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "#b8924a",
            margin: "24px 0",
            display: "flex",
          }}
        />

        {/* Full name */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: "rgba(250,246,238,0.85)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.6,
            display: "flex",
          }}
        >
          Österreichisch-Tadschikische Kulturgemeinde
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 16,
            fontSize: 18,
            color: "rgba(250,246,238,0.4)",
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          Wien · Austria · Tajikistan
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 15,
            color: "rgba(184,146,74,0.55)",
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
