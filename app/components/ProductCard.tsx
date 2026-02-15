'use client';

import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import SafeImage from './SafeImage';

type Product = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  brand?: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);

  /* ---------------- Add to Cart ---------------- */
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  /* ---------------- WhatsApp ---------------- */
  const whatsappNumber = '917623845944';
  const message = encodeURIComponent(
    `Hello, I am interested in this product:\n\n` +
      `Name: ${product.name}\n` +
      (product.category ? `Category: ${product.category}\n` : '') +
      (product.brand ? `Brand: ${product.brand}` : '')
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
      {/* IMAGE */}
      <div className="relative w-full h-60 bg-gray-100 overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.name || 'product'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />

        {/* Category badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            {product.category}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-1">
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-xs text-amber-700 font-medium mt-1">
            {product.brand}
          </p>
        )}

        {product.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* ACTIONS */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 text-white py-2.5 text-sm font-semibold hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding…' : 'Add to Cart'}
          </button>

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl bg-green-600 text-white py-2.5 text-sm font-semibold hover:bg-green-700 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
