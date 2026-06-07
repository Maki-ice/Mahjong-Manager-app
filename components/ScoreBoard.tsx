import { Game } from "@/lib/types";

const WIND_LABELS = ["東", "南", "西", "北"] as const;

export const ScoreBoard = ({ game }: { game: Game }) => {
  const [east, south, west, north] = game.players;

  return (
    <div className="mx-auto my-8 w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-col items-center gap-8">
        <PlayerScore name={north.name} score={north.score} wind={WIND_LABELS[3]} />

        <div className="flex w-full justify-between px-8">
          <PlayerScore name={west.name} score={west.score} wind={WIND_LABELS[2]} />

          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">東1局</p>
          </div>

          <PlayerScore name={east.name} score={east.score} wind={WIND_LABELS[0]} />
        </div>

        <PlayerScore name={south.name} score={south.score} wind={WIND_LABELS[1]} />
      </div>
    </div>
  );
};

const PlayerScore = ({ name, score, wind }: { name: string; score: number; wind: string }) => {
  return (
    <div className="flex w-28 flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3 shadow">
      <p className="mb-1 text-sm font-bold text-amber-600">{wind}</p>
      <p className="mb-2 flex w-full justify-center truncate text-lg font-bold text-slate-600">{name}</p>
      <p className="text-2xl font-bold tracking-wider text-slate-800">{score.toLocaleString()}</p>
    </div>
  );
};
