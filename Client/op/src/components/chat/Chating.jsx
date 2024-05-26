import "./Chating.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

import { useDispatch } from "react-redux";

export default function Chating() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket, setSocket, connected } = useSocket();

  return (
    <div>
      <button disabled={!connected}>Create or join room</button>
      <button
        disabled={!connected}
        onClick={() => {
          navigate("/RandomChat");
        }}
      >
        Random one-to-one
      </button>
    </div>
  );
}
