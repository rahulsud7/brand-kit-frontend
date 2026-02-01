import { useState } from "react";

export default function BrandForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    brandName: "",
    brandType: "",
    industry: "",
    audience: "",
    personality: "",
    keywords: "",
    competitors: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  return (
    <div className="form-card">

      <input
        name="brandName"
        placeholder="Brand Name"
        onChange={handleChange}
      />

      <select name="brandType" onChange={handleChange}>
        <option value="">Brand Type</option>
        <option>Startup</option>
        <option>Personal Brand</option>
        <option>Agency</option>
        <option>Product Brand</option>
        <option>Service Business</option>
      </select>

      <select name="industry" onChange={handleChange}>
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

      <select name="audience" onChange={handleChange}>
        <option value="">Target Audience</option>
        <option>Students</option>
        <option>Young Professionals</option>
        <option>Business Owners</option>
        <option>Parents</option>
        <option>High-income Consumers</option>
        <option>General Public</option>
      </select>

      <div className="personality-box">
        <p>Brand Personality</p>
        <div className="chips">
          {personalityOptions.map((p) => (
            <span
              key={p}
              className={`chip ${form.personality === p ? "active" : ""}`}
              onClick={() => setForm({ ...form, personality: p })}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <input
        name="keywords"
        placeholder="Brand Keywords (optional)"
        onChange={handleChange}
      />

      <input
        name="competitors"
        placeholder="Competitors (optional)"
        onChange={handleChange}
      />

      <button onClick={() => onGenerate(form)}>
        {loading ? "Generating..." : "Generate Brand Kit"}
      </button>
    </div>
  );
}
