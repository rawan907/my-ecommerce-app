// src/services/api.ts
import type { Product } from '../types/product';

interface DummyJsonProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
}

// دالة جلب المنتجات (مع إمكانية فلترة بالفئة لتكون جاهزة للـ Backend)
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    // لو تم اختيار فئة، نجيب منتجات الفئة دي، وإلا نجيب كل المنتجات
    const url = category && category !== 'all'
      ? `https://dummyjson.com/products/category/${category}`
      : 'https://dummyjson.com/products';

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('فشل في جلب المنتجات');
    }
    const data = await response.json();

    return data.products.map((item: DummyJsonProduct): Product => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.thumbnail || item.images[0],
      rating: {
        rate: item.rating,
        count: item.stock,
      },
    }));
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
};

// دالة لجلب قائمة الفئات (Categories) للـ Backend-ready filtering
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) {
      throw new Error('فشل في جلب الفئات');
    }
    const data = await response.json();
    // DummyJSON ممكن يرجع الكاتيجوري كـ strings مباشرة أو objects
    return data.map((cat: any) => (typeof cat === 'string' ? cat : cat.slug));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};