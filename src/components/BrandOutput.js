import { useState, useEffect } from "react";
import { loadGoogleFont } from "../utils/loadGoogleFont";

export default function BrandOutput({ kit }) {
  const [selectedTagline, setSelectedTagline] = useState(
    kit?.taglines?.[0] || ""
  );

  // Load Google Fonts dynamically
  useEffect(() => {
    if (kit?.fonts) {
      kit.fonts.forEach(font => loadGoogleFont(font));
    }
  }, [kit]);

  if (!kit) return null;

  return (
    <div className="brand-output">

      {/* ===== LOGO ===== */}
      {kit.logo_svg && (
        <div className="logo-section">
          <h3>Brand Logo</h3>
          <div
            className="logo-box"
            dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
          />
          {kit.logo_description && (
            <p className="logo-desc">{kit.logo_description}</p>
          )}
        </div>
      )}

      {/* ===== TAGLINES ===== */}
      {kit.taglines && (
        <div className="tagline-section">
          <h3>Choose a Slogan</h3>

          <div className="tagline-options">
            {kit.taglines.map((t, i) => (
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

        <h2
  className="final-tagline"
  style={{ fontFamily: `'${kit.fonts?.[0]}', sans-serif` }}
>
  {selectedTagline}
</h2>

        </div>
      )}

      {/* ===== COLORS ===== */}
      {kit.colors && (
        <div className="colors-section">
          <h3>Color Palette</h3>
          <div className="colors-grid">
            {kit.colors.map((c, i) => (
              <div key={i} className="color-card">
                <div
                  className="color-swatch"
                  style={{ background: c.hex }}
                />
                <span>{c.name}</span>
                <small>{c.hex}</small>
              </div>
            ))}
          </div>
        </div>
      )}

   {/* ===== FONTS (REAL PREVIEW) ===== */}
{kit.fonts && (
  <div className="fonts-section">
    <h3>Font Suggestions</h3>

    {kit.fonts.map((font, i) => (
      <div key={i} className="font-card">
        <strong>{font}</strong>
        <p
          className="font-preview"
          style={{ fontFamily: `'${font}', sans-serif` }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    ))}
  </div>
)}


      {/* ===== BIO ===== */}
      {kit.instagram_bio && (
        <div className="bio-section">
          <h3>Instagram Bio</h3>
          <p>{kit.instagram_bio}</p>
        </div>
      )}

      {/* ===== CAPTIONS ===== */}
      {kit.captions && (
        <div className="captions-section">
          <h3>Sample Captions</h3>
          <div className="captions-grid">
            {kit.captions.map((c, i) => (
              <div key={i} className="caption-chip">
                {c}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
