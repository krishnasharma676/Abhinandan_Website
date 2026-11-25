import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function ChelyNewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#FB1443', '#FFE885', '#FFA6B6', '#FFFFFF'],
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section
      className="relative overflow-hidden py-6 sm:py-8 border-t border-[#FFD9DF]/80"
      style={{
        backgroundColor: '#FFF6F4',
        backgroundImage:
          'radial-gradient(rgba(251, 20, 67, 0.1) 1.3px, transparent 1.3px), linear-gradient(180deg, #FFF6F4 0%, #FEEAE6 100%)',
        backgroundSize: '24px 24px, 100% 100%',
      }}
    >
      {/* Left & Right Flanking Hamper Photos (Tablet/Desktop) */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-40 lg:w-56 xl:w-64 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/chely/hamper-product-1.png"
          alt="Luxury Hamper"
          className="w-full h-full object-cover object-left"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.92) 45%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.92) 45%, transparent 100%)',
          }}
        />
      </div>

      <div className="hidden md:block absolute right-0 top-0 h-full w-40 lg:w-56 xl:w-64 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/chely/hamper-product-2.png"
          alt="Celebration Gift Box"
          className="w-full h-full object-cover object-right"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.92) 45%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.92) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* Sleek Compact Center Banner Content */}
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeading className="mb-2">
          Get Festive Offers &amp; Gift Ideas
        </SectionHeading>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed mb-4 max-w-md mx-auto"
        >
          Subscribe for exclusive hamper launches, festive deals &amp; custom gift inspiration.
        </motion.p>

        {/* Compact Single-Pill Subscribe Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.42 }}
        >
          {submitted ? (
            <div className="max-w-md mx-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Subscribed! Welcome to Abhinandan Gifting.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex items-center bg-white rounded-full p-1 sm:p-1.5 shadow-[0_6px_22px_rgba(53,28,78,0.08)] border border-[#FB1443]/15"
            >
              <Mail className="w-4 h-4 ml-3 shrink-0 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 min-w-0 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-transparent text-stone-800 text-xs sm:text-sm font-sans placeholder-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm shadow-[#FB1443]/25 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
