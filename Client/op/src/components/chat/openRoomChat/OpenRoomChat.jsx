import { useEffect, useState } from "react";
import {io} from 'socket.io-client';

export default function OpenRoomChat() {
    const socket = io.connect("http://localhost:5000");
    const[messages, setMessages] = useState([]);

    const[chatbox, setChatbox] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("chat", {chatbox})
        setChatbox('');
    }

    useEffect(() => {
        socket.on("chat", (payload) => {
            setMessages([...messages, payload]);
        })
    })



    return(
        <div>
            <div className='all-messages'>
                {
                    messages.map((payload, key) => {
                        return (
                            <p key={key}>{payload.chatbox}</p>
                        )
                    })
                }
            </div>

            <div className='bottom'>
                <div>
                    <input type='text' value={chatbox} onChange={(event) => {
                        setChatbox(event.target.value);
                    }}/>
                    <button className='send-message' onClick={sendMessage}>Send</button>
                </div>
            </div>

           
        </div>
    )
}