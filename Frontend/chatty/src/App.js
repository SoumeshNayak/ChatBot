import React from 'react';
import './App.css';
import Chat from './component/Chat';
import io from 'socket.io-client';
//import {nanoid} from 'nanoid';
import {useState} from 'react'
const socket=io.connect("http://localhost:3001");


function App() {
  
  const [name,setName]=useState("");
  const [userid,setUserid]=useState("");
  const [chat,setChat]=useState(false);

  const joinRoom=()=>{
    if(name!=="" && userid!==""){
      socket.emit("join_room",userid);
      setChat(true);
    }
  }
  
  return (
    <div className="App">
      {!chat?(
      <div className='joinChatContainer'>
        
      <h3>Join Room</h3>
      <input
      type="text"
       placeholder="jhon"
       onChange={(e)=>{
        setName(e.target.value)
       }}
      />
      <input
      type="text"
      placeholder="Room id"
      onChange={(e)=>{
        setUserid(e.target.value)
       }}
      />
      <button onClick={joinRoom}>click</button>
      


      </div>
      ):(
      <Chat socket={socket} name={name} userid={userid}/>
      )
}
    </div>
      
    
  );
}

export default App;
