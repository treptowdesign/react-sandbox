import { useState } from 'react';
import React from 'react';
import './TicTacToe.sass';
import Navi from '@/components/Navi/Navi';

// Utility Functions 
const calculateWinner = (squares) => {
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

// SubComponents
const Square = ({value, onSquareClick}) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

const Board = ({xIsNext, squares, onPlay}) => {
    const winner = calculateWinner(squares);
    let status;

    if(winner){
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
    }

    function handleClick(i) { // Updates the state in the board component
        if(winner || squares[i]){
            return;
        }
        const nextSquares = squares.slice(); // copy array (immutability)
        nextSquares[i] = (xIsNext) ? "X" : "O";
        onPlay(nextSquares);
    }

    return (
        <>
            <div className="status"> {status}</div>
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

// Main Component
const TicTacToe = () => {
    // main states
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    // computeds
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move === history.length -1) {
            description = 'Current Move!';
        } else if(move > 0){
            description = 'Go to move #' + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <>
            <Navi />
            <h1>Tic Tac Toe</h1>
            <div className="status">Looking at move {currentMove + 1} of {history.length}</div>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    );
};

export default TicTacToe;
