import "./Chating.css";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import { io } from "socket.io-client";
import { UserNameGen } from "./UserNameGen";

export default function Chating() {
  const { auth } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatbox, setChatbox] = useState("");

  useEffect(() => {
    setUserName(UserNameGen());
    const newUser = io("http://localhost:3001");
    setSocket(newUser);

    return () => newUser.disconnect();
  }, []);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if(socket && auth.email && !userLoggedIn){
      socket.emit("addUser", { userName: userName, email: auth.email });
      setUserLoggedIn(true);
    }
  }, [socket, auth.email, userLoggedIn, userName]);

  useEffect(() => {
    if (socket) {
      socket.on("recieve", (p) => {
        setMessages((prev) => [
          ...prev,
          {
            user_email: p.user_email,
            type: p.type,
            user_details: p.user_details,
            messageSent: p.payload,
          },
        ]);
        // console.log(messages);
      });

      return () => {
        socket.off("recieve");
      };
    }
  }, [socket, messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("chat", {
      type: "message",
      user_email: auth.email,
      user_details: userName,
      payload: chatbox,
    });
    setChatbox("");
  };

  return (
    <div className="parent-panel">
      <div className="main-chat-panel">
        <div className="chating-panel">
          <div className="all-messages">
            {messages.map((mess, key) => (
              <p className="ind-messages" key={key}>
                {mess.type === "AKN" ? (
                  <span>{mess.payload}</span>
                ) : (
                  <span>
                    {mess.user_details === userName ? "you" : mess.user_details}:{" "}
                  </span>
                )}
                {mess.messageSent}
              </p>
            ))}
          </div>

          <div className="bottom-button-textbox">
            <input
              className="message-box"
              type="text"
              value={chatbox}
              onChange={(event) => setChatbox(event.target.value)}
            />
            <button className="send-message" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
