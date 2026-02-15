'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const whatsappNumber = '917623845944';

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const productList = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Quantity: ${item.quantity}`
      )
      .join('\n\n');

    const message = encodeURIComponent(
      `Hello, I would like to place an order.\n\n` +
        `🛒 *Order Details:*\n\n` +
        `${productList}\n\n` +
        `Please let me know the next steps.`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">

        {/* Glow Background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#A83232]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#328A8A]/10 rounded-full blur-[140px]" />

        <div className="relative text-center px-6">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 mb-8">
            Explore our industrial products and start adding items to your cart.
          </p>

          <Link
            href="/products"
            className="bg-[#A83232] hover:bg-[#8a2828] text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <main className="relative min-h-screen py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#A83232]/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#328A8A]/10 rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-5 py-1 text-xs tracking-widest text-[#328A8A] border border-[#328A8A]/50 rounded-full">
            SHOPPING CART
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Your <span className="text-[#A83232]">Cart</span>
          </h1>
        </div>

        {/* Items */}
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative w-28 h-28 bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h3>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#A83232] hover:text-[#A83232] transition"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#A83232] hover:text-[#A83232] transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-[#A83232] hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12">

          <button
            onClick={clearCart}
            className="text-sm text-[#A83232] hover:underline"
          >
            Clear Cart
          </button>

          <button
            onClick={handleWhatsAppOrder}
            className="bg-[#A83232] hover:bg-[#8a2828] text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-lg"
          >
            Place Order via WhatsApp
          </button>
        </div>

      </div>
    </main>
  );
}

