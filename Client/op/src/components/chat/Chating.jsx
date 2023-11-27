import Logo from "../logo/logo";
import Navbar from "../navbar/Navbar";
import "./Chating.css";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import AuthContext from "../../Context/AuthProvider";

export default function Chating() {
  const { auth } = useContext(AuthContext);
  const userName = auth.email;
  const username = setUsername();
  function setUsername() {
    return userName;
  }

  let socket;
  useEffect(() => {
    socket = io.connect("http://localhost:3001");

    return () => {
      socket.disconnect();
    }
  }, [])
  // const socket = io.connect('https://opositive.onrender.com');
  const [messages, setMessages] = useState([]);

  const [chatbox, setChatbox] = useState("");

  const sendMessage = (e) => {
      e.preventDefault();
      // socket.emit("chat", { chatbox, username });
      socket.emit("chat", {type: 'message', user_details: username, payload: chatbox})
      setChatbox("");
  };


  useEffect(() => {

    socket.on("new_user", (payload) => {
      setMessages([...messages, payload]);
    })

    socket.on("recieve", (payload) => {
      setMessages([...messages, payload]);
    });

   
  }, [messages]);

  return (
    <div className="parent-panel">
      <div className="main-chat-panel">
        {/* <div className="brand-panel"> {<Logo />} </div> */}
        {/* <div>{username && `Welcome ${username}`}</div> */}

        <div className="chating-panel">
          <div className="all-messages">
            {messages.map((payload, key) => {
              return (
                <p className="ind-messages" key={key}>
                  <span>
                    {/* {payload.username == username ? "you" : payload.username} */}
                    {payload.type == 'new_user' ? `${payload.payload} : ${payload.user_details}` : 
                    payload.username == username ? "you" : payload.user_details
                    } 
                  </span>
                  :{payload.chatbox}
                </p>
              );
            })}
          </div>

          <div className="bottom">
            <div className="bottom-button-textbox">
              <input
                className="message-box"
                type="text"
                value={chatbox}
                onChange={(event) => {
                  setChatbox(event.target.value);
              
                }}
              />
              <button className="send-message" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
        {/* temp classname and button it is. */}
      </div>
      {/* <div className="chat-right-panel">
        <Navbar />
      </div> */}
    </div>
  );
}
