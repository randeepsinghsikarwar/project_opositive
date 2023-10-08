import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { setAuth } from "../redux/feature/authentication/AuthSlice";

export default function PrivateRoutes({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged")
        dispatch(setAuth(user.uid));
      } else {
        dispatch(setAuth(null));
        navigate("/");
      }
    });

    return () => unsub();
  }, [auth]);

  return <>{children}</>;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
