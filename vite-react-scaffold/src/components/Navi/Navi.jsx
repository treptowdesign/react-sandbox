import React from 'react'
import { Link } from 'react-router-dom'

function Navi() {
    return (
    <header>
        <ul className="navi">
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/test-a">Test A</Link></li>
            <li><Link to="/test-b">Test B</Link></li>
        </ul>
    </header>
    );
}

export default Navi 