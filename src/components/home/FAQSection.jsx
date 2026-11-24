import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/testimonials';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8FC] border-b border-stone-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header - Chely Style */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA6B6]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-md mx-auto">
            Everything you need to know about our custom hamper studio, bulk corporate bookings, and pan-India express delivery.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-3 font-sans">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-stone-100 shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-normal text-stone-900 hover:text-[#FFA6B6] transition-colors"
                >
                  <span>{item.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                    isOpen
                      ? 'rotate-180 bg-[#FFA6B6] text-white border-[#FFA6B6]'
                      : 'bg-[#FAF8FC] text-stone-600 border-stone-100'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick WhatsApp Inquiry Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#8A67B7] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Have a custom request or need bulk corporate pricing?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-sans">
              Our bespoke gifting stylists respond within 15 minutes on WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
              'Hi Abhinandan Gifting! I have a question regarding custom sweet hampers and bulk orders.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-full bg-[#FFA6B6] hover:bg-[#FF8E9E] text-white text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
