import React from 'react';
import { Link } from 'react-router-dom';
import { OCCASIONS_DATA } from '../data/categories';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import Button from '../components/common/Button';

export default function OccasionsPage() {
  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Occasions Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate">
            Gifts Curated for Every Milestone
          </h1>
          <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed font-sans max-w-xl mx-auto">
            From regal wedding trousseau trunks to gentle newborn pampering sets, discover the thoughtful artistry created for life's most meaningful moments.
          </p>
        </div>

        {/* Occasions Full Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OCCASIONS_DATA.map((occ) => (
            <div
              key={occ.id}
              className="group rounded-3xl overflow-hidden bg-cream-50 border border-gold/30 shadow-soft hover:shadow-luxury transition-all duration-500 flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-cream-200 shrink-0">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {occ.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cream-50/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-burgundy shadow-sm border border-gold/30">
                    {occ.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                    {occ.count} Signature Curations
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate group-hover:text-burgundy transition-colors">
                    {occ.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed mt-2.5">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-cream-300 flex items-center justify-between">
                  <Link to={`/shop?occasion=${occ.slug}`}>
                    <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                      View Collection
                    </Button>
                  </Link>

                  <Link
                    to="/customize"
                    className="text-xs font-semibold text-gold-dark hover:text-burgundy flex items-center gap-1 transition-colors"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Build Custom</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

