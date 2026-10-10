
"use cache";

import Link from "next/link";
import { cacheLife } from "next/cache";
import { getApiUrl } from "@/lib/api";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

async function getCategories(): Promise<Category[]> {
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  try {
    const response = await fetch(getApiUrl("categories"));

    if (!response.ok) return [];

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Category[]) : [];
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
}

export default async function NavLinks() {
  const categories = await getCategories();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full overflow-x-auto border-t border-gray-100"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-3 py-3 sm:gap-7 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-600 transition hover:text-green-700 sm:text-sm"
          >
            <span aria-hidden="true">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
