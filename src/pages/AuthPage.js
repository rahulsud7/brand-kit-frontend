import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    let result;
    if (mode === "login") {
      result = await supabase.auth.signInWithPassword({
        email,
        password
      });
    } else {
      result = await supabase.auth.signUp({
        email,
        password
      });
    }

    if (result.error) {
      setError(result.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{mode === "login" ? "Welcome back" : "Create account"}</h2>
        <p className="auth-sub">
          {mode === "login"
            ? "Login to continue building your brand"
            : "Sign up to start creating brand kits"}
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <div className="auth-error">{error}</div>}

        <button onClick={handleAuth} disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>

        <div className="auth-switch">
          {mode === "login" ? (
            <span>
              Don’t have an account?{" "}
              <b onClick={() => setMode("signup")}>Sign up</b>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <b onClick={() => setMode("login")}>Login</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
