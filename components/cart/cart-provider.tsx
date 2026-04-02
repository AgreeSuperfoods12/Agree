"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CART_STORAGE_KEY,
  clampCartQuantity,
  getCartItemCount,
  sanitizeCartItems,
} from "@/lib/cart";
import type { CartItem, CartProductSnapshot } from "@/types/cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  uniqueItemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: CartProductSnapshot, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredCartItems() {
  if (typeof window === "undefined") {
    return [] as CartItem[];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [] as CartItem[];
    }

    return sanitizeCartItems(JSON.parse(storedValue));
  } catch {
    return [] as CartItem[];
  }
}

function persistCartItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures and keep cart in memory.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadStoredCartItems());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedItems = loadStoredCartItems();
      setItems(storedItems);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    persistCartItems(items);
  }, [items]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      setItems(loadStoredCartItems());
    }

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((previousValue) => !previousValue), []);

  const addItem = useCallback((product: CartProductSnapshot, quantity = 1) => {
    const safeQuantity = clampCartQuantity(quantity);

    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex === -1) {
        return [...currentItems, { id: product.id, product, quantity: safeQuantity }];
      }

      return currentItems.map((item, index) => {
        if (index !== existingItemIndex) {
          return item;
        }

        return {
          ...item,
          quantity: clampCartQuantity(item.quantity + safeQuantity),
        };
      });
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }, []);

  const setItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
      return;
    }

    const safeQuantity = clampCartQuantity(quantity);

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(() => getCartItemCount(items), [items]);
  const uniqueItemCount = items.length;

  const value = useMemo(
    () => ({
      items,
      itemCount,
      uniqueItemCount,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setItemQuantity,
      clearCart,
    }),
    [
      addItem,
      clearCart,
      closeCart,
      isCartOpen,
      itemCount,
      items,
      openCart,
      removeItem,
      setItemQuantity,
      toggleCart,
      uniqueItemCount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
