import { Link } from "react-router-dom";

export default function Landing() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, #1e293b, #020617)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 20px",
        color: "white",
        fontFamily: "Inter, sans-serif"
      }}
    >

      {/* HERO */}

      <div
        style={{
          maxWidth: 900,
          textAlign: "center"
        }}
      >

        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 20,
            letterSpacing: "-1px",
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
            marginBottom: 40
          }}
        >
          Create complete brand identities in seconds using AI.
          Logos, colors, fonts, and social media assets.
        </p>

        <Link to="/auth">

          <button
            style={{
              padding: "16px 36px",
              fontSize: 18,
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: 600,
              background:
                "linear-gradient(90deg,#06b6d4,#3b82f6)",
              boxShadow:
                "0 20px 40px rgba(59,130,246,0.4)"
            }}
          >
            Generate My Brand →
          </button>

        </Link>

      </div>

      {/* FEATURE GLASS CARD */}

      <div
        style={{
          marginTop: 80,
          padding: 40,
          width: "100%",
          maxWidth: 900,
          borderRadius: 22,
          backdropFilter: "blur(18px)",
          background: "rgba(15,23,42,0.65)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)"
        }}
      >

        <h2 style={{ marginBottom: 20 }}>
          Everything Your Brand Needs
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(160px,1fr))",
            gap: 16
          }}
        >

          {[
            "⚡ AI Taglines",
            "🎨 Color Palettes",
            "✍️ Font Pairing",
            "🧠 Brand Strategy",
            "📱 Instagram Content",
            "📦 Export Brand Kits"
          ].map((f, i) => (

            <div
              key={i}
              style={{
                padding: 16,
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.06)",
                textAlign: "center"
              }}
            >
              {f}
            </div>

          ))}

        </div>

      </div>

      {/* PHONE PREVIEW */}

      <div
        style={{
          marginTop: 80,
          display: "flex",
          justifyContent: "center"
        }}
      >

        <div
          style={{
            width: 260,
            height: 520,
            borderRadius: 32,
            padding: 20,
            background: "#000",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.8)",
            textAlign: "center"
          }}
        >

          <div
            style={{
              height: 120,
              background:
                "linear-gradient(90deg,#6366f1,#38bdf8)",
              borderRadius: 14,
              marginBottom: 20
            }}
          />

          <h3>NeuroFuel</h3>

          <p
            style={{
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
              borderRadius: 10,
              fontSize: 13
            }}
          >
            Work faster with AI 🚀
          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div
        style={{
          marginTop: 80,
          opacity: 0.6,
          fontSize: 14
        }}
      >
        Built with AI • React • Node • Supabase
      </div>

    </div>
  );
}