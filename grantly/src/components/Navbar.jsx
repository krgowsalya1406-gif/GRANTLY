
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <GraduationCap size={30} />
        GRANTLY<span>.</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/scholarships">Scholarships</Link>
        <Link to="/eligibility">Eligibility</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/deadlines">Deadlines</Link>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="register-btn">Register</Link>
        <Link to="/register" className="nav-cta">Get Started</Link>
      </div>

    </nav>
  );
}
