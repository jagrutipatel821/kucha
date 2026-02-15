'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b0f19] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">

        {/* ===== Main Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & About */}
          <div>
            <Image
              src="/whitetextlogo.png"
              alt="Kucha Enterprise"
              width={220}
              height={90}
              className="mb-10 mt-10"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Kucha Enterprise is a trusted supplier committed to delivering
              high-quality products with consistent standards, timely delivery,
              and long-term customer satisfaction.
            </p>

            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>✔ Quality Assured Products</p>
              <p>✔ Reliable Supply Chain</p>
              <p>✔ Competitive Pricing</p>
            </div>
          </div>

          {/* Products / Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">
              Our Products
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Industrial Supplies</li>
              <li>Raw Materials</li>
              <li>Packaging Materials</li>
              <li>Customized Solutions</li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">
              Business Information
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <span className="text-gray-300 font-medium">Working Hours:</span><br />
                Monday – Saturday<br />
                10:00 AM – 7:00 PM
              </p>

              <p>
                <span className="text-gray-300 font-medium">Service Area:</span><br />
                Gujarat & nearby regions
              </p>

              <p>
                <span className="text-gray-300 font-medium">Business Type:</span><br />
                Supplier & Distributor
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">
              Contact Us
            </h4>

            <div className="text-sm space-y-4 text-gray-400">
              <p className="leading-relaxed lowercase">
                d/7 keval shopping center,<br />
                old national highway,<br />
                ankleshwar, gujarat – 393002
              </p>

              <p>
                Email:{' '}
                <a
                  href="mailto:kuchaent.12@gmail.com"
                  className="text-[#328A8A] hover:text-[#3ba3a3] hover:underline transition-colors"
                >
                  kuchaent.12@gmail.com
                </a>
              </p>

              <p>
                Phone:{' '}
                <a
                  href="tel:+917623845944"
                  className="text-[#328A8A] hover:text-[#3ba3a3] hover:underline transition-colors"
                >
                  +91 76238 45944
                </a>
              </p>

              <div className="flex gap-4 pt-2">
  <a
    href="https://www.linkedin.com"
    target="_blank"
    className="text-gray-400 hover:text-[#328A8A] transition-colors"
  >
    LinkedIn
  </a>
  <a
    href="https://instagram.com"
    target="_blank"
    className="text-gray-400 hover:text-[#328A8A] transition-colors"
  >
    Instagram
  </a>
</div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Kucha Enterprise. All rights reserved.
          </p>
          <p>
            Trusted Partner for Quality & Reliability
          </p>
        </div>
      </div>
    </footer>
  );
}
