import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../config/brand';
import { useCart } from '../context/CartContext';
import {
  Star,
  ShoppingBag,
  Gift,
  Check,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Package
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const images = product.images || [product.image];

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftNoteSelected, setGiftNoteSelected] = useState(true);

  // Related products from the same category or bestsellers
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      includeGoldFoiledCard: giftNoteSelected
    });
  };

  const handlePersonalize = () => {
    navigate('/customize');
  };

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-chocolate/60 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop Hampers</Link>
          <span>/</span>
          <span className="text-chocolate font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-cream-50 p-6 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury mb-16">
          
          {/* Gallery Column (Col span 6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-200 border border-gold/20 shadow-soft">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{product.tag}</Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? 'border-gold scale-105 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column (Col span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold tracking-wider text-gold-dark">
                  {product.category} Collection
                </span>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-chocolate/80">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-gold text-gold'
                            : 'text-cream-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-chocolate mb-3">
                {product.name}
              </h1>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-serif text-3xl font-bold text-burgundy">
                  {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-chocolate/40 line-through">
                    {BRAND_CONFIG.currency}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="blush" size="sm">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed font-sans mb-6">
                {product.description}
              </p>

              {/* Included Treasures Checklist */}
              {product.itemsIncluded && (
                <div className="p-5 rounded-2xl bg-cream-100 border border-gold/25 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-3">
                    Curated Treasures Inside This Box:
                  </h4>
                  <ul className="space-y-2 text-xs text-chocolate/85">
                    {product.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dimensions & Packaging info */}
              <div className="grid grid-cols-2 gap-3 text-xs text-chocolate/70 mb-6 p-3 rounded-xl bg-cream-200/50 border border-cream-300">
                <div>
                  <span className="font-semibold text-chocolate">Box Size:</span> {product.boxDimensions || '32 x 24 x 12 cm'}
                </div>
                <div>
                  <span className="font-semibold text-chocolate">Est. Weight:</span> {product.weight || '2.0 kg'}
                </div>
              </div>

              {/* Complimentary Card Checkbox */}
              <label className="flex items-center gap-2 mb-6 text-xs text-chocolate cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftNoteSelected}
                  onChange={(e) => setGiftNoteSelected(e.target.checked)}
                  className="w-4 h-4 rounded text-gold focus:ring-gold border-cream-300"
                />
                <span>Include complimentary hand-lettered 24K gold-foiled blessing note</span>
              </label>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-6 border-t border-cream-300 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-chocolate/80">
                  Quantity:
                </span>
                <div className="flex items-center border border-gold/40 rounded-full bg-cream-100 px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center text-chocolate hover:text-gold font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-chocolate">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-chocolate hover:text-gold font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="gold"
                  size="lg"
                  icon={ShoppingBag}
                  className="w-full shadow-medium font-bold text-sm"
                >
                  Add to Cart • {BRAND_CONFIG.currency}{(product.price * quantity).toLocaleString('en-IN')}
                </Button>

                <Button
                  onClick={handlePersonalize}
                  variant="outline"
                  size="lg"
                  icon={Gift}
                  className="w-full text-sm font-semibold"
                >
                  Personalize in Studio
                </Button>
              </div>

              {/* Shipping notes */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-chocolate/60">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>Pan-India 24-48 Hr Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>Breakage & Transit Insurance</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-chocolate">
                You May Also Admire
              </h3>
              <Link to="/shop" className="text-xs font-semibold text-burgundy hover:underline flex items-center gap-1">
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="p-4 rounded-2xl bg-cream-50 border border-gold/25 shadow-soft hover:shadow-medium transition-all group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-cream-200 mb-3">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate group-hover:text-burgundy transition-colors">
                      {rel.name}
                    </h4>
                    <p className="font-serif text-xs font-bold text-burgundy mt-1">
                      {BRAND_CONFIG.currency}{rel.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

