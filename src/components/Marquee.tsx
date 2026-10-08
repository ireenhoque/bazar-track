"use cache";

const Marquee = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
            <div className="flex w-max animate-marquee">
                {[...products, ...products].map((product, index) => {
                    const isUp = product.change?.dir === "up";
                    const isDown = product.change?.dir === "down";

                    return (
                        <div
                            key={`${product.id}-${index}`}
                            className="mx-4 flex shrink-0 items-center gap-2 whitespace-nowrap py-2 text-xs"
                        >
                            <span>{product.image}</span>

                            <span className="font-medium text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="font-semibold text-gray-900">
                                {product.today} টাকা/{product.unit}
                            </span>

                            <span
                                className={
                                    isUp
                                        ? "font-semibold text-red-600"
                                        : isDown
                                          ? "font-semibold text-green-600"
                                          : "font-semibold text-gray-500"
                                }
                            >
                                {isUp
                                    ? "▲"
                                    : isDown
                                      ? "▼"
                                      : "—"}{" "}
                                {product.change?.pct}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Marquee;