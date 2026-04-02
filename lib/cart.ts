import type { Product } from "@/types/product";
import type { CartCheckoutLine, CartItem, CartProductSnapshot } from "@/types/cart";

export const CART_STORAGE_KEY = "agree-cart-v1";
export const MAX_CART_ITEM_QUANTITY = 20;

function normalizeVariantLabel(variantLabel?: string) {
  return variantLabel?.trim().toLowerCase() || "default";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function createCartItemId(slug: string, variantLabel?: string) {
  return `${slug}::${normalizeVariantLabel(variantLabel)}`;
}

export function clampCartQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.min(MAX_CART_ITEM_QUANTITY, Math.max(1, Math.round(quantity)));
}

export function toCartProductSnapshot(
  product: Pick<Product, "slug" | "name" | "category" | "pricing" | "images">,
): CartProductSnapshot {
  return {
    id: createCartItemId(product.slug, product.pricing.variantLabel),
    slug: product.slug,
    name: product.name,
    category: product.category,
    pricing: product.pricing,
    image: product.images[0]
      ? {
          src: product.images[0].src,
          alt: product.images[0].alt,
        }
      : undefined,
  };
}

function toValidatedCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = typeof value.id === "string" ? value.id : "";
  const quantity = typeof value.quantity === "number" ? clampCartQuantity(value.quantity) : 1;
  const product = isRecord(value.product) ? value.product : null;

  if (!id || !product) {
    return null;
  }

  const slug = typeof product.slug === "string" ? product.slug : "";
  const name = typeof product.name === "string" ? product.name : "";
  const category = typeof product.category === "string" ? product.category : "";
  const pricing = isRecord(product.pricing) ? product.pricing : null;

  if (!slug || !name || !category || !pricing) {
    return null;
  }

  const amount = typeof pricing.amount === "number" ? pricing.amount : null;
  const currencyCode = typeof pricing.currencyCode === "string" ? pricing.currencyCode : "";
  const variantLabel = typeof pricing.variantLabel === "string" ? pricing.variantLabel : "";
  const compareAtAmount =
    typeof pricing.compareAtAmount === "number" ? pricing.compareAtAmount : undefined;

  if (amount === null || !currencyCode || !variantLabel) {
    return null;
  }

  const image = isRecord(product.image)
    ? {
        src: typeof product.image.src === "string" ? product.image.src : "",
        alt: typeof product.image.alt === "string" ? product.image.alt : "",
      }
    : undefined;

  return {
    id,
    quantity,
    product: {
      id,
      slug,
      name,
      category,
      pricing: {
        amount,
        currencyCode,
        variantLabel,
        ...(typeof compareAtAmount === "number" ? { compareAtAmount } : {}),
      },
      image: image?.src ? image : undefined,
    },
  };
}

export function sanitizeCartItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as CartItem[];
  }

  return value
    .map(toValidatedCartItem)
    .filter((item): item is CartItem => Boolean(item));
}

export function toCartCheckoutLines(items: CartItem[]): CartCheckoutLine[] {
  return items.map((item) => ({
    productId: item.product.slug,
    productName: item.product.name,
    quantity: item.quantity,
    packSize: item.product.pricing.variantLabel,
  }));
}

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
