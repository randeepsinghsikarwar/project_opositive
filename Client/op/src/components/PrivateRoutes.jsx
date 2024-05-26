import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";
import { SocketProvider } from "./chat/SocketContext";

export default function PrivateRoutes() {
  const {auth} = useContext(AuthContext) 
  const location = useLocation();

  return  (
    <SocketProvider>
      {auth?
    <Outlet/>
    : <Navigate to = '/Login' state = {{from: location }} replace/>}
    </SocketProvider>
  )
}

