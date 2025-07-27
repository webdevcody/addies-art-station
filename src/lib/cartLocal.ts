import { useEffect, useState } from "react";

export type LocalCartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY = "addie_art_cart";
const CART_EVENT = "addie_art_cart_update";

export function getCart(): LocalCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalCartItem[];
  } catch {
    return [];
  }
}

export function setCart(items: LocalCartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Dispatch a custom event for same-tab updates
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(productId: string, quantity: number = 1) {
  const cart = getCart();
  const idx = cart.findIndex((item) => item.productId === productId);
  if (idx !== -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  setCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.productId !== productId);
  setCart(cart);
}

export function clearCart() {
  setCart([]);
}

export function useLocalCart() {
  const [cart, setCartState] = useState<LocalCartItem[]>(getCart());

  useEffect(() => {
    function sync() {
      setCartState(getCart());
    }
    window.addEventListener("storage", sync);
    window.addEventListener(CART_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_EVENT, sync);
    };
  }, []);

  // When setCart is called, also update state and fire event
  function setCartAndSync(items: LocalCartItem[]) {
    setCart(items);
    setCartState(items);
  }

  return [cart, setCartAndSync] as const;
}
