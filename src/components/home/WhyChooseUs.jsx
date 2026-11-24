import React from 'react';
import {
  Sparkles,
  Heart,
  Palette,
  PackageCheck,
  Building2,
  Award,
  Truck
} from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Thoughtfully Curated",
      desc: "Every confection, aroma, and keepsake is sourced from artisan makers and rigorously quality-tested."
    },
    {
      icon: Palette,
      title: "Effortless Personalization",
      desc: "From engraved initial pens and wax seal monograms to gold-foiled blessing cards."
    },
    {
      icon: PackageCheck,
      title: "Signature Packaging",
      desc: "Double-faced French satin ribbons, velvet liners, and magnetic keepsake boxes."
    },
    {
      icon: Heart,
      title: "Handcrafted With Love",
      desc: "Our gift stylists hand-tie every ribbon and tuck dried botanicals with utmost care."
    },
    {
      icon: Truck,
      title: "Express Pan-India Logistics",
      desc: "Temperature-regulated transit for chocolates and shock-resistant cushioning for glassware."
    },
    {
      icon: Building2,
      title: "Corporate & Event Solutions",
      desc: "Dedicated account managers, bulk customization, custom brand debossing, and multi-location dispatch."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold">
            <Award className="w-3 h-3 text-gold" />
            <span>The Abhinandan Standard</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Why Discerning Givers Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            We transform simple presents into unforgettable emotional journeys that honor life's most precious relationships.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-stone-200 shadow-soft hover:shadow-medium hover:border-gold/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 group-hover:bg-gold group-hover:text-white transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-gold transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
