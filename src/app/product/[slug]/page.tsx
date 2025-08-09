import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "@/components/ui/button";
import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

import Image from "next/image";

interface ProductPageProps {
  params: { slug: string };
  searchParams: { variant?: string; quantity?: string };
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  // Busca o produto pelo slug
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, params.slug),
    with: {
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  // Se não houver variante na URL, use a primeira variante e redirecione
  if (!searchParams.variant) {
    const firstVariant = product.variants[0];
    return redirect(`/product/${params.slug}?variant=${firstVariant.slug}`);
  }

  // Encontre a variante selecionada
  let selectedVariant = product.variants.find(
    (v) => v.slug === searchParams.variant,
  );

  // Se a variante não existir, use a primeira e redirecione
  if (!selectedVariant) {
    const firstVariant = product.variants[0];
    return redirect(`/product/${params.slug}?variant=${firstVariant.slug}`);
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={selectedVariant.imageUrl}
          alt={selectedVariant.name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full object-cover"
        />

        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={selectedVariant.slug}
            variants={product.variants}
            productSlug={product.slug}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <h3 className="text-muted-foreground text-sm">
            {selectedVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(selectedVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col gap-4 px-5">
          <Button className="rounded-full" size="lg" variant="outline">
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar Agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-shadow-amber-600">{product.description}</p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
