"use client";

import { useState } from "react";
import Link from "next/link";

export default function Game() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">ゲーム画面</h1>

        <p className="text-xl mb-4">スコア：{count}</p>

        <button
          className="px-6 py-3 bg-green-500 rounded mr-4"
          onClick={() => setCount(count + 1)}
        >
          クリック！
        </button>

        <Link href={`/result?score=${count}`}>
          <button className="px-6 py-3 bg-blue-500 rounded">
            結果へ
          </button>
        </Link>
      </div>
    </main>
  );
}
