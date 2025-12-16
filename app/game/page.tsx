"use client";

import { useState } from "react";

export default function GamePage() {
  const [score, setScore] = useState(0);

  return (
    <main style={{ padding: 24 }}>
      <h1>クリックゲーム</h1>
      <p>スコア: {score}</p>

      <button
        onClick={() => setScore(score + 1)}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        クリック！
      </button>
    </main>
  );
}
