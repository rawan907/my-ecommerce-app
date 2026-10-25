// src/redux/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types/cart';
import type { Product } from '../types/product';

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. إضافة منتج للسلة
    addToCart(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      
      if (!existingItem) {
        state.cartItems.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }

      // حساب إجمالي المبلغ تلقائياً
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // 2. حذف منتج من السلة
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    // 3. تغيير الكمية (زيادة أو نقصان أو حذف لو وصلت لصفر)
    updateQuantity(state, action: PayloadAction<{ id: number; type: 'increase' | 'decrease' }>) {
      const { id, type } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (type === 'increase') {
          existingItem.quantity++;
          state.totalQuantity++;
        } else if (type === 'decrease') {
          if (existingItem.quantity > 1) {
            existingItem.quantity--;
            state.totalQuantity--;
          } else {
            // لو الكمية 1 وضغطنا ناقص، نحذف المنتج خالص من السلة
            state.totalQuantity -= existingItem.quantity;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
          }
        }

        // إعادة حساب المجموع الإجمالي
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;