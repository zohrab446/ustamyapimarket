import type { Product } from './data';

// Simple cart state without zustand since it's not installed
// Using a simple React context approach instead

export interface CartItem {
  product: Product;
  quantity: number;
}

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(l => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getItems(): CartItem[] {
    return cartItems;
  },
  addItem(product: Product) {
    const existing = cartItems.find(i => i.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      cartItems = [...cartItems, { product, quantity: 1 }];
    }
    notify();
  },
  removeItem(productId: string) {
    cartItems = cartItems.filter(i => i.product.id !== productId);
    notify();
  },
  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      cartStore.removeItem(productId);
      return;
    }
    cartItems = cartItems.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    notify();
  },
  getTotal(): number {
    return cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  },
  getCount(): number {
    return cartItems.reduce((sum, i) => sum + i.quantity, 0);
  },
  clear() {
    cartItems = [];
    notify();
  },
};
