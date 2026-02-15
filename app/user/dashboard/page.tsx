'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Order {
  _id?: string;
  orderNumber?: string;
  id?: string;
  date?: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  createdAt?: string;
}

interface DashboardUser {
  firstName?: string;
  lastName?: string;
  email?: string;
}

/* ---------------------------
   ProfileMenu component — unchanged, re-used
   --------------------------- */
function ProfileMenu({
  avatarUrl,
  displayName = 'User',
  onNavigate,
  onLogout,
  loggingOut = false,
}: {
  avatarUrl?: string;
  displayName?: string;
  onNavigate: (tab: string) => void;
  onLogout?: () => void;
  loggingOut?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    function handleDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleDoc);
    return () => document.removeEventListener('mousedown', handleDoc);
  }, []);

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const initials = displayName
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  function handleClick(tab: string) {
    onNavigate(tab);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="profile" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
            {initials}
          </div>
        )}
        <span className="hidden sm:inline-block text-sm font-medium text-gray-700">{displayName.split(' ')[0]}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div className="py-1">
            <button role="menuitem" onClick={() => handleClick('overview')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Overview</button>
            <button role="menuitem" onClick={() => handleClick('orders')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</button>
            <button role="menuitem" onClick={() => handleClick('profile')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</button>
            <button role="menuitem" onClick={() => handleClick('support')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Support</button>

            <div className="border-t mt-1" />

            <button
              disabled={loggingOut}
              onClick={() => {
                setOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------
   UserDashboard (updated to fetch orders)
   --------------------------- */
export default function UserDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null); // null = loading
  const [error, setError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  function normalizeStatus(status: unknown): Order['status'] {
    const value = typeof status === 'string' ? status.toLowerCase() : '';
    if (value === 'completed') return 'Completed';
    if (value === 'processing') return 'Processing';
    if (value === 'pending') return 'Pending';
    if (value === 'cancelled') return 'Cancelled';
    return 'Pending';
  }

  function normalizeAmount(amount: unknown): number {
    const parsed = Number(amount);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function normalizeDate(value: unknown): string {
    if (!value) return '';
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);
  }

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadDashboardData() {
      setError(null);
      setOrders(null); // show loader
      try {
        const meRes = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
        });
        if (!meRes.ok) {
          if (meRes.status === 401) {
            router.replace('/login?redirect=/user/dashboard');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const me = await meRes.json();
        if (active) setUser(me);

        const res = await fetch('/api/orders', {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
        });
        if (!res.ok) {
          if (res.status === 401) {
            router.replace('/login?redirect=/user/dashboard');
            return;
          }
          const json = await res.json().catch(() => ({}));
          throw new Error(json?.error || 'Failed to fetch orders');
        }

        const data = await res.json();
        // Normalize into Order[] for the UI
        const fetched: Order[] = (data?.orders || []).map((o: any) => ({
          _id: o._id,
          orderNumber: o.orderNumber || o._id,
          id: o.orderNumber || o._id,
          date: normalizeDate(o.createdAt || o.date),
          product: String(o.product || 'Unknown product'),
          amount: normalizeAmount(o.amount),
          status: normalizeStatus(o.status),
          createdAt: o.createdAt,
        }));
        if (active) setOrders(fetched);
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'AbortError') return;
        console.error('Error fetching orders:', err);
        const message = err instanceof Error ? err.message : 'Error loading dashboard';
        if (active) {
          setError(message);
          setOrders([]); // show empty state on error
        }
      }
    }

    loadDashboardData();
    return () => {
      active = false;
      controller.abort();
    };
  }, [router]);

  useEffect(() => {
    const requestedTab = searchParams.get('tab');
    if (requestedTab && ['overview', 'orders', 'profile', 'support'].includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, [searchParams]);

  const displayName = [user?.firstName, user?.lastName]
    .map((value) => (value || '').trim())
    .filter(Boolean)
    .join(' ') || 'User';

  // compute stats safely
  const totalOrders = orders ? orders.length : 0;
  const totalSpent = orders ? orders.reduce((s, o) => s + o.amount, 0) : 0;
  const completedOrders = orders ? orders.filter((o) => o.status === 'Completed').length : 0;
  const pendingOrders = orders ? orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length : 0;

  // logout handler used by ProfileMenu
  async function handleLogout() {
    try {
      setLoggingOut(true);
      const res = await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      if (!res.ok) throw new Error('Logout failed');
      router.replace('/login');
    } catch (err) {
      console.error('Logout failed', err);
      router.replace('/login');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-3 xl:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:sticky md:top-6">
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kucha Enterprise</p>
                <h2 className="text-lg font-bold text-slate-900 mt-1">User Dashboard</h2>
              </div>
              <nav className="space-y-2">
                {[
                  { id: 'overview', name: 'Overview' },
                  { id: 'orders', name: 'My Orders' },
                  { id: 'profile', name: 'Profile' },
                  { id: 'support', name: 'Support' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
             
            </div>
          </aside>

          <section className="md:col-span-9 xl:col-span-10">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                  <p className="text-sm text-slate-600">Welcome back, {displayName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* <ProfileMenu
                    displayName={displayName}
                    onNavigate={(tab) => setActiveTab(tab)}
                    onLogout={handleLogout}
                    loggingOut={loggingOut}
                  /> */}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {orders === null && (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <p className="text-slate-700">Loading your dashboard...</p>
              </div>
            )}

            {orders !== null && activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                  <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-blue-600 to-blue-500">
                    <p className="text-sm text-blue-100">Total Orders</p>
                    <p className="text-3xl font-bold mt-1">{totalOrders}</p>
                  </div>
                  <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-cyan-500 to-sky-400">
                    <p className="text-sm text-cyan-100">Total Spent</p>
                    <p className="text-3xl font-bold mt-1">${totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <p className="text-sm text-violet-100">Completed</p>
                    <p className="text-3xl font-bold mt-1">{completedOrders}</p>
                  </div>
                  <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-emerald-500 to-teal-400">
                    <p className="text-sm text-emerald-100">In Progress</p>
                    <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all orders</button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {orders.length === 0 ? (
                      <div className="p-8 text-center text-slate-600">
                        <p className="mb-3">You don't have any orders yet.</p>
                        <Link href="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">Browse Products</Link>
                      </div>
                    ) : (
                      orders.slice(0, 3).map((order) => (
                        <div key={order._id ?? order.id} className="p-6 hover:bg-slate-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-900">Order {order.id}</p>
                              <p className="text-sm text-slate-600">{order.product}</p>
                              <p className="text-xs text-slate-500">Ordered on {order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-900">${order.amount.toFixed(2)}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'Processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.status === 'Pending'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>{order.status}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {orders !== null && activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">My Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-slate-600">
                      <p className="mb-3">You have no orders yet.</p>
                      <Link href="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">Shop Now</Link>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {orders.map((order) => (
                          <tr key={order._id ?? order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{order.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${order.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'Processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.status === 'Pending'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>{order.status}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              {order.status === 'Pending' && <button className="text-red-600 hover:text-red-900">Cancel</button>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input type="text" defaultValue={displayName === 'User' ? '' : displayName} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Support Center</h2>
                <div className="space-y-4">
                  <Link href="/contact" className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                    <h3 className="font-medium text-slate-900">Contact Support</h3>
                    <p className="text-sm text-slate-600">Get help from our support team</p>
                  </Link>
                  <div className="block p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="font-medium text-slate-900">FAQ</h3>
                    <p className="text-sm text-slate-600">Coming soon. Contact support for quick answers.</p>
                  </div>
                  <div className="block p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="font-medium text-slate-900">Documentation</h3>
                    <p className="text-sm text-slate-600">Coming soon. Reach out through Contact Support.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

