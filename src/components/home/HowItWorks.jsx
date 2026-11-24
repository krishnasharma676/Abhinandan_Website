import React from 'react';
import { Box, Sparkles, PenTool, Send, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Box,
      title: "Choose Your Hamper",
      desc: "Select a luxury magnetic chest, handwoven willow basket, or royal velvet trunk."
    },
    {
      num: "02",
      icon: Sparkles,
      title: "Select Curated Items",
      desc: "Fill your box with artisanal chocolates, macarons, scented candles, or gourmet snacks."
    },
    {
      num: "03",
      icon: PenTool,
      title: "Personalize Your Gift",
      desc: "Select satin ribbons, custom wax seals, and write your heartfelt blessing note."
    },
    {
      num: "04",
      icon: Send,
      title: "We Prepare With Love",
      desc: "Our gift stylists assemble your hamper with care and coordinate swift express dispatch."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">
            Effortless Gifting in 4 Simple Steps
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Crafting a memorable bespoke gift has never been so seamless and enjoyable.
          </p>
        </div>

        {/* Steps Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-stone-200 shadow-soft hover:shadow-medium transition-all text-center flex flex-col items-center group"
              >
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
                  Step {step.num}
                </span>

                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 group-hover:bg-gold group-hover:text-white transition-colors mb-3">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                  {step.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <a
            href="#customize"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-900 hover:text-gold transition-colors group"
          >
            <span>Try the Custom Hamper Builder Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
