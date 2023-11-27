import "./Navbar.css";
import { useContext } from "react";
import { logout } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import logoutLogo from "../../assets/images/logout.svg";

export default function Navbar() {
  const { auth, setAuthh } = useContext(AuthContext);

  return (
    <div className="nav-parent">
      <div className="upper-links">
        <ul>
          {!auth && (
            <li>
              <NavLink id="login-link" to="/Login">
                L
              </NavLink>
            </li>
          )}
          {!auth && (
            <li>
              <NavLink to="/Signup">S</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/Chating">C</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">C</NavLink>
          </li>
          <li>
            <NavLink to="/Meet">D</NavLink>
          </li>
        </ul>
        {/* <div className="logout-button-div"> */}
        {auth && (
          <button
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
            <img className="logout-icon" src={logoutLogo} alt="logout-logo" />
          </button>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
