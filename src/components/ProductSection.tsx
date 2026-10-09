import ProductCard, { type Product } from "./ProductCard";

type ProductSectionProps = {
  title: string;
  description: string;
  products: Product[];
  id?: string;
  trend?: "up" | "down";
};

export default function ProductSection({
  title,
  description,
  products,
  id,
  trend,
}: ProductSectionProps) {
  return (
    <section id={id} className="py-3 sm:py-4">
      <div className="mb-3">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-[#253129] sm:text-base">
          {trend === "up" && (
            <span className="text-red-600" aria-hidden="true">
              ▲
            </span>
          )}

          {trend === "down" && (
            <span className="text-green-600" aria-hidden="true">
              ▼
            </span>
          )}

          {title}
        </h2>

        {description && (
          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
            {description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <p className="rounded-lg border border-gray-100 bg-white p-4 text-xs text-gray-500">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}