import { useState, useEffect, useRef } from "react";
import { loadGoogleFont } from "../utils/loadGoogleFont";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { API_BASE } from "../config";

export default function BrandOutput({ kit }) {
  const [currentKit, setCurrentKit] = useState(kit);
  const [loading, setLoading] = useState(null);
  const exportRef = useRef(null);

  useEffect(() => {
    if (currentKit?.fonts) {
      currentKit.fonts.forEach(font => loadGoogleFont(font));
    }
  }, [currentKit]);

  if (!currentKit) return null;

  const regenerate = async (type) => {
    setLoading(type);

    const brandContext = JSON.stringify(currentKit);

    const res = await axios.post(`${API_BASE}/regenerate`, {
      type,
      brandContext
    });

    setCurrentKit(prev => ({
      ...prev,
      ...res.data
    }));

    setLoading(null);
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      backgroundColor: "#020617"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("brand-kit.pdf");
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="action-bar">
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      <div ref={exportRef} className="brand-board fade-in">

        {/* HERO */}
        <section className="brand-hero">
          <div
            dangerouslySetInnerHTML={{ __html: currentKit.logo_svg }}
            className="brand-logo"
          />

          <button
            className="regen-btn"
            onClick={() => regenerate("logo")}
          >
            {loading === "logo" ? "Regenerating..." : "Regenerate Logo"}
          </button>

          <h2
            style={{ fontFamily: `'${currentKit.fonts?.[0]}', sans-serif` }}
          >
            {currentKit.taglines?.[0]}
          </h2>
        </section>

        {/* TAGLINES */}
        <section className="brand-section">
          <div className="section-header">
            <h3>Taglines</h3>
            <button onClick={() => regenerate("taglines")}>
              {loading === "taglines" ? "Regenerating..." : "New Taglines"}
            </button>
          </div>

          <div className="tagline-options">
            {currentKit.taglines?.map((t, i) => (
              <div key={i} className="tagline-card">
                {t}
                <span onClick={() => copy(t)}>Copy</span>
              </div>
            ))}
          </div>
        </section>

        {/* COLORS */}
        <section className="brand-section">
          <h3>Color Palette</h3>
          <div className="color-showcase">
            {currentKit.colors?.map((c, i) => (
              <div key={i} className="color-block">
                <div
                  className="color-box"
                  style={{ background: c.hex }}
                />
                <span>{c.name}</span>
                <small onClick={() => copy(c.hex)}>
                  {c.hex}
                </small>
              </div>
            ))}
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section className="brand-section">
          <h3>Typography</h3>
          {currentKit.fonts?.map((font, i) => (
            <div key={i} className="font-preview-card">
              <strong>{font}</strong>
              <p style={{ fontFamily: `'${font}', sans-serif` }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </section>

        {/* CAPTIONS */}
        <section className="brand-section">
          <div className="section-header">
            <h3>Captions</h3>
            <button onClick={() => regenerate("captions")}>
              {loading === "captions" ? "Regenerating..." : "New Captions"}
            </button>
          </div>

          <div className="captions-grid">
            {currentKit.captions?.map((c, i) => (
              <div key={i} className="caption-chip">
                {c}
                <span onClick={() => copy(c)}>Copy</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
