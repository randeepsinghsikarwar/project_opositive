import Logo from '../logo/logo'
import Navbar from "../navbar/Navbar";
import "./Chating.css";
import { useEffect, useState, useContext } from "react";
import {io} from 'socket.io-client';
import  AuthContext  from "../../Context/AuthProvider";


export default function Chating() {
  const {auth } = useContext(AuthContext)
    const userName = auth.email
    const username = setUsername();
    function setUsername(){
      return userName
    }
  const socket = io.connect('https://opositive.onrender.com');
  const[messages, setMessages] = useState([]);

  const[chatbox, setChatbox] = useState("");

  const sendMessage = (e) => {
    e.key === "Enter" && console.logn(e.type)
      if(e.type==='click'){
        e.preventDefault();
      socket.emit("chat", {chatbox, username})
      setChatbox('');

      }
  }

  useEffect(() => {
      socket.on("chat", (payload) => {
          setMessages([...messages, payload]);
      })
  })


  return (
    <div className="parent-panel">
      <div className="main-chat-panel">
        <div className="brand-panel"> {<Logo/>} </div>
        {/* <div>{username && `Welcome ${username}`}</div> */}

        <div className="chating-panel">
          <div className="all-messages">
            {messages.map((payload, key) => {
              return (
                <p className="ind-messages" key={key}><span>{payload.username == username ? 'you': payload.username}</span>:{payload.chatbox}</p>
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
                  onkeydown={sendMessage}
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
      <div className="chat-right-panel">
        <Navbar />
      </div>
    </div>
  );
}
