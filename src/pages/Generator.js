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
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    };
    getUser();
  }, []);

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const generate = async () => {
    try {
      if (!userId) return alert("Login required");

      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/generate-brand-kit`,
        {
          ...form,
          userId
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      <div className="form-card">

        <input placeholder="Brand Name"
          onChange={e => update("brandName", e.target.value)} />

        <input placeholder="Industry"
          onChange={e => update("industry", e.target.value)} />

        <input placeholder="Audience"
          onChange={e => update("audience", e.target.value)} />

        <input placeholder="Personality"
          onChange={e => update("personality", e.target.value)} />

        <input placeholder="Core Values"
          onChange={e => update("values", e.target.value)} />

        <input placeholder="Competitors"
          onChange={e => update("competitors", e.target.value)} />

        <input placeholder="Logo Style"
          onChange={e => update("stylePreference", e.target.value)} />

        <textarea placeholder="Visual Direction"
          onChange={e => update("logoDirection", e.target.value)} />

        <button onClick={generate}>
          {loading ? "Generating..." : "Generate Brand Kit"}
        </button>

      </div>

      {result && <BrandOutput kit={result} />}

    </div>
  );
}
