'use client';

import { useMemo, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import EmptyState from '../../components/EmptyState';
import AddProductModal from '../../components/AddProductModal';
import EditProductModal from '../../components/EditProductModal';
import { Product } from '../../types';

export default function ProductsTab() {
  const { products, loading, refetch } = useProducts();
  const { categories } = useCategories();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCategories = useMemo(
    () => categories.filter((c) => c.status === 'active'),
    [categories]
  );

  const handleUpdateProduct = async (updatedProduct: Product) => {
    if (!updatedProduct._id) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update product');
        return;
      }

      setEditingProduct(null);
      await refetch();
    } catch {
      setError('Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this product?')) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete product');
        return;
      }

      await refetch();
    } catch {
      setError('Failed to delete product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading products...</p>;

  if (activeCategories.length === 0) {
    return (
      <EmptyState
        title="No active categories"
        description="Create and activate at least one category before adding products"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          disabled={submitting}
        >
          Add Product
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </p>
      )}

      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Add products to display them on the website"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-sm text-gray-500 mt-1">Stock: {p.stock}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditingProduct(p)}
                  className="px-3 py-1.5 text-xs rounded bg-gray-100 hover:bg-gray-200"
                  disabled={submitting}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
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
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={async () => {
            setShowAddModal(false);
            await refetch();
          }}
          categories={activeCategories}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
          categories={activeCategories}
        />
      )}

      {submitting && <p className="text-sm text-gray-500">Saving changes...</p>}
    </div>
  );
}
