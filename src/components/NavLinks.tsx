"use cache";

import Link from "next/link";

const NavLinks = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    const nav = await res.json();

    return (
        <nav className="w-full border-b border-gray-200 bg-white">
            <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 py-2.5 sm:gap-x-7 sm:gap-y-3 sm:py-3">
                    {nav.map(
                        (category: {
                            id: string;
                            slug: string;
                            nameBn: string;
                            icon: string;
                        }) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-gray-700 transition-colors hover:text-green-700 sm:text-sm md:text-[15px]"
                            >
                                <span className="text-sm sm:text-base">
                                    {category.icon}
                                </span>

                                <span>{category.nameBn}</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;