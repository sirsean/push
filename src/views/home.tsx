import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from './layout';

export default function Home(): JSX.Element {
    return (
        <Page>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-cyber-cyan mb-8 text-center font-mono animate-glow">
                    &gt; PUSH SCORE TRACKER
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <Link 
                        to="/players" 
                        className="bg-cyber-gray border border-cyber-pink rounded-lg shadow-cyber hover:shadow-neon-pink transition-all p-6 text-center group"
                    >
                        <div className="text-cyber-pink group-hover:text-cyber-cyan transition-colors">
                            <h3 className="text-xl font-semibold mb-2 font-mono">[PLAYERS]</h3>
                            <p className="text-cyber-cyan opacity-70">Manage your roster</p>
                        </div>
                    </Link>
                    
                    <Link 
                        to="/games" 
                        className="bg-cyber-gray border border-cyber-green rounded-lg shadow-cyber hover:shadow-neon-green transition-all p-6 text-center group"
                    >
                        <div className="text-cyber-green group-hover:text-cyber-cyan transition-colors">
                            <h3 className="text-xl font-semibold mb-2 font-mono">[HISTORY]</h3>
                            <p className="text-cyber-cyan opacity-70">View past games</p>
                        </div>
                    </Link>
                </div>
                
                <div className="mt-8 text-center">
                    <Link 
                        to="/newgame" 
                        className="inline-block bg-cyber-darker border-2 border-cyber-pink text-cyber-pink font-bold py-4 px-8 rounded-lg text-xl transition-all shadow-neon-pink hover:shadow-neon-cyan hover:text-cyber-cyan hover:border-cyber-cyan font-mono"
                    >
                        &gt;&gt; NEW_GAME
                    </Link>
                </div>
            </div>
        </Page>
    );
}
