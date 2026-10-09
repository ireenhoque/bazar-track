import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import type { Product } from "@/components/ProductCard";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error("Products API returned:", response.status);
      return [];
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        (b.change?.pct ?? 0) - (a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        (a.change?.pct ?? 0) - (b.change?.pct ?? 0)
    )
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
          id="sob-panno"
          title="সব পণ্য"
          description="আজকের সব নিত্যপ্রয়োজনীয় পণ্যের বাজারদর"
          products={products}
        />
      </div>
    </main>
  );
}