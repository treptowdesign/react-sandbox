import React from 'react';
import './TicTacToe.sass';
import Navi from '@/components/Navi/Navi';

const TicTacToe = () => {
  return (
    <>
    <Navi />
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      {/* Component Logic Here */}
    </div>
    </>
    
  );
};

export default TicTacToe;
