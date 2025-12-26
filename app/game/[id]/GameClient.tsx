"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Game = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

export default function GameClient({ game }: { game: Game }) {
  const [isFull, setIsFull] = useState(false);
  const router = useRouter();

  return (
    <main
  className={`${
    isFull
      ? "fixed inset-0 bg-black z-50 p-4"
      : "max-w-5xl mx-auto p-6"
  }`}
>
      <div className="flex justify-between items-center mb-4">
        {!isFull && (
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline"
          >
            ← 一覧に戻る
          </button>
        )}

        <h1
  className={`text-2xl font-bold ${
    isFull ? "text-white" : "text-gray-900"
  }`}
>
  {game.title}
</h1>

        <button
          onClick={() => setIsFull(!isFull)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isFull ? "戻る" : "フルスクリーン"}
        </button>
      </div>

      <iframe
        src={game.url}
        className={`w-full ${
  isFull ? "h-[100vh]" : "h-[600px]"
} rounded-lg border`}
        allow="fullscreen"
      />

      {!isFull && (
  <div className="mt-6 bg-white rounded-xl p-5 shadow">
    <p className="text-gray-700 leading-relaxed">
      {game.description}
    </p>
  </div>
)}
    </main>
  );
}
