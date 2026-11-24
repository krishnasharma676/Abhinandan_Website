import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BRAND_CONFIG } from '../../config/brand';
import {
  Sparkles,
  MessageCircle,
  Package,
  Heart,
  Edit,
  RotateCcw
} from 'lucide-react';
import Button from '../common/Button';

export default function Step5Review() {
  const {
    selectedBox,
    selectedBoxColor,
    selectedItems,
    selectedPackaging,
    personalization,
    boxPrice,
    itemsPrice,
    packagingPrice,
    totalHamperPrice,
    itemsCount,
    setCurrentStep,
    resetBuilder,
    exportToWhatsApp
  } = useHamperBuilder();

  // Launch celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B8860B', '#1C1917', '#D4AF37', '#E0218A']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  }, []);

  return (
    <div className="space-y-5">
      
      {/* Celebration Header */}
      <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
        <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          Your Bespoke Hamper Is Ready!
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Review your creation below. Click the WhatsApp button to transmit your exact hamper specifications to our concierge for instant confirmation.
        </p>
      </div>

      {/* Specification Review Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
        
        {/* Section 1: Box & Packaging */}
        <div className="pb-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-gold" />
              <span>Box Architecture</span>
            </h4>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold"
            >
              <Edit className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Box Model & Color
              </span>
              <p className="font-semibold text-stone-900">
                {selectedBox.name} ({selectedBoxColor})
              </p>
              <p className="text-[10px] text-stone-500">
                {selectedBox.dimensions} • {BRAND_CONFIG.currency}{boxPrice}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Packaging Embellishment
              </span>
              <p className="font-semibold text-stone-900">
                {selectedPackaging.name}
              </p>
              <p className="text-[10px] text-stone-500">
                {packagingPrice === 0 ? 'Complimentary' : `${BRAND_CONFIG.currency}${packagingPrice}`}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Items Curated */}
        <div className="pb-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Curated Goodies ({itemsCount} items)</span>
            </h4>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold"
            >
              <Edit className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="divide-y divide-stone-100 bg-stone-50 rounded-lg p-3 border border-stone-200">
            {selectedItems.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded object-cover border border-stone-200"
                  />
                  <div>
                    <p className="font-semibold text-stone-900">{item.name}</p>
                    <p className="text-[10px] text-stone-500">{item.weight}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-stone-900">
                    {BRAND_CONFIG.currency}{item.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Personalization & Card */}
        <div className="pb-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-deep" />
              <span>Personalization</span>
            </h4>
            <button
              onClick={() => setCurrentStep(4)}
              className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold"
            >
              <Edit className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Recipient:</span>
              <span className="font-semibold text-stone-900">{personalization.recipientName || 'Not specified'}</span>
            </div>
            {personalization.senderName && (
              <div className="flex justify-between">
                <span className="text-stone-500">Sender:</span>
                <span className="font-semibold text-stone-900">{personalization.senderName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-stone-500">Occasion:</span>
              <span className="font-semibold text-stone-900">{personalization.occasion}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 mt-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Note on Gift Card:
              </span>
              <p className="font-serif italic text-stone-800 leading-relaxed bg-white p-2.5 rounded border border-stone-200">
                "{personalization.cardMessage || 'Happy Celebrations!'}"
              </p>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-1.5 text-xs text-stone-700">
          <div className="flex justify-between">
            <span>Box Selection</span>
            <span className="font-semibold">{BRAND_CONFIG.currency}{boxPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Curated Treats ({itemsCount} items)</span>
            <span className="font-semibold">{BRAND_CONFIG.currency}{itemsPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Packaging & Ribbons</span>
            <span className="font-semibold">{packagingPrice === 0 ? 'FREE' : `${BRAND_CONFIG.currency}${packagingPrice}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
            <span>Total Hamper Value</span>
            <span>{BRAND_CONFIG.currency}{totalHamperPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Primary Action: Direct WhatsApp Concierge */}
        <div className="pt-2 space-y-2">
          <Button
            onClick={exportToWhatsApp}
            variant="gold"
            size="lg"
            icon={MessageCircle}
            className="w-full font-bold text-xs sm:text-sm shadow-md"
          >
            Send Hamper Details on WhatsApp Concierge
          </Button>

          <p className="text-[10px] text-center text-stone-500">
            ⚡ Opens WhatsApp with your exact hamper breakdown pre-filled to +91 99534 56311.
          </p>
        </div>

        <div className="flex justify-center pt-1">
          <button
            onClick={resetBuilder}
            className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset and build another hamper</span>
          </button>
        </div>

      </div>

    </div>
  );
}
