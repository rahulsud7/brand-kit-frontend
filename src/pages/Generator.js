import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import BrandForm from "../components/BrandForm";
import BrandOutput from "../components/BrandOutput";

export default function Generator({ session }) {
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateKit = async (form) => {
    if (!session?.user?.id) return;

    setLoading(true);
    setKit(null);

    try {
      const res = await axios.post(`${API_BASE}/generate-brand-kit`, {
        ...form,
        userId: session.user.id
      });

      setKit(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Brand kit generation failed");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <h1>Brand Kit Generator</h1>
      <BrandForm onGenerate={generateKit} loading={loading} />
      {kit && <BrandOutput kit={kit} />}
    </div>
  );
}
