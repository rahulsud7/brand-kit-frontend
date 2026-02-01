import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Navbar({ session }) {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>BrandKit Studio</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {session && <Link to="/generator">Generator</Link>}
        {session && <Link to="/dashboard">My Kits</Link>}

        {!session && <Link to="/auth">Login</Link>}
        {session && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
