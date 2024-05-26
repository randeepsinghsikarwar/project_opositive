import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chating from "./components/chat/Chating";
import Contact from "./components/contact/Contact";
import Home from "./components/Home/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import "./App.css";
import AuthContext from "./Context/AuthProvider";
import Devs from "./components/devs/Devs";
import RandomChat from "./components/chat/RandomChat";

function App() {
  const { setAuthh } = useContext(AuthContext);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthh(user);
      } else {
        dispatch(setAuthh(null));
      }
    });

    return () => unsubscribe();
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="testing" element={<Testing/>}/> */}
        <Route path="" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="Chating" element={<Chating />} />
          <Route path="RandomChat" element={<RandomChat />} />
          <Route path="Contact" element={<Contact />} />
        </Route>
        <Route path="Devs" element={<Devs />} />
        <Route path="*" element={<div>invalid path!</div>} />
      </Route>
    </Routes>
  );
}

export default App;
