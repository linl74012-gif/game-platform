"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 初回セッション取得
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // ログイン状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Googleでログイン
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        こんにちは、{user.email}
      </span>
      <button
        onClick={signOut}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        ログアウト
      </button>
    </div>
  );
}
