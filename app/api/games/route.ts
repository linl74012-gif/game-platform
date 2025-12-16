import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// games.json のパスを取得
const filePath = path.join(process.cwd(), "data", "games.json");

// POST: ゲームを追加する
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, thumbnail, url } = body;

    // 既存データを読み込み
    const file = fs.readFileSync(filePath, "utf-8");
    const games = JSON.parse(file);

    // 新しいゲームデータ
    const newGame = {
      id: Date.now(), // 簡易ID
      title,
      description,
      thumbnail,
      url,
    };

    // 追加
    games.push(newGame);

    // 書き戻し
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
