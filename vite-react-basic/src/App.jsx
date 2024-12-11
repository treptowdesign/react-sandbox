import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/components/Home/Home';
// import Counter from '@/components/Counter/Counter';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import ConnectFour from '@/components/ConnectFour/ConnectFour';
import MiniBlog from '@/components/MiniBlog/MiniBlog';
import Spellbook from '@/components/Spellbook/Spellbook';
import Baseline from '@/components/Baseline/Baseline';
import Carousel from '@/components/Carousel/Carousel';
import './App.sass'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spellbook" element={<Spellbook />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/connect-four" element={<ConnectFour />} />
        <Route path="/mini-blog" element={<MiniBlog />} />
        <Route path="/baseline" element={<Baseline />} />
        <Route path="/carousel" element={<Carousel />} />
      </Routes>
    </Router>
  );
};

export default App;

