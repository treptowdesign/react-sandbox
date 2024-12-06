import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/components/Home/Home';
import Counter from '@/components/Counter/Counter';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import ConnectFour from '@/components/ConnectFour/ConnectFour';
import './App.sass'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/connect-four" element={<ConnectFour />} />
      </Routes>
    </Router>
  );
};

export default App;

