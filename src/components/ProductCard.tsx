"use client";

import Link from "next/link";
import { useState } from "react";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

type ProductCardProps = {
  product: Product;
};

const bnNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

function ProductVisual({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const imageValue = product.image?.trim() ?? "";
  const categoryIcon = product.categoryIcon?.trim() || "🛒";

  const isImageUrl =
    imageValue.startsWith("https://") ||
    imageValue.startsWith("http://") ||
    imageValue.startsWith("/");

  if (isImageUrl && !imageFailed) {
    return (
      <img
        src={imageValue}
        alt={product.nameBn}
        className="h-full w-full object-contain p-1"
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  if (imageValue && !isImageUrl) {
    return <span>{imageValue}</span>;
  }

  return <span>{categoryIcon}</span>;
}

export default function ProductCard({ product }: ProductCardProps) {
  const direction = product.change?.dir ?? "same";
  const percentage = Math.abs(product.change?.pct ?? 0);

  const badgeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-600"
        : "bg-gray-100 text-gray-500";

  const arrow =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex min-w-0 flex-col rounded-xl border border-[#e1e9e1] bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3 md:p-4"
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f0f5f0] text-lg sm:h-9 sm:w-9 sm:text-xl">
          <ProductVisual product={product} />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-semibold leading-4 text-[#253129] sm:text-sm">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 truncate text-[10px] leading-3 text-gray-500 sm:text-xs">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-2.5 sm:mt-3">
        <p className="text-[10px] leading-3 text-gray-500 sm:text-xs">
          আজকের দাম
        </p>

        <div className="mt-1 flex min-w-0 flex-wrap items-center justify-between gap-1">
          <p className="min-w-0 text-sm font-bold leading-5 text-[#253129] sm:text-base">
            {bnNumber.format(product.today)} টাকা
          </p>

          <span
            className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-1 text-[9px] font-semibold leading-none sm:text-[10px] ${badgeStyle}`}
          >
            {arrow} {bnNumber.format(percentage)}%
          </span>
        </div>
      </div>
    </Link>
  );
}