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

  const handleSubmit = () => {
    if (!form.brandName || !form.industry || !form.audience) {
      alert("Please fill Brand Name, Industry and Audience.");
      return;
    }

    onGenerate(form);
  };

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

  const presets = {
    startup: {
      brandName: "NeuroFuel",
      brandType: "Startup",
      industry: "Technology",
      audience: "Young Professionals",
      personality: ["Futuristic", "Energetic"],
      keywords: "AI, productivity, performance",
      competitors: "Notion, OpenAI",
      stylePreference: "Minimal"
    },

    fashion: {
      brandName: "Veloura",
      brandType: "Product Brand",
      industry: "Fashion",
      audience: "High-income Consumers",
      personality: ["Luxury", "Elegant"],
      keywords: "premium, style, elegance",
      competitors: "Gucci, Zara",
      stylePreference: "Luxury"
    },

    cafe: {
      brandName: "BeanOrbit",
      brandType: "Startup",
      industry: "Food & Beverage",
      audience: "Students",
      personality: ["Friendly", "Playful"],
      keywords: "coffee, community, chill",
      competitors: "Starbucks, Blue Tokai",
      stylePreference: "Playful"
    }
  };

  const loadPreset = (preset) => {
    setForm(presets[preset]);
  };

  return (
    <div className="form-card">

      <h2>Create Your Brand</h2>

      <div className="preset-buttons">
        <p>Quick Start:</p>

        <button onClick={() => loadPreset("startup")}>
          AI Startup
        </button>

        <button onClick={() => loadPreset("fashion")}>
          Luxury Fashion
        </button>

        <button onClick={() => loadPreset("cafe")}>
          Coffee Brand
        </button>
      </div>

      <h3>Brand Basics</h3>

      <input
        name="brandName"
        placeholder="Brand Name (e.g. NeuroFuel)"
        value={form.brandName}
        onChange={handleChange}
      />

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

      <h3>Design Direction</h3>

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

      <h3>Brand Personality</h3>

      <div className="personality-box">
        <div className="chips">
          {personalityOptions.map((p) => (
            <span
              key={p}
              className={`chip ${
                form.personality.includes(p) ? "active" : ""
              }`}
              onClick={() => togglePersonality(p)}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <h3>Extra Context</h3>

      <input
        name="keywords"
        placeholder="Keywords (e.g. innovation, speed, community)"
        value={form.keywords}
        onChange={handleChange}
      />

      <input
        name="competitors"
        placeholder="Competitors (e.g. Apple, Nike, Stripe)"
        value={form.competitors}
        onChange={handleChange}
      />

      <button
        className="generate-btn"
        onClick={handleSubmit}
      >
        {loading ? "Generating Brand Kit..." : "Generate Brand Kit"}
      </button>

    </div>
  );
}