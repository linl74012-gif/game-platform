"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { games, Game } from "./lib/games";
import Link from "next/link"
import LoginButton from "./components/LoginButton";

export default function HomePage() {
  return (
    <div className="p-6">
      <LoginButton />
  <h1 className="text-2xl font-bold mb-6">Latest Games</h1>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {games.map((game) => (
  <Link
    key={game.id}
    href={`/game/${game.id}`}
    className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <img
      src={game.thumbnail}
      alt={game.title}
      className="w-full h-48 object-cover"
    />

    <div className="p-4">
      <h2 className="font-semibold text-lg mb-1">
        {game.title}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {game.description}
      </p>
    </div>
  </Link>
))}
  </div>
</div>
  );
}
