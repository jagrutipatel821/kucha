'use client';

import { useEffect, useState } from 'react';
import { Offer } from '../../types';
import EmptyState from '../../components/EmptyState';
import AddOfferModal from '../../components/AddOfferModal';

export default function OffersTab() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/offers?scope=all', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to load offers');
        setOffers([]);
        return;
      }
      setOffers(data.offers || []);
    } catch {
      setError('Failed to load offers');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleAddOffer = async (offerData: any) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to add offer');
        return;
      }
      setShowAddModal(false);
      await fetchOffers();
    } catch {
      setError('Failed to add offer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading offers...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Offers</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          disabled={submitting}
        >
          Add Offer
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </p>
      )}

      {offers.length === 0 ? (
        <EmptyState
          title="No offers available"
          description="Create festival or promotional offers"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((o) => (
            <div key={o._id} className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold">{o.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{o.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(o.startDate).toLocaleDateString()} to{' '}
                {new Date(o.endDate).toLocaleDateString()}
              </p>
              <p className="text-xs mt-2">
                <span
                  className={`px-2 py-1 rounded ${
                    o.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {o.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddOfferModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddOffer}
        />
      )}
    </div>
  );
}
