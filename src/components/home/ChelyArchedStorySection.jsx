import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND_CONFIG } from '../../config/brand';
import MagneticButton from '../common/MagneticButton';
import SectionHeading from '../common/SectionHeading';

export default function ChelyArchedStorySection() {
  const sectionRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth GPU scroll-driven zoom-in / counter-parallax without hard clip-path cuts
  const primaryImgScale = useTransform(scrollYProgress, [0, 0.48, 1], [1.22, 1.0, 1.1]);
  const primaryArchScale = useTransform(scrollYProgress, [0.05, 0.42, 0.9], [0.84, 1.02, 0.98]);
  const primaryArchY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const secondaryArchY = useTransform(scrollYProgress, [0, 1], [62, -52]);
  const secondaryArchScale = useTransform(scrollYProgress, [0.05, 0.48, 1], [0.86, 1.04, 0.96]);
  const secondaryArchRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const ribbonPathLength = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 12, ry: x * 12 });
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      className="h-full py-8 sm:py-11 lg:py-12 min-h-[calc(100vh-76px)] flex flex-col justify-center bg-[#FAF7F2] relative overflow-x-clip border-t border-stone-200/80"
    >
      {/* Subtle Clean Architectural Ring Accent */}
      <div
        className="pointer-events-none absolute right-4 bottom-2 opacity-20 select-none animate-spin-slow"
        aria-hidden="true"
      >
        <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#D6D3D1" strokeWidth="4" strokeDasharray="10 8" />
          <circle cx="100" cy="100" r="52" stroke="#E7E5E4" strokeWidth="3" />
          <circle cx="100" cy="100" r="24" stroke="#FB1443" strokeWidth="2" strokeOpacity="0.35" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Dual Fixed Arched Composition (Clean White Frames + Neutral Depth) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
              style={{
                transform: `perspective(1100px) rotateX(${tilt.rx.toFixed(
                  1
                )}deg) rotateY(${tilt.ry.toFixed(1)}deg)`,
                transition:
                  tilt.rx === 0 && tilt.ry === 0
                    ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'transform 0.1s ease-out',
              }}
              className="relative w-full max-w-[440px] will-change-transform"
            >
              {/* Primary Tall Arch with Smooth Scroll Zoom-In */}
              <motion.div
                style={{ y: primaryArchY, scale: primaryArchScale }}
                className="w-[76%] aspect-[4/4.6] rounded-t-[150px] rounded-b-2xl overflow-hidden bg-white p-1.5 shadow-[0_16px_38px_rgba(0,0,0,0.09)] ring-1 ring-stone-200 relative z-10 group"
              >
                <div className="w-full h-full rounded-t-[140px] rounded-b-xl overflow-hidden bg-[#FAF7F2]">
                  <motion.img
                    style={{ scale: primaryImgScale }}
                    src="/assets/chely/story-arch-hamper.png"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/brand/royal-whispers-trousseau.png';
                    }}
                    alt="Curating luxury hampers"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>

              {/* Self-Drawing Silk Ribbon SVG on Scroll */}
              <div className="absolute -bottom-4 left-6 sm:left-10 w-44 sm:w-56 pointer-events-none z-20">
                <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto text-[#FB1443]/35">
                  <motion.path
                    d="M 10 90 C 40 20, 110 30, 90 90 C 70 140, 170 120, 190 40"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{ pathLength: ribbonPathLength }}
                  />
                </svg>
              </div>

              {/* Overlapping Secondary Arch with Opposing Parallax */}
              <motion.div
                style={{
                  y: secondaryArchY,
                  scale: secondaryArchScale,
                  rotate: secondaryArchRotate,
                }}
                className="absolute -bottom-4 right-0 sm:right-2 w-[56%] aspect-[4/4.6] rounded-t-[110px] rounded-b-2xl overflow-hidden bg-white p-1.5 shadow-[0_16px_38px_rgba(0,0,0,0.1)] ring-1 ring-stone-200 z-30 group"
              >
                <div className="w-full h-full rounded-t-[100px] rounded-b-xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src="/assets/chely/story-model-gift.png"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/brand/abbhinandan-profile.jpg';
                    }}
                    alt="Happy client with luxury gift"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Clean Original Editorial Copy & Typography Directly on White */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 lg:pl-6 text-left"
          >
            <SectionHeading align="left">
              We make personalized gift hampers for all your celebrations
            </SectionHeading>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans font-normal"
            >
              Welcome to Abhinandan Gifting by KDF NUTS. We help you create beautiful and memorable gifts for your family, friends, and business clients.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans font-normal"
            >
              You can customize everything inside your hamper — from fresh almonds, cashews, and pistachios to sweets, decorative items, and festive packaging. We pack every hamper with care and deliver safely across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-2"
            >
              <MagneticButton
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  'Hi Abhinandan Gifting! I want to order custom gift hampers.'
                )}`}
                target="_blank"
                rel="noreferrer"
                cursorLabel="CHAT"
                className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#FB1443]/20"
              >
                Chat on WhatsApp
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
