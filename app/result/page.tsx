import Link from "next/link";

type Props = {
  searchParams: {
    score?: string;
  };
};

export default function Result({ searchParams }: Props) {
  const score = searchParams.score ?? "0";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">結果</h1>
        <p className="text-xl mb-6">あなたのスコア：{score}</p>

        <Link href="/">
          <button className="px-6 py-3 bg-blue-500 rounded">
            もう一度
          </button>
        </Link>
      </div>
    </main>
  );
}
