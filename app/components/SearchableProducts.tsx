'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  brand?: string;
  category?: string;
}

export default function SearchableProducts({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();

    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }, [search, products]);

  return (
    <>
      {/* 🔍 Search Section */}
      <div className="mb-10 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by name, brand, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
      </div>

      {/* 🧾 Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center">
            No products found.
          </p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        )}
      </div>
    </>
  );
}
