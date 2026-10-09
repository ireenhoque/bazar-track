import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import type { Product } from "@/components/ProductCard";

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

async function getProduct(slug: string): Promise<ProductDetails | null> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const products: ProductDetails[] = await response.json();
  return products.find((product) => product.slug === slug) ?? null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Require a signed-in user before loading product details.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const averagePrice =
    product.markets && product.markets.length > 0
      ? Math.round(
          product.markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
          ) / product.markets.length
        )
      : null;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:text-green-800"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">
              {product.categoryIcon} {product.categoryNameBn}
            </p>

            <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-xl bg-green-50 p-5">
          <p className="text-sm text-gray-600">আজকের দাম</p>

          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {product.today} টাকা
            <span className="ml-1 text-sm font-normal text-gray-500">
              / {product.unit}
            </span>
          </p>

          <p
            className={`mt-2 text-sm font-semibold ${
              isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-700"
                  : "text-gray-500"
            }`}
          >
            {isUp
              ? "▲ দাম বেড়েছে"
              : isDown
                ? "▼ দাম কমেছে"
                : "— দাম অপরিবর্তিত"}
            {" · "}
            {product.change?.pct ?? 0}%
          </p>
        </div>

        <h2 className="mt-7 text-lg font-bold text-gray-900">
          দামের তুলনা
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500">গতকাল</p>
            <p className="mt-1 font-bold text-gray-900">
              {product.yesterday} টাকা
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500">গত সপ্তাহ</p>
            <p className="mt-1 font-bold text-gray-900">
              {product.lastWeek} টাকা
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500">গত মাস</p>
            <p className="mt-1 font-bold text-gray-900">
              {product.lastMonth} টাকা
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-lg font-bold text-gray-900">
          বাজারভিত্তিক দাম
        </h2>

        {product.markets && product.markets.length > 0 ? (
          <>
            <div className="mt-3 overflow-x-auto rounded-lg border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">বাজার</th>
                    <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                    <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-gray-100"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">
                          {market.market}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {market.division}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {market.min} টাকা
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {market.max} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {averagePrice !== null && (
              <p className="mt-3 text-sm text-gray-600">
                বাজারগুলোর মধ্যবিন্দুর গড়:{" "}
                <span className="font-bold text-gray-900">
                  {averagePrice} টাকা
                </span>
              </p>
            )}
          </>
        ) : (
          <p className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}