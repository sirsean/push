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
import { Page } from './layout.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
        const responsiveCarousel = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        };
        return (
            <Page>
                <div className="Game">
                    <TotalScorePanel gameIndex={index} />
                    <Carousel responsive={responsiveCarousel} autoPlay={false} keyBoardControl={false}>
                        {HANDS.map((hand, i) => <HandPanel key={i} hand={hand} handIndex={i} gameIndex={index} players={game.players} />)}
                    </Carousel>
                </div>
            </Page>
        );
    }
}
