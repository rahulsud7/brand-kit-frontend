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
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, [session]);

  return (
    <div className="page">
      <h1>My Brand Kits</h1>

      {/* ===== GRID VIEW ===== */}
      {!activeKit && (
        <div className="dashboard-grid">
          {projects.map(project => {
            const kit = project.brand_kits?.[0]?.result;
            if (!kit) return null;

            return (
              <div
                key={project.id}
                className="dashboard-card"
                onClick={() => setActiveKit(kit)}
              >
                {/* Logo */}
                {kit.logo_svg && (
                  <div
                    className="dashboard-logo"
                    dangerouslySetInnerHTML={{ __html: kit.logo_svg }}
                  />
                )}

                <h3>{project.brand_name}</h3>

                {/* Slogan */}
                <p className="dashboard-tagline">
                  {kit.taglines?.[0]}
                </p>

                {/* Colors */}
                <div className="dashboard-colors">
                  {kit.colors?.slice(0, 4).map((c, i) => (
                    <span
                      key={i}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>

                <small>
                  {new Date(project.created_at).toLocaleDateString()}
                </small>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== FULL VIEW ===== */}
      {activeKit && (
        <div>
          <button
            className="back-btn"
            onClick={() => setActiveKit(null)}
          >
            ← Back to Dashboard
          </button>

          <BrandOutput kit={activeKit} />
        </div>
      )}
    </div>
  );
}
