import React from 'react';
import { useSelector } from 'react-redux';
import {
    store,
    selectPlayers,
    addPlayer,
    removePlayer,
} from '../database';
import { Page } from './layout';

interface PlayerRowProps {
    player: string;
}

function PlayerRow({ player }: PlayerRowProps): JSX.Element {
    const remove = (e: React.MouseEvent) => {
        e.preventDefault();
        store.dispatch(removePlayer(player));
    }
    return (
        <div className="flex items-center justify-between bg-cyber-gray border border-cyber-pink rounded-lg shadow-cyber p-4 hover:shadow-neon-pink transition-all">
            <span className="text-lg font-medium text-cyber-cyan font-mono">&gt; {player}</span>
            <button 
                onClick={remove}
                className="bg-cyber-darker border border-cyber-pink text-cyber-pink px-4 py-2 rounded-md transition-all font-medium font-mono hover:shadow-neon-pink hover:text-cyber-cyan hover:border-cyber-cyan"
            >
                [DELETE]
            </button>
        </div>
    );
}

export function AddPlayerForm(): JSX.Element {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const playerInput = form.player as HTMLInputElement;
        if (playerInput.value.trim()) {
            store.dispatch(addPlayer(playerInput.value.trim()));
            playerInput.value = '';
        }
    }
    return (
        <div className="bg-cyber-gray border border-cyber-cyan rounded-lg shadow-cyber p-6">
            <h3 className="text-xl font-semibold text-cyber-cyan mb-4 font-mono">&gt; ADD_NEW_PLAYER</h3>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                    type="text" 
                    name="player" 
                    placeholder="enter_player_name..."
                    className="flex-1 px-4 py-3 bg-cyber-darker border border-cyber-pink text-cyber-cyan rounded-lg focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan outline-none font-mono placeholder-cyber-pink"
                    tabIndex={1}
                    required
                />
                <button 
                    type="submit"
                    className="bg-cyber-darker border-2 border-cyber-cyan text-cyber-cyan px-6 py-3 rounded-lg font-medium transition-all hover:shadow-neon-cyan hover:text-cyber-pink hover:border-cyber-pink font-mono"
                >
                    [ADD]
                </button>
            </form>
        </div>
    );
}

export default function Players(): JSX.Element {
    const players = useSelector(selectPlayers);
    return (
        <Page>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-cyber-pink mb-8 font-mono animate-glow">&gt; PLAYER_ROSTER</h1>
                
                <div className="mb-8">
                    <AddPlayerForm />
                </div>
                
                {players.length > 0 ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-cyber-green mb-4 font-mono">
                            &gt; ACTIVE_PLAYERS ({players.length})
                        </h2>
                        <div className="space-y-3">
                            {players.map(p => <PlayerRow key={p} player={p} />)}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-cyber-cyan text-lg font-mono opacity-70">
                            &gt; NO_PLAYERS_FOUND<br/>
                            &gt; ADD_FIRST_PLAYER_ABOVE
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
}
