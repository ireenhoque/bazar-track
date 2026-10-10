import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryProductList from "@/components/CategoryProductList";
import type { Product } from "@/components/ProductCard";

export const instant = false;

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("ক্যাটাগরির তথ্য সঠিক নয়।");
  }

  return data as Category[];
}

async function getProducts(slug: string): Promise<Product[]> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("পণ্যের তথ্য সঠিক নয়।");
  }

  return data as Product[];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts(slug);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-xs text-gray-500"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-700">{category.nameBn}</span>
        </nav>

        <section className="mb-4 rounded-2xl border border-[#e1e9e1] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl"
              aria-hidden="true"
            >
              {category.icon}
            </span>

            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-6 text-[#253129] sm:text-xl">
                {category.nameBn}
              </h1>

              <p className="mt-0.5 text-xs text-gray-500">
                {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {products.length > 0 ? (
          <CategoryProductList products={products} />
        ) : (
          <section className="rounded-2xl border border-[#e1e9e1] bg-white px-5 py-12 text-center">
            <div className="text-4xl" aria-hidden="true">
              🛒
            </div>

            <h2 className="mt-3 text-base font-bold text-[#253129]">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              অন্য পণ্য দেখতে হোম পেজে ফিরে যান।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
