import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndiePlay",
  description: "A platform to play and share indie games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
  <header className="border-b bg-white">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
      <h1 className="text-2xl font-bold tracking-tight">
        Indieplay
      </h1>
    </div>
  </header>

  <main className="max-w-6xl mx-auto">
    {children}
  </main>
</body>
    </html>
  );
}
