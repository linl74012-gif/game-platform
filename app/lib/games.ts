export type Game = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

export const games = [
  {
    id: "click",
    title: "クリックゲーム",
    description: "クリックしてスコアを増やすゲーム",
    thumbnail: "/games/click/click.png"
  },
  {
    id: "test",
    title: "テストゲーム",
    description: "新しく追加したゲーム",
    thumbnail: "/games/click/click.png"
  },
];
