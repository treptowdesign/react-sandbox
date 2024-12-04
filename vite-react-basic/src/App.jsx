import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter/Counter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/tic-tac-toe" element={<TicTacToe />} /> */}
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
};

export default App;

