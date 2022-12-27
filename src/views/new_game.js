import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    store,
    selectPlayers,
    selectNumGames,
    startGame,
} from '../database.js';
import { Page } from './layout.js';
import { AddPlayerForm } from './players.js';

function PlayerSelection({ player }) {
    return (
        <p>
            <input type="checkbox" name="players" value={player} id={player} />
            <label htmlFor={player}>{player}</label>
        </p>
    );
}

export default function NewGame() {
    const navigate = useNavigate();
    const numGames = useSelector(selectNumGames);
    const players = useSelector(selectPlayers);
    const onSubmit = (e) => {
        e.preventDefault();
        const players = Array.from(e.target.players).filter(elem => elem.checked).map(elem => elem.value);
        store.dispatch(startGame({ players }));
        const href = `/game/${numGames}`;
        navigate(href);
    }
    return (
        <Page>
            <div className="NewGame">
                <h1>New Game</h1>
                <AddPlayerForm />
                <hr />
                <form onSubmit={onSubmit}>
                    {players.map(p => <PlayerSelection key={p} player={p} />)}
                    <button>Start Game</button>
                </form>
            </div>
        </Page>
    );
}
