import "./Navbar.css";
import { useContext } from "react";
import { logout } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import logoutLogo from '../../assets/images/logout.svg'

export default function Navbar() {
  const {auth, setAuthh } = useContext(AuthContext);

  return (
    <div className="nav-parent">
      <div className="logout-button-div">
        {auth && <button
        className="logout-button"
          onClick={(e) => {
            e.preventDefault();
            logout()
              .then(() => {
                setAuthh(null);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <img className="logout-icon" src={logoutLogo} alt="logout-logo"/>
        </button>}
      </div>
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
