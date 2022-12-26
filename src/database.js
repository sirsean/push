import { createSlice, configureStore } from '@reduxjs/toolkit';

const rawPersisted = localStorage.getItem('push');
const persisted = rawPersisted ? JSON.parse(rawPersisted) : { players: [], games: [] };

const slice = createSlice({
    name: 'push',
    initialState: {
        players: persisted.players,
        games: persisted.games,
    },
    reducers: {
        addPlayer: (state, action) => {
            const s = new Set(state.players);
            s.add(action.payload);
            state.players = [...s].sort();
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(p => p !== action.payload);
        },
        startGame: (state, action) => {
            const game = {
                started: (new Date()).getTime(),
                players: action.payload.players,
                hands: [],
            };
            state.games.push(game);
        },
        setScore: (state, action) => {
            const { gameIndex, handIndex, player, score } = action.payload;
            state.games[gameIndex].hands[handIndex] ||= {};
            state.games[gameIndex].hands[handIndex][player] = score;
        },
    },
});

export const addPlayer = slice.actions.addPlayer;
export const removePlayer = slice.actions.removePlayer;
export const startGame = slice.actions.startGame;
export const setScore = slice.actions.setScore;

export const store = configureStore({
    reducer: slice.reducer,
});

store.subscribe(() => {
    const state = store.getState();
    const players = state.players.slice();
    const games = state.games.slice();
    localStorage.setItem('push', JSON.stringify({ players, games }));
});

export const selectPlayers = state => state.players;
export const selectNumGames = state => state.games.length;
export const selectGame = index => state => state.games[index];
export const selectGameScores = index => state => {
    const game = state.games[index];
    return game.players.map(player => {
        const score = game.hands.map(hand => (hand[player] || 0)).reduce((sum, item) => sum + item, 0);
        return { player, score };
    });
};
export const selectScore = ({ gameIndex, handIndex, player }) => state => {
    return (state.games[gameIndex].hands[handIndex] || {})[player];
};
export const selectGames = state => {
    return state.games.map((game, index) => {
        return {
            index,
            date: (new Date(game.started)).toLocaleDateString('en-US'),
        };
    }).reverse();
};
