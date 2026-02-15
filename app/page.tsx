'use client';

import Image from 'next/image';
import Link from 'next/link';

/* =====================
   ICONS
===================== */
import {
  PowerToolsIcon,
  FastenersIcon,
  AdhesivesIcon,
  PaintsIcon,
  SafetyIcon,
  ElectricalIcon,
} from './components/icons/CategoryIcons';

/* =====================
   DATA
===================== */
const values = [
  { title: 'Integrity', desc: 'Ethical, transparent, and honest business practices.' },
  { title: 'Quality Assurance', desc: 'Only certified and industrial-grade products.' },
  { title: 'Commitment', desc: 'On-time delivery with dependable support.' },
  { title: 'Industry Expertise', desc: 'Right solutions backed by real industrial experience.' },
];

const categories = [
  { name: 'Power Tools & Machinery', icon: PowerToolsIcon, desc: 'Drills, grinders, cutting machines, and heavy-duty tools.' },
  { name: 'Fasteners & Fittings', icon: FastenersIcon, desc: 'Bolts, nuts, screws, anchors, and fittings.' },
  { name: 'Adhesives & Sealants', icon: AdhesivesIcon, desc: 'Industrial bonding and sealing solutions.' },
  { name: 'Paints & Coatings', icon: PaintsIcon, desc: 'Protective paints for industrial surfaces.' },
  { name: 'Safety Equipment (PPE)', icon: SafetyIcon, desc: 'Helmets, gloves, masks, shoes, and safety gear.' },
  { name: 'Electrical Supplies', icon: ElectricalIcon, desc: 'Cables, switches, panels, and electrical items.' },
];

const brands = [
  { name: 'WD-40', logo: '/brands/WD-40.jpg' },
  { name: 'Loctite', logo: '/brands/Loctite.jpg' },
  { name: 'Hilti', logo: '/brands/Hilti.jpg' },
  { name: 'WD-40', logo: '/brands/WD-40.jpg' },
  { name: 'Loctite', logo: '/brands/Loctite.jpg' },
  { name: 'Hilti', logo: '/brands/Hilti.jpg' },
  { name: 'WD-40', logo: '/brands/WD-40.jpg' },
  { name: 'Loctite', logo: '/brands/Loctite.jpg' },
  { name: 'Hilti', logo: '/brands/Hilti.jpg' },
  { name: 'WD-40', logo: '/brands/WD-40.jpg' },
  { name: 'Loctite', logo: '/brands/Loctite.jpg' },
  { name: 'Hilti', logo: '/brands/Hilti.jpg' },
];
const catalogues = [
  {
    title: 'Industrial Hardware Catalogue',
    cover: '/catalogues/covers/tools.png',
    pdf: '/catalogues/hardware-tools.pdf',
  },
  {
    title: 'Safety Products Catalogue',
    cover: '/catalogues/covers/safety.jpg',
    pdf: '/catalogues/safety-equipment.pdf',
  },
  {
    title: 'Power Tools Catalogue',
    cover: '/catalogues/covers/tools.png',
    pdf: '/catalogues/hardware-tools.pdf',
  },
];


/* =====================
   PAGE
===================== */
export default function HomePage() {
  return (
    <main className="bg-[#f9fafb] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero-banner.png"
          alt="Industrial Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
            <span className="inline-block mt-5 mb-5 px-5 py-1 text-xs tracking-widest text-[#328A8A] border border-[#328A8A]/50 rounded-full">
                TRUSTED INDUSTRIAL SUPPLIER
              </span>

            <h1 className="text-5xl md:text-6xl font-extrabold">
                KUCHA <span className="text-[#328A8A]">ENTERPRISE</span>
              </h1>

              <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Supplying industrial tools, fasteners, safety equipment,
                adhesives, and electrical products across India.
              </p>

              <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="#categories" className="bg-[#A83232] hover:bg-[#8a2828] text-white px-9 py-4 rounded-lg font-semibold transition-colors">
                  Explore Products
                </Link>
              <Link href="/contact" className="border border-white/40 px-9 py-4 rounded-lg font-semibold">
                  Request a Quote
                </Link>
              </div>
            </div>

              <Image
                src="/images/bandwithbg.png"
            alt="Brands"
            
                width={520}
                height={340}
            className="object-contain mb-10"
              />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Geometric accent - diagonal stripe */}
        <div className="absolute top-0 right-0 w-full md:w-2/5 h-full bg-gradient-to-br from-[#A83232]/10 via-[#328A8A]/5 to-transparent skew-x-[-12deg] origin-top-right -translate-x-8" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#A83232] hidden md:block" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image block - offset for a unique feel */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] max-w-xl mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/images/aboutsection.png"
                  alt="Kucha Enterprise - Industrial supply and hardware"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[200px] bg-black/75 backdrop-blur-sm text-white px-4 py-3 rounded-lg">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#328A8A]">15+</span>
                  <span className="block text-xs sm:text-sm font-medium text-gray-200">Years of trust across industries</span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#A83232]/30 bg-transparent" aria-hidden="true" />
            </div>

            {/* Content block */}
            <div className="order-1 lg:order-2 lg:pl-4">
              <p className="text-[#A83232] font-semibold text-sm tracking-widest uppercase mb-3">About Kucha Enterprise</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Your Reliable Industrial Supply Partner
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
                Kucha Enterprise supplies industrial hardware and tools to manufacturers,
                contractors, and infrastructure projects with a focus on quality and reliability.
              </p>

              {/* Inline highlights */}
              <ul className="space-y-3 mb-8">
                {[
                  'Certified & industrial-grade products only',
                  'On-time delivery with dependable support',
                  'Right solutions backed by real industrial experience',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A83232]/20 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A83232]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#A83232] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8a2828] transition-colors"
              >
                Learn more about us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((v, i) => (
            <div key={i} className="border rounded-xl p-7 shadow hover:shadow-xl transition">
              <div className="h-1 w-12 bg-[#A83232] mb-4" />
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
        </div>
      </section>

     {/* ================= CATEGORIES ================= */}
      <section id="categories" className="py-24 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Product Range</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <div className="flex justify-center text-[#328A8A] mb-4">
            <cat.icon />
          </div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-600 mt-2">{cat.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================= ROTATING BRANDS ================= */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100">
{/* ================= Background Layers ================= */}
<div className="absolute inset-0 pointer-events-none">
  {/* Soft brand glows */}
  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#A83232]/10 rounded-full blur-[140px]" />
  <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#328A8A]/10 rounded-full blur-[140px]" />

  {/* Subtle center fade */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
</div>

        {/* Decorative background elements - Neutral */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200/5 rounded-full blur-3xl rotate-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200/5 rounded-full blur-3xl rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-gray-200/5 rounded-full blur-3xl rotate-slow" style={{ animationDuration: '30s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">
              Our Trusted Brands
        </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Partnering with industry leaders worldwide to bring you the finest quality products
        </p>
      </div>

          {/* Mobile Grid Layout (visible on small screens) */}
          <div className="block md:hidden">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
              {brands.map((brand, index) => {
                return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center"
                >
                  <div 
                    className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 transition-all duration-300 brand-float hover:scale-110 hover:shadow-xl cursor-pointer group"
                  >
                    <div 
                      className="absolute inset-0 rounded-full blur-md transition-all duration-300 group-hover:opacity-100 bg-gray-200/30"
                      style={{ 
                        opacity: 0.5
                      }}
                    ></div>
                    
                    
                    
                    <div className="relative z-10 p-2 sm:p-3">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={50}
                        height={35}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700 text-center">{brand.name}</p>
                </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Rotating Brands Container (hidden on mobile) */}
          <div className="hidden md:flex relative max-w-5xl mx-auto h-[400px] lg:h-[500px] items-center justify-center">
            {/* Center Content - Centered */}
            <div className="absolute z-20 text-center pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="px-6 py-4 lg:px-8 lg:py-6 mx-auto rounded-full bg-gray-100/50 flex items-center justify-center border-2 border-gray-200/50 shadow-lg">
                <p className="text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  Authorised Dealers
                </p>
              </div>
            </div>

            {/* Orbit Ring (Decorative) - Responsive sizes */}
            <div className="absolute w-[300px] h-[300px] lg:w-[420px] lg:h-[420px] border-2 border-dashed border-gray-200/50 rounded-full pointer-events-none"></div>
            <div className="absolute w-[270px] h-[270px] lg:w-[380px] lg:h-[380px] border border-gray-200/30 rounded-full pointer-events-none"></div>

            {/* Rotating Brands */}
            <div
              className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] orbit"
              style={{
                animation: 'orbit-anticlockwise 30s linear infinite',
                willChange: 'transform',
              }}
            >
              {brands.map((brand, index) => {
                const angle = (360 / brands.length) * index;
                const delay = index * 0.5;
                
                // Neutral color scheme for all brands
                const colors = {
                  glow: 'rgba(156, 163, 175, 0.2)',
                  glowHover: 'rgba(156, 163, 175, 0.4)',
                  borderColor: 'rgba(156, 163, 175, 0.3)',
                  gradientFrom: 'rgba(243, 244, 246, 0.8)'
                };

                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      transform: `rotate(${angle}deg)`,
                      animationDelay: `${delay}s`
                    }}
                  >
                    <div 
                      className="brand-orbit-radius cursor-pointer"
                      style={{ 
                        transform: `translateX(var(--orbit-x, 120px)) rotate(-${angle}deg)`,
                      }}
                    >
                      {/* Brand Card with Enhanced Styling */}
                      <div className="relative group">
                        {/* Glow Effect - Multi-color */}
                        <div 
                          className="absolute inset-0 rounded-full blur-xl transition-all duration-500 brand-glow group-hover:opacity-100 pointer-events-none"
                          style={{ 
                            backgroundColor: colors.glow,
                            opacity: 0.6
                          }}
                        ></div>
                        
                        {/* Main Brand Container - Responsive sizing */}
                        <div 
                          className="relative w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-gray-200 transition-all duration-300 brand-float cursor-pointer group-hover:scale-125 group-hover:shadow-2xl group-hover:z-10"
                        >
                          {/* Inner Glow Ring - Multi-color */}
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ background: `linear-gradient(to bottom right, ${colors.gradientFrom}, white)` }}
                          ></div>
                          
                          {/* Logo - Responsive sizing */}
                          <div className="relative z-10 p-2 lg:p-3 transform group-hover:scale-110 transition-transform duration-300">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={55}
                              height={40}
                              className="object-contain filter group-hover:brightness-110 transition-all duration-300 w-[55px] h-[40px] lg:w-[70px] lg:h-[50px]"
                            />
                          </div>

                          {/* Brand Name Tooltip */}
                          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                            <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                              {brand.name}
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <div className="border-4 border-transparent border-b-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Stats or Additional Info */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="w-2 h-2 bg-[#A83232] rounded-full animate-pulse"></span>
              <span>Trusted by 1000+ industrial partners</span>
            </div>
          </div>
        </div>
      </section>

      

   {/* ================= CATALOGUES ================= */}
<section className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100">
  <div className="max-w-7xl mx-auto px-6">

    {/* Section Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Product Catalogues
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Download our detailed catalogues featuring certified industrial-grade products
      </p>
    </div>

    {/* Catalogue Cards */}
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {catalogues.map((c, i) => (
        <div
          key={i}
          className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-[380px] bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src={c.cover}
              alt={c.title}
              fill
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {c.title}
            </h3>

            <Link
              href={c.pdf}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#A83232] hover:bg-[#8a2828] text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              View Catalogue
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A83232] to-[#328A8A]"></div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= STATS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {['1+ Years Experience','100+ Brands','1000+ Products','PAN India Delivery'].map((s,i)=>(
            <div key={i}>
              <h3 className="text-4xl font-extrabold text-[#A83232]">{s.split(' ')[0]}</h3>
              <p className="text-gray-600">{s.slice(s.indexOf(' '))}</p>
        </div>
      ))}
    </div>
      </section>

    

{/* ================= INDUSTRIES ================= */}
<section className="py-24 bg-gradient-to-b from-gray-100 via-white to-gray-50">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Industries We Serve
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Supplying industrial hardware solutions across multiple sectors with quality and reliability
      </p>
    </div>

    {/* Industry Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {[
        'Manufacturing & Engineering',
        'Infrastructure Projects',
        'Oil & Gas Industry',
        'Power Plants & Energy',
        'Construction & Contractors',
        'Maintenance & Repair (MRO)',
        'Automation & Pneumatics',
        'Chemical & Process Plants',
      ].map((industry) => (
        <div
          key={industry}
          className="group bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          {/* Icon placeholder (can be replaced later) */}
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#A83232]/10 flex items-center justify-center">
            <span className="w-6 h-6 bg-[#A83232] rounded-sm"></span>
          </div>

          <h3 className="font-semibold text-gray-800 text-sm leading-snug">
            {industry}
          </h3>

          {/* Accent */}
          <div className="mt-4 mx-auto w-10 h-1 bg-gradient-to-r from-[#A83232] to-[#328A8A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      ))}
    </div>

  </div>
</section>


{/* ================= CTA ================= */}
<section className="relative py-28 overflow-hidden bg-gradient-to-r from-[#A83232] via-[#922828] to-[#A83232]">

  {/* Soft glow effects */}
  <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-black/20 rounded-full blur-[120px]" />
  <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />

  <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
      Looking for a Reliable Industrial Supplier?
    </h2>

    <p className="mb-10 text-white/90 text-lg max-w-2xl mx-auto">
      Get in touch with us for bulk orders, quotations, and long-term industrial supply partnerships.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/contact"
        className="bg-black hover:bg-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105"
      >
        Contact Kucha Enterprise
      </Link>

      <Link
        href="#categories"
        className="border border-white/40 hover:border-white text-white px-10 py-4 rounded-full font-semibold transition-all duration-300"
      >
        Explore Products
      </Link>
    </div>
  </div>
</section>

    </main>
  );
}
