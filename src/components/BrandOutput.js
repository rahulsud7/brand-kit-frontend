import { useState, useEffect } from "react";
import { loadGoogleFont } from "../utils/loadGoogleFont";

export default function BrandOutput({ kit }) {
  const [selectedTagline, setSelectedTagline] = useState(
    kit?.taglines?.[0] || ""
  );

  useEffect(() => {
    if (kit?.fonts) {
      kit.fonts.forEach(font => loadGoogleFont(font));
    }
  }, [kit]);

  if (!kit) return null;

  return (
    <div className="brand-board fade-in">

      {/* ===== HERO SECTION ===== */}
      <section className="brand-hero">
        <div
          className="brand-logo"
          dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
        />

        <h2
          className="brand-tagline"
          style={{ fontFamily: `'${kit.fonts?.[0]}', sans-serif` }}
        >
          {selectedTagline}
        </h2>
      </section>

      {/* ===== TAGLINE OPTIONS ===== */}
      <section className="brand-section">
        <h3>Alternate Taglines</h3>
        <div className="tagline-options">
          {kit.taglines?.map((t, i) => (
            <div
              key={i}
              className={`tagline-card ${
                selectedTagline === t ? "active" : ""
              }`}
              onClick={() => setSelectedTagline(t)}
              style={{ fontFamily: `'${kit.fonts?.[0]}', sans-serif` }}
            >
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ===== COLORS ===== */}
      <section className="brand-section">
        <h3>Color Palette</h3>
        <div className="color-showcase">
          {kit.colors?.map((c, i) => (
            <div key={i} className="color-block">
              <div
                className="color-box"
                style={{ background: c.hex }}
              />
              <span>{c.name}</span>
              <small>{c.hex}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TYPOGRAPHY ===== */}
      <section className="brand-section">
        <h3>Typography</h3>
        {kit.fonts?.map((font, i) => (
          <div key={i} className="font-preview-card">
            <strong>{font}</strong>
            <p style={{ fontFamily: `'${font}', sans-serif` }}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </section>

      {/* ===== SOCIAL CONTENT ===== */}
      <section className="brand-section">
        <h3>Instagram Bio</h3>
        <div className="bio-card">
          {kit.instagram_bio}
        </div>
      </section>

      <section className="brand-section">
        <h3>Sample Captions</h3>
        <div className="captions-grid">
          {kit.captions?.map((c, i) => (
            <div key={i} className="caption-chip">
              {c}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
