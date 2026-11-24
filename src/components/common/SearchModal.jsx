import React, { useState } from 'react';
import { X, Search, ArrowRight, Gift } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { OCCASIONS_DATA } from '../../data/categories';
import { BRAND_CONFIG } from '../../config/brand';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredOccasions = query.trim()
    ? OCCASIONS_DATA.filter((o) =>
        o.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-chocolate-dark/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-luxury border border-gold/30 p-6 z-10 space-y-5 animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Header Input */}
        <div className="relative flex items-center border-b border-cream-300 pb-4">
          <Search className="w-5 h-5 text-gold mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search luxury hampers, chocolates, candles, occasions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-chocolate placeholder:text-chocolate/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-chocolate/60 hover:text-chocolate transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        {query.trim() === '' ? (
          <div className="space-y-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark block">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Birthday Hampers', 'Wedding Trousseau', 'Belgian Chocolates', 'Anniversary Box', 'Corporate Kits'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-xs text-chocolate transition-colors border border-gold/20"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredProducts.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark block mb-2">
                  Matching Hampers ({filteredProducts.length})
                </span>
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <a
                      key={p.id}
                      href="#hampers"
                      onClick={onClose}
                      className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-semibold text-chocolate group-hover:text-burgundy">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-chocolate/60">
                            {BRAND_CONFIG.currency}{p.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-chocolate/40 group-hover:text-gold transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {filteredOccasions.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark block mb-2">
                  Occasions
                </span>
                <div className="space-y-2">
                  {filteredOccasions.map((occ) => (
                    <a
                      key={occ.id}
                      href="#occasions"
                      onClick={onClose}
                      className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 flex items-center justify-between text-xs font-medium text-chocolate group"
                    >
                      <span>{occ.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-chocolate/40 group-hover:text-gold transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && filteredOccasions.length === 0 && (
              <div className="text-center py-6 text-xs text-chocolate/60">
                No results found for "{query}". Try browsing our <a href="#hampers" onClick={onClose} className="text-burgundy underline">Full Catalog</a>.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

