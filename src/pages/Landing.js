import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, #1e293b, #020617)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center"
        }}
      >
        {/* LEFT HERO CONTENT */}

        <div>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 700,
              marginBottom: 20,
              lineHeight: 1.1,
              background:
                "linear-gradient(90deg,#38bdf8,#6366f1)",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            AI Brand Kit Generator
          </h1>

          <p
            style={{
              fontSize: 18,
              opacity: 0.8,
              marginBottom: 30
            }}
          >
            Generate logos, color palettes, fonts and
            social content in seconds using AI.
          </p>

          {/* FEATURES */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 40
            }}
          >
            {[
              "⚡ Taglines",
              "🎨 Color Palettes",
              "✍️ Typography",
              "📱 Social Templates"
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 14px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.06)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  fontSize: 14
                }}
              >
                {f}
              </div>
            ))}
          </div>

          {/* CTA */}

          <Link to="/auth">
            <button
              style={{
                padding: "16px 32px",
                fontSize: 18,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "white",
                background:
                  "linear-gradient(90deg,#06b6d4,#3b82f6)",
                boxShadow:
                  "0 20px 40px rgba(59,130,246,0.35)"
              }}
            >
              Generate My Brand →
            </button>
          </Link>
        </div>

        {/* RIGHT PHONE PREVIEW */}

        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: 280,
              height: 540,
              borderRadius: 32,
              padding: 20,
              background: "#000",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.8)",
              position: "relative"
            }}
          >
            <div
              style={{
                height: 140,
                borderRadius: 14,
                background:
                  "linear-gradient(90deg,#6366f1,#38bdf8)",
                marginBottom: 20
              }}
            />

            <h3
              style={{
                textAlign: "center",
                marginBottom: 6
              }}
            >
              NeuroFuel
            </h3>

            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                opacity: 0.7,
                marginBottom: 20
              }}
            >
              AI productivity for creators
            </p>

            <div
              style={{
                background: "#6366f1",
                padding: 12,
                borderRadius: 12,
                textAlign: "center",
                fontSize: 14
              }}
            >
              Work faster with AI 🚀
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div
        style={{
          position: "absolute",
          bottom: 20,
          opacity: 0.6,
          fontSize: 14
        }}
      >
        Built with AI • React • Node • Supabase
      </div>
    </div>
  );
}