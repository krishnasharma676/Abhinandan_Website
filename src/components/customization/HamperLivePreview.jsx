import React from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Sparkles, Heart, Tag } from 'lucide-react';
import Badge from '../common/Badge';

export default function HamperLivePreview() {
  const {
    selectedBox,
    selectedItems,
    selectedPackaging,
    personalization,
    totalHamperPrice,
    itemsCount
  } = useHamperBuilder();

  const maxCapacity = selectedBox ? selectedBox.capacity : 7;
  const fillPercentage = Math.min(100, Math.round((itemsCount / maxCapacity) * 100));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-soft p-5 sticky top-24 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-gold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif text-sm font-bold text-stone-900">
            Live Hamper Preview
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[10px] font-bold text-stone-800 border border-stone-200">
          {itemsCount}/{maxCapacity} Items
        </span>
      </div>

      {/* Visual Hamper Layered Illustration */}
      <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex flex-col items-center justify-center p-3">
        {selectedBox && (
          <img
            src={selectedBox.image}
            alt={selectedBox.name}
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
        )}

        <div className="absolute inset-0 bg-stone-900/25" />

        <div className="absolute inset-x-0 h-3 bg-gold/90 shadow-sm top-1/2 -translate-y-1/2 z-10" />
        <div className="absolute inset-y-0 w-3 bg-gold/90 shadow-sm left-1/2 -translate-x-1/2 z-10" />

        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-stone-900 border border-gold flex items-center justify-center text-gold text-[10px] font-serif font-bold shadow-md z-20">
          {personalization.customMonogram
            ? personalization.customMonogram.slice(0, 2).toUpperCase()
            : <Heart className="w-3 h-3 fill-gold text-gold" />}
        </div>

        {personalization.recipientName && (
          <div className="absolute top-2.5 left-2.5 bg-white/95 border border-stone-200 px-2 py-0.5 rounded-full shadow-sm text-[9px] font-semibold text-stone-800 flex items-center gap-1 z-20">
            <Tag className="w-2.5 h-2.5 text-gold" />
            <span>For: {personalization.recipientName}</span>
          </div>
        )}

        {selectedPackaging && (
          <div className="absolute bottom-2.5 right-2.5 bg-stone-900/85 px-2 py-0.5 rounded-full text-[9px] text-white font-medium z-20">
            {selectedPackaging.name}
          </div>
        )}
      </div>

      {/* Capacity Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1 font-medium">
          <span>Space Capacity</span>
          <span className="font-bold text-stone-900">
            {itemsCount} of {maxCapacity} items filled
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              itemsCount >= maxCapacity ? 'bg-stone-900' : 'bg-gold'
            }`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Selected Items Mini List */}
      <div className="space-y-1.5 pt-2 border-t border-stone-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
          Current Curations ({selectedItems.length}):
        </span>

        {selectedItems.length === 0 ? (
          <p className="text-xs text-stone-400 italic py-1">
            No items added yet. Select treats in Step 2.
          </p>
        ) : (
          <div className="max-h-32 overflow-y-auto divide-y divide-stone-100 pr-1">
            {selectedItems.map((item) => (
              <div key={item.id} className="py-1 flex items-center justify-between text-xs">
                <span className="truncate max-w-[160px] text-stone-800">
                  {item.name}
                </span>
                <span className="text-stone-500 text-[10px] shrink-0 font-medium">
                  x{item.quantity} • {BRAND_CONFIG.currency}{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total Dynamic Price */}
      <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
        <div>
          <span className="text-[9px] uppercase font-bold text-stone-500 block">
            Estimated Total
          </span>
          <span className="font-serif text-xl font-bold text-stone-900">
            {BRAND_CONFIG.currency}{totalHamperPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Gift Card Included
        </span>
      </div>

    </div>
  );
}
