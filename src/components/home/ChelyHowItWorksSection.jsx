import React, { useState } from 'react';
import { Package, Sparkles, PenLine, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import FloatingDecoration from '../common/FloatingDecoration';

const STEPS = [
  {
    step: '01',
    icon: Package,
    title: 'Choose Box',
    desc: 'Wicker basket, wood trunk, or velvet box.',
    query: 'Hi Abhinandan Gifting! I want to choose a box style for my custom hamper.'
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'Pick Goodies',
    desc: 'Dry fruits by KDF NUTS & sweets.',
    query: 'Hi Abhinandan Gifting! I want to choose dry fruits and treats for my custom hamper.'
  },
  {
    step: '03',
    icon: PenLine,
    title: 'Personalize',
    desc: 'Custom ribbons and greeting card.',
    query: 'Hi Abhinandan Gifting! I want to add personalized ribbons and a card.'
  },
  {
    step: '04',
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Pan-India express delivery.',
    query: 'Hi Abhinandan Gifting! I want to place a custom hamper order.'
  }
];

export default function ChelyHowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-10 sm:py-14 bg-[#FEEAE6] relative overflow-hidden">

      {/* Top-Left Floating Cashews Potli (Tucked safely in corner on mobile) */}
      <FloatingDecoration
        type="cashews-potli"
        size={105}
        mobileSize={46}
        speed={0.35}
        delay={0.4}
        duration={5.6}
        rotate={-10}
        className="absolute left-1 sm:left-6 lg:left-10 top-1.5 sm:top-10 z-30 opacity-90 sm:opacity-95"
      />
      {/* Bottom-Right Floating Luxury Gift Box (Tucked safely in bottom corner) */}
      <FloatingDecoration
        type="gift-box"
        size={118}
        mobileSize={48}
        speed={0.38}
        delay={1.2}
        duration={5.4}
        rotate={14}
        className="absolute right-1 sm:right-6 lg:right-10 bottom-1.5 sm:bottom-8 z-30 opacity-90 sm:opacity-95"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading (Matching font size & weight of other sections, subtext removed) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-9 pt-5 sm:pt-0">
          <div className="relative inline-block">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal text-stone-900 leading-[1.2] tracking-tight">
              How to customize your hamper
            </h2>
            <span className="absolute -top-2.5 -right-5 text-[#FFA6B6] text-xl font-bold select-none">
              ✦
            </span>
          </div>
        </div>

        {/* 4 Super Compact Cards with Connecting Flow Arrows */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-center gap-3 lg:gap-2.5">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;

            return (
              <React.Fragment key={item.step}>
                <div
                  onClick={() => setActiveStep(index)}
                  className={`w-full lg:flex-1 rounded-xl p-3.5 sm:p-4 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-sm border-2 border-[#FB1443]'
                      : 'bg-white/80 border border-stone-200/80 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#FB1443] text-white'
                          : 'bg-[#FEEAE6] text-[#FB1443]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <h3 className="font-serif text-sm sm:text-base font-light text-stone-800 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Super Minimal 1-line Description */}
                  <p className="text-stone-600 text-xs font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow perfectly centered between cards on Desktop */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-white text-[#FB1443] border border-rose-200 shadow-xs pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
