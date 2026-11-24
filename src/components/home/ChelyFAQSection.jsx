import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import FloatingDecoration from '../common/FloatingDecoration';

const FAQS = [
  {
    question: 'Can I order just 1 single custom hamper?',
    answer: 'Yes! There is no minimum order requirement. We make single custom gift hampers as well as bulk orders for weddings and events.'
  },
  {
    question: 'How does custom ordering work?',
    answer: 'Just message us on WhatsApp with your occasion and budget. We will share box styles, dry fruit options, and photo ideas to help you choose.'
  },
  {
    question: 'How long does delivery take across India?',
    answer: 'Delhi NCR: 24 to 48 hours. Other cities across India: 3 to 5 business days with direct courier tracking.'
  },
  {
    question: 'What is the quality of the dry fruits inside?',
    answer: 'We are powered by KDF NUTS. All dry fruits (California almonds, cashews, pistachios) are 100% natural, fresh Grade-A quality in sealed jars.'
  },
  {
    question: 'Can you add custom greeting cards or company logos?',
    answer: 'Yes! Every hamper includes a free personalized greeting card. For bulk corporate orders, we can also add custom ribbons with your logo.'
  }
];

export default function ChelyFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      
      {/* Top-Left Floating Almonds Jar (Tucked safely in corner on mobile) */}
      <FloatingDecoration
        type="almonds-jar"
        size={105}
        mobileSize={46}
        speed={0.34}
        delay={0.5}
        duration={5.5}
        rotate={-12}
        className="absolute left-1 sm:left-6 lg:left-10 top-1.5 sm:top-10 z-30 opacity-90 sm:opacity-95"
      />
      {/* Bottom-Right Floating Luxury Gift Box (No Shadow, tucked safely in bottom corner) */}
      <FloatingDecoration
        type="gift-box"
        size={115}
        mobileSize={48}
        speed={0.36}
        delay={1.1}
        duration={5.6}
        rotate={12}
        className="absolute right-1 sm:right-6 lg:right-10 bottom-1.5 sm:bottom-8 z-30 opacity-90 sm:opacity-95"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading (Matching font size & weight of other sections, subtext removed) */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9 pt-5 sm:pt-0">
          <div className="relative inline-block">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal text-stone-900 leading-[1.2] tracking-tight">
              Frequently asked questions
            </h2>
            <span className="absolute -top-2.5 -right-5 text-[#FFA6B6] text-xl font-bold select-none">
              ✦
            </span>
          </div>
        </div>

        {/* Compact Accordion List */}
        <div className="space-y-2.5 font-sans">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFFBFB] border-[#FB1443]/40 shadow-sm'
                    : 'bg-white border-stone-200/80 hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-3.5 px-4 sm:py-4 sm:px-5 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-light text-stone-800 leading-snug">
                    {faq.question}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#FB1443] text-white rotate-180'
                        : 'bg-[#FAF7F2] text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-3.5 sm:pb-4 text-xs sm:text-sm text-stone-600 font-normal leading-relaxed border-t border-rose-100/60 pt-2.5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact Inline WhatsApp Link */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-stone-600 font-sans">
          <span>Have more questions? </span>
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
              'Hi Abhinandan Gifting! I have a question about your custom hampers.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#FB1443] font-bold hover:underline inline-flex items-center gap-1 ml-0.5"
          >
            Chat with us on WhatsApp &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
