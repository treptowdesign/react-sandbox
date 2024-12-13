import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from '@/components/Page/Page';
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

  const display = (page) => {
    return (
      <Page children={page} />
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={display(<Home />)} />
        <Route path="/spellbook" element={display(<Spellbook />)} />
        <Route path="/tic-tac-toe" element={display(<TicTacToe />)} />
        <Route path="/connect-four" element={display(<ConnectFour />)} />
        <Route path="/mini-blog" element={display(<MiniBlog />)} />
        <Route path="/baseline" element={display(<Baseline />)} />
        <Route path="/carousel" element={display(<Carousel />)} />
      </Routes>
    </Router>
  );
};

export default App;

