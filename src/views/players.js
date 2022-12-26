import { useSelector } from 'react-redux';
import {
    store,
    selectPlayers,
    addPlayer,
    removePlayer,
} from '../database.js';

function PlayerRow({ player }) {
    const remove = (e) => {
        e.preventDefault();
        store.dispatch(removePlayer(player));
    }
    return (
        <tr className="PlayerRow">
            <td>{player}</td>
            <td><button onClick={remove}>Remove</button></td>
        </tr>
    );
}

function AddPlayerForm() {
    const onSubmit = (e) => {
        e.preventDefault();
        store.dispatch(addPlayer(e.target.player.value));
        e.target.player.value = '';
    }
    return (
        <form className="AddPlayerForm" onSubmit={onSubmit}>
            <input type="text" name="player" tabIndex="1" />
            <button>Add Player</button>
        </form>
    );
}

export default function Players() {
    const players = useSelector(selectPlayers);
    return (
        <div className="Players">
            <h1>Players</h1>
            <table>
                <tbody>{players.map(p => <PlayerRow key={p} player={p} />)}</tbody>
            </table>
            <hr />
            <AddPlayerForm />
        </div>
    );
}
