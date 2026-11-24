import React, { useState } from 'react';
import { X, Star, Gift, Check, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import Button from './Button';
import Badge from './Badge';

export default function QuickViewModal({ product, isOpen, onClose, onCustomize }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftNoteOption, setGiftNoteOption] = useState(true);

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];

  const handleWhatsAppOrder = () => {
    const text = `*✨ HAMPER INQUIRY - ${BRAND_CONFIG.name.toUpperCase()}*
----------------------------------------
*Product:* ${product.name}
*Quantity:* ${quantity}
*Total Value:* ${BRAND_CONFIG.currency}${(product.price * quantity).toLocaleString('en-IN')}
*Complimentary Card:* ${giftNoteOption ? 'Yes (Include Gold-Foiled Card)' : 'No'}
----------------------------------------
Please confirm availability and dispatch timeline.`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-luxury border border-stone-200 overflow-hidden z-10 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 z-20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Gallery */}
          <div className="p-5 sm:p-6 bg-stone-50 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-sm border border-stone-200 mb-3 bg-white">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full bg-white text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow-sm border border-stone-200">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImageIndex === idx ? 'border-gold ring-1 ring-gold' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Badges info */}
            <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Pan-India Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Pristine Transit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating || 5) ? 'fill-gold text-gold' : 'text-stone-300'
                    }`}
                  />
                ))}
                <span className="text-[11px] font-semibold text-stone-600 ml-1">
                  {product.rating} ({product.reviewsCount || 40} reviews)
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1.5">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold text-stone-900 font-serif">
                  {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {BRAND_CONFIG.currency}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Items Inside Box */}
              {product.itemsIncluded && (
                <div className="mb-4 p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Inclusions:
                  </h4>
                  <ul className="space-y-1 text-[11px] text-stone-700">
                    {product.itemsIncluded.slice(0, 4).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Gift Note Checkbox */}
              <label className="flex items-center gap-2 mb-4 text-[11px] text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftNoteOption}
                  onChange={(e) => setGiftNoteOption(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-gold focus:ring-gold border-stone-300"
                />
                <span>Include complimentary gold-foiled note card</span>
              </label>
            </div>

            {/* Actions: Quantity & Direct WhatsApp */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-stone-600">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 px-2 py-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-700 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-700 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleWhatsAppOrder}
                  variant="gold"
                  size="md"
                  icon={MessageCircle}
                  className="flex-1 text-xs font-semibold"
                >
                  Order on WhatsApp • {BRAND_CONFIG.currency}{(product.price * quantity).toLocaleString('en-IN')}
                </Button>

                <a
                  href="#customize"
                  onClick={onClose}
                  className="px-3 py-2 rounded-lg border border-stone-300 hover:border-gold hover:text-gold text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
