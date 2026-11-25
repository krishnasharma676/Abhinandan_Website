import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Shared animated editorial section heading matching the signature
 * Abhinandan display serif + pulsing pink sparkle + scroll-drawn crimson ribbon underline.
 */
export default function SectionHeading({
  children,
  align = 'center', // 'center' | 'left' | 'responsive' (center on mobile, left on lg)
  className = '',
  headingClassName = '',
  trailing = null,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 95%', 'start 62%'],
  });
  const underlineDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const alignWrapper =
    align === 'left'
      ? 'text-left'
      : align === 'responsive'
      ? 'text-center lg:text-left'
      : 'text-center';

  const alignUnderline =
    align === 'left'
      ? 'mx-0'
      : align === 'responsive'
      ? 'mx-auto lg:mx-0'
      : 'mx-auto';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${alignWrapper} ${className}`}
    >
      <div className="relative inline-block">
        <div className={trailing ? 'inline-flex items-center gap-3 sm:gap-4 flex-wrap justify-center' : ''}>
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-stone-900 leading-[1.16] tracking-tight ${headingClassName}`}
          >
            {children}
          </h2>
          {trailing}
        </div>

        <span
          className="absolute -top-3 -right-5 text-[#FB1443]/75 text-lg font-bold select-none"
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Scroll-Drawn Curved Crimson Ribbon Underline */}
        <div className={`w-32 sm:w-40 ${alignUnderline} mt-3 pointer-events-none`}>
          <svg viewBox="0 0 160 14" fill="none" className="w-full h-auto">
            <motion.path
              d="M 4 8 Q 48 2, 85 8 T 156 7"
              stroke="#FB1443"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: underlineDraw }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
