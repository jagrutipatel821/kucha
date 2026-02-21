'use client';

import { useState } from 'react';
import { Product, Category } from '../types';

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
  categories: Category[];
}

export default function AddProductModal({
  onClose,
  onAdd,
  categories,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: categories.length > 0 ? categories[0].name : '',
    brand: '',
    stock: '0',
    featured: false,
    status: 'active' as 'active' | 'inactive',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categoryOptions = categories
    .filter((c) => c.status === 'active')
    .map((c) => c.name);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('stock', formData.stock || '0');
    data.append('featured', String(formData.featured));
    data.append('status', formData.status);
    if (selectedImage) data.append('image', selectedImage);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert('Product added successfully!');
        onAdd(result.product);
        onClose();
      } else {
        alert(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 text-xl sm:text-2xl"
            >
              x
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* Status & Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-3 border rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured Product
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border rounded-lg text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
