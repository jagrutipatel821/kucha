'use client';

// admin/hooks/useOrders.ts

import { useEffect, useState } from 'react';
import { Order } from '../types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        credentials: 'include',
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, refetch: fetchOrders };
}
