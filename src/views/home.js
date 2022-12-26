import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="Home">
            <h1>Push</h1>
            <p><Link to="/players">Players</Link></p>
            <p><Link to="/games">Games</Link></p>
            <p><Link className="newgame" to="/newgame">New Game</Link></p>
        </div>
    );
}
