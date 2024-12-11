import React from 'react'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import './Navi.sass'

function Navi() {
    return (
      <ul className="navi">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tic-tac-toe">TicTacToe</Link></li>
        <li><Link to="/connect-four">ConnectFour</Link></li>
        <li><Link to="/mini-blog">MiniBlog</Link></li>
        <li><Link to="/spellbook">Spellbook</Link></li>
        <li><Link to="/baseline">Baseline</Link></li>
      </ul>
    );
}

export default Navi 