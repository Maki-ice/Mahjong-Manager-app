"use client";

import { use, useState } from "react";
import { loadGame } from "@/lib/localStorage";
import { ScoreBoard } from "@/components/ScoreBoard";
import { ScoreInputDialog } from "@/components/ScoreInputDialog";

export default function MainGamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const game = loadGame(resolvedParams.id);
  const [isOpen, setIsOpen] = useState(false);

  if (!game) {
    return (
      <main className="min-h-screen bg-white p-8 text-slate-800">
        対局が見つかりませんでした。
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 text-slate-800">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold">対局画面</h1>

        <ScoreBoard game={game} />

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500"
          onClick={() => setIsOpen(true)}
        >
          結果を入力
        </button>

        <ScoreInputDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          players={game.players}
        />
      </div>
    </main>
  );
}
