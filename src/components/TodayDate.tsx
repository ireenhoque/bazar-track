"use client";

import { useEffect, useState } from "react";

export default function TodayDate() {
    const [today, setToday] = useState("");

    useEffect(() => {
        setToday(
            new Intl.DateTimeFormat("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Dhaka",
            }).format(new Date())
        );
    }, []);

    return <>{today || "আজকের তারিখ"}</>;
}