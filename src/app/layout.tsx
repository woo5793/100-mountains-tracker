import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "100대 명산 트래커",
  description: "한국의 100대 명산 등산 기록 서비스",
};
 
const navItems = [
  { href: "/", label: "홈" },
  { href: "/mountains", label: "산 목록" },
  { href: "/recommend", label: "추천 산행" },
  { href: "/records", label: "내 기록" },
  { href: "/stats", label: "통계" },
];
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              100대 명산 트래커
            </Link>
 
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}