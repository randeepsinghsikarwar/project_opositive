import { Link } from "react-router-dom";
import Logo2 from '../../assets/images/logo2.svg'
import "./Navbar.css"
import {useDispatch, useSelector} from 'react-redux'
import {openClose} from '../../redux/feature/navbar/NavbarSlice'
export default function Navbar() {

    const dispatch = useDispatch();
    const showMenu = useSelector((state) => state.navBar.isOpened)
    return (
        <div className="right-panel">
        {showMenu && (
          
            <div className="menu-panel-opened">
            <div className="links">
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/Chating">Chat</Link>
            <Link to="/Contact">Contact us</Link>
            <Link to="/Devs">Meet devs!</Link>

            </div>
          
          <Link to='/'><img className="logo" src={Logo2} alt="logo"/></Link>

          </div>
        )}

        <div
          onClick={() => {
            dispatch(openClose())
          }}
          className="menu-panel-closed"
        >
          <div id="menu-heading">{showMenu ? "CLOSE" : "MENU"}</div>
         
        </div>
      </div>
    )
}