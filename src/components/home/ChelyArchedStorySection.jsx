import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

export default function ChelyArchedStorySection() {
  return (
    <section id="story" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      
      {/* Background Mandala / Circle Watermark (Bottom Right) */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-30 select-none">
        <svg
          width="320"
          height="320"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="#C9C1D9" strokeWidth="6" strokeDasharray="10 8" />
          <circle cx="100" cy="100" r="50" stroke="#C9C1D9" strokeWidth="4" />
          <circle cx="100" cy="100" r="24" stroke="#FFA6B6" strokeWidth="3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================
              LEFT COLUMN: DUAL ARCHED IMAGE COMPOSITION WITH DOODLE
          ======================================================== */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* The Outer Main Arch Container */}
            <div className="relative w-full max-w-md">
              
              {/* Primary Tall Arch (Artisanal Hamper Shot) */}
              <div className="w-[78%] aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden bg-rose-100/60 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border-4 border-white relative z-10">
                <img
                  src="/assets/chely/story-arch-hamper.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/brand/royal-whispers-trousseau.png';
                  }}
                  alt="Curating luxury hampers"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Looping Light Blue Pastel Ribbon Doodle */}
              <div className="absolute -bottom-4 left-6 sm:left-10 w-44 sm:w-56 pointer-events-none z-20">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto text-[#BDE3F0]"
                >
                  <path
                    d="M 10 90 C 40 20, 110 30, 90 90 C 70 140, 170 120, 190 40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Secondary Overlapping Lower Arch (Smiling Recipient / Model) */}
              <div className="absolute -bottom-6 right-0 sm:right-4 w-[58%] aspect-[4/5] rounded-t-[100px] rounded-b-2xl overflow-hidden bg-purple-100/60 shadow-[0_16px_50px_rgba(138,103,183,0.18)] border-4 border-white z-30">
                <img
                  src="/assets/chely/story-model-gift.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/brand/abbhinandan-profile.jpg';
                  }}
                  alt="Happy client with luxury gift"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: EDITORIAL NARRATIVE & CHELY PINK CTA
          ======================================================== */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6 text-left">
            
            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-stone-900 leading-[1.18] tracking-tight">
              We make personalized gift hampers for all your celebrations
            </h2>

            {/* Paragraph 1 */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans font-normal">
              Welcome to Abhinandan Gifting by KDF NUTS. We help you create beautiful and memorable gifts for your family, friends, and business clients.
            </p>

            {/* Paragraph 2 */}
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans font-normal">
              You can customize everything inside your hamper — from fresh almonds, cashews, and pistachios to sweets, decorative items, and festive packaging. We pack every hamper with care and deliver safely across India.
            </p>

            {/* Chely Brand Logo Color Pill Button (#FB1443) */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  'Hi Abhinandan Gifting! I want to order custom gift hampers.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
