"use client";

import { useEffect, useState } from "react";

const HeaderDate = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    if (!date) {
        return null;
    }

    return (
        <div className="max-w-[140px] truncate text-[9px] font-normal text-gray-600 sm:max-w-none sm:text-xs md:text-sm">
            {date.toLocaleDateString("bn-BD", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
        </div>
    );
};

export default HeaderDate;