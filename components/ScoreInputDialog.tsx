import { Player } from "@/lib/types";
import { useState } from "react";

type ResultType = "ron" | "tsumo" | "ryukyoku";

export const ScoreInputDialog = ({
  isOpen,
  onClose,
  players,
}: {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [resultType, setResultType] = useState<ResultType>("ron");
  const [han, setHan] = useState<number>(1);
  const [fu, setFu] = useState<number>(30);
  const [loser, setLoser] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 text-slate-800">
      <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h2 className="text-xl font-bold">点数入力</h2>

        <div className="mt-5 flex gap-2">
          {(["ron", "tsumo", "ryukyoku"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setResultType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                resultType === type ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {type === "ron" ? "ロン" : type === "tsumo" ? "ツモ" : "流局"}
            </button>
          ))}
        </div>

        {resultType !== "ryukyoku" && (
          <div className="mt-5 grid gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              和了者
              <select
                className="rounded-lg border border-slate-200 bg-white p-3"
                value={selectedPlayer}
                onChange={(event) => setSelectedPlayer(Number(event.target.value))}
              >
                {players.map((player, index) => (
                  <option key={index} value={index}>
                    {player.name}
                  </option>
                ))}
              </select>
            </label>

            {resultType === "ron" && (
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                放銃者
                <select
                  className="rounded-lg border border-slate-200 bg-white p-3"
                  value={loser}
                  onChange={(event) => setLoser(Number(event.target.value))}
                >
                  {players.map((player, index) => (
                    <option key={index} value={index} disabled={index === selectedPlayer}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                翻
                <input
                  className="rounded-lg border border-slate-200 bg-white p-3"
                  min={1}
                  type="number"
                  value={han}
                  onChange={(event) => setHan(Number(event.target.value))}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                符
                <input
                  className="rounded-lg border border-slate-200 bg-white p-3"
                  min={20}
                  step={10}
                  type="number"
                  value={fu}
                  onChange={(event) => setFu(Number(event.target.value))}
                />
              </label>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          MVPでは入力UIまで実装済みです。局結果の保存処理は今後追加予定です。
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-lg bg-slate-200 px-4 py-2 font-medium" onClick={onClose}>
            キャンセル
          </button>
          <button className="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
