
import { notFound } from "next/navigation";
import ProductSection from "@/components/ProductSection";
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

  return response.json();
}

async function getProducts(slug: string): Promise<Product[]> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  return response.json();
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
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            {category.icon}
          </span>

          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির সকল পণ্যের বর্তমান দাম
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          মোট পণ্য: {products.length}টি
        </p>
      </div>

      <ProductSection
        title={`${category.nameBn} পণ্যসমূহ`}
        description="পণ্যের দাম ও পরিবর্তন দেখুন"
        products={products}
      />
    </div>
  );
}