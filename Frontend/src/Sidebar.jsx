import React,{useContext, useEffect} from 'react'
import {MyContext} from './MyContext'
import './Sidebar.css'
import {v1 as uuidv1} from 'uuid';
import {API_URL} from './config.js'

function Sidebar() {

  const {allThreads, setAllThreads,currThreadId,setPrompt,setReply,setNewChat,setCurrThreadId,setPrevChats} = useContext(MyContext)

  const getAllThreads = async ()=>{
        try {
          const response = await fetch(`${API_URL}/thread`);
          const res = await response.json();
          const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}))
          setAllThreads(filteredData);
        } catch (error) {
          console.log(error);
        }
  }

  useEffect(()=>{
     getAllThreads();
  },[currThreadId,allThreads]);

  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async (newThreadId)=>{
      setCurrThreadId(newThreadId);

      try {
        const response = await fetch(`${API_URL}/thread/${newThreadId}`);
        const res = await response.json();
        setPrevChats(res);
        setNewChat(false);
        setReply(null);
      } catch (error) {
        console.log(error)
      }
  }

  const deleteThread = async (threadId)=>{
     try {
      const response = await fetch(`${API_URL}/thread/${threadId}`, {method: "DELETE"});
      const res = await response.json();
      console.log(res);

      // updated thread re-render
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId === currThreadId){
        createNewChat(); // This use for remove the chat from chatWindow of deleted thread
      }
     }
     catch(error) {
      console.log(error)
     }
  }

  return (
    <section className='sidebar'>
      <button onClick={createNewChat}>
        <img src="src/assets/gpt-logo.png" alt="" className='logo'/>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      <ul className="history">
         {
            allThreads.map((thread,idx)=>(
              <li onClick={(e)=> changeThread(thread.threadId)} key={idx}
               className={thread.threadId === currThreadId ?"highlited":""}
              >
                {thread.title}
                <i className="fa-solid fa-trash"
                 onClick={(e)=>{
                  e.stopPropagation(); // stop event bubling
                  deleteThread(thread.threadId)
                 }}
                ></i>
              </li>
            ))
         }
      </ul>

      {/* sign */}
      <div className="sign">
        <p>By Aryan Rathore &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar
