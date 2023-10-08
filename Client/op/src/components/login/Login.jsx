import "./Login.css";
import Navbar from "../navbar/Navbar";
import Meme from "../meme/Meme";
import {
  emailChanged,
  resetCheck,
  passwordChanged,
} from "../../redux/feature/userCred/UserCredsSlice";
import { useDispatch, useSelector } from "react-redux";
import Chating from "../chat/Chating";
import {
  loginWithEmailAndPassword,
  signUpWithGoogle,
} from "../../firebase/firebase";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/images/googleIcon.svg";

import Reset from "../reset/Reset";

export default function Login() {
  const menuOpen = useSelector((state) => state.navBar.isOpened);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const user = useSelector((state) => state.userAuth.user);

  const reset = useSelector((state) => state.signup.reset);

  function handleLogin(e) {
    e.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  function handleGoogle(e) {
    e.preventDefault();
    signUpWithGoogle();
  }

  return (
    <div>
      {!user ? (
        <div className="main-login-parent">
          <div className="login-left-panel">
            <div>
              <div className="login-logo-panel">{"OPositive"}</div>
              <div className="login-form-panel-main">
                {!menuOpen && <Meme />}
                {reset ? (
                  <Reset />
                ) : (
                  <div className="login-form">
                    <input
                      onChange={(e) => {
                        dispatch(emailChanged(e.target.value));
                      }}
                      type="email"
                      placeholder="Email"
                      id="login-email"
                    />
                    <input
                      onChange={(e) => {
                        dispatch(passwordChanged(e.target.value));
                      }}
                      type="password"
                      placeholder="Password"
                      id="login-password"
                    />
                    <div className="all-buttons">
                      <button
                        onClick={(e) => {
                          handleLogin(e);
                        }}
                        className="login-button"
                      >
                        LOGIN
                      </button>
                      <button
                        className="gmail-icon"
                        onClick={(e) => {
                          handleGoogle(e);
                        }}
                      >
                        <img src={googleIcon} alt="google icon" />
                      </button>
                    </div>
                    <div className="new-user">
                      new user? <Link to="/Signup">Signup</Link>
                    </div>
                    <button
                      className="forgot-button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(resetCheck())
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Navbar />
        </div>
      ) : (
        <Chating />
      )}
    </div>
  );
}
