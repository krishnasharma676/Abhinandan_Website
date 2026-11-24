import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export default function ChelyNewsletterBanner() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section
      className="w-full bg-[#FFF6D9] relative overflow-hidden py-8 sm:py-11 border-t border-[#FFE8A3]/70 m-0"
      style={{
        backgroundImage: `radial-gradient(#F5E4B5 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* ========================================================
          LEFT FLANKING LUXURY HAMPER (Desktop only, hidden on mobile to avoid overlapping text)
      ======================================================== */}
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 h-full sm:w-48 md:w-64 lg:w-72 xl:w-80 pointer-events-none select-none z-10 overflow-hidden">
        <img
          src="/assets/chely/hamper-product-1.png"
          alt="Luxury Hamper"
          className="w-full h-full object-cover object-left"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* ========================================================
          RIGHT FLANKING CELEBRATION GIFT CHEST (Desktop only, hidden on mobile to avoid overlapping text)
      ======================================================== */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 h-full sm:w-48 md:w-64 lg:w-72 xl:w-80 pointer-events-none select-none z-10 overflow-hidden">
        <img
          src="/assets/chely/hamper-product-2.png"
          alt="Celebration Gift Box"
          className="w-full h-full object-cover object-right"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* ========================================================
          CENTER COMPACT CONTENT (Clean, No Badge)
      ======================================================== */}
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center z-20">
        
        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 leading-[1.2] tracking-tight mb-2 sm:mb-2.5">
          Get Festive Offers & Gift Ideas
        </h2>

        {/* Subtitle */}
        <p className="text-stone-600 text-xs sm:text-sm font-sans font-normal mb-5 sm:mb-6 max-w-md mx-auto">
          Enter your email to get special discounts and updates on new gift hampers.
        </p>

        {/* Subscription Form with Single Pill Input & Logo Color Submit Button */}
        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Thank you! You are now subscribed to Abhinandan Gifting offers.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-md mx-auto bg-white rounded-full p-1 sm:p-1.5 shadow-[0_6px_25px_rgba(0,0,0,0.06)] border border-stone-200/80"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 min-w-0 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-transparent text-stone-800 text-xs sm:text-sm font-sans placeholder-stone-400 focus:outline-none rounded-full"
            />

            <button
              type="submit"
              className="shrink-0 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-[#FB1443]/20 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}

