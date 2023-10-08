import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import Login from './components/login/Login.jsx'
// import Signup from './components/signup/Signup.jsx'
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../src/redux/Store.jsx";
import { Provider } from "react-redux";
// import PrivateRoutes from './components/PrivateRoutes.jsx'
// import Chating from './components/chat/Chating.jsx'
// import Contact from './components/contact/Contact.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
