import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function PrivateRoutes() {
  const user = useSelector((state) => state.userAuth.user);
  const location = useLocation();

  return  (
    user?
    <Outlet/>
    : <Navigate to = '/Login' state = {{from: location }} replace/>
  )
}

