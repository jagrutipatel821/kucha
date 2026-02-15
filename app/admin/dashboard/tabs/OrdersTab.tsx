'use client';

// admin/dashboard/tabs/OrdersTab.tsx

import { useOrders } from '../../hooks/useOrders';
import EmptyState from '../../components/EmptyState';

export default function OrdersTab() {
  const { orders, loading } = useOrders();

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Orders placed by customers will appear here"
      />
    );
  }

  return (
    <div className="bg-white border rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-3">{o.orderNumber}</td>
              <td className="p-3">Rs {o.amount}</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs bg-gray-200">
                  {o.status}
                </span>
              </td>
              <td className="p-3">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
