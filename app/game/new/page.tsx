"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@/lib/gameState";
import { saveGame } from "@/lib/localStorage";

const DEFAULT_PLAYERS = ["東家", "南家", "西家", "北家"];

export default function NewGamePage() {
  const [players, setPlayers] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleNameChange = (index: number, newName: string) => {
    const newPlayers = [...players];
    newPlayers[index] = newName;
    setPlayers(newPlayers);
  };

  const startGame = () => {
    const normalizedPlayers = players.map((name, index) => name.trim() || DEFAULT_PLAYERS[index]);
    const newGame = createGame(normalizedPlayers);

    saveGame(newGame);
    router.push(`/game/${newGame.id}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 p-8 text-slate-800">
      <h1 className="mb-8 text-3xl font-bold">対局設定</h1>

      <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        {players.map((player, index) => (
          <label key={index} className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            プレイヤー{index + 1}
            <input
              className="w-full border-b-2 border-slate-200 bg-slate-50 p-3 text-slate-800 transition-colors focus:border-slate-800 focus:outline-none"
              type="text"
              value={player}
              placeholder={DEFAULT_PLAYERS[index]}
              onChange={(event) => handleNameChange(index, event.target.value)}
            />
          </label>
        ))}
      </div>

      <button
        className="mt-4 w-full max-w-md rounded-xl bg-slate-800 py-3 font-medium text-white transition-colors hover:bg-slate-700"
        onClick={startGame}
      >
        対局開始
      </button>
    </main>
  );
}
