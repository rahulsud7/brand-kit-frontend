import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function Generator({ user }) {
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

  const [loading, setLoading] = useState(false);

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const generate = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/generate-brand-kit`,
        {
          ...form,
          userId: user?.id
        }
      );

      console.log("Generated:", res.data);

    } catch (err) {
      console.error("Generation error:", err.response?.data || err);
      alert("Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-card">

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
          placeholder="Preferred Logo Style"
          value={form.stylePreference}
          onChange={e => update("stylePreference", e.target.value)}
        />

        <textarea
          placeholder="Visual Direction"
          value={form.logoDirection}
          onChange={e => update("logoDirection", e.target.value)}
        />

        <button onClick={generate}>
          {loading ? "Generating..." : "Generate Brand Kit"}
        </button>

      </div>
    </div>
  );
}
