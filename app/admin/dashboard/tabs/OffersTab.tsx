'use client';

// admin/dashboard/tabs/OffersTab.tsx

import { useEffect, useState } from 'react';
import { Offer } from '../../types';
import EmptyState from '../../components/EmptyState';

export default function OffersTab() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      setLoading(true);
      const res = await fetch('/api/offers', {
        credentials: 'include',
      });
      const data = await res.json();
      setOffers(data.offers || []);
      setLoading(false);
    }
    fetchOffers();
  }, []);

  if (loading) return <p>Loading offers…</p>;

  if (offers.length === 0) {
    return (
      <EmptyState
        title="No offers available"
        description="Create festival or promotional offers"
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((o) => (
        <div
          key={o._id}
          className="bg-white border rounded-lg p-4"
        >
          <h3 className="font-semibold">{o.title}</h3>
          <p className="text-sm text-gray-600">{o.description}</p>
          <p className="text-xs text-gray-400 mt-2">
            {o.startDate} → {o.endDate}
          </p>
        </div>
      ))}
    </div>
  );
}
