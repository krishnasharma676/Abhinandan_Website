import React from 'react';
import { useHamperBuilder } from '../../context/HamperBuilderContext';
import { BUILDER_PACKAGING_OPTIONS } from '../../data/builderData';
import { BRAND_CONFIG } from '../../config/brand';
import { Check } from 'lucide-react';
import Badge from '../common/Badge';

export default function Step3ChoosePackaging() {
  const { selectedPackaging, setSelectedPackaging } = useHamperBuilder();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-chocolate">
          Step 3: Select Packaging Accents & Ribbons
        </h3>
        <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
          Every hamper is tied by hand. Choose your finishing touch — from double-faced satin to dried botanical sprigs and gilded wax seals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {BUILDER_PACKAGING_OPTIONS.map((pack) => {
          const isSelected = selectedPackaging?.id === pack.id;

          return (
            <div
              key={pack.id}
              onClick={() => setSelectedPackaging(pack)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-cream-50 flex flex-col justify-between ${
                isSelected
                  ? 'border-gold shadow-luxury ring-1 ring-gold scale-[1.01]'
                  : 'border-cream-300 hover:border-gold/40 shadow-soft'
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-cream-50/90 text-xs font-bold text-burgundy shadow-sm border border-gold/30">
                    {pack.price === 0 ? 'Complimentary' : `+${BRAND_CONFIG.currency}${pack.price}`}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-base font-bold text-chocolate">
                      {pack.name}
                    </h4>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-gold border-gold text-white' : 'border-cream-300 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs text-chocolate/70 mt-2 leading-relaxed">
                    {pack.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

