import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import FloatingDecoration from '../common/FloatingDecoration';

// Function to generate exact postage stamp path with scalloped teeth along all 4 edges (Matching Instagram section)
function getStampPath(w = 320, h = 340, r = 5, spacing = 15) {
  let d = 'M 0 0 ';

  // Top edge notches
  const topCount = Math.floor((w - 24) / spacing);
  const topStartX = (w - (topCount - 1) * spacing) / 2;
  d += `H ${(topStartX - r).toFixed(1)} `;
  for (let i = 0; i < topCount; i++) {
    const cx = topStartX + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${(cx + r).toFixed(1)} 0 `;
    if (i < topCount - 1) d += `H ${(cx + spacing - r).toFixed(1)} `;
  }
  d += `H ${w} `;

  // Right edge notches
  const rightCount = Math.floor((h - 24) / spacing);
  const rightStartY = (h - (rightCount - 1) * spacing) / 2;
  d += `V ${(rightStartY - r).toFixed(1)} `;
  for (let i = 0; i < rightCount; i++) {
    const cy = rightStartY + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${w} ${(cy + r).toFixed(1)} `;
    if (i < rightCount - 1) d += `V ${(cy + spacing - r).toFixed(1)} `;
  }
  d += `V ${h} `;

  // Bottom edge notches
  d += `H ${(topStartX + (topCount - 1) * spacing + r).toFixed(1)} `;
  for (let i = topCount - 1; i >= 0; i--) {
    const cx = topStartX + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${(cx - r).toFixed(1)} ${h} `;
    if (i > 0) d += `H ${(cx - spacing + r).toFixed(1)} `;
  }
  d += 'H 0 ';

  // Left edge notches
  d += `V ${(rightStartY + (rightCount - 1) * spacing + r).toFixed(1)} `;
  for (let i = rightCount - 1; i >= 0; i--) {
    const cy = rightStartY + i * spacing;
    d += `A ${r} ${r} 0 0 0 0 ${(cy - r).toFixed(1)} `;
    if (i > 0) d += `V ${(cy - spacing + r).toFixed(1)} `;
  }
  d += 'Z';
  return d;
}

const STAMP_PATH = getStampPath(320, 340, 5, 15);

const PRODUCTS = [
  {
    id: 'hamper-1',
    title: 'ROYAL WOODEN DRY FRUIT CHEST',
    category: 'GIFT BOX',
    price: 3499,
    image: '/assets/chely/hamper-product-1.png',
    fallbackImage: '/assets/brand/royal-whispers-trousseau.png',
  },
  {
    id: 'hamper-2',
    title: 'ROSE GOLD VELVET GIFT BOX',
    category: 'GIFT BOX',
    price: 2850,
    image: '/assets/chely/hamper-product-2.png',
    fallbackImage: '/assets/brand/diwali-corporate-basket.png',
  },
  {
    id: 'hamper-3',
    title: 'PEARL WICKER GIFT BASKET',
    category: 'GIFT BASKET',
    price: 2299,
    image: '/assets/chely/hamper-product-3.png',
    fallbackImage: '/assets/brand/diwali-dryfruit-thal.png',
  },
  {
    id: 'hamper-4',
    title: 'SWEET & DRY FRUIT CELEBRATION BOX',
    category: 'FESTIVE BOX',
    price: 1899,
    image: '/assets/chely/hamper-product-4.png',
    fallbackImage: '/assets/brand/media_1795501189087_5c81e18a.jpg',
  },
];

// Product sequence for Mobile Scroll Parallax (6 cards per row for seamless horizontal glide)
const ROW1_PRODUCTS = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], PRODUCTS[0], PRODUCTS[1]];
const ROW2_PRODUCTS = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[3]];

export default function ChelyProductsShowcase() {
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Mobile Scroll Parallax: Row 1 swipes Right, Row 2 swipes Left as you scroll down
  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        // Progress goes from 0 (section enters bottom) to 1 (section leaves top)
        const totalDist = vh + rect.height;
        const currentDist = vh - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));

        // Travel range in pixels
        // Row 1: shifts horizontally to the RIGHT as you scroll down
        const travel = 160;
        const shift1 = (progress - 0.5) * travel;
        // Row 2: shifts horizontally to the LEFT as you scroll down
        const shift2 = (0.5 - progress) * travel;

        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${shift1.toFixed(1)}px, 0px, 0px)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${shift2.toFixed(1)}px, 0px, 0px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? PRODUCTS.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= PRODUCTS.length - 3 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} id="hampers" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">

      {/* Top-Left Floating Luxury Gift Box (Tucked safely in corner on mobile) */}
      <FloatingDecoration
        type="gift-box"
        size={115}
        mobileSize={48}
        speed={0.35}
        delay={0.2}
        duration={5.6}
        rotate={-12}
        className="absolute left-1 sm:left-6 lg:left-10 top-1.5 sm:top-12 z-30 opacity-90 sm:opacity-95"
      />
      {/* Bottom-Right Floating Pistas Jar (Tucked safely in bottom corner) */}
      <FloatingDecoration
        type="pistas-jar"
        size={105}
        mobileSize={46}
        speed={0.32}
        delay={1.1}
        duration={5.2}
        rotate={10}
        className="absolute right-1 sm:right-6 lg:right-10 bottom-1.5 sm:bottom-12 z-30 opacity-90 sm:opacity-95"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading (Clearance on mobile so corner decoration never overlaps) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-5 sm:pt-0">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal text-stone-900 leading-[1.2] tracking-tight">
            Explore our best gift hampers
          </h2>
        </div>

        {/* ========================================================
            MOBILE VIEW: 2-Row Scroll-Driven Parallax Showcase (< sm)
            - Row 1: Swipes horizontally to the RIGHT as you scroll down
            - Row 2: Swipes horizontally to the LEFT as you scroll down
        ======================================================== */}
        <div className="block sm:hidden space-y-4 overflow-hidden -mx-4 px-2 py-1">
          
          {/* Row 1: Moves right on scroll */}
          <div
            ref={row1Ref}
            className="flex gap-3 will-change-transform -ml-24"
          >
            {ROW1_PRODUCTS.map((product, idx) => (
              <a
                key={`mob-r1-${product.id}-${idx}`}
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  `Hi Abhinandan Gifting! I would like to order "${product.title}" (${BRAND_CONFIG.currency}${product.price}). Please share details.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 w-[148px] flex flex-col items-center text-center select-none active:scale-95 transition-transform"
              >
                <div className="relative w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.07)] mb-2">
                  <svg
                    viewBox="0 0 320 340"
                    className="w-full h-auto overflow-visible select-none pointer-events-none block"
                  >
                    <defs>
                      <clipPath id={`mob-stamp-r1-${idx}`}>
                        <rect x="20" y="20" width="280" height="300" rx="3" />
                      </clipPath>
                    </defs>
                    <path d={STAMP_PATH} fill="#FFFFFF" />
                    <image
                      href={product.image}
                      x="20"
                      y="20"
                      width="280"
                      height="300"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#mob-stamp-r1-${idx})`}
                    />
                  </svg>
                </div>

                <h3 className="font-sans font-bold text-[11px] tracking-wider text-stone-900 uppercase mb-0.5 line-clamp-1 px-1">
                  {product.title}
                </h3>

                <p className="font-sans font-bold text-xs text-[#A31352]">
                  {BRAND_CONFIG.currency}{product.price.toLocaleString()}
                </p>
              </a>
            ))}
          </div>

          {/* Row 2: Moves left on scroll */}
          <div
            ref={row2Ref}
            className="flex gap-3 will-change-transform -ml-12"
          >
            {ROW2_PRODUCTS.map((product, idx) => (
              <a
                key={`mob-r2-${product.id}-${idx}`}
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  `Hi Abhinandan Gifting! I would like to order "${product.title}" (${BRAND_CONFIG.currency}${product.price}). Please share details.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 w-[148px] flex flex-col items-center text-center select-none active:scale-95 transition-transform"
              >
                <div className="relative w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.07)] mb-2">
                  <svg
                    viewBox="0 0 320 340"
                    className="w-full h-auto overflow-visible select-none pointer-events-none block"
                  >
                    <defs>
                      <clipPath id={`mob-stamp-r2-${idx}`}>
                        <rect x="20" y="20" width="280" height="300" rx="3" />
                      </clipPath>
                    </defs>
                    <path d={STAMP_PATH} fill="#FFFFFF" />
                    <image
                      href={product.image}
                      x="20"
                      y="20"
                      width="280"
                      height="300"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#mob-stamp-r2-${idx})`}
                    />
                  </svg>
                </div>

                <h3 className="font-sans font-bold text-[11px] tracking-wider text-stone-900 uppercase mb-0.5 line-clamp-1 px-1">
                  {product.title}
                </h3>

                <p className="font-sans font-bold text-xs text-[#A31352]">
                  {BRAND_CONFIG.currency}{product.price.toLocaleString()}
                </p>
              </a>
            ))}
          </div>

        </div>

        {/* ========================================================
            DESKTOP VIEW: 3-Card Carousel with Arrows (>= sm)
            - 100% UNCHANGED for Desktop
        ======================================================== */}
        <div className="hidden sm:block relative">

          {/* Navigation Arrows (Chely Style) */}
          <button
            onClick={prevSlide}
            aria-label="Previous products"
            className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-stone-700 shadow-md flex items-center justify-center hover:bg-[#FB1443] hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next products"
            className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-stone-700 shadow-md flex items-center justify-center hover:bg-[#FB1443] hover:text-white transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Product Cards Grid: 3 cards in 1 row on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRODUCTS.slice(startIndex, startIndex + 3).concat(
              startIndex + 3 > PRODUCTS.length
                ? PRODUCTS.slice(0, (startIndex + 3) % PRODUCTS.length)
                : []
            ).map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:rotate-1"
              >
                {/* Authentic Scalloped Postage Stamp Container */}
                <div className="relative w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)] mb-5 sm:mb-6">
                  <svg
                    viewBox="0 0 320 340"
                    className="w-full h-auto overflow-visible select-none"
                  >
                    <defs>
                      <clipPath id={`product-stamp-clip-${product.id}`}>
                        <rect x="20" y="20" width="280" height="300" rx="3" />
                      </clipPath>
                    </defs>

                    {/* Pure White Postage Stamp Frame with Scalloped Perforations */}
                    <path d={STAMP_PATH} fill="#FFFFFF" />

                    {/* Inner Product Photo */}
                    <image
                      href={product.image}
                      x="20"
                      y="20"
                      width="280"
                      height="300"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#product-stamp-clip-${product.id})`}
                    />
                  </svg>

                  {/* Quick WhatsApp Inquiry on Hover */}
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                      `Hi Abhinandan Gifting! I would like to order "${product.title}" (${BRAND_CONFIG.currency}${product.price}). Please share details.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-x-8 bottom-6 py-2.5 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md shadow-[#FB1443]/20 hover:scale-105 active:scale-95 text-center"
                  >
                    Order on WhatsApp
                  </a>
                </div>

                {/* Product Title (Chely Sen Bold Uppercase) */}
                <h3 className="font-sans font-bold text-sm sm:text-base tracking-wider text-stone-900 uppercase mb-1.5 group-hover:text-[#8A67B7] transition-colors">
                  {product.title}
                </h3>

                {/* Price (Chely Berry / Pink Color) */}
                <p className="font-sans font-bold text-base sm:text-lg text-[#A31352]">
                  {BRAND_CONFIG.currency}{product.price.toLocaleString()}
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

