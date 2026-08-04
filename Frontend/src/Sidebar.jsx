import React from 'react'
import './Sidebar.css'

function Sidebar() {
  return (
    <section className='sidebar'>
      <button>
        <img src="src/assets/gpt-logo.png" alt="" className='logo'/>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      <ul className="history">
         <li>History1</li>
         <li>History2</li>
         <li>History3</li>
      </ul>

      {/* sign */}
      <div className="sign">
        <p>By Aryan Rathore &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar
