
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import type { Product } from "@/components/ProductCard";
import { getApiUrl } from "@/lib/api";

export const instant = false;

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetails = Product & {
  markets?: Market[];
};

async function getProduct(
  slug: string
): Promise<ProductDetails | null> {
  const apiUrls = [
    getApiUrl("products"),
  ];

  for (const url of apiUrls) {
    try {
      const response = await fetch(getApiUrl("products"), {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(
          `Product API failed: ${url} (${response.status})`
        );
        continue;
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        console.error(`Unexpected product data from: ${url}`);
        continue;
      }

      const products = data as ProductDetails[];

      const product = products.find(
        (item) => item.slug === slug
      );

      if (product) {
        return product;
      }
    } catch (error) {
      console.error(
        `Could not connect to product API: ${url}`,
        error
      );
    }
  }

  throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Keep the existing authentication requirement.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  const averagePrice =
    markets.length > 0
      ? Math.round(
        markets.reduce(
          (sum, market) =>
            sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
      : null;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href="/#সব-পণ্য"
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn || "সব পণ্য"}
          </Link>

          <span aria-hidden="true">›</span>

          <span className="text-gray-700">
            {product.nameBn}
          </span>
        </nav>

        {/* Product header and current price */}
        <section className="flex items-center justify-between gap-3 rounded-xl border border-[#e4ebe4] bg-white/80 p-3 sm:gap-5 sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-14 sm:w-14 sm:text-3xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-base font-bold leading-snug text-[#253129] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                {product.categoryNameBn}
                {product.unit ? ` · ${product.unit}` : ""}
              </p>

              <p className="mt-1 text-[10px] leading-relaxed text-gray-600 sm:text-xs">
                প্রতিদিনের বাজারদর যাচাই করুন
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-3 text-center sm:min-w-28 sm:px-5">
            <p className="text-[9px] text-gray-500 sm:text-xs">
              আজকের দাম
            </p>

            <p className="text-2xl font-extrabold leading-tight text-[#253129] sm:text-3xl">
              {product.today}
            </p>

            <p className="text-[9px] text-gray-600 sm:text-[10px]">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-1 text-[10px] font-semibold ${isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-700"
                  : "text-gray-500"
                }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {product.change?.pct ?? 0}%
            </p>
          </div>
        </section>

        {/* Price summary and market table */}
        <section className="mt-4 rounded-xl border border-[#e4ebe4] bg-white/80 p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-bold text-[#253129]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e4ebe4] p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-base font-bold text-green-700 sm:text-lg">
                {lowestPrice ?? "—"}{" "}
                <span className="text-[10px] font-medium sm:text-xs">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                বাজারের সর্বনিম্ন দাম
              </p>
            </div>

            <div className="rounded-xl border border-[#e4ebe4] p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-base font-bold text-red-600 sm:text-lg">
                {highestPrice ?? "—"}{" "}
                <span className="text-[10px] font-medium sm:text-xs">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                বাজারের সর্বোচ্চ দাম
              </p>
            </div>

            <div className="rounded-xl border border-[#e4ebe4] p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                গড় দাম
              </p>

              <p className="mt-1 text-base font-bold text-green-700 sm:text-lg">
                {averagePrice ?? "—"}{" "}
                <span className="text-[10px] font-medium sm:text-xs">
                  টাকা
                </span>
              </p>

              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                সব বাজারের গড় মূল্য
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-5 text-sm font-bold text-[#253129]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[#e4ebe4]">
              <table className="w-full min-w-[600px] text-left text-xs">
                <thead className="bg-[#f8faf8] text-gray-500">
                  <tr>
                    <th className="px-3 py-3 font-semibold">
                      বাজার
                    </th>

                    <th className="px-3 py-3 font-semibold">
                      বিভাগ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-[#e4ebe4] ${index % 2 === 1
                          ? "bg-[#f0f5f0]"
                          : "bg-white/70"
                          }`}
                      >
                        <td className="px-3 py-3 font-medium text-[#253129]">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {market.min} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {market.max} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-semibold text-[#253129]">
                          {marketAverage} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg bg-[#f0f5f0] p-4 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
