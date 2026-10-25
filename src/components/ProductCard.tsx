// src/components/ProductCard.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import type { Product } from '../types/product';
import type { RootState } from '../redux/store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  // جلب عناصر السلة لحساب الكمية المضافة من هذا المنتج تحديداً
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // المخزون المتاح الأصلي (من الـ rating.count أو افتراضي 10)
  const initialStock = product.rating?.count ?? 10;
  
  // حساب المخزون المتبقي الحقيقي
  const availableStock = Math.max(0, initialStock - quantityInCart);

  const handleAddToCart = () => {
    if (availableStock > 0) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="h-48 bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4 grow justify-between">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md capitalize">
            {product.category}
          </span>
          
          <h3 className="font-bold text-gray-800 text-sm mt-2 line-clamp-2" title={product.title}>
            {product.title}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            
            {/* عرض المتبقي في المخزون */}
            <span className={`text-xs font-medium px-2 py-1 rounded-md ${
              availableStock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {availableStock > 0 ? `Q: ${availableStock}` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={availableStock === 0}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
            availableStock > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {availableStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};