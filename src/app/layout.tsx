import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", 'bengali'],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f4f8f4]">
        <Header />

        <main className="flex-1">
          {children}
          <Banner />
        </main>

        <Footer/>
      </body>
    </html>
  );
}
