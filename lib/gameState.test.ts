import { expect, test } from "vitest";
import { getCurrentRoundInfo, getCurrentScores } from "./gameState";
import { Game } from "./types";

const createTestGame = (): Game => ({
  id: "test-game",
  players: [
    { name: "Player1", score: 25000 },
    { name: "Player2", score: 25000 },
    { name: "Player3", score: 25000 },
    { name: "Player4", score: 25000 },
  ],
  rounds: [],
  status: "playing",
  createdAt: new Date().toISOString(),
});

test("getCurrentScoresは履歴がない場合25000点を返す", () => {
  const game = createTestGame();

  expect(getCurrentScores(game)).toEqual([25000, 25000, 25000, 25000]);
});

test("親の連荘と子の和了で局情報が正しく進む", () => {
  const game = createTestGame();

  expect(getCurrentRoundInfo(game)).toEqual({
    wind: "east",
    roundNumber: 1,
    honba: 0,
    riichiSticks: 0,
  });

  game.rounds.push({
    wind: "east",
    roundNumber: 1,
    honba: 0,
    riichiSticks: 0,
    result: {
      resultType: "agari",
      winner: 0,
      agariType: "ron",
      loser: 1,
      han: 1,
      fu: 30,
      scoreDelta: [1500, -1500, 0, 0],
    },
  });

  expect(getCurrentRoundInfo(game)).toEqual({
    wind: "east",
    roundNumber: 1,
    honba: 1,
    riichiSticks: 0,
  });
  expect(getCurrentScores(game)).toEqual([26500, 23500, 25000, 25000]);

  game.rounds.push({
    wind: "east",
    roundNumber: 1,
    honba: 1,
    riichiSticks: 0,
    result: {
      resultType: "agari",
      winner: 1,
      agariType: "tsumo",
      han: 1,
      fu: 30,
      scoreDelta: [-500, 1400, -300, -300],
    },
  });

  expect(getCurrentRoundInfo(game)).toEqual({
    wind: "east",
    roundNumber: 2,
    honba: 0,
    riichiSticks: 0,
  });
});
