'use client';

// admin/dashboard/tabs/CategoriesTab.tsx

import { useCategories } from '../../hooks/useCategories';
import EmptyState from '../../components/EmptyState';

export default function CategoriesTab() {
  const { categories, loading } = useCategories();

  if (loading) return <p>Loading categories…</p>;

  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories found"
        description="Create categories to organize products"
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((c) => (
        <div
          key={c._id}
          className="bg-white border rounded-lg p-4"
        >
          <h3 className="font-semibold">{c.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              c.status === 'inactive'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {c.status ?? 'active'}
          </span>
        </div>
      ))}
    </div>
  );
}
