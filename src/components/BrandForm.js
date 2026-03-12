import { useState } from "react";

export default function BrandForm({ onGenerate, loading }) {

  const initialState = {
    brandName: "",
    brandType: "",
    industry: "",
    audience: "",
    personality: [],
    keywords: "",
    competitors: "",
    stylePreference: ""
  };

  const [form, setForm] = useState(initialState);

  const personalityOptions = [
    "Bold",
    "Minimal",
    "Luxury",
    "Playful",
    "Futuristic",
    "Friendly",
    "Professional",
    "Elegant",
    "Energetic"
  ];

  const presets = [
    {
      id: "startup",
      title: "AI Startup",
      desc: "Modern tech brand",
      data: {
        brandName: "NeuroFuel",
        brandType: "Startup",
        industry: "Technology",
        audience: "Young Professionals",
        personality: ["Futuristic", "Energetic"],
        keywords: "AI, productivity, automation",
        competitors: "Notion, OpenAI",
        stylePreference: "Minimal"
      }
    },
    {
      id: "fashion",
      title: "Luxury Fashion",
      desc: "Premium lifestyle brand",
      data: {
        brandName: "Veloura",
        brandType: "Product Brand",
        industry: "Fashion",
        audience: "High-income Consumers",
        personality: ["Luxury", "Elegant"],
        keywords: "premium, fashion, elegance",
        competitors: "Gucci, Zara",
        stylePreference: "Luxury"
      }
    },
    {
      id: "coffee",
      title: "Coffee Shop",
      desc: "Community cafe brand",
      data: {
        brandName: "BeanOrbit",
        brandType: "Service Business",
        industry: "Food & Beverage",
        audience: "Students",
        personality: ["Friendly", "Playful"],
        keywords: "coffee, chill, community",
        competitors: "Starbucks, Blue Tokai",
        stylePreference: "Playful"
      }
    }
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const togglePersonality = (trait) => {
    if (form.personality.includes(trait)) {
      setForm({
        ...form,
        personality: form.personality.filter((p) => p !== trait)
      });
    } else {
      setForm({
        ...form,
        personality: [...form.personality, trait]
      });
    }
  };

  const loadPreset = (presetData) => {
    setForm(presetData);
  };

  const handleSubmit = () => {
    if (!form.brandName || !form.industry || !form.audience) {
      alert("Please fill Brand Name, Industry and Audience.");
      return;
    }

    onGenerate(form);
  };

  return (
    <div className="brand-form">

      <h2>Create Your Brand Kit</h2>

      {/* PRESETS */}
      <div className="preset-grid">
        {presets.map((p) => (
          <div
            key={p.id}
            className="preset-card"
            onClick={() => loadPreset(p.data)}
          >
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* BRAND BASICS */}
      <div className="form-section">

        <h3>Brand Basics</h3>

        <input
          name="brandName"
          placeholder="Brand Name (e.g. NeuroFuel)"
          value={form.brandName}
          onChange={handleChange}
        />

        <div className="grid-2">

          <select
            name="brandType"
            value={form.brandType}
            onChange={handleChange}
          >
            <option value="">Brand Type</option>
            <option>Startup</option>
            <option>Personal Brand</option>
            <option>Agency</option>
            <option>Product Brand</option>
            <option>Service Business</option>
          </select>

          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
          >
            <option value="">Industry</option>
            <option>Technology</option>
            <option>Fashion</option>
            <option>Food & Beverage</option>
            <option>Fitness</option>
            <option>Finance</option>
            <option>Education</option>
            <option>Travel</option>
            <option>Healthcare</option>
            <option>Entertainment</option>
          </select>

        </div>
      </div>

      {/* AUDIENCE */}
      <div className="form-section">

        <h3>Audience</h3>

        <select
          name="audience"
          value={form.audience}
          onChange={handleChange}
        >
          <option value="">Target Audience</option>
          <option>Students</option>
          <option>Young Professionals</option>
          <option>Business Owners</option>
          <option>Parents</option>
          <option>High-income Consumers</option>
          <option>General Public</option>
        </select>

      </div>

      {/* STYLE */}
      <div className="form-section">

        <h3>Design Style</h3>

        <select
          name="stylePreference"
          value={form.stylePreference}
          onChange={handleChange}
        >
          <option value="">Design Style</option>
          <option>Minimal</option>
          <option>Modern</option>
          <option>Geometric</option>
          <option>Luxury</option>
          <option>Playful</option>
          <option>Retro</option>
        </select>

      </div>

      {/* PERSONALITY */}
      <div className="form-section">

        <h3>Brand Personality</h3>

        <div className="chip-grid">
          {personalityOptions.map((p) => (
            <div
              key={p}
              className={`chip ${form.personality.includes(p) ? "active" : ""}`}
              onClick={() => togglePersonality(p)}
            >
              {p}
            </div>
          ))}
        </div>

      </div>

      {/* EXTRA */}
      <div className="form-section">

        <h3>Extra Context</h3>

        <input
          name="keywords"
          placeholder="Keywords (innovation, speed, community)"
          value={form.keywords}
          onChange={handleChange}
        />

        <input
          name="competitors"
          placeholder="Competitors (Apple, Nike, Stripe)"
          value={form.competitors}
          onChange={handleChange}
        />

      </div>

      {/* GENERATE */}
      <button
        className="generate-btn"
        onClick={handleSubmit}
      >
        {loading ? "Generating Brand Kit..." : "Generate Brand Kit"}
      </button>

    </div>
  );
}