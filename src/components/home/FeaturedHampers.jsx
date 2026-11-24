import React, { useState } from 'react';
import { Eye, Star, Sparkles, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { BRAND_CONFIG } from '../../config/brand';
import QuickViewModal from '../common/QuickViewModal';

export default function FeaturedHampers() {
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const featuredProducts = PRODUCTS.slice(0, 6);

  const handleWhatsAppOrder = (product) => {
    const text = `*✨ LUXURY HAMPER INQUIRY - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Product:* ${product.name}
*Price:* ${BRAND_CONFIG.currency}${product.price.toLocaleString('en-IN')}
*Details:* ${product.shortDescription || product.description}
----------------------------------------
Hi Abhinandan Gifting Team, please confirm availability, custom packaging options & delivery timeline.`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="hampers" className="py-16 sm:py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Chely Style */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA6B6]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA6B6]" />
            <span>Curator's Special</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Special Box For The Gift
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-lg mx-auto">
            Our most requested and lavishly assembled hampers by KDF NUTS, draped with pearls, golden potlis, and floral brooches.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => {
            const mainImg = (product.images && product.images[0]) || product.image;

            return (
              <div
                key={product.id}
                className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-soft hover:shadow-xl hover:border-[#FFA6B6]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8FC]">
                  <img
                    src={mainImg}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#FFA6B6] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-[#8A67B7]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedQuickView(product)}
                      className="px-5 py-2.5 rounded-full bg-white text-[#8A67B7] hover:bg-[#FFA6B6] hover:text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex-1 flex flex-col justify-between font-sans">
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex text-[#FFCF3A]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating || 5)
                                ? 'fill-[#FFCF3A] text-[#FFCF3A]'
                                : 'text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-stone-500">
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 group-hover:text-[#FFA6B6] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription || product.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-[#A31352]">
                        {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through ml-2">
                          {BRAND_CONFIG.currency}{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="px-5 py-2.5 rounded-full bg-[#FFA6B6] hover:bg-[#FF8E9E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
          onAddToCart={() => handleWhatsAppOrder(selectedQuickView)}
        />
      )}
    </section>
  );
}
