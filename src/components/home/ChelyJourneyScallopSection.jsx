import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

export default function ChelyJourneyScallopSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================
              LEFT COLUMN: EDITORIAL NARRATIVE & BRAND CTA
          ======================================================== */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6 text-left">
            
            {/* Heading with Sparkle */}
            <div className="relative inline-block">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-stone-900 leading-[1.18] tracking-tight">
                Create Your Custom Gift Hamper
              </h2>
              {/* Pink Sparkle Marks */}
              <div className="absolute -top-3 -right-6 text-[#FFA6B6] text-xl font-bold select-none">
                ✦
              </div>
            </div>

            {/* Narrative text */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans font-light">
              Want something special? You can fully customize your gift hamper with us. Tell us what items you want, your preferred box or basket style, and your budget. We will prepare the perfect gift hamper for your wedding, birthday, festival, or corporate event.
            </p>

            {/* Brand Logo Color Pill Button (#FB1443) - Hidden on Mobile */}
            <div className="hidden sm:block pt-2">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  'Hi Abhinandan Gifting! I want to create a custom gift hamper with you.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Customize on WhatsApp
              </a>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: SCALLOPED CIRCLE BADGE PORTRAIT WITH DOODLES
          ======================================================== */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-80 sm:w-96 md:w-[420px] lg:w-[460px] xl:w-[490px] aspect-square flex items-center justify-center">
              
              {/* Pink Spiral Doodle (Top Right of Badge) */}
              <div className="absolute -top-4 right-4 sm:right-8 w-28 sm:w-32 pointer-events-none z-20">
                <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 10 30 Q 30 5 50 30 T 90 30"
                    stroke="#FFA6B6"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 5 45 Q 25 20 45 45 T 85 45"
                    stroke="#FFA6B6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </div>

              {/* Yellow Star Doodle (Left Side) */}
              <div className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 text-[#F4BE48] text-3xl sm:text-4xl lg:text-5xl pointer-events-none select-none z-20 animate-pulse">
                ★
              </div>

              {/* Blue Curly Ribbon Doodle (Bottom Left) */}
              <div className="absolute -bottom-5 left-6 sm:left-10 w-32 sm:w-36 pointer-events-none z-20">
                <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 10 50 C 40 70, 70 10, 110 40"
                    stroke="#BDE3F0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Scalloped Stamp Outer Border SVG (Chely Exact Style) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Radial repeated scallops */}
                    <path
                      id="scallop"
                      d="M 200 12 A 188 188 0 1 0 200 388 A 188 188 0 1 0 200 12"
                    />
                  </defs>
                  
                  {/* Decorative Scallop Petal Ring */}
                  <circle
                    cx="200"
                    cy="200"
                    r="185"
                    fill="#FF3366"
                    stroke="#FF3366"
                    strokeWidth="12"
                    strokeDasharray="22 18"
                    strokeLinecap="round"
                  />
                  
                  {/* Light Blue Accent Inner Ring */}
                  <circle
                    cx="200"
                    cy="200"
                    r="165"
                    fill="none"
                    stroke="#BDE3F0"
                    strokeWidth="5"
                  />
                </svg>
              </div>

              {/* Central Round Photo */}
              <div className="w-[80%] h-[80%] rounded-full overflow-hidden bg-white shadow-xl relative z-10 border-4 border-white">
                <img
                  src="/assets/chely/journey-recipient.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/brand/media_1795501189686_d66ba8f8.jpg';
                  }}
                  alt="Delighted recipient with sweet hamper"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

