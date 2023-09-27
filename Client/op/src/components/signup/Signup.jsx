import "./Signup.css";
import Navbar from "../navbar/Navbar";
import Meme from "../meme/Meme";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  cnfPasswordChanged,
} from "../../redux/feature/userCred/UserCredsSlice";
import { setAuth } from "../../redux/feature/authentication/AuthSlice";
import { auth, signUpWithEmailAndPassword } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Chating from "../chat/Chating";
import { signUpWithGoogle } from "../../firebase/firebase";
import googleIcon from '../../assets/images/googleIcon.svg'

export default function Signup() {
  const menuOpen = useSelector((state) => state.navBar.isOpened);
  const dispatch = useDispatch();

  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const cnfPassword = useSelector((state) => state.signup.cnfPassword);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.userAuth.user);

  function handleGoogle(e) {
    e.preventDefault();
    signUpWithGoogle();
  }

  function handleSubmit(e) {
    e.preventDefault();

    {
      password !== cnfPassword
        ? setError(true)
        : signUpWithEmailAndPassword(email, password).catch((error) => {
            console.error(error);
          });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(user.uid));
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
                <form className="login-form">
                  <input
                  placeholder="Email"
                    onChange={(e) => {
                      dispatch(emailChanged(e.target.value));
                    }}
                    type="email"
                    id="login-email"
                  />
                  <input
                  placeholder="Password"
                    type="password"
                    onChange={(e) => {
                      dispatch(passwordChanged(e.target.value));
                    }}
                    id="login-password"
                  />

               
                  <input
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) => {
                      dispatch(cnfPasswordChanged(e.target.value));
                    }}
                    id="login-password-confirm"
                  />

                  <div className="all-buttons">
                  <button
                    className="login-button"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    SIGNUP
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
                  {error && <p>you sure both the passwords are same?</p>}

                    <div className="old-user">
                    already have an account?<Link to="/Login"> Login</Link>

                    </div>
                </form>
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
