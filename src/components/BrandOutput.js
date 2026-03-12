import InstagramTemplate from "./InstagramTemplate";

export default function BrandOutput({ kit }) {
  if (!kit) return null;

  return (
    <div style={{
      marginTop: "40px",
      padding: "30px",
      background: "#0f172a",
      borderRadius: "16px",
      color: "white"
    }}>

      {/* Logo */}
      <div style={{ marginBottom: "20px" }}>
        <div
          dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
        />
        <p style={{ opacity: 0.7, fontSize: "14px" }}>
          {kit.logo_description}
        </p>
      </div>

      {/* Tagline */}
      <h2>{kit.taglines?.[0]}</h2>

      {/* Colors */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginTop: "20px"
      }}>
        {kit.colors?.map((color, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "10px",
              background: color.hex
            }} />
            <small>{color.hex}</small>
          </div>
        ))}
      </div>

      {/* Typography */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontFamily: kit.fonts?.heading }}>
          Heading Font: {kit.fonts?.heading}
        </h3>
        <p style={{ fontFamily: kit.fonts?.body }}>
          Body Font: {kit.fonts?.body}
        </p>
      </div>

      {/* Instagram Bio */}
      <div style={{ marginTop: "30px" }}>
        <h4>Instagram Bio</h4>
        <p>{kit.instagram_bio}</p>
      </div>

      {/* Captions */}
      <div style={{ marginTop: "20px" }}>
        <h4>Captions</h4>
        {kit.captions?.map((caption, i) => (
          <p key={i}>• {caption}</p>
        ))}
      </div>
<InstagramTemplate
  kit={kit}
  brandName={kit?.brand_name || "brand"}
/>
    </div>
  );
}
