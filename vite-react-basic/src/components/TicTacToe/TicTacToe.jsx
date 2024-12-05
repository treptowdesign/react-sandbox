import { useState } from 'react';
import React from 'react';
import './TicTacToe.sass';
import Navi from '@/components/Navi/Navi';

function Square() {
    const [value, setValue] = useState(null);
    function handleClick() {
        setValue('X');
        console.log('clicked!');
    }
    return (
        <button 
            className="square" 
            onClick={handleClick} 
        >
            {value}
        </button>
    );
}


const TicTacToe = () => {

  // const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
        <Navi />
        <h1>Tic Tac Toe</h1>
        <div className="tic-tac-toe">
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    </>
  );
};

export default TicTacToe;
