import CatalogueCard from './CatalogueCard';
import { catalogues } from './catalogueData';

export default function CataloguesPage() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,50,50,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(50,138,138,0.1),_transparent_45%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_40%,_#f3f4f6)] py-24">

      {/* ===== Background Glow Effects ===== */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#A83232]/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#328A8A]/10 rounded-full blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ===== Header ===== */}
        <div className="mx-auto max-w-4xl text-center mb-14">
          <span className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 text-xs tracking-[0.22em] font-semibold text-[#328A8A] border border-[#328A8A]/40 rounded-full bg-white/70 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#328A8A]" />
            PRODUCT LIBRARY
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Product <span className="text-[#A83232]">Catalogues</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our professionally curated catalogues covering industrial
            hardware, tools, and safety solutions.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">{catalogues.length}</span> catalogues available for quick reference.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="rounded-full bg-[#A83232]/10 px-3 py-1 font-medium text-[#A83232]">PDF</span>
              <span className="rounded-full bg-[#328A8A]/10 px-3 py-1 font-medium text-[#328A8A]">Instant View</span>
            </div>
          </div>
        </div>

        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          {catalogues.map((item) => (
            <CatalogueCard key={item.title} catalogue={item} />
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-gray-200 bg-white/80 p-8 text-center shadow-lg shadow-gray-200/70">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Need a custom product list for your project?
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Contact our team and we will help you shortlist the right tools, fittings, and safety products.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A83232] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8a2828]"
          >
            Request Assistance
          </a>
        </div>

      </div>
    </section>
  );
}
