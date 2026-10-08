// import ProductCard from "./ProductCard";

// type Product = {
//     id: number | string;
//     nameBn: string;
//     icon: string;
//     unit: string;
//     price: number;
//     changePercent: number;
// };

// type ProductSectionProps = {
//     title: string;
//     products: Product[];
//     subtitle?: string;
//     type: "up" | "down" | "all";
// };

// const ProductSection = ({
//     title,
//     products,
//     subtitle,
//     type,
// }: ProductSectionProps) => {
//     return (
//         <section className="mb-8">
//             {/* Section heading */}
//             <div className="mb-3">
//                 <h2 className="flex items-center gap-1.5 text-base font-bold text-gray-800 sm:text-lg">
//                     <span
//                         className={
//                             type === "up"
//                                 ? "text-red-600"
//                                 : type === "down"
//                                   ? "text-green-600"
//                                   : "text-gray-800"
//                         }
//                     >
//                         {type === "up" && "▲"}
//                         {type === "down" && "▼"}
//                     </span>

//                     {title}
//                 </h2>

//                 {subtitle && (
//                     <p className="mt-1 text-xs text-gray-500">
//                         {subtitle}
//                     </p>
//                 )}
//             </div>

//             {/* Product grid */}
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {products.map((product) => (
//                     <ProductCard
//                         key={product.id}
//                         product={product}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default ProductSection;