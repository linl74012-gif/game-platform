"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase";
import Link from "next/link";

type Game = {
  id: string;
  title: string;
};

export default function MyGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("ログインしてください");
        return;
      }

      const { data, error } = await supabase
        .from("games")
        .select("id, title")
        .eq("user_id", user.id);

      if (!error && data) {
        setGames(data);
      }

      setLoading(false);
    };

    fetchGames();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("本当に削除しますか？");
    if (!ok) return;

    await supabase.from("games").delete().eq("id", id);
    setGames(games.filter((g) => g.id !== id));
  };

  if (loading) return <div className="p-6">読み込み中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">自分の投稿</h1>

      {games.length === 0 && <p>投稿はまだありません</p>}

      <ul className="space-y-3">
        {games.map((game) => (
          <li
            key={game.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{game.title}</span>
            <div className="flex gap-3">
  <Link
    href={`/my-games/${game.id}/edit`}
    className="text-blue-600 hover:underline"
  >
    編集
  </Link>

  <button
    onClick={() => handleDelete(game.id)}
    className="text-red-600 hover:underline"
  >
    削除
  </button>
</div>

          </li>
        ))}
      </ul>
    </div>
  );
}
