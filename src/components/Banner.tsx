import Image from "next/image";
import Link from "next/link";
import TodayDate from "@/components/TodayDate";

export default function Banner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2 md:gap-8 lg:p-10">
        <div className="order-2 flex flex-col items-start md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-800 sm:text-sm">
            <span
              className="h-2 w-2 rounded-full bg-green-600"
              aria-hidden="true"
            />
            আজকের বাজারদর
            <span className="text-green-700">•</span>
            <TodayDate />
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-snug tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম
            <span className="mt-1 block text-green-700">
              এক নজরে
            </span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
            নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন সহজেই। বাজারে যাওয়ার আগে
            দেখে নিন পণ্যের দাম, আর কেনাকাটা করুন আরও সচেতনভাবে।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="order-1 flex min-h-[180px] items-center justify-center md:order-2 md:min-h-[280px]">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
            width={560}
            height={400}
            priority
            className="h-auto max-h-[240px] w-full max-w-[420px] object-contain sm:max-h-[300px] md:max-h-[340px]"
          />
        </div>
      </div>
    </section>
  );
}