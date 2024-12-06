import React, { useState } from 'react';
import './ConnectFour.sass';
import Navi from '@/components/Navi/Navi';

///////////////////////////////////////////////////////////////// 
// Utility Functions
///////////////////////////////////////////////////////////////// 

const checkWin = (board, index, color) => {
    const rows = 6;
    const columns = 7;

    // get row/col from index
    const row = Math.floor(index / columns);
    const col = index % columns;

    // directions: [rowOffset, colOffset]
    const directions = [
        [0, 1],  // horizontal (right)
        [1, 0],  // vertical (down)
        [1, 1],  // diagonal down-right
        [1, -1]  // diagonal down-left
    ];

    for (let [rowOffset, colOffset] of directions) {
        let count = 1;
        const winningIndices = [index]; // start with the current index

        // positive
        for (let step = 1; step < 4; step++) {
            const r = row + rowOffset * step;
            const c = col + colOffset * step;
            const i = r * columns + c; // convert back to index
            if (r >= 0 && r < rows && c >= 0 && c < columns && board[i] === color) {
                winningIndices.push(i);
                count++;
            } else {
                break;
            }
        }

        // negative
        for (let step = 1; step < 4; step++) {
            const r = row - rowOffset * step;
            const c = col - colOffset * step;
            const i = r * columns + c; // convert back to index
            if (r >= 0 && r < rows && c >= 0 && c < columns && board[i] === color) {
                winningIndices.push(i);
                count++;
            } else {
                break;
            }
        }

        // win condition: 4 or more in a row
        if (count >= 4) {
            return {indices: winningIndices, color: color}; // return the indices of the winning cells
        }
    }

    return null; // no win detected
};


///////////////////////////////////////////////////////////////// 
// Game SubComponents
///////////////////////////////////////////////////////////////// 

const GameInput = ({ column, onDrop }) => {
    return (
        <button className="cf-input" onClick={() => onDrop(column)}>
            Drop
        </button>
    );
};

const Cell = ({ spaceIndex, value, active }) => {
    return (
        <div className={`cf-cell ${value ? value.toLowerCase() : ''} ${active ? 'active' : ''}`}>
            {spaceIndex}
        </div>
    );
};

const Board = ({ spaces, redIsNext, handleColumnClick, winningIndices }) => {
    const inputBtns = [];
    for (let i = 0; i < 7; i++) {
        inputBtns.push(
            <GameInput key={i} column={i} onDrop={handleColumnClick} />
        );
    }

    const boardGrid = [];
    for (let i = 0; i < spaces.length; i++) {
        boardGrid.push(
            <Cell key={i} spaceIndex={i} value={spaces[i]} active={winningIndices && winningIndices.includes(i) ? true : false} />
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

///////////////////////////////////////////////////////////////// 
// Main Game Component
///////////////////////////////////////////////////////////////// 

const ConnectFour = () => {
    const rows = 6;
    const columns = 7;
    const [spaces, setSpaces] = useState(Array(rows * columns).fill(null));
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState(null);
    const redIsNext = currentMove % 2 === 0; // toggle red/yellow

    const handleColumnClick = (column) => {
        // find first empty cell in col
        if(!winner){
            for (let row = rows - 1; row >= 0; row--) { // loop thru each row
                const index = row * columns + column; // only care about the column we're on
                if (!spaces[index]) {
                    const nextSpaces = spaces.slice();
                    nextSpaces[index] = redIsNext ? 'R' : 'Y';
                    setSpaces(nextSpaces);
                    setCurrentMove(currentMove + 1);
    
                    setWinner(checkWin(spaces, index, (redIsNext ? 'R' : 'Y')));
                    console.log(winner);
                    return;
                }
            }
            // if none are empty, do nothing 
        } else {
            console.log('GAME OVER!');
        }
        
    };

    return (
        <>
            <Navi />
            <div className="connect-four">
                <h1>Connect Four</h1>
                <div>Winner: {winner ? winner.color : 'undecided'}</div>
                <Board
                    spaces={spaces}
                    redIsNext={redIsNext}
                    handleColumnClick={handleColumnClick}
                    winningIndices={winner ? winner.indices : null}
                />
            </div>
        </>
    );
};

export default ConnectFour;
