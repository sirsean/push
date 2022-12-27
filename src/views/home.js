import { Link } from 'react-router-dom';
import { Page } from './layout.js';

export default function Home() {
    return (
        <Page>
            <div className="Home">
                <p><Link to="/players">Player Roster</Link></p>
                <p><Link to="/games">Games History</Link></p>
                <p><Link className="newgame" to="/newgame">New Game</Link></p>
            </div>
        </Page>
    );
}
