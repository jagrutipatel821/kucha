import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-4">
          Welcome to Kucha Enterprise. By creating an account and using our services, you agree to the following terms.
        </p>
        <section className="space-y-4 text-gray-600">
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">1. Account Responsibility</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">2. Use of Services</h2>
            <p>Our services are intended for legitimate business use. You agree to use the platform in compliance with applicable laws and regulations.</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">3. Product Information</h2>
            <p>We strive to provide accurate product information. Please verify specifications before placing orders.</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">4. Contact</h2>
            <p>For questions about these terms, please contact us through our contact page.</p>
          </div>
        </section>
        <Link
          href="/register"
          className="inline-block mt-8 text-[#A83232] hover:underline font-medium"
        >
          ← Back to registration
        </Link>
      </div>
    </main>
  );
}
