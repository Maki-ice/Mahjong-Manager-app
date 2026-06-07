import { INITIAL_SCORE } from "./constants";
import { Game, Wind } from "./types";

export const getCurrentScores = (game: Game): number[] => {
  return game.rounds.reduce(
    (scores, round) => {
      const nextScores = [...scores];

      if (round.result) {
        for (let i = 0; i < game.players.length; i++) {
          nextScores[i] += round.result.scoreDelta[i];
        }
      }

      return nextScores;
    },
    [INITIAL_SCORE, INITIAL_SCORE, INITIAL_SCORE, INITIAL_SCORE],
  );
};

export const getCurrentRoundInfo = (
  game: Game,
): { wind: Wind; roundNumber: number; honba: number; riichiSticks: number } => {
  if (game.rounds.length === 0) {
    return {
      wind: "east",
      roundNumber: 1,
      honba: 0,
      riichiSticks: 0,
    };
  }

  const lastRound = game.rounds[game.rounds.length - 1];
  let nextWind = lastRound.wind;
  let nextRoundNumber = lastRound.roundNumber;
  let nextHonba = lastRound.honba;
  let nextRiichiSticks = lastRound.riichiSticks;
  const lastDealerIndex = (lastRound.roundNumber - 1) % 4;

  if (lastRound.result.resultType === "agari") {
    nextRiichiSticks = 0;

    if (lastRound.result.winner === lastDealerIndex) {
      nextHonba++;
    } else {
      nextRoundNumber++;
      nextHonba = 0;
    }
  } else if (lastRound.result.tenpaiPlayers.includes(lastDealerIndex)) {
    nextHonba++;
  } else {
    nextRoundNumber++;
    nextHonba++;
  }

  if (nextRoundNumber > 4) {
    nextRoundNumber = 1;
    if (nextWind === "east") {
      nextWind = "south";
    } else if (nextWind === "south") {
      nextWind = "west";
    } else if (nextWind === "west") {
      nextWind = "north";
    } else {
      nextWind = "east";
    }
  }

  return {
    wind: nextWind,
    roundNumber: nextRoundNumber,
    honba: nextHonba,
    riichiSticks: nextRiichiSticks,
  };
};

export const createGame = (playerNames: string[]): Game => {
  return {
    id: crypto.randomUUID(),
    players: [
      { name: playerNames[0], score: INITIAL_SCORE },
      { name: playerNames[1], score: INITIAL_SCORE },
      { name: playerNames[2], score: INITIAL_SCORE },
      { name: playerNames[3], score: INITIAL_SCORE },
    ],
    rounds: [],
    status: "playing",
    createdAt: new Date().toISOString(),
  };
};
