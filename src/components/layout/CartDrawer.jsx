import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Gift,
  CheckCircle,
  Truck,
  Tag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    totalAmount,
    totalItemsCount,
    promoCode,
    promoError,
    discountPercent,
    applyPromoCode,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromoCode(inputCoupon);
    }
  };

  const handleWhatsAppCheckout = () => {
    const itemsDescription = cartItems
      .map((item, idx) => {
        let details = `${idx + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`;
        if (item.type === 'custom_hamper') {
          details += `\n   • Box: ${item.selectedBox?.name || 'Custom'}`;
          details += `\n   • Recipient: ${item.recipientName || 'Not specified'}`;
          details += `\n   • Note: "${item.message || 'None'}"`;
        }
        return details;
      })
      .join('\n\n');

    const msg = `*✨ NEW LUXURY ORDER INQUIRY - ${BRAND_CONFIG.name.toUpperCase()} ✨*
----------------------------------------
*Items in Cart (${totalItemsCount}):*
${itemsDescription}

*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
${discountAmount > 0 ? `*Promo Discount (${promoCode}):* -₹${discountAmount.toLocaleString('en-IN')}\n` : ''}*Shipping:* ${isFreeShipping ? 'FREE EXPRESS' : `₹${shippingFee}`}
*Estimated Grand Total:* ₹${totalAmount.toLocaleString('en-IN')}
----------------------------------------
Please confirm invoice details, payment link & delivery timeline.`;

    const url = `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-chocolate-dark/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-luxury border-l border-gold/30 flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-cream-300 bg-cream-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-chocolate">
                  Your Gift Cart
                </h3>
                <span className="text-xs text-chocolate/60">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-cream-200 text-chocolate transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-champagne-light/70 border-b border-gold/20">
            <div className="flex items-center justify-between text-xs font-medium text-chocolate/80 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gold" />
                {isFreeShipping ? (
                  <span className="text-emerald-800 font-semibold">
                    🎉 You qualify for Complimentary Express Dispatch!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-burgundy">₹{remainingForFreeShipping}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-bold text-gold-dark">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-cream-300 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-gold-shimmer rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-cream-300">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-gold mb-4 border border-gold/20">
                  <Gift className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-xl font-bold text-chocolate mb-2">
                  Your hamper cart is empty
                </h4>
                <p className="text-xs text-chocolate/70 max-w-xs mb-6">
                  Discover our thoughtfully curated luxury gift boxes or design your own bespoke hamper from scratch.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-full bg-gold hover:bg-gold-dark text-white text-xs font-semibold text-center transition-colors shadow-soft"
                  >
                    Explore Ready Hampers
                  </Link>
                  <Link
                    to="/customize"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-chocolate text-xs font-semibold text-center transition-colors border border-gold/30"
                  >
                    Build Custom Hamper
                  </Link>
                </div>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemImg = item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop';
                const key = item.cartItemId || item.id;

                return (
                  <div key={key} className="py-4 flex gap-4 items-start">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream-200 shrink-0 border border-gold/20">
                      <img
                        src={itemImg}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-chocolate truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(key)}
                          className="text-chocolate/40 hover:text-burgundy transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Options or custom breakdown */}
                      {item.type === 'custom_hamper' ? (
                        <div className="text-[11px] text-chocolate/70 mt-1 space-y-0.5">
                          <p className="text-gold-dark font-medium">✨ Bespoke Hamper</p>
                          {item.recipientName && (
                            <p>For: <strong className="text-chocolate">{item.recipientName}</strong></p>
                          )}
                          {item.selectedBox && (
                            <p className="line-clamp-1">Box: {item.selectedBox.name}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-[11px] text-chocolate/60 line-clamp-1 mt-0.5">
                          {item.shortDescription || item.category || 'Luxury Curated Gift'}
                        </p>
                      )}

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gold/40 rounded-full bg-cream-100 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-chocolate hover:text-gold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-chocolate">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-chocolate hover:text-gold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-burgundy">
                          {BRAND_CONFIG.currency}{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout) */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-cream-300 bg-cream-100 space-y-4">
              
              {/* Promo code input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. LUXE10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-cream-50 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate placeholder:text-chocolate/40 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-chocolate text-cream-50 text-xs font-semibold hover:bg-chocolate-light transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Code {promoCode} applied ({discountPercent}% OFF)
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-chocolate/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-chocolate">
                    {BRAND_CONFIG.currency}{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -{BRAND_CONFIG.currency}{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-chocolate">
                    {isFreeShipping ? 'FREE' : `${BRAND_CONFIG.currency}${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-burgundy pt-2 border-t border-cream-300">
                  <span>Estimated Total</span>
                  <span>{BRAND_CONFIG.currency}{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleWhatsAppCheckout}
                  variant="gold"
                  size="md"
                  className="w-full shadow-medium"
                >
                  <span>Order via WhatsApp Concierge</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-[10px] text-center text-chocolate/60">
                  🔒 Handcrafted in India • 100% Secure Checkout • Express Dispatch
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

