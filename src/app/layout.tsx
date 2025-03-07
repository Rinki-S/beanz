import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BioRhyme } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bioRhyme = BioRhyme({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-biorhyme",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "咖啡豆标签生成器 | Beanz",
  description: "为咖啡爱好者设计的咖啡豆标签生成工具，方便分装和分享",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bioRhyme.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
