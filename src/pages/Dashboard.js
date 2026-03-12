import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import BrandOutput from "../components/BrandOutput";

export default function Dashboard({ session }) {
  const [projects, setProjects] = useState([]);
  const [activeKit, setActiveKit] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    axios
      .get(`${API_BASE}/my-kits/${session.user.id}`)
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
      });
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

    URL.revokeObjectURL(url);
  };

  /* ======================
     EXPORT LOGO SVG
  ====================== */

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

  return (
    <div className="page">

      <h1>My Brand Kits</h1>

      {!activeKit && (
        <div className="dashboard-grid">

          {projects.map((project) => {
            const kit = project.brand_kits?.[0]?.result;

            if (!kit) return null;

            return (
              <div key={project.id} className="dashboard-card">

                {/* Logo */}
                {kit.logo_svg && (
                  <div
                    className="dashboard-logo"
                    dangerouslySetInnerHTML={{
                      __html: kit.logo_svg
                    }}
                  />
                )}

                <h3>{project.brand_name}</h3>

                <p className="dashboard-meta">
                  {project.industry} • {project.audience}
                </p>

                <p className="dashboard-tagline">
                  {kit.taglines?.[0]}
                </p>

                {/* COLORS */}
                <div className="dashboard-colors">
                  {kit.colors?.slice(0, 5).map((c, i) => (
                    <span
                      key={i}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>

                <small>
                  {new Date(
                    project.created_at
                  ).toLocaleDateString()}
                </small>

                {/* ACTIONS */}
                <div className="dashboard-actions">

                  <button
                    onClick={() => {
                      setActiveKit(kit);
                      setActiveProject(project);
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => exportJSON(project, kit)}
                  >
                    Export JSON
                  </button>

                  <button
                    onClick={() => exportSVG(project, kit)}
                  >
                    Export Logo
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {activeKit && (
        <div>

          <button
            className="back-btn"
            onClick={() => {
              setActiveKit(null);
              setActiveProject(null);
            }}
          >
            ← Back to Dashboard
          </button>

          <BrandOutput kit={activeKit} />

        </div>
      )}
    </div>
  );
}