import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="page center">
      <h1>AI Brand Kit Generator</h1>
      <p>Create professional brand identities in seconds using AI.</p>

      <div className="hero-demo">
        <p>⚡ Taglines • 🎨 Color Palettes • ✍️ Fonts • 📱 Social Content</p>
      </div>

      <Link to="/auth">
        <button>Get Started</button>
      </Link>
    </div>
  );
}
