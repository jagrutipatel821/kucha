import Image from 'next/image';
import Link from 'next/link';

type Catalogue = {
  cover: string;
  title: string;
  pdf: string;
};

interface CatalogueCardProps {
  catalogue: Catalogue;
}

export default function CatalogueCard({ catalogue }: CatalogueCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Accent Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A83232] to-[#328A8A]" />

      {/* Image Section */}
      <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-gray-100">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-gray-700 shadow">
          PDF CATALOGUE
        </span>
        <Image
          src={catalogue.cover}
          alt={catalogue.title}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h2 className="mb-3 text-lg font-bold text-gray-900">
          {catalogue.title}
        </h2>
        <p className="mb-5 text-sm text-gray-600">
          Ready-to-view product catalogue for procurement and technical reference.
        </p>

        <Link
          href={catalogue.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#A83232] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#8a2828] hover:gap-3"
        >
          View Catalogue
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Soft Hover Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[250px] h-[250px] bg-[#A83232]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] bg-[#328A8A]/10 rounded-full blur-[100px]" />
      </div>
    </article>
  );
}
