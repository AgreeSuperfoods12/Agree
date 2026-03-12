import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agree Superfoods";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at top right, rgba(223, 189, 104, 0.26), transparent 28%), linear-gradient(135deg, #faf7f0 0%, #eff5ed 100%)",
          color: "#132018",
          padding: "72px",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "65%",
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
            Premium seeds, teas, and pantry essentials
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.04,
                fontWeight: 600,
              }}
            >
              Agree
              <br />
              Superfoods
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                color: "#274033",
              }}
            >
              Premium seeds, teas, makhana, and pantry essentials presented with clarity,
              restraint, and everyday usefulness.
            </div>
          </div>
        </div>
        <div
          style={{
            width: "320px",
            borderRadius: "48px",
            background: "#243A2D",
            color: "#faf7f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 84,
            fontWeight: 700,
          }}
        >
          AG
        </div>
      </div>
    ),
    size,
  );
}
