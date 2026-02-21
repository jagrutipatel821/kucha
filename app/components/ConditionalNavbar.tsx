'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'PRODUCTS', href: '/products' },
  { name: 'CATALOGUES', href: '/catalogues' },
  { name: 'CART', href: '/cart' },
  { name: 'CONTACT', href: '/contact' },
];

type NavUser = {
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'user';
};

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = Boolean(user);
  const displayName = [user?.firstName, user?.lastName]
    .map((value) => (value || '').trim())
    .filter(Boolean)
    .join(' ') || 'Account';

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/me', { method: 'GET', credentials: 'include' });
        if (!active) return;
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch {
        if (!active) return;
        setUser(null);
      }
    }

    checkAuth();
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setUserMenuOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setLoggingOut(false);
      setUser(null);
      setUserMenuOpen(false);
      window.location.href = '/';
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/black.png"
            alt="Kucha Enterprise"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative group"
              >
                <span
                  className={`transition ${
                    isActive ? 'text-[#A83232]' : 'text-gray-700 group-hover:text-[#A83232]'
                  }`}
                >
                  {link.name}
                </span>

                {/* Animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#A83232] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {isLoggedIn ? (
            <div ref={userMenuRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen((value) => !value)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition shadow-md"
              >
                {displayName.split(' ')[0]}
                <span aria-hidden="true">&#9662;</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-lg bg-white shadow-lg ring-1 ring-black/10 z-50">
                  <div className="py-1 text-sm">
                    {user?.role === 'admin' ? (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link href="/user/dashboard?tab=overview" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Overview</Link>
                        <Link href="/user/dashboard?tab=orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">My Orders</Link>
                        <Link href="/user/dashboard?tab=profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</Link>
                        <Link href="/user/dashboard?tab=support" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Support</Link>
                      </>
                    )}
                    <div className="border-t my-1" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 disabled:opacity-70"
                    >
                      {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:inline-flex items-center px-6 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition shadow-md"
              >
                Login
              </Link>
             
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col p-6 gap-4 text-sm font-medium tracking-wide">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${
                    isActive ? 'text-[#A83232]' : 'text-gray-700'
                  } hover:text-[#A83232] transition`}
                >
                  {link.name}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <>
                {user?.role === 'admin' ? (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="mt-2 text-gray-700 hover:text-[#A83232] transition"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/user/dashboard?tab=overview" onClick={() => setOpen(false)} className="mt-2 text-gray-700 hover:text-[#A83232] transition">Overview</Link>
                    <Link href="/user/dashboard?tab=orders" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#A83232] transition">My Orders</Link>
                    <Link href="/user/dashboard?tab=profile" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#A83232] transition">Profile</Link>
                    <Link href="/user/dashboard?tab=support" onClick={() => setOpen(false)} className="text-gray-700 hover:text-[#A83232] transition">Support</Link>
                  </>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-4 text-center px-6 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-70"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-4 text-center block px-6 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


