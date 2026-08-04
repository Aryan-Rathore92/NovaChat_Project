import React, { useContext } from 'react'
import './ChatWindow.css'
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx'

function ChatWindow() {

  const {prompt, reply, setPrompt, setReply, currThreadId} = useContext(MyContext);

      
  const getReply = async ()=>{
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  message: prompt,
                  threadId: currThreadId
                })
              };

              try {
                const response = await fetch("http://localhost:8080/api/chat", options);
                const res = await response.json();
                console.log(res);

              } catch (error) {
                console.log(error);
              }
              console.log("message:", prompt, "threadId:", currThreadId);
  }
  return (
    <div className='chatwindow'>
      <div className="navbar">
         <span className='appname'>NovaChat &nbsp;<i className="fa-solid fa-chevron-down"></i></span>
         <div className="userIconDiv">
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
         </div>
      </div>

      <Chat/>

      <div className="chatInput">
         <div className="inputBox">
           <input type="text"  placeholder='Ask Anything'
             value={prompt}
             onChange={(e)=>setPrompt(e.target.value)}
           />
           <div id="submit" onClick={getReply}><i class="fa-solid fa-paper-plane"></i></div>
         </div>
         <p className="info">
            NovaChat can make mistakes. Check important info. See Cookie Preferences.
         </p>
      </div>
    </div>
  )
}

export default ChatWindow
