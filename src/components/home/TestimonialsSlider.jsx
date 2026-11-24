import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
            Words of Reverence
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Loved by Thoughtful Givers Across India
          </h2>
        </div>

        {/* Review Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Customer Details */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-stone-300 shadow-sm">
                <img
                  src={activeReview.image}
                  alt={activeReview.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  {activeReview.name}
                </h4>
                <p className="text-[11px] text-stone-500">
                  {activeReview.location} • <span className="text-gold font-medium">{activeReview.occasion}</span>
                </p>
                {activeReview.verified && (
                  <div className="inline-flex items-center gap-1 text-[9px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified Client</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quote & Stars */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center text-gold gap-0.5">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="font-serif italic text-sm sm:text-base text-stone-800 leading-relaxed">
                "{activeReview.quote}"
              </blockquote>

              <p className="text-[11px] text-stone-500">
                Hamper: <strong className="text-stone-800">{activeReview.hamperName}</strong>
              </p>
            </div>

          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between pt-5 mt-5 border-t border-stone-200">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-gold' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prev}
                className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
