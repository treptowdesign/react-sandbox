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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App