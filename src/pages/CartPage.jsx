import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Gift,
  Truck,
  Sparkles,
  CheckCircle2,
  Tag
} from 'lucide-react';
import Button from '../components/common/Button';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    totalAmount,
    totalItemsCount,
    promoCode,
    promoError,
    discountPercent,
    applyPromoCode
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-cream-100 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-cream-50 p-8 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-cream-200 border border-gold/30 flex items-center justify-center text-gold mx-auto">
            <Gift className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-chocolate">
            Your Hamper Cart Is Empty
          </h2>
          <p className="text-xs text-chocolate/70 leading-relaxed font-sans">
            You haven't selected any luxury hampers yet. Explore our curated collections or build your own bespoke box from scratch.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link to="/shop">
              <Button variant="gold" size="md" className="w-full">
                Explore Ready Hampers
              </Button>
            </Link>
            <Link to="/customize">
              <Button variant="outline" size="md" className="w-full">
                Custom Hamper Studio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate">
            Your Curated Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
            Review your gift selections before proceeding to concierge checkout.
          </p>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 rounded-2xl bg-champagne-light border border-gold/30 mb-8 max-w-2xl">
          <div className="flex items-center justify-between text-xs font-semibold text-chocolate mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              {isFreeShipping ? (
                <span className="text-emerald-800">
                  🎉 Congratulations! You have unlocked Complimentary Express Pan-India Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-burgundy">₹{remainingForFreeShipping}</strong> more to qualify for Free Shipping
                </span>
              )}
            </span>
            <span className="text-gold-dark">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-cream-300 overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Items List (Col span 8) */}
          <div className="lg:col-span-8 bg-cream-50 p-6 sm:p-8 rounded-3xl border border-gold/25 shadow-soft divide-y divide-cream-300">
            {cartItems.map((item) => {
              const itemImg = item.image || (item.images && item.images[0]);
              const key = item.cartItemId || item.id;

              return (
                <div key={key} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-cream-200 shrink-0 border border-gold/20 shadow-soft">
                    <img src={itemImg} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-chocolate">
                          {item.name}
                        </h3>
                        {item.type === 'custom_hamper' ? (
                          <div className="text-xs text-chocolate/75 mt-1 space-y-0.5">
                            <p className="text-gold-dark font-medium">✨ Bespoke Studio Hamper</p>
                            {item.recipientName && (
                              <p>Recipient: <strong className="text-chocolate">{item.recipientName}</strong></p>
                            )}
                            {item.selectedBox && (
                              <p>Box: {item.selectedBox.name} ({item.selectedBoxColor || 'Default'})</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-chocolate/60 mt-0.5">
                            {item.shortDescription || item.category}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(key)}
                        className="text-chocolate/40 hover:text-burgundy transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gold/40 rounded-full bg-cream-100 px-3 py-1">
                        <button
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-chocolate hover:text-gold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-chocolate">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-chocolate hover:text-gold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-lg font-bold text-burgundy">
                        {BRAND_CONFIG.currency}{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link to="/shop" className="text-burgundy font-semibold hover:underline">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-chocolate/50 hover:text-burgundy">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Column (Col span 4) */}
          <div className="lg:col-span-4 bg-cream-50 p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-bold text-chocolate pb-3 border-b border-cream-300">
              Order Summary
            </h3>

            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (LUXE10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-full bg-cream-100 border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold text-chocolate uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-chocolate text-cream-50 text-xs font-semibold hover:bg-chocolate-light"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Code {promoCode} applied ({discountPercent}% OFF)
                </p>
              )}
            </form>

            {/* Price lines */}
            <div className="space-y-2.5 text-xs sm:text-sm text-chocolate/85">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{BRAND_CONFIG.currency}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Discount ({promoCode})</span>
                  <span className="font-semibold">-{BRAND_CONFIG.currency}{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pan-India Courier</span>
                <span className="font-semibold">{isFreeShipping ? 'FREE' : `${BRAND_CONFIG.currency}${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-bold text-burgundy pt-3 border-t border-cream-300">
                <span>Grand Total</span>
                <span>{BRAND_CONFIG.currency}{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleWhatsAppCheckout}
              variant="gold"
              size="lg"
              className="w-full shadow-medium font-bold text-sm"
            >
              <span>Order via WhatsApp Concierge</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-[10px] text-center text-chocolate/60">
              🔒 100% Secure Transaction • Pristine Delivery Guarantee
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

