import React, { useState } from 'react';
import './ConnectFour.sass';
import Navi from '@/components/Navi/Navi';


const checkWin = (board, row, col, color) => {
    // directions: [rowOffset, colOffset]
    const directions = [
        [0, 1], // horizontal (right)
        [1, 0], // vertical (down)
        [1, 1], // diagonal down
        [1, -1] // diagonal up
    ];

    for (let [rowOffset, colOffset] of directions) {
        let count = 1;

        // positive
        for (let step = 1; step < 4; step++) {
            const r = row + rowOffset * step;
            const c = col + colOffset * step;
            if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === color) {
                count++;
            } else {
                break;
            }
        }

        // negative
        for (let step = 1; step < 4; step++) {
            const r = row - rowOffset * step;
            const c = col - colOffset * step;
            if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === color) {
                count++;
            } else {
                break;
            }
        }

        // win 
        if (count >= 4) {
            return true;
        }
    }

    return false;
};

// Game SubComponents
const GameInput = ({ column, onDrop }) => {
    return (
        <button className="cf-input" onClick={() => onDrop(column)}>
            Drop
        </button>
    );
};

const Cell = ({ value }) => {
    return (
        <div className={`cf-cell ${value ? value.toLowerCase() : ''}`}>
            {value}
        </div>
    );
};

const Board = ({ spaces, redIsNext, handleColumnClick }) => {
    const inputBtns = [];
    for (let i = 0; i < 7; i++) {
        inputBtns.push(
            <GameInput key={i} column={i} onDrop={handleColumnClick} />
        );
    }

    const boardGrid = [];
    for (let i = 0; i < spaces.length; i++) {
        boardGrid.push(
            <Cell key={i} value={spaces[i]} />
        );
    }

    let status = 'Turn: ' + (redIsNext ? 'Red' : 'Yellow');

    return (
        <>
            <div className="status">{status}</div>
            <div className="cf-input-row">{inputBtns}</div>
            <div className="cf-board">{boardGrid}</div>
        </>
    );
};

// Main Game Component
const ConnectFour = () => {
    const rows = 6;
    const columns = 7;
    const [spaces, setSpaces] = useState(Array(rows * columns).fill(null));
    const [currentMove, setCurrentMove] = useState(0);
    const redIsNext = currentMove % 2 === 0; // toggle red/yellow

    const handleColumnClick = (column) => {
        // find first empty cell in col
        for (let row = rows - 1; row >= 0; row--) {
            const index = row * columns + column;
            if (!spaces[index]) {
                // update state
                const nextSpaces = spaces.slice();
                nextSpaces[index] = redIsNext ? 'R' : 'Y';
                setSpaces(nextSpaces);
                setCurrentMove(currentMove + 1);
                return;
            }
        }
        // if none are empty, do nothing 
    };

    return (
        <>
            <Navi />
            <div className="connect-four">
                <h1>Connect Four</h1>
                <Board
                    spaces={spaces}
                    redIsNext={redIsNext}
                    handleColumnClick={handleColumnClick}
                />
            </div>
        </>
    );
};

export default ConnectFour;
