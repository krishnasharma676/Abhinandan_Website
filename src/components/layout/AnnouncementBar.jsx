import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

const MARQUEE_ITEMS = [
  { text: 'CUSTOM GIFT HAMPERS', href: '#customize', highlight: true },
  { text: 'CALL OR WHATSAPP +91 99534 56311', href: 'https://wa.me/919953456311', highlight: true },
  { text: 'WEDDING & FESTIVE GIFTS', href: '#hampers' },
  { text: 'CUSTOMIZE WITH DRY FRUITS & SWEETS', href: '#customize', highlight: true },
  { text: 'BIRTHDAY HAMPERS', href: '#hampers' },
  { text: 'CORPORATE GIFTING', href: '#hampers' },
  { text: 'PAN INDIA DELIVERY', href: '#hero', highlight: true },
  { text: 'BY KDF NUTS', href: '#story' },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-[#FB1443] text-white text-[11px] sm:text-xs py-2 sm:py-2.5 border-b border-[#E00E39] relative z-40 font-sans overflow-hidden select-none">
      {/* Infinite Seamless Scrolling Marquee Ticker */}
      <div className="animate-topbar-marquee flex items-center">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {MARQUEE_ITEMS.map((item, index) => (
            <React.Fragment key={`marquee-1-${index}`}>
              <a
                href={item.href}
                className="px-4 sm:px-6 uppercase tracking-widest font-bold transition-colors hover:text-[#FFE885] flex items-center gap-1.5 whitespace-nowrap text-white"
              >
                {item.text}
              </a>
              <span className="text-[#FFE885] text-xs font-serif opacity-90 shrink-0 select-none">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Set 2 (Exact duplicate for 100% continuous infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <React.Fragment key={`marquee-2-${index}`}>
              <a
                href={item.href}
                tabIndex="-1"
                className="px-4 sm:px-6 uppercase tracking-widest font-bold transition-colors hover:text-[#FFE885] flex items-center gap-1.5 whitespace-nowrap text-white"
              >
                {item.text}
              </a>
              <span className="text-[#FFE885] text-xs font-serif opacity-90 shrink-0 select-none">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
