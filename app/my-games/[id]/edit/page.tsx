"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/app/lib/supabase";

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("取得できません");
        return;
      }

      setTitle(data.title);
      setDescription(data.description);
      setUrl(data.url);
      setThumbnail(data.thumbnail);
      setLoading(false);
    };

    fetchGame();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("games")
      .update({
        title,
        description,
        url,
        thumbnail,
      })
      .eq("id", id);

    if (error) {
      alert("更新失敗");
    } else {
      alert("更新しました");
      router.push("/my-games");
    }
  };

  if (loading) return <div className="p-6">読み込み中...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ゲーム編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="タイトル"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="説明"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="ゲームURL"
        />

        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="サムネURL"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          更新する
        </button>
      </form>
    </div>
  );
}
