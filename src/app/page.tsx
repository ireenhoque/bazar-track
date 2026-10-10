
import { cacheLife } from "next/cache";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import type { Product } from "@/components/ProductCard";
import { getApiUrl } from "@/lib/api";

async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  try {
    const response = await fetch(getApiUrl("products"));

    if (!response.ok) {
      console.error("Products API returned:", response.status);
      return [];
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error("Products API returned an unexpected response.");
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
        <Banner />

        <ProductSection
          title="আজ দাম বেড়েছে"
          description=""
          products={risers}
          trend="up"
        />

        <ProductSection
          title="আজ দাম কমেছে"
          description=""
          products={fallers}
          trend="down"
        />

        <ProductSection
          id="সব-পণ্য"
          title="সব পণ্য"
          description="আজকের সব নিত্যপ্রয়োজনীয় পণ্যের বাজারদর"
          products={products}
        />
      </div>
    </main>
  );
}
