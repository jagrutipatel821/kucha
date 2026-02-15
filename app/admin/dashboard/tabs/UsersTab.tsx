'use client';

// admin/dashboard/tabs/UsersTab.tsx

import { useEffect, useState } from 'react';
import { User } from '../../types';
import EmptyState from '../../components/EmptyState';

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const res = await fetch('/api/users', {
        credentials: 'include',
      });
      const data = await res.json();
      setUsers(data.users || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        description="Registered users will appear here"
      />
    );
  }

  return (
    <div className="bg-white border rounded-lg">
      {users.map((u) => (
        <div
          key={u._id}
          className="flex justify-between items-center p-4 border-b"
        >
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-gray-200">
            {u.status}
          </span>
        </div>
      ))}
    </div>
  );
}
