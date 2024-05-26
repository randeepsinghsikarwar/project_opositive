import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import {
  newUser,
  disconnectUser,
} from "../../redux/feature/socketAsset/socketSlice";
import { useDispatch } from "react-redux";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    newSocket.on("connect", () => {
      if (!socket) {
        setSocket(newSocket);
        newSocket.emit("join server");
        setConnected(true);
      }
    });
  
    newSocket.on("disconnect", () => {
      if (socket) {
        setConnected(false);
        setSocket(null);
      }
    });
  
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        dispatch(disconnectUser(newSocket.id)); // Assuming newSocket.id is the correct way to get the socket ID
        setSocket(null);
      }
    };
  }, []);
  
  useEffect(() => {
    if (socket) {
      console.log(socket)
      const handleNewUser = (users) => {
        dispatch(newUser(users));
      };
      socket.on("new user", handleNewUser);
  
      return () => {
        socket.off("new user", handleNewUser);
      };
    }

  }, [socket]);
  

  return (
    <SocketContext.Provider value={{ socket, setSocket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
