import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, MessageCircle, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import SectionHeading from '../common/SectionHeading';

const PRODUCTS = [
  {
    id: 'hamper-1',
    title: 'ROYAL WOODEN DRY FRUIT CHEST',
    price: 3499,
    image: '/assets/chely/hamper-product-1.png',
    fallbackImage: '/assets/brand/royal-whispers-trousseau.png',
  },
  {
    id: 'hamper-2',
    title: 'ROSE GOLD VELVET GIFT BOX',
    price: 2850,
    image: '/assets/chely/hamper-product-2.png',
    fallbackImage: '/assets/brand/diwali-corporate-basket.png',
  },
  {
    id: 'hamper-3',
    title: 'PEARL WICKER GIFT BASKET',
    price: 2299,
    image: '/assets/chely/hamper-product-3.png',
    fallbackImage: '/assets/brand/diwali-dryfruit-thal.png',
  },
  {
    id: 'hamper-4',
    title: 'SWEET & DRY FRUIT CELEBRATION BOX',
    price: 1899,
    image: '/assets/chely/hamper-product-4.png',
    fallbackImage: '/assets/brand/media_1795501189087_5c81e18a.jpg',
  },
  {
    id: 'hamper-5',
    title: 'TROUSSEAU LEGACY HAMPER',
    price: 4299,
    image: '/assets/hampers/hamper-1.jpg',
    fallbackImage: '/assets/chely/hamper-product-1.png',
  },
  {
    id: 'hamper-6',
    title: 'CORPORATE GRAND HAMPER',
    price: 3199,
    image: '/assets/hampers/hamper-2.jpg',
    fallbackImage: '/assets/chely/hamper-product-2.png',
  },
];

function getCircularOffset(index, activeIdx, total) {
  let diff = index - activeIdx;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function ArchCoverflowCard({
  product,
  offset,
  isMobile,
  isTablet,
  onSelectCenter,
  onInspect,
}) {
  const cardTiltRef = useRef(null);
  const glossRef = useRef(null);
  const isActive = offset === 0;
  const absOff = Math.abs(offset);

  // Hide back card cleanly behind opaque foreground flankers
  const isHidden = isMobile ? absOff >= 2 : absOff >= 3;

  // Responsive 3D Arc Positioning
  const xStep = isMobile ? 162 : isTablet ? 215 : 275;
  const x = absOff >= 3 ? 0 : offset * xStep;
  const y = absOff === 0 ? 0 : absOff === 1 ? (isMobile ? 18 : 22) : absOff === 2 ? 52 : 68;
  const scale = absOff === 0 ? 1 : absOff === 1 ? (isMobile ? 0.8 : 0.85) : absOff === 2 ? 0.68 : 0.45;
  const rotateY = absOff >= 3 || offset === 0 ? 0 : -offset * (isMobile ? 18 : 20);
  const rotateZ = absOff >= 3 || offset === 0 ? 0 : offset * (isMobile ? 3.5 : 3);
  const zIndex = 30 - absOff * 10;
  const opacity = isHidden ? 0 : absOff === 0 ? 1 : absOff === 1 ? (isMobile ? 0.88 : 0.98) : 0.68;

  const handleMouseMove = (e) => {
    if (!isActive || isMobile) return;
    const el = cardTiltRef.current;
    const gloss = glossRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 12;
    const ry = (px - 0.5) * 12;

    el.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) translateZ(10px)`;
    if (gloss) {
      gloss.style.opacity = '1';
      gloss.style.background = `radial-gradient(circle at ${px * 100}% ${
        py * 100
      }%, rgba(255,255,255,0.45) 0%, rgba(251,20,67,0.08) 45%, transparent 75%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardTiltRef.current) {
      cardTiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (glossRef.current) {
      glossRef.current.style.opacity = '0';
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        x,
        y,
        scale,
        rotateY,
        rotateZ,
        opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 230,
        damping: 26,
        mass: 0.9,
      }}
      style={{
        zIndex,
        transformPerspective: 1300,
        transformStyle: 'preserve-3d',
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
      onClick={() => {
        if (isActive) {
          onInspect(product);
        } else {
          onSelectCenter();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={isActive ? 'VIEW' : 'SELECT'}
      role="button"
      tabIndex={isHidden ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isActive) onInspect(product);
          else onSelectCenter();
        }
      }}
      className="absolute top-0 w-[250px] sm:w-[290px] lg:w-[310px] cursor-pointer select-none"
    >
      {/* Subtle Crisp Neutral Shadow Base (no pink blur fog) */}
      <div
        ref={cardTiltRef}
        className={`relative bg-white rounded-t-[155px] rounded-b-[26px] p-2.5 sm:p-3 pb-4 transition-all duration-300 ${
          isActive
            ? 'shadow-[0_18px_40px_-14px_rgba(28,25,23,0.14)] ring-2 ring-[#FB1443]/40'
            : 'shadow-[0_10px_24px_-10px_rgba(0,0,0,0.08)] ring-1 ring-stone-200 hover:ring-stone-300'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inner Arched Image Stage */}
        <div className="relative w-full h-[220px] sm:h-[245px] lg:h-[260px] rounded-t-[142px] rounded-b-xl overflow-hidden bg-[#FAF7F2] group">
          <img
            src={product.image}
            onError={(e) => {
              e.currentTarget.src = product.fallbackImage;
            }}
            alt={product.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
              isActive ? 'group-hover:scale-110' : 'scale-100'
            }`}
          />

          {/* Soft Silk Specular Glare */}
          <div
            ref={glossRef}
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          />

          {/* Subtle Zoom Trigger Icon on Active Card Hover / Tap */}
          {isActive && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(product);
              }}
              aria-label={`Zoom ${product.title}`}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-[#FB1443] text-[#351C4E] hover:text-white flex items-center justify-center shadow-md transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:scale-90 sm:group-hover:scale-100"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clean Minimal Product Meta + WhatsApp Action */}
        <div className="pt-3.5 px-2 text-center space-y-1.5">
          <h3
            className={`font-sans font-bold text-xs sm:text-sm tracking-wider uppercase line-clamp-1 transition-colors ${
              isActive ? 'text-[#351C4E]' : 'text-stone-800'
            }`}
          >
            {product.title}
          </h3>

          <p className="font-sans font-bold text-base sm:text-lg text-[#FB1443]">
            {BRAND_CONFIG.currency}
            {product.price.toLocaleString()}
          </p>

          <div
            className={`pt-1.5 transition-all duration-300 ${
              isActive
                ? 'opacity-100 translate-y-0 max-h-12'
                : 'opacity-0 translate-y-1 max-h-0 overflow-hidden pointer-events-none'
            }`}
          >
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                `Hi Abhinandan Gifting! I would like to order "${product.title}" (${BRAND_CONFIG.currency}${product.price}). Please share details.`
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-[#FB1443]/25 transition-transform active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChelyProductsShowcase() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [viewportMode, setViewportMode] = useState('desktop');

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Zero-rerender GPU scroll-linked exit depth & perspective pitch into Customize section
  const deckScale = useTransform(scrollYProgress, [0, 0.35, 0.82, 1], [1, 1, 1, 0.94]);
  const deckY = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, -24]);
  const deckRotateX = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, -5]);

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) setViewportMode('mobile');
      else if (w < 1024) setViewportMode('tablet');
      else setViewportMode('desktop');
    };
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIdx !== null) {
        if (e.key === 'Escape') setSelectedIdx(null);
        else if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev + 1) % PRODUCTS.length);
        else if (e.key === 'ArrowLeft')
          setSelectedIdx((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx]);

  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  const handleNext = () => setActiveIdx((prev) => (prev + 1) % PRODUCTS.length);

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';
  const selectedProduct = selectedIdx !== null ? PRODUCTS[selectedIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="hampers"
      className="bg-[#FAF7F2] relative z-10 py-8 sm:py-11 min-h-[calc(100vh-76px)] flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Shared Signature Animated Heading */}
        <SectionHeading className="max-w-3xl mx-auto mb-5 sm:mb-7 pt-1 sm:pt-0">
          Explore our best gift hampers
        </SectionHeading>

        {/* Interactive 3D Curved Orbit Deck (Supports Touch Swipe + Click + Scroll Depth) */}
        <motion.div
          style={{
            scale: deckScale,
            y: deckY,
            rotateX: deckRotateX,
            transformPerspective: 1400,
          }}
          onPanEnd={(_, info) => {
            if (info.offset.x < -40 || info.velocity.x < -280) handleNext();
            else if (info.offset.x > 40 || info.velocity.x > 280) handlePrev();
          }}
          className="relative w-full h-[365px] sm:h-[395px] lg:h-[410px] flex justify-center touch-pan-y will-change-transform"
        >
          {PRODUCTS.map((product, idx) => {
            const offset = getCircularOffset(idx, activeIdx, PRODUCTS.length);
            return (
              <ArchCoverflowCard
                key={product.id}
                product={product}
                offset={offset}
                isMobile={isMobile}
                isTablet={isTablet}
                onSelectCenter={() => setActiveIdx(idx)}
                onInspect={() => setSelectedIdx(idx)}
              />
            );
          })}
        </motion.div>

        {/* Interactive Orbital Navigation & Mini Photo Thumbnail Dock */}
        <div className="mt-2 sm:mt-4 flex items-center justify-center gap-2 sm:gap-4 relative z-30">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous hamper"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FB1443] text-[#351C4E] hover:text-white border border-stone-200 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-90 shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">
            {PRODUCTS.map((p, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={`thumb-${p.id}`}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-label={p.title}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 ${
                    active
                      ? 'w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-[#FB1443] ring-offset-2 ring-offset-white scale-105'
                      : 'w-6 h-6 sm:w-8 sm:h-8 opacity-65 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={p.image}
                    onError={(e) => {
                      e.currentTarget.src = p.fallbackImage;
                    }}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next hamper"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FB1443] text-[#351C4E] hover:text-white border border-stone-200 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-90 shrink-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Minimal Photo Zoom-In Lightbox Modal rendered cleanly at body root */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="fixed inset-0 z-[95] bg-stone-900/75 backdrop-blur-md flex items-center justify-center p-4"
              >
                <motion.div
                  key={selectedProduct.id}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-md w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-white p-5 sm:p-6 text-center space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(null)}
                    className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white text-stone-700 hover:bg-[#FB1443] hover:text-white flex items-center justify-center shadow-sm transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative rounded-t-[130px] rounded-b-2xl overflow-hidden bg-white p-2 shadow-sm">
                    <img
                      src={selectedProduct.image}
                      onError={(e) => {
                        e.currentTarget.src = selectedProduct.fallbackImage;
                      }}
                      alt={selectedProduct.title}
                      className="w-full h-72 object-cover rounded-t-[122px] rounded-b-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIdx((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-[#FB1443] text-[#351C4E] hover:text-white flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIdx((prev) => (prev + 1) % PRODUCTS.length)}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-[#FB1443] text-[#351C4E] hover:text-white flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-base tracking-wider text-stone-900 uppercase mb-1">
                      {selectedProduct.title}
                    </h3>
                    <p className="font-sans font-bold text-lg text-[#FB1443] mb-4">
                      {BRAND_CONFIG.currency}
                      {selectedProduct.price.toLocaleString()}
                    </p>

                    <a
                      href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                        `Hi Abhinandan Gifting! I would like to order "${selectedProduct.title}" (${BRAND_CONFIG.currency}${selectedProduct.price}). Please share details.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#FB1443]/25 transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
