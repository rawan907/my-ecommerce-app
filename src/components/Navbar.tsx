// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export const Navbar: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* اسم أو شعار المتجر */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Store className="w-6 h-6" />
          <span>MyEcommerce</span>
        </Link>

        {/* زر السلة */}
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl transition font-medium relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};