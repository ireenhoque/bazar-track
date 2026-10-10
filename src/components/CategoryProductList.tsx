"use client";

import { useMemo, useState } from "react";
import ProductCard, { type Product } from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc";

const bnNumber = new Intl.NumberFormat("bn-BD");

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOption]);

  return (
    <section>
      {/* Sorting bar */}
      <div className="mb-3 flex min-h-[50px] items-center justify-end rounded-xl border border-[#e1e9e1] bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-xs text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="max-w-full rounded-lg border border-[#d9e0d9] bg-white px-2.5 py-1.5 text-xs text-[#253129] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product count — positioned above the grid */}
      <p className="mb-3 text-xs text-gray-500" aria-live="polite">
        মোট {bnNumber.format(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Existing homepage product cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
