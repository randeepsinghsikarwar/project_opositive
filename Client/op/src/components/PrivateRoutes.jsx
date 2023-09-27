import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const location = useLocation();
    const userr = useSelector((state) => state.userAuth.user);
    let isAuthentic;

    useEffect(() => {
        console.log(userr);
         isAuthentic = userr == null ? false:true;
        console.log("isAuth"+isAuthentic);
    }, [])
    
    return(

        isAuthentic ? <Outlet/> : <h1>hii</h1>
    )
}
export default PrivateRoutes;