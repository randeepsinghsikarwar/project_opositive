import { logout } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/feature/authentication/AuthSlice";
import Navbar from "../navbar/Navbar";
import "./Chating.css";
import { useEffect, useState } from "react";
import {io} from 'socket.io-client';

export default function Chating() {
  const dispatch = useDispatch();
    const userName = useSelector((state) => state.userAuth.email)
    const username = setUsername();
    function setUsername(){
        const a = userName.split('@');
        return a[0];
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
        dispatch(setAuth(null));
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
