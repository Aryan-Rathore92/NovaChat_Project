import React, { useContext, useState ,useEffect} from 'react'
import './ChatWindow.css'
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx';
import {ScaleLoader} from 'react-spinners'

function ChatWindow() {

  const {prompt, reply, setPrompt, setReply, currThreadId,prevChats,setPrevChats,setNewChat} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
      
  const getReply = async ()=>{
            setLoading(true);
            setNewChat(false); // for don't apper start new chat text
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
                setReply(res.reply);
              } catch (error) {
                console.log(error);
              }
              setLoading(false);
  }

  // Append new chat to prevChat
   
  useEffect(()=>{
      if(prompt && reply){
        setPrevChats(prevChats => (
          [...prevChats, {
            role:"user",
            content: prompt
          },
          {
            role:"assistant",
            content: reply
          }
        ]
        ))
      }

      setPrompt("");
  },[reply])

  const handleProfileClick = ()=>{
    setIsOpen(!isOpen);
  }


  return (
    <div className='chatwindow'>
      <div className="navbar">
         <span className='appname'>NovaChat &nbsp;<i className="fa-solid fa-chevron-down"></i></span>
            <div className="userIconDiv">
                <span className='userIcon' onClick={handleProfileClick}><i className="fa-solid fa-user"></i></span>
            </div>
      </div>

      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Setting</div>
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>
        </div>
      }

      <Chat/>
      
      <ScaleLoader color='#fff' loading={loading}>
      </ScaleLoader>
      
      <div className="chatInput">
         <div className="inputBox">
           <input type="text"  placeholder='Ask Anything'
             value={prompt}
             onChange={(e)=>setPrompt(e.target.value)}
             onKeyDown={(e)=> e.key=="Enter"? getReply():""}
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
