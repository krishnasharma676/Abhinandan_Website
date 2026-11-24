import React, { useState } from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BUILDER_PRODUCTS, BUILDER_ITEM_CATEGORIES } from '../../data/builderData';
import { BRAND_CONFIG } from '../../config/brand';
import { Plus, Minus, AlertCircle } from 'lucide-react';

export default function Step2ChooseItems() {
  const {
    selectedBox,
    selectedItems,
    addItem,
    removeItem,
    updateItemQuantity,
    itemsCount,
    validationErrors
  } = useHamperBuilder();

  const [activeCategory, setActiveCategory] = useState("All");

  const maxCapacity = selectedBox ? selectedBox.capacity : 7;
  const isFull = itemsCount >= maxCapacity;

  const filteredProducts = activeCategory === "All"
    ? BUILDER_PRODUCTS
    : BUILDER_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Step 2: Choose Your Goodies & Treats
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Pick from artisan Belgian confections, therapeutic aromatherapy, botanical skincare, and keepsakes.
          </p>
        </div>

        <div className="shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200">
            Space: {itemsCount} / {maxCapacity} items
          </span>
        </div>
      </div>

      {validationErrors.items && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{validationErrors.items}</span>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {BUILDER_ITEM_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid: Sleek, compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredProducts.map((product) => {
          const selectedInstance = selectedItems.find((i) => i.id === product.id);
          const qty = selectedInstance ? selectedInstance.quantity : 0;

          return (
            <div
              key={product.id}
              className={`rounded-xl overflow-hidden border transition-all duration-200 bg-white flex flex-col justify-between ${
                qty > 0
                  ? 'border-gold shadow-sm ring-1 ring-gold'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/90 text-[9px] font-semibold text-stone-700">
                  {product.weight}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-serif text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                    {product.name}
                  </h5>
                  <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900 text-xs">
                    {BRAND_CONFIG.currency}{product.price}
                  </span>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      disabled={isFull}
                      className="px-2.5 py-1 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 px-1.5 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(product.id, qty - 1)}
                        className="w-4 h-4 flex items-center justify-center text-xs font-bold text-stone-700 hover:text-stone-950"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-stone-900">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(product)}
                        disabled={isFull}
                        className="w-4 h-4 flex items-center justify-center text-xs font-bold text-stone-700 hover:text-stone-950 disabled:opacity-40"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
