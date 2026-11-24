import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

// Function to generate exact postage stamp path with scalloped teeth along all 4 edges (Matching Instagram section)
function getStampPath(w = 300, h = 360, r = 4.5, spacing = 14) {
  let d = 'M 0 0 ';

  // Top edge notches
  const topCount = Math.floor((w - 20) / spacing);
  const topStartX = (w - (topCount - 1) * spacing) / 2;
  d += `H ${(topStartX - r).toFixed(1)} `;
  for (let i = 0; i < topCount; i++) {
    const cx = topStartX + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${(cx + r).toFixed(1)} 0 `;
    if (i < topCount - 1) d += `H ${(cx + spacing - r).toFixed(1)} `;
  }
  d += `H ${w} `;

  // Right edge notches
  const rightCount = Math.floor((h - 20) / spacing);
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

const STAMP_PATH = getStampPath(300, 360, 4.5, 14);

const CUSTOM_INCLUSIONS = [
  {
    id: 'inc-1',
    scriptBadge: 'California Select',
    title: 'CALIFORNIA ALMONDS',
    price: '₹380',
    subtitle: 'Crystal Faceted Jar',
    image: '/assets/chely/custom-almonds.png',
  },
  {
    id: 'inc-2',
    scriptBadge: 'Mangalore Gold',
    title: 'ROASTED CASHEWS',
    price: '₹420',
    subtitle: 'Blush Satin Potli',
    image: '/assets/chely/custom-cashews.png',
  },
  {
    id: 'inc-3',
    scriptBadge: 'Peshawari Green',
    title: 'ROASTED PISTAS',
    price: '₹460',
    subtitle: 'Salted Green Kernels',
    image: '/assets/chely/custom-pistas.png',
  },
  {
    id: 'inc-4',
    scriptBadge: 'Royal Kundan',
    title: 'BRASS KUNDAN DIYA',
    price: '₹290',
    subtitle: 'Pearl Embellished',
    image: '/assets/chely/hamper-product-3.png',
  },
  {
    id: 'inc-5',
    scriptBadge: 'Organic Forest',
    title: 'WILD FLOWER HONEY',
    price: '₹340',
    subtitle: 'Glass Jar + Dipper',
    image: '/assets/chely/hamper-product-2.png',
  },
];

export default function ChelyCustomHamperBuilder() {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? CUSTOM_INCLUSIONS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= CUSTOM_INCLUSIONS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="customize" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean title without badge or subtext as requested */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal text-stone-900 leading-[1.2] tracking-tight">
            Choose what goes inside your custom hamper
          </h2>
        </div>

        {/* Inclusions Carousel with Chely Pink Round Buttons */}
        <div className="relative">
          
          {/* Navigation Arrows (Vertically centered with cards) */}
          <button
            onClick={prevSlide}
            aria-label="Previous custom inclusion"
            className="hidden sm:flex absolute -left-3 sm:-left-6 top-[44%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white shadow-md shadow-[#FB1443]/25 items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next custom inclusion"
            className="hidden sm:flex absolute -right-3 sm:-right-6 top-[44%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white shadow-md shadow-[#FB1443]/25 items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 5 Inclusions with Exact Instagram Postage Stamp Borders */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-7">
            {CUSTOM_INCLUSIONS.map((item) => (
              <a
                key={item.id}
                href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                  `Hi Abhinandan Gifting! I am customizing a bespoke hamper and would like to include "${item.title}". Please share custom box options.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:rotate-1"
              >
                {/* Authentic Scalloped Postage Stamp Container */}
                <div className="relative w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)] mb-3 sm:mb-4">
                  <svg
                    viewBox="0 0 300 360"
                    className="w-full h-auto overflow-visible select-none"
                  >
                    <defs>
                      <clipPath id={`custom-stamp-clip-${item.id}`}>
                        <rect x="18" y="18" width="264" height="324" rx="2" />
                      </clipPath>
                    </defs>

                    {/* Pure White Postage Stamp Frame with Scalloped Perforations and crisp outline */}
                    <path d={STAMP_PATH} fill="#FFFFFF" stroke="#E6E0ED" strokeWidth="1" />

                    {/* Inner Product Photo */}
                    <image
                      href={item.image}
                      x="18"
                      y="18"
                      width="264"
                      height="324"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#custom-stamp-clip-${item.id})`}
                    />
                  </svg>
                </div>

                {/* Only the Item Name (Clean, Bold, Elegant) */}
                <h3 className="font-sans font-bold text-xs sm:text-sm tracking-wider text-stone-900 uppercase transition-colors group-hover:text-[#8A67B7]">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>

        </div>

        {/* Bottom CTA Button to WhatsApp Studio */}
        <div className="mt-14 sm:mt-18 text-center">
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
              'Hi Abhinandan Gifting! I want to build a completely custom gift hamper. Please guide me with boxes, treats, and ribbon choices.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#FB1443]/25 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Customize Your Hamper on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
