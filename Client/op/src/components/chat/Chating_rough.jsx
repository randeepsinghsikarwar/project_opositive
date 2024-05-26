import "./Chating.css";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import { io } from "socket.io-client";
import { UserNameGen } from "./UserNameGen";
import {newMessage} from "../../redux/feature/userMessage/UserMessageSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Chating() {
  const { auth } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [currentChat, setCurrentChat] = useState({isChannel: true, chatName: "general", recId: ""});
  const [currentRoom, setCurrentRoom] = useState("general");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatbox, setChatbox] = useState("");
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUserName(UserNameGen());
    const newUser = io("http://localhost:3001");
    setSocket(newUser);
    return () => newUser.disconnect();
  }, []);

 useEffect(()=> {
  if(socket){
    socket.emit("join server", (userName));
    socket.on("new user", (users) => {
      setUsers(users);
      console.log(users)
    })
  }

  console.log(users)
 }, [socket, setSocket]);

 function sendMessage(){
    const payload = {
      content: chatbox,
      sender: userName,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.recId,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel
    };
    socket.emit("send message", payload);
    const c = currentChat.chatName;
    dispatch(newMessage({c, payload}))
    setChatbox("")
 }
 
 function joinRoom(roomName){
    socket.emit('join_room', {userName, roomName});
 }

 
  return (
    <div className="parent-panel">
      {users && (
      <div>
        <button onClick={() => {
          joinRoom("general");
        }}>General</button>
        <button onClick={() => {
          joinRoom("random");
        }}>Random</button>
        <button onClick={() => {
          joinRoom("jokes");
        }}>Jokes</button>
        {users.map((user, key) => (
          <button key={key}>{user.username}</button>
        ))}
      </div>
    )}
        <div className="chating-panel">
          <div className="all-messages">
            {messages.map((mess, key) => (
              <p className="ind-messages" key={key}>
               {mess.userName} : {mess.message}
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
              <input type="submit" className="send-message" onClick={sendMessage} value="Send"/>
    
          </div>
        </div>
    </div>
  );
}
