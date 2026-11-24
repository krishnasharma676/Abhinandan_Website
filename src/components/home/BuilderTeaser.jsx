import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  Check
} from 'lucide-react';
import { BUILDER_BOXES } from '../../data/builderData';
import { BRAND_CONFIG } from '../../config/brand';
import Button from '../common/Button';

export default function BuilderTeaser() {
  const [activeBoxIndex, setActiveBoxIndex] = useState(1);
  const selectedBox = BUILDER_BOXES[activeBoxIndex];

  const stepsPreview = [
    { num: '01', title: 'Choose Box', desc: 'From rigid chests to woven willow baskets' },
    { num: '02', title: 'Curate Treats', desc: 'Select Belgian cocoa, candles & skincare' },
    { num: '03', title: 'Packaging', desc: 'Double-faced French satin & wax seals' },
    { num: '04', title: 'Personalize', desc: 'Gold-foiled card with handwritten note' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-gold border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Signature Interactive Experience
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Your Gift, Your Way.
          </h2>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
            Choose your favorite goodies, personalize your packaging, and create something truly special. Real-time visual hamper preview.
          </p>
        </div>

        {/* 4 Process Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stepsPreview.map((step) => (
            <div
              key={step.num}
              className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/80 hover:bg-stone-800 transition-colors"
            >
              <div className="font-serif text-base font-bold text-gold mb-0.5">
                {step.num}
              </div>
              <h4 className="text-xs font-semibold text-stone-100 mb-0.5">
                {step.title}
              </h4>
              <p className="text-[11px] text-stone-400 leading-snug">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Box Selector Showcase */}
        <div className="rounded-2xl bg-stone-800/90 border border-stone-700 p-5 sm:p-7 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Box Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden border border-stone-700 bg-stone-950">
                <img
                  src={selectedBox.image}
                  alt={selectedBox.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white shadow-sm">
                  <span className="text-[9px] text-gold uppercase font-bold tracking-wider block">
                    Starting From
                  </span>
                  <span className="text-base font-bold text-white font-serif">
                    {BRAND_CONFIG.currency}{selectedBox.price}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gold text-stone-950 text-[10px] font-bold shadow-sm">
                  Fits {selectedBox.capacity} items
                </div>
              </div>
            </div>

            {/* Box Options Switcher */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-0.5">
                  Step 1 Preview: Choose Your Box Style
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {selectedBox.name}
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {selectedBox.description}
                </p>
              </div>

              {/* Box Selection Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BUILDER_BOXES.map((box, idx) => (
                  <button
                    key={box.id}
                    onClick={() => setActiveBoxIndex(idx)}
                    className={`p-3 rounded-lg text-left border transition-all flex items-start gap-2.5 ${
                      activeBoxIndex === idx
                        ? 'bg-stone-700 border-gold ring-1 ring-gold'
                        : 'bg-stone-900/80 border-stone-700 hover:bg-stone-750'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                      activeBoxIndex === idx ? 'bg-gold border-gold text-stone-950' : 'border-stone-600 text-transparent'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-white">
                        {box.name}
                      </h5>
                      <span className="text-[10px] text-stone-400 block">
                        Fits {box.capacity} gifts • {BRAND_CONFIG.currency}{box.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a href="#customize" className="w-full sm:w-auto">
                  <Button
                    variant="gold"
                    size="md"
                    icon={Gift}
                    className="w-full text-white font-semibold"
                  >
                    Launch 5-Step Customizer
                  </Button>
                </a>

                <p className="text-[11px] text-stone-400">
                  ⚡ Live price estimator & instant WhatsApp inquiry
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
