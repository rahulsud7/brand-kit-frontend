import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import BrandOutput from "../components/BrandOutput";

export default function Dashboard({ session }) {

  const [projects, setProjects] = useState([]);
  const [activeKit, setActiveKit] = useState(null);

  useEffect(() => {

    if (!session?.user?.id) return;

    axios
      .get(`${API_BASE}/my-kits/${session.user.id}`)
      .then(res => {
        console.log("Dashboard data:", res.data);
        setProjects(res.data || []);
      })
      .catch(err => console.error(err));

  }, [session]);

  /* ======================
     EXPORT JSON
  ====================== */

  const exportJSON = (project, kit) => {

    const blob = new Blob(
      [JSON.stringify({ project, kit }, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.brand_name}-brandkit.json`;
    a.click();

  };

  /* ======================
     EXPORT SVG
  ====================== */

  const exportSVG = (project, kit) => {

    if (!kit?.logo_svg) return;

    const blob = new Blob(
      [kit.logo_svg],
      { type: "image/svg+xml" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.brand_name}-logo.svg`;
    a.click();

  };

  return (

    <div style={{
      minHeight: "100vh",
      padding: "60px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      <h1 style={{ marginBottom: 30 }}>My Brand Kits</h1>

      {!activeKit && (

        <div style={{
          width: "100%",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 25
        }}>

          {projects.map(project => {

            const kit =
              project.brand_kits &&
              project.brand_kits.length > 0
                ? project.brand_kits[0].result
                : null;

            if (!kit) return null;

            return (

              <div
                key={project.id}
                style={{
                  padding: 20,
                  borderRadius: 16,
                  backdropFilter: "blur(16px)",
                  background: "rgba(15,23,42,0.65)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  textAlign: "center"
                }}
              >

                {kit.logo_svg && (
                  <div
                    dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
                    style={{ marginBottom: 10 }}
                  />
                )}

                <h3>{project.brand_name}</h3>

                <p style={{ fontSize: 13, opacity: 0.7 }}>
                  {project.industry} • {project.audience}
                </p>

                <p style={{ fontSize: 13 }}>
                  {kit.taglines?.[0]}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 6,
                  margin: "10px 0"
                }}>
                  {kit.colors?.slice(0,5).map((c,i)=>(
                    <span
                      key={i}
                      style={{
                        width:18,
                        height:18,
                        borderRadius:4,
                        background:c.hex
                      }}
                    />
                  ))}
                </div>

                <small style={{ opacity: 0.6 }}>
                  {new Date(project.created_at).toLocaleDateString()}
                </small>

                <div style={{
                  marginTop:15,
                  display:"flex",
                  gap:6
                }}>

                  <button onClick={()=>setActiveKit(kit)}>
                    View
                  </button>

                  <button onClick={()=>exportJSON(project,kit)}>
                    JSON
                  </button>

                  <button onClick={()=>exportSVG(project,kit)}>
                    SVG
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {activeKit && (

        <div style={{ width:"100%", maxWidth:1000 }}>

          <button
            onClick={()=>setActiveKit(null)}
            style={{ marginBottom:20 }}
          >
            ← Back
          </button>

          <BrandOutput kit={activeKit} />

        </div>

      )}

    </div>

  );
}