import { createSlice, configureStore, PayloadAction, createSelector } from '@reduxjs/toolkit';
import sortBy from 'sort-by';

export interface Player {
  name: string;
}

export interface Hand {
  [playerName: string]: number;
}

export interface Game {
  started: number;
  players: string[];
  hands: Hand[];
}

export interface AppState {
  players: string[];
  games: Game[];
}

export interface SetScorePayload {
  gameIndex: number;
  handIndex: number;
  player: string;
  score: number;
}

export interface StartGamePayload {
  players: string[];
}

const rawPersisted = localStorage.getItem('push');
const persisted: AppState = rawPersisted ? JSON.parse(rawPersisted) : { players: [], games: [] };

const slice = createSlice({
    name: 'push',
    initialState: {
        players: persisted.players,
        games: persisted.games,
    } as AppState,
    reducers: {
        addPlayer: (state, action: PayloadAction<string>) => {
            const s = new Set(state.players);
            s.add(action.payload);
            state.players = [...s].sort();
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            state.players = state.players.filter(p => p !== action.payload);
        },
        startGame: (state, action: PayloadAction<StartGamePayload>) => {
            const game: Game = {
                started: (new Date()).getTime(),
                players: action.payload.players,
                hands: [],
            };
            state.games.push(game);
        },
        setScore: (state, action: PayloadAction<SetScorePayload>) => {
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

// Simple selectors that return primitives or stable references
export const selectPlayers = (state: AppState) => state.players;
export const selectNumGames = (state: AppState) => state.games.length;

// Parameterized selector for single game
export const selectGame = (index: number) => (state: AppState) => state.games[index];
// Create a memoized selector factory for game scores
const makeSelectGameScores = () => createSelector(
    (state: AppState, index: number) => state.games[index],
    (game) => {
        if (!game) {
            return [];
        }
        return game.players.map(player => {
            const score = game.hands.map(hand => (hand[player] || 0)).reduce((sum, item) => sum + item, 0);
            return { player, score };
        }).sort(sortBy('score', 'player'));
    }
);

// Cache of selector instances
const gameScoresSelectors: { [key: number]: ReturnType<typeof makeSelectGameScores> } = {};

// Parameterized selector that returns memoized results
export const selectGameScores = (index: number) => {
    if (!gameScoresSelectors[index]) {
        gameScoresSelectors[index] = makeSelectGameScores();
    }
    return (state: AppState) => gameScoresSelectors[index](state, index);
};
// Simple selector for individual score (no memoization needed for primitive values)
export const selectScore = ({ gameIndex, handIndex, player }: { gameIndex: number; handIndex: number; player: string }) => (state: AppState) => {
    return state.games[gameIndex]?.hands[handIndex]?.[player];
};
// Memoized selector for games list
export const selectGames = createSelector(
    (state: AppState) => state.games,
    (games) => {
        return games.map((game, index) => ({
            index,
            date: (new Date(game.started)).toISOString().split('T')[0],
        })).reverse();
    }
);
