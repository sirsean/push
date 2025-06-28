import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  store,
  selectGame,
  selectGameScores,
  selectScore,
  setScore,
} from "../database";
import { Page } from "./layout";

const HANDS = [
  "2x SET_3",
  "SET_3+RUN_4",
  "2x RUN_4",
  "3x SET_3",
  "RUN_7",
  "SET_8",
];

interface HandPlayerRowProps {
  handIndex: number;
  gameIndex: number;
  player: string;
  onScoreChange?: () => void;
}

function HandPlayerRow({
  handIndex,
  gameIndex,
  player,
  onScoreChange,
}: HandPlayerRowProps): JSX.Element {
  const score = useSelector(selectScore({ handIndex, gameIndex, player }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      // Clear the score when field is empty
      store.dispatch(
        setScore({ gameIndex, handIndex, player, score: undefined }),
      );
    } else {
      const scoreValue = parseInt(value) || 0;
      store.dispatch(
        setScore({ gameIndex, handIndex, player, score: scoreValue }),
      );
    }
    // Trigger parent re-render to update completion indicators
    onScoreChange?.();
  };
  return (
    <div className="flex items-center justify-between p-4 bg-cyber-gray-light border border-cyber-purple rounded-lg hover:border-cyber-cyan transition-all">
      <span className="font-medium text-cyber-cyan font-mono">&gt; {player}</span>
      <input
        type="number"
        onChange={onChange}
        value={score !== undefined && score !== null ? score.toString() : ""}
        className="w-20 px-3 py-2 text-center bg-cyber-darker border border-cyber-pink rounded-md text-cyber-green font-mono focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan outline-none transition-all"
      />
    </div>
  );
}

interface HandPanelProps {
  hand: string;
  handIndex: number;
  gameIndex: number;
  players: string[];
  onScoreChange?: () => void;
}

function HandPanel({
  hand,
  handIndex,
  gameIndex,
  players,
  onScoreChange,
}: HandPanelProps): JSX.Element {
  return (
    <div className="bg-cyber-gray border border-cyber-pink rounded-lg shadow-cyber p-6">
      <h2 className="text-2xl font-bold text-cyber-pink mb-6 text-center border-b border-cyber-cyan pb-4 font-mono">
        &gt; {hand}
      </h2>
      <div className="space-y-3">
        {players.map((p) => (
          <HandPlayerRow
            key={p}
            handIndex={handIndex}
            gameIndex={gameIndex}
            player={p}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </div>
  );
}

interface HandTabsProps {
  hands: string[];
  activeHandIndex: number;
  onHandChange: (index: number) => void;
  completedHands: boolean[];
}

function HandTabs({
  hands,
  activeHandIndex,
  onHandChange,
  completedHands,
}: HandTabsProps): JSX.Element {
  return (
    <div className="bg-cyber-gray border border-cyber-cyan rounded-lg shadow-cyber mb-6">
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {hands.map((hand, index) => (
            <button
              key={index}
              onClick={() => onHandChange(index)}
              className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 font-mono ${
                activeHandIndex === index
                  ? "text-cyber-pink border-cyber-pink bg-cyber-darker shadow-neon-pink"
                  : "text-cyber-cyan border-transparent hover:text-cyber-green hover:border-cyber-green"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>&gt; {hand}</span>
                {completedHands[index] && (
                  <svg
                    className="w-4 h-4 text-cyber-green animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    title="All scores entered"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation arrows for mobile */}
      <div className="flex justify-between items-center p-4 border-t border-cyber-pink bg-cyber-darker rounded-b-lg">
        <button
          onClick={() => onHandChange(Math.max(0, activeHandIndex - 1))}
          disabled={activeHandIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-cyber-cyan disabled:text-cyber-gray disabled:cursor-not-allowed hover:text-cyber-green hover:shadow-cyber transition-all font-mono"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>PREV</span>
        </button>

        <span className="text-sm text-cyber-yellow font-mono">
          [{activeHandIndex + 1}/{hands.length}]
        </span>

        <button
          onClick={() =>
            onHandChange(Math.min(hands.length - 1, activeHandIndex + 1))
          }
          disabled={activeHandIndex === hands.length - 1}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-cyber-cyan disabled:text-cyber-gray disabled:cursor-not-allowed hover:text-cyber-green hover:shadow-cyber transition-all font-mono"
        >
          <span>NEXT</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface TotalScorePanelProps {
  gameIndex: number;
}

function TotalScorePanel({ gameIndex }: TotalScorePanelProps): JSX.Element {
  const scores = useSelector(selectGameScores(gameIndex));
  return (
    <div className="bg-cyber-gray border border-cyber-cyan rounded-lg shadow-cyber p-4 mb-8">
      <h2 className="text-xl font-bold text-cyber-cyan mb-4 text-center font-mono">
        &gt; CURRENT_SCORES
      </h2>
      <div className="space-y-2">
        {scores.map(({ player, score }, index) => (
          <div
            key={player}
            className={`flex items-center justify-between py-2 px-3 rounded-lg border ${
              index === 0
                ? "bg-cyber-darker border-cyber-pink shadow-neon-pink"
                : "bg-cyber-gray-light border-cyber-pink"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`font-bold text-base font-mono ${
                  index === 0 ? "text-cyber-pink" : "text-cyber-cyan"
                }`}
              >
                &gt; {player}
              </div>
              {index === 0 && (
                <span className="text-cyber-yellow text-base leading-none animate-pulse" title="Leading">
                  👑
                </span>
              )}
            </div>
            <div
              className={`text-xl font-bold font-mono ${
                index === 0 ? "text-cyber-pink" : "text-cyber-green"
              }`}
            >
              {score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Game(): JSX.Element {
  const { index } = useParams<{ index: string }>();
  const gameIndex = parseInt(index || "0");
  const game = useSelector(selectGame(gameIndex));
  const [activeHandIndex, setActiveHandIndex] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Function to trigger completion status recalculation
  const handleScoreChange = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  // Calculate completion status by checking the store directly
  const completedHands = useMemo(() => {
    if (!game) return HANDS.map(() => false);

    const state = store.getState();
    return HANDS.map((_, handIndex) => {
      return game.players.every((player) => {
        const score = selectScore({ handIndex, gameIndex, player })(state);
        return score !== undefined && score !== null;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, gameIndex, updateTrigger]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveHandIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveHandIndex((prev) => Math.min(HANDS.length - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!game) {
    return (
      <Page>
        <div className="text-center py-12">
          <div className="text-cyber-cyan text-lg font-mono">&gt; GAME_NOT_FOUND</div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="max-w-4xl mx-auto">
        <TotalScorePanel gameIndex={gameIndex} />

        <div>
          <HandTabs
            hands={HANDS}
            activeHandIndex={activeHandIndex}
            onHandChange={setActiveHandIndex}
            completedHands={completedHands}
          />

          <HandPanel
            hand={HANDS[activeHandIndex]}
            handIndex={activeHandIndex}
            gameIndex={gameIndex}
            players={game.players}
            onScoreChange={handleScoreChange}
          />
        </div>
      </div>
    </Page>
  );
}
