import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet, redirect } from "react-router-dom";
import Signup from "./signup/Signup";

const PrivateRoutes = () => {
    const location = useLocation();
    const userr = useSelector((state) => state.userAuth.user);

    // const isAuthentic = userr == null? false: true;
    const isAuthentic = true;
    if(!isAuthentic){
        return <Navigate to='/Signup' replace state={{from: location}}/>;
        // return redirect("/Signup")
    }
    return <Outlet/>
    
}
export default PrivateRoutes;