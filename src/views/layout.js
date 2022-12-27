import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="left">
                <h1><Link to="/">Push</Link></h1>
            </div>
        </header>
    );
}

export function Page({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}
