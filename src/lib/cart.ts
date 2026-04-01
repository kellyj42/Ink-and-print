export const CART_STORAGE_KEY = "ink-and-apparels-cart";
const CART_UPDATED_EVENT = "ink-and-apparels-cart-updated";
const EMPTY_CART: CartItem[] = [];
let cartSnapshot: CartItem[] = EMPTY_CART;
let lastRawCartValue: string | null = null;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  colorSwatch: string;
  image: string;
  quantity: number;
};

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (raw === lastRawCartValue) {
      return cartSnapshot;
    }

    if (!raw) {
      lastRawCartValue = null;
      cartSnapshot = EMPTY_CART;
      return cartSnapshot;
    }

    const parsed = JSON.parse(raw);
    lastRawCartValue = raw;
    cartSnapshot = Array.isArray(parsed) ? parsed : EMPTY_CART;
    return cartSnapshot;
  } catch {
    lastRawCartValue = null;
    cartSnapshot = EMPTY_CART;
    return cartSnapshot;
  }
}

export function getCartSnapshot() {
  if (typeof window === "undefined") return EMPTY_CART;
  return readCart();
}

export function getCartServerSnapshot() {
  return EMPTY_CART;
}

function dispatchCartUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  cartSnapshot = items;
  lastRawCartValue = JSON.stringify(items);
  window.localStorage.setItem(CART_STORAGE_KEY, lastRawCartValue);
  dispatchCartUpdated();
}

export function clearCart() {
  if (typeof window === "undefined") return;
  lastRawCartValue = null;
  cartSnapshot = EMPTY_CART;
  window.localStorage.removeItem(CART_STORAGE_KEY);
  dispatchCartUpdated();
}

export function subscribeToCart(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      onChange();
    }
  };

  const handleCartUpdated = () => {
    onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
  };
}
