'use client';

import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import EmptyState from '../../components/EmptyState';
import AddCategoryModal from '../../components/AddCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';
import { Category } from '../../types';

export default function CategoriesTab() {
  const { categories, loading, refetch } = useCategories();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = async (category: Omit<Category, '_id'>) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to add category');
        return;
      }

      setShowAddModal(false);
      await refetch();
    } catch {
      setError('Failed to add category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    if (!category._id) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/categories/${category._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update category');
        return;
      }

      setEditingCategory(null);
      await refetch();
    } catch {
      setError('Failed to update category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!category._id) return;
    if (!confirm(`Delete category "${category.name}"?`)) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/categories/${category._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete category');
        return;
      }

      await refetch();
    } catch {
      setError('Failed to delete category');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          disabled={submitting}
        >
          Add Category
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </p>
      )}

      {categories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Create categories to organize products"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c._id} className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{c.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    c.status === 'inactive'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {c.status ?? 'active'}
                </span>
                <span className="text-xs text-gray-500">
                  Products: {c.productCount ?? 0}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditingCategory(c)}
                  className="px-3 py-1.5 text-xs rounded bg-gray-100 hover:bg-gray-200"
                  disabled={submitting}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c)}
                  className="px-3 py-1.5 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                  disabled={submitting}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCategory}
        />
      )}

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
}
