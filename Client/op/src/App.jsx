import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chating from "./components/chat/Chating";
import Contact from "./components/contact/Contact";
import Home from "./components/Home/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { setAuth } from "./redux/feature/authentication/AuthSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      if(user){
        dispatch(setAuth(user.uid));
      } else{
        dispatch(setAuth(null));
      }
    });

    return () => unsubscribe();
  })

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="Chating" element={<Chating />} />
          <Route path="Contact" element={<Contact />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
