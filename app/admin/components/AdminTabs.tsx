'use client';

// admin/components/AdminTabs.tsx

type Tab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'orders'
  | 'users'
  | 'offers';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
  { id: 'orders', label: 'Orders' },
  { id: 'users', label: 'Users' },
  { id: 'offers', label: 'Offers' },
];

export default function AdminTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}) {
  return (
    <div className="flex gap-6 border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 text-sm font-medium relative transition ${
            activeTab === tab.id
              ? 'text-[#A83232]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#A83232]" />
          )}
        </button>
      ))}
    </div>
  );
}
