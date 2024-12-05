import { useState } from 'react';
import React from 'react';
import './TicTacToe.sass';
import Navi from '@/components/Navi/Navi';

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board(){
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) { // Updates the state in the board component
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice(); // copy array (immutability)
        nextSquares[i] = (xIsNext) ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    function clearBoard() { // reset
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <>
         <div className="status"> {status} <button onClick={clearBoard}>Clear</button></div>
         <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}  />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


const TicTacToe = () => {

  return (
    <>
        <Navi />
        <h1>Tic Tac Toe</h1>
        <div className="tic-tac-toe">
            <Board/>
        </div>
    </>
  );
};

export default TicTacToe;
