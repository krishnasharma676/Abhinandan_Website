import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { OCCASIONS_DATA } from '../data/categories';
import { BRAND_CONFIG } from '../config/brand';
import { useCart } from '../context/CartContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Eye,
  Gift,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import QuickViewModal from '../components/common/QuickViewModal';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const occasionParam = searchParams.get('occasion') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(occasionParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const { addToCart } = useCart();

  // Filter and sort
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('occasion');
    } else {
      searchParams.set('occasion', catSlug);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Curated Gifting Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate">
            Bespoke Luxury Hampers
          </h1>
          <p className="text-xs sm:text-sm text-chocolate/70 leading-relaxed font-sans">
            Every hamper is hand-assembled in our atelier with artisanal treats, floral touches, and personalized gold-stamped stationery.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-cream-50 p-4 sm:p-6 rounded-3xl border border-gold/25 shadow-soft mb-10 space-y-4">
          
          {/* Search and Sort row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by hamper name, item, or treat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate placeholder:text-chocolate/40"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-chocolate/70">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-full bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate font-medium"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Occasion / Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-cream-300">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-chocolate text-cream-50 font-semibold shadow-soft'
                  : 'bg-cream-200 text-chocolate/80 hover:bg-cream-300'
              }`}
            >
              All Hampers ({PRODUCTS.length})
            </button>

            {OCCASIONS_DATA.map((occ) => (
              <button
                key={occ.id}
                onClick={() => handleCategoryChange(occ.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === occ.slug
                    ? 'bg-chocolate text-cream-50 font-semibold shadow-soft'
                    : 'bg-cream-200 text-chocolate/80 hover:bg-cream-300'
                }`}
              >
                {occ.title}
              </button>
            ))}
          </div>

        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-chocolate/70 mb-6">
          <span>Showing {filteredProducts.length} curated gift hampers</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="text-burgundy font-semibold hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-cream-50 rounded-3xl border border-gold/20 p-8">
            <Gift className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-chocolate mb-1">
              No hampers match your search criteria
            </h3>
            <p className="text-xs text-chocolate/60 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or design a custom hamper with your desired treats.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              variant="outline"
              size="md"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const mainImg = product.images[0] || product.image;

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl overflow-hidden bg-cream-50 border border-gold/25 shadow-soft hover:shadow-luxury transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-cream-200">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={mainImg}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {product.tag && (
                      <div className="absolute top-4 left-4 z-10 pointer-events-none">
                        <Badge variant="gold">{product.tag}</Badge>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-chocolate-dark/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedQuickView(product)}
                        className="px-3.5 py-2 rounded-full bg-cream-50/95 text-chocolate hover:bg-gold hover:text-white text-xs font-semibold shadow-medium flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Eye className="w-4 h-4 text-gold group-hover:text-white" />
                        <span>Quick View</span>
                      </button>

                      <Link
                        to={`/product/${product.id}`}
                        className="px-3.5 py-2 rounded-full bg-burgundy text-white hover:bg-burgundy-deep text-xs font-semibold shadow-medium flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center text-gold">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating || 5)
                                  ? 'fill-gold text-gold'
                                  : 'text-cream-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-chocolate/70">
                          {product.rating} ({product.reviewsCount})
                        </span>
                      </div>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg font-bold text-chocolate hover:text-burgundy transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-chocolate/75 line-clamp-2 mt-2 leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-cream-300">
                      <div className="flex items-baseline justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-burgundy font-serif">
                            {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-chocolate/40 line-through">
                              {BRAND_CONFIG.currency}{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {product.originalPrice && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => addToCart(product, 1)}
                          variant="gold"
                          size="sm"
                          icon={ShoppingBag}
                          className="w-full text-xs"
                        >
                          Add to Cart
                        </Button>

                        <Link to="/customize" className="w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Gift}
                            className="w-full text-xs"
                          >
                            Personalize
                          </Button>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          isOpen={!!selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
          onCustomize={() => {}}
        />
      )}
    </div>
  );
}

