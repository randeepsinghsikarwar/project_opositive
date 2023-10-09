import "./Navbar.css";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="nav-parent">
      <div className="upper-links">
        <NavLink id="login-link" to="/Login">
          L
        </NavLink>

        <NavLink to="/Signup">S</NavLink>
        <NavLink to="/Chating">C</NavLink>
        <NavLink to="/Contact">C</NavLink>
        <NavLink to="/Meet">D</NavLink>
      </div>
    </div>
  );
}
