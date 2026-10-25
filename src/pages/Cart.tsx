// src/pages/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store'; // استخدام import type
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  // استخدام الاسم الصحيح cartItems بناءً على الـ slice
  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cart);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2 mb-6">It looks like you haven't added any products to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
        >
          <ArrowLeft className="w-5 h-5 rotate-180" />
          Browse Products Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قائمة المنتجات المضافة */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain p-2 bg-gray-50 rounded-lg shrink-0"
              />

              <div className="grow min-w-0">
                <h3 className="text-sm font-bold text-gray-800 truncate" title={item.title}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">${item.price.toFixed(2)} / item</p>
                <p className="text-sm font-bold text-indigo-600 mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* تحكم الكمية */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, type: 'decrease' }))}
                  className="p-1 hover:bg-white rounded transition text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, type: 'increase' }))}
                  className="p-1 hover:bg-white rounded transition text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* زر الحذف */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-gray-400 hover:text-red-500 transition p-2"
                title="حذف المنتج"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* ملخص الطلب (Order Summary) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Order Summary</h2>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total number of items </span>
            <span className="font-semibold text-gray-800">
              {cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)} item
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>

          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-extrabold text-indigo-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow transition active:scale-[0.98]">
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};