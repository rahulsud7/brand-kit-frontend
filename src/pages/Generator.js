import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const generate = async () => {
    setLoading(true);
    const res = await axios.post(`${API_BASE}/generate`, form);
    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="page fade-in">

      <div className="form-card advanced-form">

        <h1>Create Brand Identity</h1>

        <input
          placeholder="Brand Name"
          value={form.brandName}
          onChange={e => update("brandName", e.target.value)}
        />

        <select
          value={form.industry}
          onChange={e => update("industry", e.target.value)}
        >
          <option value="">Select Industry</option>
          <option>Technology</option>
          <option>Food & Beverage</option>
          <option>Fashion</option>
          <option>Finance</option>
          <option>Healthcare</option>
          <option>Education</option>
        </select>

        <input
          placeholder="Target Audience (e.g. Gen Z founders)"
          value={form.audience}
          onChange={e => update("audience", e.target.value)}
        />

        <input
          placeholder="Brand Personality (e.g. bold, minimal)"
          value={form.personality}
          onChange={e => update("personality", e.target.value)}
        />

        <input
          placeholder="Core Values (e.g. innovation, trust)"
          value={form.values}
          onChange={e => update("values", e.target.value)}
        />

        <input
          placeholder="Competitor References"
          value={form.competitors}
          onChange={e => update("competitors", e.target.value)}
        />

        <select
          value={form.stylePreference}
          onChange={e => update("stylePreference", e.target.value)}
        >
          <option value="">Logo Style Preference</option>
          <option>Icon + Wordmark</option>
          <option>Minimal Wordmark</option>
          <option>Monogram</option>
          <option>Abstract Symbol</option>
        </select>

        <textarea
          placeholder="Describe visual direction (optional)"
          value={form.logoDirection}
          onChange={e => update("logoDirection", e.target.value)}
        />

        <button onClick={generate}>
          {loading ? "Generating..." : "Generate Brand Kit"}
        </button>
      </div>

      {result && <BrandOutput kit={result} />}
    </div>
  );
}

