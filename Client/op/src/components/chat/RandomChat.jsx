import { useEffect, useState } from "react";
import Message from "../Message";
import { useSelector } from "react-redux";
import { useSocket } from "./SocketContext";

export default function RandomChat() {
  const { socket, setSocket } = useSocket();
  const [isChating, setIsChating] = useState(false);
  const [rec, setRec] = useState();
  const users = useSelector((state) => state.socketSlice.users);

  function getRandomUser() {
    let randomNumber = Math.random(Math.floor() * users.length);
    return users[randomNumber];
  }

  function handleStart() {
    console.log(rec)
    setIsChating(!isChating);
  }

  function handleStop() {
    setIsChating(!isChating);
  }

  useEffect(() => {
    setRec(getRandomUser);
  }, [handleStart]);




  return (
    <div>
      <div>
        {socket && <div>my id: {socket.id}</div>}
        <h3>all users</h3>
        {users.map((user, key) => (
          <div key={key}>{user}</div>
        ))}
      </div>
      {isChating ? (
        <button onClick={handleStop}>Stop</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      { <Message sender = {socket} reciever = {rec} />}
    </div>
  );
}
