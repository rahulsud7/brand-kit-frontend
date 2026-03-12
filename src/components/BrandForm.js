import { useState } from "react";

export default function BrandForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    brandName: "",
    industry: "",
    audience: "",
    personality: "",
    values: "",
    competitors: "",
    stylePreference: "",
    logoDirection: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     PRESETS
  ========================= */

  const presets = {
    startup: {
      brandName: "NeuroFuel",
      industry: "Technology",
      audience: "Young Professionals",
      personality: "Futuristic, Energetic",
      values: "Innovation, Speed",
      competitors: "Notion, OpenAI",
      stylePreference: "Minimal",
      logoDirection: "Geometric AI inspired symbol"
    },

    fashion: {
      brandName: "Veloura",
      industry: "Fashion",
      audience: "High-income Consumers",
      personality: "Luxury, Elegant",
      values: "Premium, Craftsmanship",
      competitors: "Gucci, Zara",
      stylePreference: "Luxury",
      logoDirection: "Minimal luxury emblem"
    },

    cafe: {
      brandName: "BeanOrbit",
      industry: "Food & Beverage",
      audience: "Students",
      personality: "Friendly, Playful",
      values: "Community, Comfort",
      competitors: "Starbucks, Blue Tokai",
      stylePreference: "Playful",
      logoDirection: "Coffee themed icon with modern style"
    }
  };

  const applyPreset = (preset) => {
    setForm(presets[preset]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          padding: 40,
          borderRadius: 18,
          backdropFilter: "blur(18px)",
          background: "rgba(15,23,42,0.65)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.45)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 25 }}>
          Create Brand Kit
        </h2>

        {/* PRESETS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 30
          }}
        >
          <button onClick={() => applyPreset("startup")}>AI Startup</button>
          <button onClick={() => applyPreset("fashion")}>Luxury Fashion</button>
          <button onClick={() => applyPreset("cafe")}>Coffee Brand</button>
        </div>

        {/* GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          <input
            id="brandName"
            name="brandName"
            placeholder="Brand Name"
            value={form.brandName}
            onChange={handleChange}
          />

          <input
            id="industry"
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={handleChange}
          />

          <input
            id="audience"
            name="audience"
            placeholder="Target Audience"
            value={form.audience}
            onChange={handleChange}
          />

          <input
            id="personality"
            name="personality"
            placeholder="Personality"
            value={form.personality}
            onChange={handleChange}
          />

          <input
            id="values"
            name="values"
            placeholder="Core Values"
            value={form.values}
            onChange={handleChange}
          />

          <input
            id="competitors"
            name="competitors"
            placeholder="Competitors"
            value={form.competitors}
            onChange={handleChange}
          />

          <input
            id="stylePreference"
            name="stylePreference"
            placeholder="Logo Style"
            value={form.stylePreference}
            onChange={handleChange}
          />

          <textarea
            id="logoDirection"
            name="logoDirection"
            placeholder="Visual Direction"
            value={form.logoDirection}
            onChange={handleChange}
            style={{ gridColumn: "span 2", minHeight: 70 }}
          />
        </div>

        {/* BUTTON */}

        <button
          onClick={() => onGenerate(form)}
          style={{
            marginTop: 25,
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            background:
              "linear-gradient(90deg,#06b6d4,#3b82f6)",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Generate Brand Kit"}
        </button>
      </div>
    </div>
  );
}