import React from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BUILDER_BOXES } from '../../data/builderData';
import { BRAND_CONFIG } from '../../config/brand';
import { Check } from 'lucide-react';

export default function Step1ChooseBox() {
  const {
    selectedBox,
    selectBox,
    selectedBoxColor,
    setSelectedBoxColor,
    validationErrors
  } = useHamperBuilder();

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          Step 1: Choose Your Box & Style
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          Select the foundation of your hamper. Each box is crafted from premium rigid cardboard or handwoven willow.
        </p>
      </div>

      {validationErrors.box && (
        <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
          {validationErrors.box}
        </p>
      )}

      {/* Box Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BUILDER_BOXES.map((box) => {
          const isSelected = selectedBox?.id === box.id;

          return (
            <div
              key={box.id}
              onClick={() => selectBox(box)}
              className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-200 bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-gold shadow-medium ring-1 ring-gold'
                  : 'border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
            >
              {/* Box Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {box.popular && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-bold uppercase tracking-wider text-stone-800 shadow-sm border border-stone-200">
                    Most Popular
                  </div>
                )}

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-[9px] font-medium text-white">
                  Fits {box.capacity} items
                </div>
              </div>

              {/* Box Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-stone-900">
                      {box.name}
                    </h4>
                    <span className="font-serif font-bold text-stone-900 text-sm">
                      {BRAND_CONFIG.currency}{box.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    {box.description}
                  </p>
                </div>

                {/* Color Variants */}
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500">
                    Color: <strong className="text-stone-800">{isSelected ? selectedBoxColor : box.colors[0]}</strong>
                  </span>

                  <div className="flex gap-1">
                    {box.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectBox(box);
                          setSelectedBoxColor(color);
                        }}
                        className={`text-[9px] px-2 py-0.5 rounded-full border transition-all ${
                          isSelected && selectedBoxColor === color
                            ? 'bg-stone-900 text-white border-stone-900 font-bold'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
