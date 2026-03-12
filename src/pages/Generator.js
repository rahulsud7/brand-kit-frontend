import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import { supabase } from "../supabaseClient";
import BrandOutput from "../components/BrandOutput";

export default function Generator() {
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

  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    };
    loadUser();
  }, []);

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  /* ======================
     PRESETS
  ====================== */

  const presets = {
    startup: {
      brandName: "NeuroFuel",
      industry: "Technology",
      audience: "Young Professionals",
      personality: "Futuristic, Energetic",
      values: "Innovation, Speed",
      competitors: "OpenAI, Notion",
      stylePreference: "Minimal",
      logoDirection: "Geometric AI symbol"
    },

    fashion: {
      brandName: "Veloura",
      industry: "Fashion",
      audience: "Luxury Consumers",
      personality: "Elegant, Premium",
      values: "Craftsmanship",
      competitors: "Gucci, Zara",
      stylePreference: "Luxury",
      logoDirection: "Minimal emblem logo"
    },

    cafe: {
      brandName: "BeanOrbit",
      industry: "Food & Beverage",
      audience: "Students",
      personality: "Friendly, Playful",
      values: "Community",
      competitors: "Starbucks",
      stylePreference: "Playful",
      logoDirection: "Coffee themed icon"
    }
  };

  const applyPreset = preset => {
    setForm(presets[preset]);
  };

  /* ======================
     GENERATE
  ====================== */

  const generate = async () => {
    if (!userId) {
      alert("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/generate-brand-kit`, {
        ...form,
        userId
      });

      setResult(res.data);

    } catch (err) {
      console.error("Generation failed:", err.response?.data || err);
      alert("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     EXPORT JSON
  ====================== */

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.brandName || "brand"}-kit.json`;
    a.click();
  };

  /* ======================
     EXPORT SVG
  ====================== */

  const exportSVG = () => {
    if (!result?.logo_svg) return;

    const blob = new Blob([result.logo_svg], {
      type: "image/svg+xml"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.brandName}-logo.svg`;
    a.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      <h1 style={{ marginBottom: 30 }}>AI Brand Generator</h1>

      {/* GLASS FORM */}

      <div
        style={{
          width: "100%",
          maxWidth: 850,
          padding: 40,
          borderRadius: 20,
          backdropFilter: "blur(18px)",
          background: "rgba(15,23,42,0.65)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
        }}
      >

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

        {/* INPUT GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >

          <input
            placeholder="Brand Name"
            value={form.brandName}
            onChange={e => update("brandName", e.target.value)}
          />

          <input
            placeholder="Industry"
            value={form.industry}
            onChange={e => update("industry", e.target.value)}
          />

          <input
            placeholder="Target Audience"
            value={form.audience}
            onChange={e => update("audience", e.target.value)}
          />

          <input
            placeholder="Personality"
            value={form.personality}
            onChange={e => update("personality", e.target.value)}
          />

          <input
            placeholder="Core Values"
            value={form.values}
            onChange={e => update("values", e.target.value)}
          />

          <input
            placeholder="Competitors"
            value={form.competitors}
            onChange={e => update("competitors", e.target.value)}
          />

          <input
            placeholder="Logo Style"
            value={form.stylePreference}
            onChange={e => update("stylePreference", e.target.value)}
          />

          <textarea
            placeholder="Visual Direction"
            value={form.logoDirection}
            onChange={e => update("logoDirection", e.target.value)}
            style={{ gridColumn: "span 2", minHeight: 70 }}
          />

        </div>

        {/* GENERATE */}

        <button
          onClick={generate}
          style={{
            marginTop: 25,
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "none",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Generate Brand Kit"}
        </button>

      </div>

      {/* RESULT */}

      {result && (
        <div style={{ marginTop: 40, width: "100%", maxWidth: 1000 }}>

          {/* EXPORT BAR */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginBottom: 20
            }}
          >
            <button onClick={exportJSON}>Export JSON</button>
            <button onClick={exportSVG}>Export Logo</button>
          </div>

          <BrandOutput kit={result} />

        </div>
      )}

    </div>
  );
}