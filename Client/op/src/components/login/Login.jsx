import "./Login.css";
import Meme from "../meme/Meme";
import {
  emailChanged,
  resetCheck,
  passwordChanged,
} from "../../redux/feature/userCred/UserCredsSlice";
import googleIcon from "../../assets/images/googleIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmailAndPassword,
  signUpWithGoogle,
} from "../../firebase/firebase";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Reset from "../reset/Reset";
import { useContext } from "react";
import AuthContext from "../../Context/AuthProvider";

export default function Login() {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);

  const reset = useSelector((state) => state.signup.reset);

  function handleLogin(e) {
    e.preventDefault();
    loginWithEmailAndPassword(email, password).then(() => {
      navigate("/Chating");
    });
  }

  function handleGoogle(e) {
    e.preventDefault();
    signUpWithGoogle().then(() => {
      navigate("/Chating");
    });
  }

  return (
    <>
      {!auth ? (
        <div className="main-login-parent">
          <div className="login-left-panel">
            <div>
              <div className="login-form-panel-main">
                <Meme />
                {reset ? (
                  <Reset />
                ) : (
                  <div className="login-form">
                    <span>LOGIN</span>
                    <input
                      onChange={(e) => {
                        dispatch(emailChanged(e.target.value));
                      }}
                      placeholder="Email"
                      type="email"
                      id="login-email"
                    />
                    <input
                      onChange={(e) => {
                        dispatch(passwordChanged(e.target.value));
                      }}
                      type="password"
                      id="login-password"
                      placeholder="Password"
                    />
                    <div>
                      <button
                        onClick={(e) => {
                          handleLogin(e);
                        }}
                        className="login-button"
                      >
                        login
                      </button>
                    </div>
                    <div className="all-buttons">
                      <button
                        className="gmail-icon"
                        onClick={(e) => {
                          handleGoogle(e);
                        }}
                      >
                        <img src={googleIcon} alt="google icon" />
                      </button>
                      <Link to="/Signup">Signup</Link>
                      <button
                        className="forgot-button"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(resetCheck());
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/Chating" state={{ from: location }} replace />
      )}
    </>
  );
}
