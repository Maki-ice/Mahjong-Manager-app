import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-slate-800">
      <h1 className="mb-4 text-center text-4xl font-bold">麻雀点数管理アプリ</h1>
      <p className="mb-8 max-w-xl text-center text-slate-600">
        4人麻雀の対局作成、点数表示、和了点計算を扱うポートフォリオ用Webアプリです。
      </p>
      <Link
        href="/game/new"
        className="rounded-full bg-slate-800 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
      >
        新規ゲームを始める
      </Link>
    </main>
  );
}
