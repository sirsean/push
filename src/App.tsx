import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import './App.css';
import { store } from './database';
import Home from './views/home';
import Players from './views/players';
import Games from './views/games';
import NewGame from './views/new_game';
import Game from './views/game';

function App(): JSX.Element {
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
