import "./Login.css";
import Navbar from "../navbar/Navbar";
import Meme from "../meme/Meme";
import {
  emailChanged,
  passwordChanged,
} from "../../redux/feature/userCred/UserCredsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import Chating from "../chat/Chating";
import {
  auth,
  loginWithEmailAndPassword,
  signUpWithGoogle,
} from "../../firebase/firebase";
import { setAuth, setEmail } from "../../redux/feature/authentication/AuthSlice";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/images/googleIcon.svg";

export default function Login() {
  const menuOpen = useSelector((state) => state.navBar.isOpened);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const user = useSelector((state) => state.userAuth.user);
  const [passReset, setPassReset] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, recoveryEmail);
      setPassReset(false);
      alert(`Password recovery link has been sent to the ${recoveryEmail}`);
    } catch (error) {
      alert(error.message);
    }
    setRecoveryEmail("");
  }

  function handleLogin(e) {
    e.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  function handleGoogle(e) {
    e.preventDefault();
    signUpWithGoogle();
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(user.uid));
        dispatch(setEmail(user.email));
      } else {
        dispatch(setAuth(null));
      }
    });

    return () => unsubscribe();
  });

  return (
    <div>
      {!user ? (
        <div className="main-login-parent">
          <div className="login-left-panel">
            <div>
              <div className="login-logo-panel">{"OPositive"}</div>
              <div className="login-form-panel-main">
                {!menuOpen && <Meme />}
                {passReset ? (
                  <div className="password-reset-panel">
                    <input
                      placeholder="Email"
                      type="email"
                      value={recoveryEmail}
                      onChange={(e) => {
                        setRecoveryEmail(e.target.value);
                      }}
                      id="recovery-email"
                    />
                    <button
                    className="reset-password-button"
                      onClick={(e) => {
                        handleReset(e);
                      }}
                    >
                      RESET
                    </button>
                    <p onClick={(e) => {
                        e.preventDefault()
                        setPassReset(false);
                    }}>Login</p>
                  </div>
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
                        setPassReset(true);
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
