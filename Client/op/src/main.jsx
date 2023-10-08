import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../src/redux/Store.jsx";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
    </AuthProvider>
  </BrowserRouter>
);
