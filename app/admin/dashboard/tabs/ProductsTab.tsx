'use client';

// admin/dashboard/tabs/ProductsTab.tsx

import { useProducts } from '../../hooks/useProducts';
import EmptyState from '../../components/EmptyState';

export default function ProductsTab() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading products...</p>;

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Add products to display them on the website"
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p._id} className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-500">{p.category}</p>
        </div>
      ))}
    </div>
  );
}
