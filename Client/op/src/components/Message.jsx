import { useEffect, useState } from "react";


export default function Message(props) {
  const sender = props.sender;
  const [reciever, setReciever] = useState(props.reciever);
  const [currentMessage, setCurrentMessage] = useState("");
  const [error, setError] = useState(false);

  //   removing user itself from activeUsers as we dont want someone to comunicate to themselves.
 

  useEffect(() => {
    
  }, [error])

  function handleNext() {
    //think something other then random number for accessing new user.
  }

  function handleSend() {
    setCurrentMessage(currentMessage.trim());
    if(currentMessage.length === 0){
        setError(true);
    }else{
        props.sender.to(reciever).emit("send message", ({
          message: currentMessage,
          sender: sender,
          reciever: reciever
        }));
        setCurrentMessage("");
    }
  }

  useEffect(() => {
    console.log(props.users)
  }, [])

  return (
    //parent
    <div>
      {/* all messages */}
      <div>
        {/* user write messages here */}
        <div>
          <button onClick={handleNext}>Next</button>
          <input type="text" value={currentMessage}
           onChange={(e) => {
            setCurrentMessage(e.target.value)
           }}/>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
