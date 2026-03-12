import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import BrandOutput from "../components/BrandOutput";

export default function Dashboard({ session }) {
  const [projects, setProjects] = useState([]);
  const [activeKit, setActiveKit] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!session?.user?.id) return;

    axios
      .get(`${API_BASE}/my-kits/${session.user.id}`)
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [session]);

  /* =========================
     EXPORT JSON
  ========================= */

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

    URL.revokeObjectURL(url);
  };

  /* =========================
     EXPORT SVG
  ========================= */

  const exportSVG = (project, kit) => {
    if (!kit?.logo_svg) return;

    const blob = new Blob([kit.logo_svg], {
      type: "image/svg+xml"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.brand_name}-logo.svg`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) =>
          (p.industry || "").toLowerCase().includes(filter)
        );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1 style={{ marginBottom: 30 }}>My Brand Kits</h1>

      {/* FILTER PRESETS */}

      {!activeKit && (
        <div style={{ marginBottom: 30 }}>
          {["all", "technology", "fashion", "food"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                marginRight: 10,
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.2)",
                background:
                  filter === f
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                color: "white",
                cursor: "pointer"
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}

      {!activeKit && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 25,
            width: "100%",
            maxWidth: 1100
          }}
        >
          {filteredProjects.map((project) => {
            const kit = project.brand_kits?.[0]?.result;

            if (!kit) return null;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
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
                {/* LOGO */}

                {kit.logo_svg && (
                  <div
                    style={{ marginBottom: 10 }}
                    dangerouslySetInnerHTML={{
                      __html: kit.logo_svg
                    }}
                  />
                )}

                <h3>{project.brand_name}</h3>

                <p
                  style={{
                    fontSize: 13,
                    opacity: 0.7,
                    marginBottom: 8
                  }}
                >
                  {project.industry} • {project.audience}
                </p>

                <p
                  style={{
                    fontSize: 13,
                    marginBottom: 10
                  }}
                >
                  {kit.taglines?.[0]}
                </p>

                {/* COLORS */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    marginBottom: 12
                  }}
                >
                  {kit.colors?.slice(0, 5).map((c, i) => (
                    <span
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: c.hex
                      }}
                    />
                  ))}
                </div>

                <small style={{ opacity: 0.6 }}>
                  {new Date(
                    project.created_at
                  ).toLocaleDateString()}
                </small>

                {/* ACTIONS */}

                <div
                  style={{
                    marginTop: 15,
                    display: "flex",
                    gap: 6
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => setActiveKit(kit)}
                  >
                    View
                  </button>

                  <button
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => exportJSON(project, kit)}
                  >
                    JSON
                  </button>

                  <button
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => exportSVG(project, kit)}
                  >
                    SVG
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL KIT */}

      {activeKit && (
        <div style={{ maxWidth: 1000, width: "100%" }}>
          <button
            onClick={() => setActiveKit(null)}
            style={{
              marginBottom: 20,
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            ← Back
          </button>

          <BrandOutput kit={activeKit} />
        </div>
      )}
    </div>
  );
}