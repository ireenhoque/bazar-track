"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-5 md:px-6 lg:px-8">

                {/* Logo + Website Info */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <Image
                        className="h-9 w-9 shrink-0 rounded-md bg-green-700 p-2 sm:h-10 sm:w-10"
                        height={50}
                        width={50}
                        src="/logo-icon.png"
                        alt="বাজার দর"
                    />

                    <div className="min-w-0">
                        <div className="truncate text-base font-bold sm:text-lg">
                            বাজার দর
                        </div>

                        {date && (
                            <div className="whitespace-nowrap text-[10px] font-normal text-gray-600 sm:text-xs md:text-sm">
                                {date.toLocaleDateString("bn-BD", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Authentication Buttons */}
                <div className="flex shrink-0 items-center gap-5">
                    <button
                        className="border-0 bg-transparent px-0 py-2 text-[13px] font-semibold text-gray-800"
                    >
                        সাইন ইন
                    </button>

                    <button
                        className="rounded-lg bg-green-700 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-green-800"
                    >
                        সাইন আপ
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;