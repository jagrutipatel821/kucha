'use client';

interface OfferHeroProps {
  offer: {
    title: string;
    subtitle?: string;
    description: string;
  };
}

export default function OfferHeroSection({ offer }: OfferHeroProps) {
  return (
    <section className="bg-black text-white h-[70vh] flex items-center justify-center text-center">
      <div className="max-w-3xl px-6">

        {/* Offer Badge */}
        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
          FESTIVE OFFER
        </span>

        {/* Offer Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          {offer.title}
        </h1>

        {/* Subtitle */}
        {offer.subtitle && (
          <p className="text-lg text-gray-300 mb-2">
            {offer.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          {offer.description}
        </p>

        {/* CTA */}
        <a
          href="#products"
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          View Products
        </a>

      </div>
    </section>
  );
}
