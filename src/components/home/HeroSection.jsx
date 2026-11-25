import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import MagneticButton from '../common/MagneticButton';

const InteractiveGiftBox3D = lazy(() => import('./InteractiveGiftBox3D'));

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ children }) {
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isBoxActive, setIsBoxActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMq);

    return () => {
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const stageTriggerRef = useRef(null);
  const showcaseLayerRef = useRef(null);
  const curtainLayerRef = useRef(null);
  const stageBgLayerRef = useRef(null);
  const topWaveRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroCopyRef = useRef(null);
  const boxWrapperRef = useRef(null);
  const boxInnerRef = useRef(null);
  const zoomWordRef = useRef(null);
  const portalColumnRef = useRef(null);
  const portalTopRef = useRef(null);
  const portalBottomRef = useRef(null);
  const topEdgeRef = useRef(null);
  const bottomEdgeRef = useRef(null);
  const cutBladeRef = useRef(null);
  const lastPortalOpenRef = useRef(false);

  useEffect(() => {
    const triggerEl = stageTriggerRef.current;
    if (!triggerEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const syncStageState = (progress, isDone) => {
      const portalOpen = progress >= 0.52;
      const splitStarted = progress >= 0.74;
      const nextBoxActive = progress < 0.42;

      setIsBoxActive((prev) => (prev === nextBoxActive ? prev : nextBoxActive));

      if (portalColumnRef.current) {
        portalColumnRef.current.style.pointerEvents =
          portalOpen && !splitStarted ? 'auto' : 'none';
      }
      if (curtainLayerRef.current) {
        curtainLayerRef.current.style.pointerEvents = splitStarted ? 'none' : 'auto';
        curtainLayerRef.current.style.visibility = isDone ? 'hidden' : 'visible';
      }
      if (showcaseLayerRef.current) {
        showcaseLayerRef.current.style.pointerEvents = splitStarted || isDone ? 'auto' : 'none';
      }

      if (lastPortalOpenRef.current !== portalOpen) {
        lastPortalOpenRef.current = portalOpen;
        window.dispatchEvent(new CustomEvent('abhinandan:portal', { detail: { open: portalOpen } }));
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-stage',
          trigger: triggerEl,
          start: 'top 76px',
          end: () => (window.innerWidth < 768 ? '+=1320' : '+=1620'),
          pin: true,
          pinSpacing: true,
          scrub: 0.15,
          anticipatePin: 1,
          refreshPriority: 10,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncStageState(self.progress, self.progress >= 0.995),
          onEnterBack: (self) => syncStageState(self.progress, false),
          onLeave: () => syncStageState(1, true),
          onLeaveBack: () => syncStageState(0, false),
        },
      });

      // Phase 1 (0.00 -> 0.22): Scallop fades, BG zooms, hero copy lifts, 3D box centers
      tl.to(
        topWaveRef.current,
        { opacity: 0, y: -16, duration: 0.12, ease: 'power1.out' },
        0
      )
        .to(
          heroBgRef.current,
          { scale: 1.2, duration: 0.36, ease: 'power1.out' },
          0
        )
        .to(
          heroCopyRef.current,
          { yPercent: -48, scale: 0.9, opacity: 0, duration: 0.18, ease: 'power2.inOut' },
          0
        )
        .to(
          boxWrapperRef.current,
          { top: '50%', duration: 0.22, ease: 'power2.out' },
          0
        )
        .to(
          boxInnerRef.current,
          {
            scale: () => (window.innerWidth < 768 ? 1.12 : 1.24),
            duration: 0.22,
            ease: 'power2.out',
          },
          0
        );

      // Phase 2 (0.22 -> 0.34): 3D Gift Box swells toward camera & clears out
      tl.to(
        boxInnerRef.current,
        { scale: 1.65, opacity: 0, duration: 0.12, ease: 'power2.in' },
        0.22
      ).to(
        boxWrapperRef.current,
        { pointerEvents: 'none', duration: 0.01 },
        0.28
      );

      // Phase 3 (0.28 -> 0.54): "UNBOX ABHINANDAN" zooms massively past camera
      tl.fromTo(
        zoomWordRef.current,
        { scale: 0.24, opacity: 0, letterSpacing: '0.24em' },
        {
          scale: () => (window.innerWidth < 768 ? 1.02 : 1.18),
          opacity: 1,
          letterSpacing: '0.02em',
          duration: 0.13,
          ease: 'power2.out',
        },
        0.28
      ).to(
        zoomWordRef.current,
        {
          scale: () => (window.innerWidth < 768 ? 5.2 : 7.8),
          opacity: 0,
          duration: 0.13,
          ease: 'power2.in',
        },
        0.41
      );

      // Phase 4 (0.48 -> 0.65): Solid pure-white portal opens horizontally (zero seam shadow)
      tl.fromTo(
        portalColumnRef.current,
        { clipPath: 'inset(0% 50% 0% 50%)', opacity: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.17, ease: 'power3.inOut' },
        0.48
      ).to(
        stageBgLayerRef.current,
        { opacity: 0, duration: 0.03 },
        0.66
      );

      // Phase 5a (0.69 -> 0.76): Glowing Horizontal Center Cut slices across exact 50%
      tl.fromTo(
        cutBladeRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.07, ease: 'power2.out' },
        0.69
      )
        // Fade subtle cut-edge shadows in ONLY once the cut opens (invisible before scroll!)
        .to(
          [topEdgeRef.current, bottomEdgeRef.current],
          { opacity: 1, duration: 0.04, ease: 'power1.out' },
          0.74
        );

      // Phase 5b (0.76 -> 1.00): Vertical Split opens straight up & down revealing Hampers underneath
      tl.to(
        cutBladeRef.current,
        { opacity: 0, duration: 0.04, ease: 'power1.out' },
        0.76
      )
        .to(
          portalTopRef.current,
          { yPercent: -104, ease: 'power2.inOut', duration: 0.24 },
          0.76
        )
        .to(
          portalBottomRef.current,
          { yPercent: 104, ease: 'power2.inOut', duration: 0.24 },
          0.76
        )
        .fromTo(
          showcaseLayerRef.current,
          { scale: 0.91, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.24 },
          0.74
        );
    }, stageTriggerRef);

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, []);

  const handleExploreHampersClick = (e) => {
    e.preventDefault();
    const heroTrigger = ScrollTrigger.getById('hero-stage');
    if (heroTrigger && window.__lenis) {
      window.__lenis.scrollTo(heroTrigger.end + 2, { duration: 1.05 });
      return;
    }
    const el = document.querySelector('#hampers');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -76, duration: 1.05 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative z-10 bg-[#FAF7F2]">
      <div
        id="hero-stage-box"
        ref={stageTriggerRef}
        className={`relative w-full ${
          reducedMotion ? 'flex flex-col' : 'min-h-[calc(100vh-76px)] grid grid-cols-1'
        }`}
      >
        {/* TOP OVERLAY LAYER (z-30): Hero -> Seamless White Portal -> Horizontal Cut -> Vertical Split */}
        <div
          ref={curtainLayerRef}
          className={
            reducedMotion
              ? 'relative h-[calc(100vh-76px)] min-h-[540px] z-30 overflow-hidden'
              : 'col-start-1 row-start-1 relative h-[calc(100vh-76px)] min-h-[540px] z-30 overflow-hidden'
          }
        >
          {/* Phases 1–3 Opaque Luxury Blush Stage Backdrop */}
          <div ref={stageBgLayerRef} className="absolute inset-0 bg-[#FEEAE6] z-10">
            <div className="relative w-full h-full flex flex-col justify-start items-center overflow-hidden pt-[clamp(56px,14vh,148px)] sm:pt-[clamp(32px,7vh,68px)]">
              <div
                ref={topWaveRef}
                className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none"
              >
                <motion.img
                  src="/assets/chely/zigzag-1.webp"
                  alt="scallop shape"
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-auto min-h-[14px] object-cover object-top"
                />
              </div>

              <div
                ref={heroBgRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform origin-center"
              >
                <motion.div
                  initial={{ scale: 1.06, opacity: 0.85 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full bg-cover bg-bottom"
                  style={{ backgroundImage: `url('/assets/chely/hero-bg-4.png')` }}
                />
              </div>

              <div
                ref={heroCopyRef}
                className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
              >
                <h1 className="font-serif text-[27px] sm:text-3xl md:text-4xl lg:text-[46px] font-normal text-[#351C4E] leading-[1.16] tracking-tight mb-2.5">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block will-change-transform"
                  >
                    Make Every Event{' '}
                    <span className="relative inline-block text-[#351C4E]">
                      Special
                      <motion.img
                        src="/assets/chely/title-shape.webp"
                        alt="sparkle"
                        initial={{ scale: 0, rotate: -24, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.25 }}
                        className="absolute -top-3.5 -right-6 sm:-top-5 sm:-right-9 w-7 sm:w-10 pointer-events-none select-none"
                      />
                    </span>
                  </motion.span>{' '}
                  <br className="hidden sm:inline" />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block will-change-transform"
                  >
                    With Custom Gift Hampers
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[#5A3F74] text-xs sm:text-sm lg:text-[14px] max-w-lg mx-auto leading-relaxed font-sans font-medium"
                >
                  Welcome to Abhinandan Gifting by KDF NUTS. We create custom gift hampers for weddings, birthdays, festivals, and corporate gifting. Delivered all across India.
                </motion.p>
              </div>
            </div>

            <div
              ref={boxWrapperRef}
              className="absolute top-[65%] sm:top-[71%] lg:top-[70%] inset-x-0 mx-auto -translate-y-1/2 w-64 sm:w-52 md:w-56 lg:w-[250px] xl:w-[275px] h-56 sm:h-48 md:h-52 lg:h-[220px] xl:h-[245px] z-30 pointer-events-auto"
            >
              <div ref={boxInnerRef} className="w-full h-full flex items-center justify-center will-change-transform">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.12 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Suspense fallback={null}>
                    <InteractiveGiftBox3D
                      isUnboxed={isUnboxed}
                      isActive={isBoxActive}
                      onToggleUnbox={setIsUnboxed}
                    />
                  </Suspense>
                </motion.div>
              </div>
            </div>

            <div
              ref={zoomWordRef}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none select-none opacity-0 px-4 will-change-transform"
            >
              <span className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-[108px] font-normal leading-[0.9] tracking-tight text-[#351C4E] uppercase">
                UNBOX
              </span>
              <span className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-[108px] font-normal leading-[0.9] tracking-tight text-[#FB1443] uppercase">
                ABHINANDAN
              </span>
            </div>
          </div>

          {/* PHASE 4 & 5: Pure Seamless Solid White Surface Before Cut -> Vertical Split Shutters on Scroll */}
          <div
            ref={portalColumnRef}
            id="hero-subcontent"
            className="absolute inset-0 z-40 opacity-0 pointer-events-none overflow-hidden"
            style={{ clipPath: 'inset(0% 50% 0% 50%)' }}
          >
            {/* TOP HALF — Pure flat #FFFFFF (edge highlight invisible until cut!) */}
            <div
              ref={portalTopRef}
              className="absolute top-0 inset-x-0 h-1/2 bg-white flex flex-col justify-end pb-5 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 will-change-transform"
            >
              <div className="max-w-7xl w-full mx-auto">
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-[46px] font-normal text-[#351C4E] leading-[1.15] tracking-tight text-center">
                  Handcrafted with <span className="text-[#FB1443]">love</span> by KDF NUTS
                </h2>
              </div>
              <div
                ref={topEdgeRef}
                className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-[#FB1443]/30 shadow-[0_10px_28px_rgba(53,28,78,0.16)] opacity-0"
                aria-hidden="true"
              />
            </div>

            {/* BOTTOM HALF — Pure flat #FFFFFF seamlessly joined with top half */}
            <div
              ref={portalBottomRef}
              className="absolute bottom-0 inset-x-0 h-1/2 bg-white flex flex-col justify-start pt-4 sm:pt-7 lg:pt-9 px-4 sm:px-6 lg:px-8 will-change-transform"
            >
              <div
                ref={bottomEdgeRef}
                className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-[#FB1443]/30 shadow-[0_-10px_28px_rgba(53,28,78,0.16)] opacity-0"
                aria-hidden="true"
              />

              <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-8 lg:gap-14 items-start text-left">
                <div className="lg:col-span-5">
                  <h2 className="font-serif text-xl sm:text-3xl lg:text-[40px] font-normal text-stone-900 leading-[1.18]">
                    Every hamper is made with love and customized just for you
                  </h2>
                </div>

                <div className="lg:col-span-6 lg:col-start-7 space-y-3.5 sm:space-y-5 font-sans">
                  <p className="text-stone-700 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
                    At Abhinandan Gifting, you can customize your gift hamper however you like. Choose from fresh California almonds, cashews, sweets, decorative baskets, and custom gift boxes. Perfect for family, friends, and corporate gifting.
                  </p>

                  <div className="flex items-center gap-2.5 sm:gap-3.5 pt-1">
                    <MagneticButton
                      href="#hampers"
                      onClick={handleExploreHampersClick}
                      cursorLabel="EXPLORE"
                      className="flex-1 sm:flex-initial text-center justify-center px-3 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-[#FB1443]/20 whitespace-nowrap"
                    >
                      Explore Hampers
                    </MagneticButton>

                    <MagneticButton
                      href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                        'Hi Abhinandan Gifting! I want to enquire about custom gift hampers.'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      cursorLabel="CHAT"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full border-2 border-[#FB1443] text-[#FB1443] hover:bg-[#FB1443] hover:text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm whitespace-nowrap transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>WhatsApp Us</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER HORIZONTAL CUT BLADE — Only appears as you scroll past Hero Subcontent */}
            <div
              ref={cutBladeRef}
              className="pointer-events-none absolute top-1/2 inset-x-0 -translate-y-1/2 z-50 flex items-center justify-center opacity-0 origin-center will-change-transform"
              aria-hidden="true"
            >
              <div className="w-full h-[3px] bg-gradient-to-r from-[#FFA6B6] via-[#FB1443] to-[#FFA6B6] shadow-[0_0_18px_rgba(251,20,67,0.65)]" />
              <span className="absolute w-3.5 h-3.5 rotate-45 bg-[#FB1443] border-2 border-white shadow-[0_0_14px_rgba(251,20,67,0.8)]" />
            </div>
          </div>
        </div>

        {/* UNDERLAY LAYER (z-10): Next section rendered cleanly right underneath the split shutters */}
        <div
          ref={showcaseLayerRef}
          className={
            reducedMotion
              ? 'relative z-10 bg-[#FAF7F2]'
              : 'col-start-1 row-start-1 relative z-10 bg-[#FAF7F2] will-change-transform'
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
