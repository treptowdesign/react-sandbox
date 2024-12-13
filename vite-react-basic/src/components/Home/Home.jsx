import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './Home.sass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="home-body">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <p>MiniProject Sandbox</p>
        
        <div className="card fullwidth">
          <div className="card-content">
            <div className="todo">
              <h2>ToDo List:</h2>
              <ul>
                <li>Setup Express backend w/ SQLite</li>
                <li>Explore component libs: Material UI, Chakra UI</li>
                <li>New Project: Sliding Form</li>
                <li>New Project: Calendar/Event Log</li>
                <li>MiniBlog: Convert to D&D Character Feature Log</li>
                <li>Spellbook: Level/School/Cladd filters</li>
                <li>General: Implement react-transition-group</li>
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <span>Count: {count}</span>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App