
"use cache";

import Link from "next/link";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    if (!response.ok) return [];

    const data: unknown = await response.json();

    if (!Array.isArray(data)) return [];

    return data as Category[];
  } catch {
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
        <Link
          href="/"
          className="shrink-0 text-xs font-semibold text-gray-700 transition hover:text-green-700 sm:text-sm"
        >
          সব পণ্য
        </Link>

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