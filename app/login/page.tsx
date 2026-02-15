'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const res = await fetch('/api/me', { method: 'GET', credentials: 'include' });
        if (!active) return;

        if (res.ok) {
          const user = await res.json();
          router.replace(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
          return;
        }
      } catch {
        // ignore and show login form
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    checkSession();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, adminKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push(data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch {
      setError('Unable to login right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
        <p className="text-gray-700">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Login</h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A83232]/40"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A83232]/40"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Secret Key (admins only)</label>
        <input
          name="adminKey"
          type="password"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Enter admin key if admin"
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A83232]/40"
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#A83232] hover:bg-[#8a2828] disabled:opacity-70 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Not registered?{' '}
          <Link href="/register" className="text-[#A83232] hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </main>
  );
}
