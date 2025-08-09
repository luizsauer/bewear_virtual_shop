import { categoryTable } from "@/db/schema";
import Link from "next/link";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="disabled:text-muted-foreground h-auto min-h-10 rounded-full bg-white px-4 py-2 text-xs font-semibold hover:bg-white/80 active:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/50"
            asChild
          >
            <Link href={`/category/${category.slug}`}>
              <span className="text-center break-words whitespace-normal">
                {category.name}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
