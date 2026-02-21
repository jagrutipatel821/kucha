import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Offer from '@/models/Offer';
import OfferHeroSection from '../components/OfferHeroSection';
import ProductCard from '../components/ProductCard';
import SearchableProducts from '../components/SearchableProducts';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products: any[] = [];
  let offer: any = null;

  try {
    await connectDB();

    // Fetch products
    const rawProducts = await Product.find({ status: 'active' }).lean();
    products = rawProducts.map((p: any) => ({
      _id: p._id.toString(),
      name: p.name,
      description: p.description,
      category: p.category,
      brand: p.brand,
      stock: p.stock,
      image: p.image,
      featured: p.featured,
      status: p.status,
    }));

    // Fetch active offer directly from DB to avoid base URL issues
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    offer = await Offer.findOne({
      active: true,
      startDate: { $lte: todayEnd },
      endDate: { $gte: todayStart },
    }).lean();
  } catch (error) {
    console.error('Products page error:', error);
  }

  return (
    <div className="bg-white min-h-screen">
      <section id="products">
        {offer && <OfferHeroSection offer={offer as any} />}

        <div className="max-w-5xl mx-auto px-6 py-30 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">All Products</h2>

          <SearchableProducts products={products} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
