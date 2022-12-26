import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    selectGames,
} from '../database.js';

function GameRow({ index, date }) {
    const href = `/game/${index}`;
    return (
        <p><Link to={href}>Game {index}: {date}</Link></p>
    );
}

export default function Games() {
    const games = useSelector(selectGames);
    return (
        <div className="Games">
            <h1>Games</h1>

            {games.map(({ index, date }) => <GameRow key={index} index={index} date={date} />)}
        </div>
    );
}
