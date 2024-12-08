import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './Home.sass'
import Navi from '@/components/Navi/Navi';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navi />
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
        <p>React Sandbox MiniProjects</p>
        
        <div className="card">
          <div className="todo">
            <h2>ToDo List:</h2>
            <ul>
              <li>Setup Express backend w/ SQLite</li>
              <li>New Project: Sliding Form</li>
              <li>MiniBlog: Convert to D&D Character Feature Log</li>
              <li>Spellbook: Level/School/Cladd filters</li>
            </ul>
          </div>
          <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            {/* <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p> */}
        </div>
      </div>
    </>
  )
}

export default App