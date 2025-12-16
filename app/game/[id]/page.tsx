import fs from "fs";
import path from "path";
import GameClient from "./GameClient";

type Game = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), "data", "games.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const games: Game[] = JSON.parse(file);

  const gameId = Number(id);
  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return <div className="p-6">ゲームが見つかりません</div>;
  }

  // 👇 Client Component に渡す
  return <GameClient game={game} />;
}
