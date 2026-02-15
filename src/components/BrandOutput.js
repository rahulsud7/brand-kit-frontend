import { useState, useEffect, useRef } from "react";
import { loadGoogleFont } from "../utils/loadGoogleFont";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BrandOutput({ kit }) {
  const [selectedTagline, setSelectedTagline] = useState(
    kit?.taglines?.[0] || ""
  );

  const exportRef = useRef(null);

  useEffect(() => {
    if (kit?.fonts) {
      kit.fonts.forEach(font => loadGoogleFont(font));
    }
  }, [kit]);

  if (!kit) return null;

  const exportPDF = async () => {
    const element = exportRef.current;

    const canvas = await html2canvas(element, {
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

  return (
    <>
      <button className="export-btn" onClick={exportPDF}>
        Export as PDF
      </button>

      <div ref={exportRef} className="brand-board">

        <section className="brand-hero">
          <div
            className="brand-logo"
            dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
          />
          <h2
            style={{ fontFamily: `'${kit.fonts?.[0]}', sans-serif` }}
          >
            {selectedTagline}
          </h2>
        </section>

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

      </div>
    </>
  );
}
