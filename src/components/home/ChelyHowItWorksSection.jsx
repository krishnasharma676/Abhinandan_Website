import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion';
import { Package, Sparkles, PenLine, Truck, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

/* ─── Brand palette ─── */
const CRIMSON = '#FB1443';
const PLUM    = '#351C4E';
const BLUSH   = '#FEEAE6';
const CREAM   = '#FAF7F2';

/* ─── Step data ─── */
const STEPS = [
  {
    num: '01',
    icon: Package,
    label: 'STEP ONE',
    title: 'Pick Your Box',
    subtitle: 'The perfect vessel',
    desc: 'Choose from hand-selected wicker baskets, heirloom wood trunks, or plush velvet boxes — each wrapped in satin ribbon.',
    color: CRIMSON,
    bg: '#FFF0F3',
    image: '/assets/chely/hamper-product-1.png',
    fallback: '/assets/brand/royal-whispers-trousseau.png',
    tag: 'CURATED SELECTION',
  },
  {
    num: '02',
    icon: Sparkles,
    label: 'STEP TWO',
    title: 'Fill With Goodies',
    subtitle: 'The finest ingredients',
    desc: 'Hand-pick premium California almonds, pistachios, cashews, and artisan sweets sourced fresh by KDF NUTS.',
    color: '#B8860B',
    bg: '#FFF9ED',
    image: '/assets/chely/custom-almonds.png',
    fallback: '/assets/chely/hamper-product-4.png',
    tag: 'PREMIUM QUALITY',
  },
  {
    num: '03',
    icon: PenLine,
    label: 'STEP THREE',
    title: 'Personalize It',
    subtitle: 'Your story, gifted',
    desc: 'Add custom satin ribbons, embossed name tags, and a handwritten greeting card — crafted for the person you cherish.',
    color: PLUM,
    bg: '#F3EFF8',
    image: '/assets/chely/hamper-product-2.png',
    fallback: '/assets/brand/diwali-corporate-basket.png',
    tag: 'BESPOKE TOUCH',
  },
  {
    num: '04',
    icon: Truck,
    label: 'STEP FOUR',
    title: 'Swift Delivery',
    subtitle: 'Joy, delivered fast',
    desc: 'Pan-India express delivery with gift-safe packaging. Your hamper arrives perfectly intact, ready to delight.',
    color: '#1A7A45',
    bg: '#EFFAF4',
    image: '/assets/chely/hamper-product-3.png',
    fallback: '/assets/brand/diwali-dryfruit-thal.png',
    tag: 'EXPRESS SHIP',
  },
];

/* ─── Animated counter ─── */
function CountUp({ target, duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setDisplay(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);
  return <span ref={ref}>{display}</span>;
}

/* ─── Scroll-driven vertical spine (desktop only) ─── */
function SpineProgress({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 35%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  return (
    <div className="relative w-full h-full flex justify-center">
      {/* Track */}
      <div className="absolute top-0 bottom-0 w-[2px] rounded-full" style={{ background: BLUSH }} />
      {/* Fill */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] rounded-full origin-top"
        style={{
          scaleY,
          background: `linear-gradient(to bottom, ${CRIMSON} 0%, ${PLUM} 100%)`,
        }}
      />
    </div>
  );
}

/* ─── Single step card ─── */
function StepCard({ step, index }) {
  const ref    = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const Icon   = step.icon;
  const isEven = index % 2 === 0;

  /* ── IMAGE PANE ── */
  const imagePart = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -28 : 28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full"
    >
      {/* Crisp Framed Image Card (no blurry fog halos or milky shimmer) */}
      <div
        className="relative overflow-hidden rounded-2xl lg:rounded-[28px] shadow-[0_10px_30px_rgba(53,28,78,0.1)] border border-rose-100 bg-white"
        style={{ aspectRatio: '4/3' }}
      >
        <motion.img
          src={step.image}
          onError={(e) => { e.currentTarget.src = step.fallback; }}
          alt={step.title}
          initial={{ scale: 1.06 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />

        {/* Tag chip */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] lg:text-[10px] font-bold tracking-widest text-white shadow-sm"
          style={{ background: step.color }}
        >
          {step.tag}
        </div>

        {/* Step number badge */}
        <div
          className="absolute bottom-3 right-3 w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center font-serif text-sm lg:text-base font-bold text-white shadow-lg"
          style={{ background: step.color }}
        >
          {step.num}
        </div>
      </div>
    </motion.div>
  );

  /* ── TEXT PANE ── */
  const textPart = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 28 : -28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      className="flex flex-col justify-center h-full py-2"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <span className="w-5 lg:w-7 h-px" style={{ background: step.color }} />
        <span
          className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase"
          style={{ color: step.color }}
        >
          {step.label}
        </span>
      </div>

      {/* Subtle Step Number */}
      <div
        className="font-serif font-bold leading-none select-none"
        style={{
          fontSize: 'clamp(44px, 7.5vw, 88px)',
          color: `${step.color}18`,
          lineHeight: 1,
        }}
      >
        {step.num}
      </div>

      {/* Title */}
      <h3
        className="font-serif font-normal leading-tight -mt-4 lg:-mt-6 mb-1.5"
        style={{ fontSize: 'clamp(22px, 3.2vw, 38px)', color: PLUM }}
      >
        {step.title}
      </h3>

      {/* Subtitle */}
      <p
        className="text-xs lg:text-sm font-sans italic mb-2 lg:mb-3"
        style={{ color: step.color }}
      >
        — {step.subtitle}
      </p>

      {/* Description */}
      <p className="text-stone-600 font-sans text-xs lg:text-sm leading-relaxed max-w-[320px]">
        {step.desc}
      </p>

      {/* Badge */}
      <div
        className="mt-3 inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full"
        style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
      >
        <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5" style={{ color: step.color }} strokeWidth={1.8} />
        <span className="text-[9px] lg:text-[10px] font-bold tracking-wider" style={{ color: step.color }}>
          {step.tag}
        </span>
      </div>
    </motion.div>
  );

  /* ── SPINE NODE (desktop center col) ── */
  const spineNode = (
    <div className="hidden lg:flex flex-col items-center justify-center h-full relative">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.18 }}
        className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center shadow-[0_6px_20px_rgba(53,28,78,0.2)] border-2 border-white"
        style={{ background: step.color }}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} className="w-full">
      {/* ── DESKTOP: proper 3-col grid  image | spine | text ── */}
      <div className="hidden lg:grid items-center" style={{ gridTemplateColumns: '1fr 64px 1fr', gap: '0 24px' }}>
        {isEven ? (
          <>
            {imagePart}
            {spineNode}
            {textPart}
          </>
        ) : (
          <>
            {textPart}
            {spineNode}
            {imagePart}
          </>
        )}
      </div>

      {/* ── MOBILE / TABLET: same alternating left-right as desktop ── */}
      <div className={`flex lg:hidden flex-row items-stretch gap-3 sm:gap-5 ${!isEven ? 'flex-row-reverse' : ''}`}>
        {/* Image pane */}
        <div className="shrink-0 w-[42vw] sm:w-[38vw]" style={{ maxWidth: 300 }}>
          {imagePart}
        </div>
        {/* Text pane */}
        <div className="flex-1 min-w-0">
          {textPart}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function ChelyHowItWorksSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const stepsRef    = useRef(null);
  const isHeadingIn = useInView(headingRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-14 sm:py-20">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-16">
          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isHeadingIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-7 h-px" style={{ background: CRIMSON }} />
            <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: CRIMSON }}>
              How It Works
            </span>
            <span className="w-7 h-px" style={{ background: CRIMSON }} />
          </motion.div>

          <SectionHeading className="max-w-xl mx-auto">
            How to customize your hamper
          </SectionHeading>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeadingIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-stone-600 font-sans text-sm max-w-sm mx-auto mt-3"
          >
            From choosing the box to doorstep delivery — every detail crafted with love.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isHeadingIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-7 flex flex-nowrap items-center justify-center gap-3"
          >
            {[
              { num: 500, suffix: '+', label: 'Hampers Gifted' },
              { num: 100, suffix: '%', label: 'Customizable' },
              { num: 48,  suffix: 'hr', label: 'Express Delivery' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-4 sm:px-5 py-2 rounded-xl border shadow-sm"
                style={{ background: CREAM, borderColor: BLUSH }}
              >
                <span className="font-serif text-lg lg:text-xl font-normal" style={{ color: PLUM }}>
                  <CountUp target={stat.num} />
                  {stat.suffix}
                </span>
                <span className="text-stone-600 text-[10px] tracking-wider uppercase mt-0.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── STEPS with spine ── */}
        <div className="relative" ref={stepsRef}>
          {/* Desktop spine line behind cards */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 pointer-events-none"
            style={{ left: 'calc(50% - 1px)', width: '2px' }}
          >
            <SpineProgress sectionRef={stepsRef} />
          </div>

          <div className="flex flex-col gap-8 sm:gap-12 lg:gap-14">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20 text-center"
        >
          <p className="text-stone-400 text-xs sm:text-sm mb-4 tracking-wide uppercase font-sans">
            Ready to create something special?
          </p>
          <a
            href={`https://wa.me/919109004099?text=${encodeURIComponent('Hi! I want to customize a gift hamper.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full text-white font-bold tracking-wide text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_28px_rgba(251,20,67,0.4)] active:scale-95 shadow-[0_4px_14px_rgba(251,20,67,0.3)]"
            style={{ background: `linear-gradient(135deg, ${CRIMSON}, #c0082f)` }}
          >
            <span>Start Customizing on WhatsApp</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
