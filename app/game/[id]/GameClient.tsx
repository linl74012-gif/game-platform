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
    <main className={`p-6 ${isFull ? "fixed inset-0 bg-black z-50" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        {!isFull && (
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline"
          >
            ← 一覧に戻る
          </button>
        )}

        <h1 className="text-2xl font-bold text-white">{game.title}</h1>

        <button
          onClick={() => setIsFull(!isFull)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isFull ? "戻る" : "フルスクリーン"}
        </button>
      </div>

      <iframe
        src={game.url}
        className={`w-full ${isFull ? "h-[100vh]" : "h-[600px]"} border`}
        allow="fullscreen"
      />

      {!isFull && (
        <p className="mt-4 text-gray-700">{game.description}</p>
      )}
    </main>
  );
}
