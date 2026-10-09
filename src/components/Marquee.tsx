
"use cache";

import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products"
    );

    if (!response.ok) {
      console.error(
        "Products API returned:",
        response.status,
        response.statusText
      );
      return [];
    }

    return (await response.json()) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  const tickerProducts = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-b border-green-100 bg-green-50">
      <div className="flex w-max animate-marquee items-center gap-8 py-2.5">
        {tickerProducts.map((product, index) => (
          <Link
            key={`${product.id}-${index}`}
            href={`/product/${product.slug}`}
            className="flex shrink-0 items-center gap-2 text-xs sm:text-sm"
          >
            <span className="font-medium text-gray-800">
              {product.nameBn}
            </span>

            <span className="font-bold text-gray-900">
              ৳{product.today}
            </span>

            <span className="text-gray-500">/{product.unit}</span>

            {product.change && (
              <span
                className={
                  product.change.dir === "up"
                    ? "font-semibold text-red-600"
                    : product.change.dir === "down"
                      ? "font-semibold text-green-700"
                      : "font-medium text-gray-500"
                }
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {product.change.pct}%
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}