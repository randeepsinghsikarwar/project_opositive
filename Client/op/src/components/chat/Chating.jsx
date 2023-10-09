import { logout } from "../../firebase/firebase";
// import {  useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import "./Chating.css";
import { useEffect, useState, useContext } from "react";
import {io} from 'socket.io-client';
import  AuthContext  from "../../Context/AuthProvider";


export default function Chating() {
  const {auth ,setAuthh} = useContext(AuthContext)
    const userName = auth.email
    const username = setUsername();
    function setUsername(){
      return userName
    }
  const socket = io.connect("http://localhost:5000");
  const[messages, setMessages] = useState([]);

  const[chatbox, setChatbox] = useState("");

  const sendMessage = (e) => {
      e.preventDefault();
      socket.emit("chat", {chatbox, username})
      setChatbox('');
  }

  useEffect(() => {
      socket.on("chat", (payload) => {
          setMessages([...messages, payload]);
      })
  })


  function handleLogout() {
    logout()
      .then(() => {
        setAuthh(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="parent-panel">
      <div className="main-chat-panel">
        <div className="brand-panel">{"OPositive"}        </div>
        <div>{username && `Welcome ${username}`}</div>

        <div>
          <div className="all-messages">
            {messages.map((payload, key) => {
              return (
                <p key={key}><span>{payload.username == username ? 'you': payload.username}</span>:{payload.chatbox}</p>
              );
            })}
          </div>

          <div className="bottom">
            <div>
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
        <button
          className="login-button"
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </button>
      </div>
      <div className="chat-right-panel">
        <Navbar />
      </div>
    </div>
  );
}
