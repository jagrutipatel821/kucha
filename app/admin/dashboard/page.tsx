'use client';

// admin/dashboard/page.tsx

import { useEffect, useState } from 'react';
import AdminTabs from '../components/AdminTabs';

type Tab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'orders'
  | 'users'
  | 'offers';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (!res.ok) return (window.location.href = '/login');

      const user = await res.json();
      if (user.role !== 'admin') {
        window.location.href = '/dashboard';
        return;
      }

      setCheckingAuth(false);
    }

    checkAdmin();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Manage Kucha Enterprise</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded shadow">
            Welcome to the Admin Panel
          </div>
        )}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded shadow">
            Products panel coming soon.
          </div>
        )}
        {activeTab === 'categories' && (
          <div className="bg-white p-6 rounded shadow">
            Categories panel coming soon.
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded shadow">
            Orders panel coming soon.
          </div>
        )}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded shadow">
            Users panel coming soon.
          </div>
        )}
        {activeTab === 'offers' && (
          <div className="bg-white p-6 rounded shadow">
            Offers panel coming soon.
          </div>
        )}
      </main>
    </div>
  );
}
