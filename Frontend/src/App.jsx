import './App.css'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import {MyContext} from './MyContext'
import { useState } from 'react'
import {v1 as uuidv1} from 'uuid';
function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());


  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId
  };// Passing Values

  return (
    <>
      <div className="app">
        <MyContext.Provider value={providerValues}>
            <Sidebar/>
            <ChatWindow/>
        </MyContext.Provider>
      </div>
    </>
  )
}

export default App
