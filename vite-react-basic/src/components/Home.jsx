

// const Home = () => {
//   return (
//     <div>
//       <h1>React Tutorials</h1>
//       <ul>
//         <li><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
//         <li><Link to="/counter">Counter</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Home;




import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import '../App.sass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ul>
        <li><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>
    </>
  )
}

export default App