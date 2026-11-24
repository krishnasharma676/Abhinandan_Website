import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../../data/categories';

export default function OccasionsGrid() {
  return (
    <section id="occasions" className="py-14 sm:py-20 bg-[#FAF8FC] border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA6B6] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA6B6]" />
              <span>Thoughtful Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Shop By Occasions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg font-sans">
              Find the perfect tailored expression for weddings, milestones, heartfelt thank-yous, and festive blessings.
            </p>
          </div>

          <a
            href="#hampers"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#FFA6B6] hover:text-white text-xs font-bold uppercase tracking-wider text-[#8A67B7] border border-[#8A67B7]/20 transition-all duration-300 shadow-sm self-center sm:self-auto group"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OCCASIONS_DATA.map((occ) => (
            <a
              key={occ.id}
              href="#hampers"
              className="group relative rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-soft hover:shadow-xl hover:border-[#FFA6B6]/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-50">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />

                {/* Chely Pink Badge */}
                {occ.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FFA6B6] text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {occ.badge}
                  </div>
                )}

                {/* Hamper Count Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-0.5 rounded-full bg-stone-950/70 backdrop-blur-sm text-[10px] font-bold text-white">
                  {occ.count} Hampers
                </div>
              </div>

              {/* Content info */}
              <div className="p-5 flex-1 flex flex-col justify-between font-sans">
                <div>
                  <h3 className="font-serif text-xl font-normal text-stone-900 group-hover:text-[#FFA6B6] transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#8A67B7] group-hover:text-[#FFA6B6] transition-colors">
                  <span className="uppercase tracking-wider">Explore Collection</span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF8FC] group-hover:bg-[#FFA6B6] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
