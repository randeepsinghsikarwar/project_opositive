import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet,  } from "react-router-dom";
import Signup from "./signup/Signup";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
    const location = useLocation();
    const userr = useSelector((state) => state.userAuth.user);
    const [isAuthentic, setAuthentic] = useState(true);

    useEffect(() => {
        userr == null ? setAuthentic(false): setAuthentic(true)
    })
    
    if(!isAuthentic){
        return <Navigate to='/Signup' replace state={{from: location}}/>;
        // return redirect("/Signup")
    }
    return <Outlet/>
    
}
export default PrivateRoutes;