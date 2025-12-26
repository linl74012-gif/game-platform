"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/app/lib/supabase";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ログインユーザー取得
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください");
      setLoading(false);
      return;
    }

    // games テーブルへ保存
    const { error } = await supabase.from("games").insert({
      title,
      description,
      thumbnail,
      url,
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("投稿しました！");
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ゲーム投稿</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />

        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          placeholder="サムネイルURL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="ゲームURL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2"
        >
          {loading ? "送信中..." : "投稿する"}
        </button>
      </form>
    </div>
  );
}
