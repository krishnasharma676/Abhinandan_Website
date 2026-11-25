import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND_CONFIG } from '../../config/brand';
import MagneticButton from '../common/MagneticButton';
import SectionHeading from '../common/SectionHeading';

export default function ChelyJourneyScallopSection() {
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Kinetic Centerpiece Scroll Choreography:
  // Center medallion blooms in + double counter-spinning rings + asymmetric flank glide
  const badgeScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.76, 1.05, 0.94]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-35, 65]);
  const outerHaloRotate = useTransform(scrollYProgress, [0, 1], [40, -50]);
  const doodleY = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const leftPillarY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const rightCardY = useTransform(scrollYProgress, [0, 1], [34, -26]);
  const rightCardClip = useTransform(
    scrollYProgress,
    [0.12, 0.4],
    ['inset(0% 100% 0% 0% round 26px)', 'inset(0% 0% 0% 0% round 26px)']
  );
  const rightCardX = useTransform(scrollYProgress, [0.12, 0.4], [-38, 0]);
  const rightCardOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0.15, 1]);

  const handleMouseMove = (e) => {
    const el = wheelRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 16, ry: x * 16 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="h-full py-8 sm:py-11 lg:py-12 min-h-[calc(100vh-76px)] flex flex-col justify-center bg-white relative overflow-x-clip border-t border-stone-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 3-COLUMN SCULPTURAL STAGE (Top-Left Title • Center Spinning Medallion • Staggered-Right Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT WING (col-span-4): Sculpted Heading + Scroll-Drawn Flourish + CTA */}
          <motion.div
            style={{ y: leftPillarY }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 text-center lg:text-left lg:self-start lg:pt-6 space-y-5"
          >
            <SectionHeading align="responsive">
              Create Your Custom Gift Hamper
            </SectionHeading>

            {/* Brand Logo Color Pill Button - Hidden on Mobile as previously requested */}
            <div className="hidden sm:block pt-1">
              <MagneticButton
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  'Hi Abhinandan Gifting! I want to create a custom gift hamper with you.'
                )}`}
                target="_blank"
                rel="noreferrer"
                cursorLabel="CHAT"
                className="inline-block px-8 py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-[#FB1443]/20"
              >
                Customize on WhatsApp
              </MagneticButton>
            </div>
          </motion.div>

          {/* CENTERSTAGE (col-span-4): Counter-Spinning Double Scallop Medallion + 3D Hover Tilt */}
          <div className="lg:col-span-4 flex justify-center relative">
            <motion.div
              ref={wheelRef}
              style={{ scale: badgeScale }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-cursor="3D VIEW"
              className="relative w-72 sm:w-80 lg:w-[340px] xl:w-[375px] aspect-square flex items-center justify-center"
            >
              <div
                style={{
                  transform: `perspective(950px) rotateX(${tilt.rx.toFixed(
                    1
                  )}deg) rotateY(${tilt.ry.toFixed(1)}deg)`,
                  transition:
                    tilt.rx === 0 && tilt.ry === 0
                      ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                      : 'transform 0.12s ease-out',
                }}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                {/* Subtle Crimson Flourish Doodle */}
                <motion.div
                  style={{ y: doodleY }}
                  className="absolute -top-3 right-3 sm:right-6 w-24 sm:w-28 pointer-events-none z-20"
                >
                  <svg viewBox="0 0 100 60" fill="none">
                    <path
                      d="M 10 30 Q 30 5 50 30 T 90 30"
                      stroke="#FB1443"
                      strokeOpacity="0.35"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                {/* Champagne Gold Star Accent */}
                <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 text-[#D4AF37] text-2xl sm:text-3xl pointer-events-none select-none z-20">
                  ★
                </div>

                {/* Outer Counter-Spinning Delicate Ring */}
                <motion.div
                  style={{ rotate: outerHaloRotate }}
                  className="absolute -inset-2 pointer-events-none z-0 opacity-75"
                >
                  <svg viewBox="0 0 420 420" className="w-full h-full">
                    <circle
                      cx="210"
                      cy="210"
                      r="204"
                      fill="none"
                      stroke="#E7E5E4"
                      strokeWidth="2.5"
                      strokeDasharray="8 14"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                {/* Scroll-Spinning Logo Crimson Scallop Ring */}
                <motion.div
                  style={{ rotate: ringRotate }}
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <circle
                      cx="200"
                      cy="200"
                      r="185"
                      fill="#FB1443"
                      stroke="#FB1443"
                      strokeWidth="12"
                      strokeDasharray="22 18"
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="200" r="165" fill="none" stroke="#FAF7F2" strokeWidth="4" />
                  </svg>
                </motion.div>

                {/* Central Round Photo with Smooth Hover Zoom */}
                <div className="w-[80%] h-[80%] rounded-full overflow-hidden bg-white shadow-xl relative z-10 border-4 border-white group">
                  <img
                    src="/assets/chely/journey-recipient.png"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/brand/media_1795501189686_d66ba8f8.jpg';
                    }}
                    alt="Delighted recipient with sweet hamper"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT WING (col-span-4): Scroll-Driven Left-to-Right Reveal Card with Exact Copy */}
          <motion.div
            style={{ y: rightCardY }}
            className="lg:col-span-4 lg:self-end lg:pb-4"
          >
            <motion.div
              style={{
                clipPath: rightCardClip,
                x: rightCardX,
                opacity: rightCardOpacity,
              }}
              className="relative bg-[#FAF7F2] rounded-[26px] p-5 sm:p-6 lg:p-7 border border-stone-200/90 shadow-[0_14px_34px_rgba(0,0,0,0.06)] text-center lg:text-left will-change-transform"
            >
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans font-light">
                Want something special? You can fully customize your gift hamper with us. Tell us what items you want, your preferred box or basket style, and your budget. We will prepare the perfect gift hamper for your wedding, birthday, festival, or corporate event.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
