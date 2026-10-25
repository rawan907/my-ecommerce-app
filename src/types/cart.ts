// src/types/cart.ts
import type { Product } from './product'; // أو من ملف الأنواع عندك

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}