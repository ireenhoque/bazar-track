"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    if (!date) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-5 sm:grid-cols-[1fr_auto] sm:px-6 sm:py-6 md:px-8">

                {/* Content */}
                <div className="min-w-0">
                    {/* Date */}
                    <div className="mb-2 inline-block max-w-[140px] truncate rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-medium text-green-700 sm:max-w-none sm:text-xs">
                        {date.toLocaleDateString("bn-BD", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>

                    {/* Heading */}
                    <h1 className="mb-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description */}
                    <p className="mb-4 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                        গড় সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Button */}
                    <button className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md transition duration-200 hover:bg-green-800 hover:shadow-[0_3px_6px_rgba(21,128,61,0.65)] sm:px-4 sm:py-2 sm:text-[13px]">
                        সব পণ্য দেখুন
                    </button>
                </div>

                {/* Illustration */}
                <div className="hidden shrink-0 sm:block">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={180}
                        height={180}
                        className="h-36 w-36 object-contain md:h-44 md:w-44"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;