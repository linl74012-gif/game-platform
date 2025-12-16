import Link from "next/link";
import games from "@/data/games.json";

export default function HomePage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        ゲームプラットフォーム
      </h1>

      <Link
        href="/upload"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ゲームを投稿する
      </Link>

      <h2 className="text-xl font-semibold mb-4">
        投稿されたゲーム
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className="block rounded-lg border bg-white overflow-hidden
                       hover:shadow-lg transition-shadow"
          >
            {/* サムネイル */}
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-40 object-cover"
            />

            {/* テキスト */}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">
                {game.title}
              </h3>
              <p className="text-sm text-gray-600">
                {game.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
