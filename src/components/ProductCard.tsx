// import Link from "next/link";

// type Product = {
//     id: number | string;
//     nameBn: string;
//     icon: string;
//     unit: string;
//     price: number;
//     changePercent: number;
// };

// const toBanglaNumber = (value: number | string) => {
//     return value
//         .toString()
//         .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
// };

// const ProductCard = ({ product }: { product: Product }) => {
//     const change = Number(product.changePercent);

//     const isUp = change > 0;
//     const isDown = change < 0;

//     return (
//         <Link
//             href={`/product/${product.id}`}
//             className="group block rounded-xl border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-[0_3px_8px_rgba(21,128,61,0.12)] sm:p-4"
//         >
//             {/* Product */}
//             <div className="flex items-start gap-3">
//                 {/* Icon */}
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl">
//                     {product.icon}
//                 </div>

//                 {/* Name */}
//                 <div className="min-w-0">
//                     <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-[15px]">
//                         {product.nameBn}
//                     </h3>

//                     <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
//                         {product.unit}
//                     </p>
//                 </div>
//             </div>

//             {/* Price */}
//             <div className="mt-4 flex items-end justify-between gap-2">
//                 <div>
//                     <p className="text-[9px] text-gray-500 sm:text-[10px]">
//                         আজকের দাম
//                     </p>

//                     <p className="mt-0.5 text-sm font-bold text-gray-900 sm:text-base">
//                         {toBanglaNumber(product.price)} টাকা
//                     </p>
//                 </div>

//                 {/* Change */}
//                 <span
//                     className={`rounded-full px-2 py-1 text-[9px] font-semibold sm:text-[10px] ${
//                         isUp
//                             ? "bg-red-50 text-red-600"
//                             : isDown
//                               ? "bg-green-50 text-green-700"
//                               : "bg-gray-100 text-gray-500"
//                     }`}
//                 >
//                     {isUp && "▲ "}
//                     {isDown && "▼ "}
//                     {!isUp && !isDown && "—"}

//                     {toBanglaNumber(Math.abs(change).toFixed(1))}%
//                 </span>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;