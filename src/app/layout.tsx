import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/providers/ToastProvider";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body
        className={`${bengaliFont.className} flex min-h-screen flex-col bg-[#f0f5f0]`}
      >
        <ToastProvider />

        <Header />
        <Marquee />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}