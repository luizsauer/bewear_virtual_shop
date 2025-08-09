"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const QuantitySelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const quantity = Number(searchParams.get("quantity")) || 1;

  const updateQuantity = useCallback(
    (newQuantity: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("quantity", newQuantity.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleDecrement = () => updateQuantity(Math.max(quantity - 1, 1));
  const handleIncrement = () => updateQuantity(quantity + 1);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button size="icon" variant="ghost" onClick={handleDecrement}>
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button size="icon" variant="ghost" onClick={handleIncrement}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
