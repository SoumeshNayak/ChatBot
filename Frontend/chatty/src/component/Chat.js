import React,{useEffect, useState} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket,name,userid}) => {
    const [currentMessage,setCurrentMessage]=useState("");
    const [messageList,setMesssageList]=useState([]);

    const sentMessage= async()=>{
       if(currentMessage!==""){
      const messageData={
           room:userid,
           writer:name,
           message:currentMessage,
           date:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",messageData);
        setMesssageList((list)=>[...list,messageData]);
        setCurrentMessage("");
       }
      
    }
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMesssageList((list)=>[...list,data])
        });
    },[socket]);

  return (
    <>
      <div className='chat-window'>
        <div className='chat-header'>
        <p>Live chat</p>
        </div>
        <div className='chat-body'>

        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={name === messageContent.writer ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.date}</p>
                    <p id="author">{messageContent.writer}</p>
                  </div>
                </div>
              </div>
            );
          })}
       </ScrollToBottom>
        </div>
        <div className='chat-footer'>
        <input
        type="text"
        value={currentMessage}
        placeholder="hyy..."
        
        onChange={
            (e)=>{
                setCurrentMessage(e.target.value)
            }
        }
        />
        <button onClick={sentMessage} >&#9658;</button>
        </div>
      </div>
    </>
  )
}

export default Chat
