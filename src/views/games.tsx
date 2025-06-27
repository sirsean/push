import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    selectGames,
} from '../database';
import { Page } from './layout';

interface GameRowProps {
    index: number;
    date: string;
}

function GameRow({ index, date }: GameRowProps): JSX.Element {
    const href = `/game/${index}`;
    return (
        <Link 
            to={href}
            className="block bg-cyber-gray border border-cyber-pink rounded-lg shadow-cyber hover:shadow-neon-pink transition-all p-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-cyber-pink font-mono">&gt; GAME_{index + 1}</h3>
                    <p className="text-cyber-cyan font-mono">{date}</p>
                </div>
                <div className="text-cyber-cyan">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function Games(): JSX.Element {
    const games = useSelector(selectGames);
    return (
        <Page>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-cyber-pink font-mono animate-glow">&gt; GAMES</h1>
                    <Link 
                        to="/newgame"
                        className="bg-cyber-darker border-2 border-cyber-cyan text-cyber-cyan px-4 py-2 rounded-lg font-medium transition-all hover:shadow-neon-cyan hover:text-cyber-pink hover:border-cyber-pink font-mono"
                    >
                        [NEW_GAME]
                    </Link>
                </div>

                {games.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-cyber-green mb-6 font-mono">
                            &gt; {games.length} game{games.length !== 1 ? 's' : ''} played
                        </p>
                        {games.map(({ index, date }) => <GameRow key={index} index={index} date={date} />)}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-cyber-cyan text-lg mb-4 font-mono opacity-70">
                            &gt; NO_GAMES_FOUND<br/>
                            &gt; INITIALIZE_FIRST_GAME
                        </div>
                        <Link 
                            to="/newgame"
                            className="inline-block bg-cyber-darker border-2 border-cyber-pink text-cyber-pink px-6 py-3 rounded-lg font-medium transition-all shadow-neon-pink hover:shadow-neon-cyan hover:text-cyber-cyan hover:border-cyber-cyan font-mono"
                        >
                            &gt;&gt; START_GAME
                        </Link>
                    </div>
                )}
            </div>
        </Page>
    );
}
