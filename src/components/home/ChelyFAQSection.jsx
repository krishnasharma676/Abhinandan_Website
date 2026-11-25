import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import SectionHeading from '../common/SectionHeading';

const FAQS = [
  {
    q: 'Can I order just 1 single custom hamper?',
    a: 'Yes! There is no minimum order requirement. We make single custom gift hampers as well as bulk orders for weddings and events.',
    tag: 'Orders',
  },
  {
    q: 'How does custom ordering work?',
    a: 'Just message us on WhatsApp with your occasion and budget. We will share box styles, dry fruit options, and photo ideas to help you choose.',
    tag: 'Process',
  },
  {
    q: 'How long does delivery take across India?',
    a: 'Delhi NCR: 24 to 48 hours. Other cities across India: 3 to 5 business days with direct courier tracking.',
    tag: 'Delivery',
  },
  {
    q: 'What is the quality of the dry fruits inside?',
    a: 'We are powered by KDF NUTS. All dry fruits (California almonds, cashews, pistachios) are 100% natural, fresh Grade-A quality in sealed jars.',
    tag: 'Quality',
  },
  {
    q: 'Can you add custom greeting cards or company logos?',
    a: 'Yes! Every hamper includes a free personalized greeting card. For bulk corporate orders, we can also add custom ribbons with your logo.',
    tag: 'Custom',
  },
];

export default function ChelyFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-9 sm:py-12 bg-white border-t border-stone-100"
    >
      {/* Subtle Signature Blush & Cream Radial Glows */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full opacity-55 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FEEAE6 0%, transparent 72%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[340px] h-[340px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FAF7F2 0%, transparent 72%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* LEFT: Compact Sticky Heading + Concierge Pill */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[37%] shrink-0 lg:sticky lg:top-24"
          >
            <div className="flex justify-center lg:justify-start mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEEAE6] text-[#FB1443] text-[10px] font-bold tracking-[0.2em] uppercase">
                Quick Answers
              </span>
            </div>

            <SectionHeading align="responsive" className="mb-3">
              Frequently asked questions
            </SectionHeading>

            <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed mb-4 max-w-xs mx-auto lg:mx-0 text-center lg:text-left">
              Everything you need to know about ordering your perfect custom hamper.
            </p>

            {/* Compact WhatsApp Help Box */}
            <div className="hidden lg:flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#FEEAE6] shadow-xs">
              <div>
                <p className="font-serif text-sm text-[#351C4E] leading-tight">
                  Still have a question?
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Instant reply on WhatsApp
                </p>
              </div>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] tracking-wide shadow-sm shadow-[#FB1443]/25 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
                <span>Chat Now</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Compact Brand-Themed Spring Accordion */}
          <div className="w-full lg:flex-1 space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: idx * 0.05, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'bg-white border-[#FB1443]/40 shadow-[0_10px_28px_rgba(251,20,67,0.08)] ring-1 ring-[#FB1443]/15'
                      : 'bg-[#FAF7F2]/85 border-stone-200/80 hover:border-[#FFA6B6] hover:bg-white'
                  }`}
                >
                  {isOpen && (
                    <motion.span
                      layoutId="faq-active-bar"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#FB1443]"
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase hidden sm:inline-block transition-colors ${
                          isOpen
                            ? 'bg-[#FB1443] text-white'
                            : 'bg-[#FEEAE6] text-[#FB1443]'
                        }`}
                      >
                        {faq.tag}
                      </span>
                      <span
                        className={`font-serif text-sm sm:text-[15.5px] font-normal leading-snug transition-colors ${
                          isOpen ? 'text-[#351C4E]' : 'text-stone-800'
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-[#FB1443] text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3 h-3" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-3 h-3" strokeWidth={2.5} />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-3.5 pt-1 border-t border-[#FEEAE6]">
                          <p className="text-stone-600 font-sans text-xs sm:text-[13px] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Mobile Compact WhatsApp Footer Link */}
            <div className="lg:hidden pt-3 text-center">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_CONFIG.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FB1443] text-white font-bold text-[11px] tracking-wide shadow-sm shadow-[#FB1443]/25"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
