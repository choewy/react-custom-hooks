import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, links } from './Examples';

const App = () => {
    return (
        <div>
            <h1>📌 Hooks</h1>
            <ul>
                {
                    links.map((example, index) => <li key={index}><Link to={example.path}>{example.text}</Link></li>)
                }
            </ul>
            <hr />
            <Routes />
        </div>
    )
}

export default App;