import React, { useState } from 'react';
import { FAQ_DATA } from '../data/testimonials';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            <span>Got Questions?</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chocolate">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-chocolate/70 leading-relaxed font-sans max-w-lg mx-auto">
            Everything you need to know about our custom hamper builder, transit protection, delivery timelines, and corporate orders.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-cream-50 border border-gold/25 shadow-soft overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-chocolate hover:text-burgundy transition-colors"
                >
                  <span>{item.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center shrink-0 text-gold transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-gold text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-chocolate/80 leading-relaxed font-sans border-t border-cream-200 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="p-8 rounded-3xl bg-cream-50 border border-gold/30 shadow-luxury text-center space-y-3">
          <h3 className="font-serif text-xl font-bold text-chocolate">
            Still Have a Bespoke Gifting Question?
          </h3>
          <p className="text-xs text-chocolate/70 max-w-sm mx-auto">
            Our atelier stylists are available 6 days a week to guide your decisions.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                BRAND_CONFIG.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-soft"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Concierge</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

