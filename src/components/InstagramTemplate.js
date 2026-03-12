import { useRef } from "react";
import html2canvas from "html2canvas";

export default function InstagramTemplate({ kit, brandName }) {

  const templateRef = useRef(null);

  if (!kit) return null;

  const primary = kit.colors?.[0]?.hex || "#6366F1";
  const secondary = kit.colors?.[1]?.hex || "#0f172a";

  const downloadTemplate = async () => {

    const canvas = await html2canvas(templateRef.current);

    const link = document.createElement("a");
    link.download = `${brandName}-instagram-template.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (

    <div style={{ marginTop:40 }}>

      <h2 style={{ marginBottom:20 }}>Instagram Post Template</h2>

      <div
        ref={templateRef}
        style={{
          width:400,
          height:400,
          padding:30,
          borderRadius:20,
          background:secondary,
          color:"white",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          boxShadow:"0 30px 60px rgba(0,0,0,0.5)"
        }}
      >

        {/* LOGO */}

        <div
          dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
        />

        {/* POST TEXT */}

        <div style={{ marginTop:20 }}>

          <h3
            style={{
              fontFamily: kit.fonts?.heading,
              marginBottom:10
            }}
          >
            {kit.taglines?.[0]}
          </h3>

          <p
            style={{
              fontFamily: kit.fonts?.body,
              opacity:0.8
            }}
          >
            {kit.captions?.[0]}
          </p>

        </div>

        {/* BRAND FOOTER */}

        <div
          style={{
            padding:10,
            borderRadius:10,
            background:primary,
            textAlign:"center",
            fontFamily: kit.fonts?.heading
          }}
        >
          @{brandName}
        </div>

      </div>

      <button
        onClick={downloadTemplate}
        style={{
          marginTop:20,
          padding:"12px 18px",
          borderRadius:10,
          border:"none",
          background:"linear-gradient(90deg,#06b6d4,#3b82f6)",
          color:"white",
          cursor:"pointer"
        }}
      >
        Download Instagram Template
      </button>

    </div>

  );
}