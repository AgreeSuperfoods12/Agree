import type { ProductPricing } from "@/types/product";

export interface CartProductImage {
  src: string;
  alt: string;
}

export interface CartProductSnapshot {
  id: string;
  slug: string;
  name: string;
  category: string;
  pricing: ProductPricing;
  image?: CartProductImage;
}

export interface CartItem {
  id: string;
  product: CartProductSnapshot;
  quantity: number;
}

export interface CartCheckoutLine {
  productId: string;
  productName: string;
  quantity: number;
  packSize?: string;
}
