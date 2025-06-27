import React from 'react';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
    return (
        <header className="bg-cyber-darker border-b border-cyber-pink shadow-cyber">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center space-x-4">
                    <img 
                        src="/android-chrome-192x192.png" 
                        alt="Push Logo" 
                        className="w-12 h-12"
                    />
                    <h1 className="text-3xl font-bold font-mono text-cyber-pink">
                        <Link to="/" className="hover:text-cyber-cyan transition-colors animate-glow">
                            PUSH
                        </Link>
                    </h1>
                </div>
            </div>
        </header>
    );
}

interface PageProps {
    children: React.ReactNode;
}

export function Page({ children }: PageProps): JSX.Element {
    return (
        <div className="min-h-screen bg-cyber-dark font-mono">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
