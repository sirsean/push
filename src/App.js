import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import './App.css';
import { store } from './database.js';
import Home from './views/home.js';
import Players from './views/players.js';
import Games from './views/games.js';
import NewGame from './views/new_game.js';
import Game from './views/game.js';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/newgame" element={<NewGame />} />
                    <Route path="/game/:index" element={<Game />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
