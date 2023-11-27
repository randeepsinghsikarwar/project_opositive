import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './Layout.css'

const Layout = () => {
  return (
   

      <div className="l1">
        <div className="l2">
          <Header />
          <Outlet />
        </div >
        <Footer />
      </div>
  );
};

export default Layout;
