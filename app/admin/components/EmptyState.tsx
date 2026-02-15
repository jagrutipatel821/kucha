// admin/components/EmptyState.tsx

export default function EmptyState({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) {
    return (
      <div className="bg-white border rounded-lg p-8 text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    );
  }
  