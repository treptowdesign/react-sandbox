import React, { useState } from 'react';
import './ConnectFour.sass';
import Navi from '@/components/Navi/Navi';


// Game SubComponents
const GameInput = ({i}) => {
    return (
        <button key={i} className="cf-input">{i}</button>
    );
}
const Cell = ({i}) => {
    return (
        <div key={i} className="cf-cell">{i}</div>
    );
}

const Board = ({spaces, redIsNext}) => {
    const inputBtns = [];
    for(let i = 0; i < 7; i++){
        inputBtns.push(
            <GameInput i={i} />
        );
    }
    const boardGrid = []; 
    for(let i = 0; i < spaces.length; i++){
        boardGrid.push(
            <Cell i={i} />
        );
    }

    let status = 'Turn: ' + (redIsNext ? 'Red' : 'Yellow');

    return (
        <>
            <div className="status">
                {status}
            </div>
            <div className="cf-input-row">
                {inputBtns}
            </div>
            <div className="cf-board">
                {boardGrid}
            </div>
        </>
    );
}

// Main Game Component
const ConnectFour = () => {
    const [spaces, setSpaces] = useState(Array(42).fill(null));
    const [currentMove, setCurrentMove] = useState(0);
    const redIsNext = currentMove % 2 === 0; // red or yellow

    return (
        <>
        <Navi />
        <div className="connect-four">
            <h1>ConnectFour</h1>
            <Board spaces={spaces} redIsNext={redIsNext} />
        </div>
        </>
    );
};

export default ConnectFour; 
