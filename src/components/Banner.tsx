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
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div>
                <div className="inline-block max-w-[140px] truncate rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-medium text-green-700 sm:max-w-none sm:text-xs md:text-sm">
                    {date.toLocaleDateString("bn-BD", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <div>
                    <h1 className="font-bold text-4xl mb-2">আজকের বাজারের দাম এক নজরে</h1>

                    <p className="text-gray-500 mb-2">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড় সর্বনিম্ন- <br /> সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                </div>
                <div>
                    <button className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md transition duration-200 hover:bg-green-800 hover:shadow-[0_3px_6px_rgba(21,128,61,0.65)] sm:px-4 sm:py-2 sm:text-[13px]">
                        সব পণ্য দেখুন
                    </button>
                </div>
            </div>

            <div>
                <Image className="w-60 h-60" height={80} width={80} src="/bazar-hero.png" alt=""/>
            </div>
        </div>
    );
};

export default Banner;