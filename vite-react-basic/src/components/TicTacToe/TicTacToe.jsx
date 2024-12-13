import { useState } from 'react';
import React from 'react';
import './TicTacToe.sass';
import Navi from '@/components/Navi/Navi';

// ToDo List... 
// [x] change board to loop out squares 
// [x] toggle history buttons for Asc/Desc order 
// [x] highlight winning squares 
// [x] no-winner draw message 
// [x] display move location (row, col) in history list 

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
            return lines[i];
        }
    }
    return null;
}

// SubComponents
const Square = ({value, onSquareClick, active}) => {
    return (
        <button className={active ? 'square active': 'square'} onClick={onSquareClick}>
            {value}
        </button>
    );
}

const Board = ({xIsNext, squares, onPlay}) => {
    const winningSquares = calculateWinner(squares); // returns array of winning squares OR null
    const winningTeam = winningSquares ? squares[winningSquares[0]] : null; // get the square value (X/O) using first pocket of winning array
    const openSquares = squares.filter((square, index) => {
        return square == null;
    })

    let status;
    if(winningTeam){
        status = 'Winner: ' + winningTeam; 
    } else if(openSquares.length === 0){
        status = 'Draw!';
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
    }

    function handleClick(i) { // Updates the state in the board component
        if(winningSquares || squares[i]){
            return;
        }
        const nextSquares = squares.slice(); // copy array (immutability)
        nextSquares[i] = (xIsNext) ? "X" : "O";
        onPlay(nextSquares, i);
    }

    function isActiveSquare(index){
        return winningSquares && winningSquares.includes(index)
    }

    // Loop to render board grid 
    const boardGrid = []; 
    for(let row = 0; row < 3; row++){ // 3 rows
        const gridGrow = [];
        for(let col = 0; col < 3; col++){ // 3 columns per row
            const index = row * 3 + col;
            gridGrow.push(
                <Square key={index} value={squares[index]} active={isActiveSquare(index)} onSquareClick={() => handleClick(index)} />
            );
        }
        boardGrid.push(
            <div key={row} className="board-row">
                {gridGrow} 
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardGrid}
            <div>Free: {openSquares.length} / {squares.length}</div>
        </>
    );
}

// Main Component
const TicTacToe = () => {
    // main states
    const [history, setHistory] = useState([{squares: Array(9).fill(null), moveIndex: null}]);
    const [currentMove, setCurrentMove] = useState(0);
    const [asc, setAsc] = useState(true);
    // computeds
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, moveIndex){
        const nextHistory = [...history.slice(0, currentMove + 1), {squares: nextSquares, moveIndex}];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    const moves = history.map((entry, move) => {
        const moveIndex = entry.moveIndex;
        const row = moveIndex != null ? Math.floor(moveIndex / 3) + 1 : null; // get the row from moveIndex
        const col = moveIndex != null ? (moveIndex % 3) + 1 : null; // get the column from moveIndex
        const location = moveIndex != null ? `(row: ${row}, col: ${col})` : '';
        let description;
        if(move === history.length -1) {
            description = `Current Move! ${location}`;
        } else if(move > 0){
            description = `Go to move ${move} ${location}`;
        } else {
            description = `Go to game start`;
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
                    <button onClick={() => setAsc(!asc)}>{asc ? 'Asc' : 'Dsc'}</button>
                    <ol>{asc ? moves : moves.reverse()}</ol>
                </div>
            </div>
        </>
    );
};

export default TicTacToe;
