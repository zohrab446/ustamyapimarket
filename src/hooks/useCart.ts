import { useSyncExternalStore, useCallback } from 'react';
import { cartStore, type CartItem } from '@/lib/cart';
import type { Product } from '@/lib/data';

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    () => cartStore.getItems(),
  );

  const addItem = useCallback((product: Product) => {
    cartStore.addItem(product);
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartStore.removeItem(productId);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.updateQuantity(productId, quantity);
  }, []);

  const clear = useCallback(() => {
    cartStore.clear();
  }, []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clear, total, count };
}
