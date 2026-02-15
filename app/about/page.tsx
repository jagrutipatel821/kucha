'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  PowerToolsIcon,
  FastenersIcon,
  AdhesivesIcon,
  PaintsIcon,
  SafetyIcon,
  ElectricalIcon,
} from '../components/icons/CategoryIcons';

const values = [
  {
    title: 'Integrity',
    desc: 'We believe in honest dealings, ethical practices, and transparent communication.',
  },
  {
    title: 'Quality',
    desc: 'We supply only certified, durable, and industrial-grade products.',
  },
  {
    title: 'Commitment',
    desc: 'We ensure timely delivery and dependable after-sales support.',
  },
  {
    title: 'Innovation',
    desc: 'We continuously upgrade our offerings to meet modern industrial needs.',
  },
];

const categories = [
  { name: 'Power Tools', icon: PowerToolsIcon },
  { name: 'Fasteners & Bolts', icon: FastenersIcon },
  { name: 'Adhesives & Sealants', icon: AdhesivesIcon },
  { name: 'Paints & Coatings', icon: PaintsIcon },
  { name: 'Safety Equipment', icon: SafetyIcon },
  { name: 'Electrical Supplies', icon: ElectricalIcon },
];

const industries = [
  'Manufacturing Units',
  'Construction Firms',
  'Chemical Industries',
  'Automotive Workshops',
  'Electrical Contractors',
  'Maintenance Companies',
];

export default function About() {
  return (
    <main className="bg-[#f9fafb] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src="/images/about.png"
          alt="About Kucha Enterprise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6">
          <span className="inline-block mb-6 px-5 py-1 text-xs tracking-widest text-[#328A8A] border border-[#328A8A]/50 rounded-full">
            ABOUT US
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold">
            KUCHA <span className="text-[#328A8A]">ENTERPRISE</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg">
            Trusted Supplier of Industrial Hardware & Tools Across India
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Who We Are
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            <strong>Kucha Enterprise</strong> is a trusted industrial hardware
            supplier based in Ankleshwar, Gujarat. Founded and managed by
            <strong> Mr. Kalpesh Kucha</strong> and
            <strong> Mr. Sanjay Kucha</strong>, we provide high-quality industrial
            solutions backed by reliability and customer-first service.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Our Vision & Core Values
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="h-1 w-12 bg-[#A83232] mb-4 mx-auto" />
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Our Product Categories
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <div className="flex justify-center text-[#328A8A] mb-4">
                  <cat.icon />
                </div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Industries We Serve
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#A83232] via-[#922828] to-[#A83232]">

        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-black/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center text-white px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Let’s Build Long-Term Partnerships
          </h2>
          <p className="mb-10 text-white/90 text-lg">
            Contact us today for product inquiries, quotations, or dealership opportunities.
          </p>

          <Link
            href="/contact"
            className="bg-black hover:bg-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Contact Kucha Enterprise
          </Link>
        </div>
      </section>

    </main>
  );
}
