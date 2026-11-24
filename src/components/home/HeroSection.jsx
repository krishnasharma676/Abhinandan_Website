import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import InteractiveGiftBox3D from './InteractiveGiftBox3D';

export default function HeroSection() {
  return (
    <section id="hero" className="relative">

      {/* ========================================================
          PEACH/PINK LUXURY BANNER WRAPPER (Fits exact 100vh Viewport)
          - h-[calc(100vh-112px)] accounts for AnnouncementBar + Navbar
          - The entire hero banner, background image, and 3D box fit on screen at 100vh
          - Bottom border is the exact seam dividing banner & white section
      ======================================================== */}
        <div className="relative bg-[#FEEAE6] h-[calc(100vh-112px)] min-h-[500px] max-h-[720px] flex flex-col justify-center items-center z-20 overflow-visible">

          {/* Scalloped Wave Top Edge */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <img
              src="/assets/chely/zigzag-1.webp"
              alt="scallop shape"
              className="w-full h-auto min-h-[14px] object-cover object-top"
            />
          </div>

          {/* Confetti & Sparkles Background Image (Fits 100% height, bottom-aligned) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-bottom pointer-events-none opacity-100 z-0"
            style={{ backgroundImage: `url('/assets/chely/hero-bg-4.png')` }}
          />

            {/* Banner Content Container (Vertically centered between top wave and 3D box) */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pb-28 sm:pb-32 lg:pb-36 pt-2">

              {/* Main Heading in High-Contrast Royal Purple */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-normal text-[#351C4E] leading-[1.15] tracking-tight mb-2 sm:mb-2.5">
                Make Every Event{' '}
                <span className="relative inline-block text-[#351C4E]">
                  Special
                  <img
                    src="/assets/chely/title-shape.webp"
                    alt="sparkle"
                    className="absolute -top-3.5 -right-6 sm:-top-5 sm:-right-9 w-7 sm:w-10 pointer-events-none select-none"
                  />
                </span>{' '}
                <br className="hidden sm:inline" />
                With Custom Gift Hampers
              </h1>

              {/* Subtitle in Refined Deep Plum for Crystal Clear Readability */}
              <p className="text-[#5A3F74] text-xs sm:text-sm lg:text-[14px] max-w-lg mx-auto leading-relaxed font-sans font-medium mb-1">
                Welcome to Abhinandan Gifting by KDF NUTS. We create custom gift hampers for weddings, birthdays, festivals, and corporate gifting. Delivered all across India.
              </p>

            </div>

            {/* ========================================================
            3D GIFT BOX (EXACTLY ON THE SEAM BETWEEN BANNER & NICHE SECTION)
            - Centered horizontally (left-1/2 -translate-x-1/2)
            - Anchored at bottom-0 with translate-y-1/2
            - Exactly 50% inside the purple banner and 50% in the white section
            - Sits cleanly below the button with ample breathing space
            - Increased size for prominent, luxury presence
            - z-30 elevates it above both sections
        ======================================================== */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-56 sm:w-64 md:w-72 lg:w-[320px] xl:w-[350px] h-52 sm:h-60 md:h-68 lg:h-[290px] xl:h-[320px] z-30 pointer-events-auto flex items-center justify-center">
              <InteractiveGiftBox3D />
            </div>

          </div>

          {/* ========================================================
          SUBCONTENT SECTION (White Background)
          - Receives the bottom half of the 3D gift box
          - Generous top padding + margin-top so the text is pushed lower down
          - 3D box sits cleanly in the center above the text without overlapping
      ======================================================== */}
          <div className="bg-white pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 border-b border-stone-100 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

                {/* Left Column: Heading (with margin top) */}
                <div className="lg:col-span-5 pt-2 sm:pt-4">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-normal text-stone-900 leading-[1.2]">
                    Every hamper is made with love and customized just for you
                  </h2>
                </div>

                {/* Right Column: Narrative & CTA Buttons (with margin top) */}
                <div className="lg:col-span-6 lg:col-start-7 space-y-5 font-sans pt-2 sm:pt-4">
                  <p className="text-stone-700 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                    At Abhinandan Gifting, you can customize your gift hamper however you like. Choose from fresh California almonds, cashews, sweets, decorative baskets, and custom gift boxes. Perfect for family, friends, and corporate gifting.
                  </p>

                  <div className="flex items-center gap-2.5 sm:gap-3.5 pt-1">
                    <a
                      href="#hampers"
                      className="flex-1 sm:flex-initial text-center justify-center px-3 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      Explore Hampers
                    </a>

                    <a
                      href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                        'Hi Abhinandan Gifting! I want to enquire about custom gift hampers.'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full border-2 border-[#FB1443] text-[#FB1443] hover:bg-[#FB1443] hover:text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>
        );
}
