"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 800; // Ajuste conforme necessário
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={containerRef}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;
