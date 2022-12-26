import { useSelector } from 'react-redux';
import {
    useParams,
} from 'react-router-dom';
import {
    store,
    selectGame,
    selectGameScores,
    selectScore,
    setScore,
} from '../database.js';

const HANDS = [
    'Two Sets of Three',
    'Set of Three, Run of Four',
    'Two Runs of Four',
    'Three Sets of Three',
    'Run of Seven',
    'Set of Eight',
];

function HandPlayerRow({ handIndex, gameIndex, player }) {
    const score = useSelector(selectScore({ handIndex, gameIndex, player }));
    const onChange = (e) => {
        e.preventDefault();
        const score = parseInt(e.target.value);
        store.dispatch(setScore({ gameIndex, handIndex, player, score }));
    }
    return (
        <tr>
        <td>{player}</td>
        <td><input type="number" onChange={onChange} defaultValue={score} /></td>
        </tr>
    );
}

function HandPanel({ hand, handIndex, gameIndex, players }) {
    return (
        <div className="HandPanel">
        <h2>{hand}</h2>
        <table>
        <tbody>{players.map(p => <HandPlayerRow key={p} handIndex={handIndex} gameIndex={gameIndex} player={p} />)}</tbody>
        </table>
        </div>
    );
}

function TotalScorePanel({ gameIndex }) {
    const scores = useSelector(selectGameScores(gameIndex));
    return (
        <table className="TotalScorePanel">
        <tbody>
        {scores.map(({ player, score }) => <tr key={player}><th>{player}</th><td>{score}</td></tr>)}
        </tbody>
        </table>
    );
}

export default function Game() {
    const { index } = useParams();
    const game = useSelector(selectGame(index));
    if (game) {
        return (
            <div className="Game">
            <TotalScorePanel gameIndex={index} />
            {HANDS.map((hand, i) => <HandPanel key={i} hand={hand} handIndex={i} gameIndex={index} players={game.players} />)}
            </div>
        );
    }
}
