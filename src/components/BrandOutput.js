export default function BrandOutput({ kit }) {
  if (!kit) return null;

  return (
    <div className="brand-output">

      {/* LOGO */}
      <div
        dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
        className="logo-preview"
      />

      {/* TAGLINE */}
      <h2>{kit.taglines?.[0]}</h2>

      {/* COLORS */}
      <div className="color-grid">
        {kit.colors?.map((c, i) => (
          <div key={i} className="color-box">
            <div style={{
              background: c.hex,
              height: "60px",
              borderRadius: "8px"
            }} />
            <small>{c.role} - {c.hex}</small>
          </div>
        ))}
      </div>

      {/* FONTS */}
      <div className="font-preview">
        <h3 style={{ fontFamily: kit.fonts?.heading }}>
          {kit.fonts?.heading}
        </h3>
        <p style={{ fontFamily: kit.fonts?.body }}>
          {kit.fonts?.body}
        </p>
      </div>

      {/* BIO */}
      <p>{kit.instagram_bio}</p>

      {/* CAPTIONS */}
      <div>
        {kit.captions?.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>

    </div>
  );
}
