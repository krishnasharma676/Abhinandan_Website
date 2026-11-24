import React from 'react';
import { Star, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { BRAND_CONFIG } from '../../config/brand';
import Button from '../common/Button';

export default function BestsellersShowcase() {
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 3);

  const handleWhatsAppOrder = (item) => {
    const text = `*✨ BESTSELLER HAMPER INQUIRY - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Product:* ${item.name}
*Price:* ${BRAND_CONFIG.currency}${item.price.toLocaleString('en-IN')}
*Details:* ${item.shortDescription}
----------------------------------------
Please share availability and dispatch timeline.`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900">
              Bestselling Collections
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-lg">
              The timeless icons that have brought smiles to thousands across India.
            </p>
          </div>

          <a
            href="#hampers"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-stone-900 hover:text-gold transition-colors group"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Bestseller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestsellers.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl bg-white border border-stone-200 shadow-soft hover:shadow-medium hover:border-gold/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow-sm border border-stone-200">
                  Bestseller #{idx + 1}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 mb-1.5 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                    <span className="text-[10px] text-stone-500 ml-1 font-semibold">
                      {item.rating} ({item.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="font-serif text-base font-bold text-stone-900">
                    {BRAND_CONFIG.currency}{item.price.toLocaleString('en-IN')}
                  </span>

                  <Button
                    onClick={() => handleWhatsAppOrder(item)}
                    variant="gold"
                    size="sm"
                    icon={MessageCircle}
                    className="text-xs"
                  >
                    Order on WhatsApp
                  </Button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
