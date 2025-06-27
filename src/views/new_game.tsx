import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    store,
    selectPlayers,
    selectNumGames,
    startGame,
} from '../database';
import { Page } from './layout';
import { AddPlayerForm } from './players';

interface PlayerSelectionProps {
    player: string;
}

function PlayerSelection({ player }: PlayerSelectionProps): JSX.Element {
    return (
        <label 
            htmlFor={player}
            className="flex items-center space-x-3 p-4 bg-cyber-gray border border-cyber-pink rounded-lg hover:border-cyber-cyan cursor-pointer transition-all hover:shadow-cyber font-mono"
        >
            <input 
                type="checkbox" 
                name="players" 
                value={player} 
                id={player}
                className="w-5 h-5 text-cyber-pink rounded focus:ring-cyber-cyan focus:ring-2 bg-cyber-darker border-cyber-pink"
            />
            <span className="text-lg font-medium text-cyber-cyan">&gt; {player}</span>
        </label>
    );
}

export default function NewGame(): JSX.Element {
    const navigate = useNavigate();
    const numGames = useSelector(selectNumGames);
    const players = useSelector(selectPlayers);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const checkboxes = Array.from(form.players as NodeListOf<HTMLInputElement>);
        const selectedPlayers = checkboxes.filter(elem => elem.checked).map(elem => elem.value);
        
        if (selectedPlayers.length < 2) {
            alert('Please select at least 2 players to start a game.');
            return;
        }
        
        store.dispatch(startGame({ players: selectedPlayers }));
        const href = `/game/${numGames}`;
        navigate(href);
    }
    
    return (
        <Page>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-cyber-pink mb-8 font-mono animate-glow">&gt; INITIALIZE_NEW_GAME</h1>
                
                <div className="mb-8">
                    <AddPlayerForm />
                </div>
                
                {players.length > 0 ? (
                    <div className="bg-cyber-gray border border-cyber-cyan rounded-lg shadow-cyber p-6">
                        <h2 className="text-2xl font-semibold text-cyber-cyan mb-6 font-mono">
                            &gt; SELECT_PLAYERS
                        </h2>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid gap-3 md:grid-cols-2">
                                {players.map(p => <PlayerSelection key={p} player={p} />)}
                            </div>
                            
                            <div className="pt-4 border-t border-cyber-pink">
                                <button 
                                    type="submit"
                                    className="w-full bg-cyber-darker border-2 border-cyber-green text-cyber-green font-bold py-4 px-8 rounded-lg text-xl transition-all hover:shadow-neon-green hover:text-cyber-pink hover:border-cyber-pink font-mono"
                                >
                                    &gt;&gt; EXECUTE_GAME_START
                                </button>
                                <p className="text-sm text-cyber-cyan mt-2 text-center font-mono opacity-70">
                                    &gt; minimum_players: 2
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-cyber-cyan text-lg font-mono opacity-70">
                            &gt; NO_PLAYERS_DETECTED<br/>
                            &gt; ADD_PLAYERS_TO_INITIALIZE
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
}
