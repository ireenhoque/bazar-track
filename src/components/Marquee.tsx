
import Link from "next/link";
import { cacheLife } from "next/cache";
import { getApiUrl } from "@/lib/api";

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

const PRODUCTS_API = getApiUrl("products");

async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife({
    stale: 300,
    revalidate: 300,
    expire: 3600,
  });

  try {
    const response = await fetch(PRODUCTS_API);

    if (!response.ok) {
      console.error(
        `Products API returned: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data: unknown = await response.json();

    // Support either an array or an object containing products.
    const products = Array.isArray(data)
      ? data
      : data &&
        typeof data === "object" &&
        "products" in data &&
        Array.isArray(data.products)
        ? data.products
        : [];

    return products as Product[];
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
    return [];
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

function PriceChange({ change }: { change?: Product["change"] }) {
  if (!change || change.dir === "same") {
    return (
      <span className="text-gray-500">
        <span aria-hidden="true">—</span>
        {change ? ` ${formatPrice(change.pct)}%` : ""}
      </span>
    );
  }

  const isUp = change.dir === "up";

  return (
    <span
      className={isUp ? "text-red-600" : "text-green-700"}
      aria-label={isUp ? "Price increased" : "Price decreased"}
    >
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>{" "}
      {formatPrice(change.pct)}%
    </span>
  );
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }


return (
  <section
    className="w-full overflow-hidden bg-white"
    aria-label="পণ্যের বাজারদর"
  >
    <div className="w-full overflow-hidden bg-white py-3">
      {products.length > 0 && (
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[...products, ...products].map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/product/${product.slug}`}
              className="mx-4 inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
            >
              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>

              <span className="font-semibold text-green-800">
                ৳{formatPrice(product.today)}
              </span>

              <span className="text-gray-500">
                / {product.unit}
              </span>

              <PriceChange change={product.change} />

              <span
                className="ml-2 text-gray-300"
                aria-hidden="true"
              >
                |
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

}
