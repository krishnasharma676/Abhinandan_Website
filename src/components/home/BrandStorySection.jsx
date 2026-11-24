import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export default function BrandStorySection() {
  return (
    <section id="story" className="relative py-16 sm:py-24 bg-[#FAF8FC] border-b border-stone-100 overflow-hidden">
      
      {/* Scalloped Wave Top Edge */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <img
          src="/assets/chely/zigzag-1.webp"
          alt="scallop shape"
          className="w-full h-auto min-h-[14px] object-cover object-top"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/assets/brand/royal-whispers-trousseau.png"
                  alt="Artisanal gift box packing"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Philosophy Tag */}
              <div className="absolute -bottom-5 -right-5 p-4 rounded-2xl bg-white shadow-xl border border-stone-100 max-w-[220px] hidden sm:block">
                <p className="text-xs font-serif text-stone-900 leading-snug">
                  "A gift is a tangible echo of love & blessings."
                </p>
                <p className="text-[10px] text-[#FFA6B6] font-bold mt-1 uppercase tracking-wider font-sans">
                  — The Atelier Philosophy
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-6 space-y-5 font-sans">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3F6] border border-[#FFA6B6]/30 text-[#A31352]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA6B6]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Our Heritage & Craft
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              We Don't Just Pack Gifts. <br />
              <span className="text-[#FFA6B6]">
                We Immortalize Moments.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Founded on the belief that genuine gestures bridge all distances, <strong>{BRAND_CONFIG.name}</strong> was born as an ode to timeless Indian hospitality and modern artisanal craftsmanship by <strong>KDF NUTS</strong>.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Every wicker basket is hand-draped with lustrous acrylic pearls, every potli filled with single-estate California almonds and jumbo cashews, and every gift box styled with delicate ribbons and kundan embellishments.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-100 shadow-soft">
                <h4 className="font-serif text-base text-stone-900 mb-1">
                  Handcrafted In-House
                </h4>
                <p className="text-xs text-stone-500">
                  Zero generic sets. Reconfigured item by item with love.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-100 shadow-soft">
                <h4 className="font-serif text-base text-stone-900 mb-1">
                  Pan-India Safe Dispatch
                </h4>
                <p className="text-xs text-stone-500">
                  Shock-proof transit cushioning and express shipping.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FFA6B6] hover:bg-[#FF8E9E] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Our Gift Stylists</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
