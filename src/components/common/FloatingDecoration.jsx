import React, { useEffect, useRef } from 'react';

// 1. Single California Almond Nut (Realistic 3D-styled SVG)
export function SingleAlmondSVG({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="almondGrad" cx="38%" cy="32%" r="65%" fx="35%" fy="25%">
          <stop offset="0%" stopColor="#E5A670" />
          <stop offset="45%" stopColor="#BA7138" />
          <stop offset="85%" stopColor="#824014" />
          <stop offset="100%" stopColor="#572808" />
        </radialGradient>
        <linearGradient id="almondHighlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE0BD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B36830" stopOpacity="0" />
        </linearGradient>
        <filter id="almondShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="3" dy="8" stdDeviation="6" floodColor="#3D1D09" floodOpacity="0.35" />
        </filter>
      </defs>
      
      {/* Almond Shell Body */}
      <path
        d="M 50 12 C 68 28 84 52 78 74 C 73 90 56 94 44 91 C 28 87 20 68 22 48 C 24 30 38 16 50 12 Z"
        fill="url(#almondGrad)"
        filter="url(#almondShadow)"
      />
      {/* Almond Shell Edge Ridge */}
      <path
        d="M 50 14 C 64 30 78 50 73 70 C 69 84 56 87 47 85 C 34 81 26 66 28 48 C 30 32 40 18 50 14 Z"
        stroke="#F0B584"
        strokeWidth="2"
        strokeOpacity="0.45"
        fill="none"
      />
      {/* Realistic Surface Texture Striations */}
      <path d="M 44 26 C 48 42 46 64 42 78" stroke="#5A2808" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M 54 22 C 60 40 62 62 58 80" stroke="#5A2808" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M 64 34 C 68 50 67 66 63 76" stroke="#5A2808" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.35" />
      <path d="M 34 38 C 36 52 35 66 33 74" stroke="#5A2808" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.35" />
      {/* Glossy Top Highlight */}
      <path
        d="M 42 20 C 47 18 53 18 56 24 C 54 36 48 48 40 44 C 36 40 38 28 42 20 Z"
        fill="url(#almondHighlight)"
      />
    </svg>
  );
}

// 2. Single Roasted Cashew Nut (Crescent Kaju)
export function SingleCashewSVG({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cashewGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="35%" stopColor="#F9E5BE" />
          <stop offset="70%" stopColor="#E5BD7B" />
          <stop offset="92%" stopColor="#C48E40" />
          <stop offset="100%" stopColor="#96631E" />
        </radialGradient>
        <filter id="cashewShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#543710" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Classic Curved Crescent Cashew Shape */}
      <path
        d="M 68 20 C 82 32 86 52 76 70 C 66 86 42 90 28 80 C 18 72 20 58 32 54 C 44 50 52 44 54 36 C 56 26 48 24 44 28 C 42 30 38 28 39 24 C 42 16 56 12 68 20 Z"
        fill="url(#cashewGrad)"
        filter="url(#cashewShadow)"
      />
      {/* Roasted Golden-Brown Speckles */}
      <circle cx="70" cy="40" r="2.5" fill="#996022" opacity="0.45" />
      <circle cx="74" cy="52" r="3" fill="#8C5319" opacity="0.5" />
      <circle cx="66" cy="64" r="2.5" fill="#996022" opacity="0.4" />
      <circle cx="48" cy="78" r="3.5" fill="#8C5319" opacity="0.35" />
      {/* Curvature Inner Shadow */}
      <path
        d="M 34 56 C 44 52 50 46 52 38"
        stroke="#C48E40"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {/* Top Cream Highlight */}
      <path
        d="M 64 24 C 74 32 76 44 72 54"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

// 3. Single Green Pistachio Nut (Cracked Shell with Emerald Kernel)
export function SinglePistachioSVG({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pistaShellGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#EFE5D0" />
          <stop offset="100%" stopColor="#CBB998" />
        </radialGradient>
        <radialGradient id="pistaNutGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D5F882" />
          <stop offset="45%" stopColor="#9BD240" />
          <stop offset="85%" stopColor="#689E19" />
          <stop offset="100%" stopColor="#3E630A" />
        </radialGradient>
        <filter id="pistaShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="3" dy="7" stdDeviation="5.5" floodColor="#3B3527" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Left Shell Half */}
      <path
        d="M 48 18 C 30 26 18 46 22 68 C 25 82 38 88 48 88 C 45 74 42 42 48 18 Z"
        fill="url(#pistaShellGrad)"
        filter="url(#pistaShadow)"
      />
      {/* Right Shell Half */}
      <path
        d="M 52 18 C 70 26 82 46 78 68 C 75 82 62 88 52 88 C 55 74 58 42 52 18 Z"
        fill="url(#pistaShellGrad)"
        filter="url(#pistaShadow)"
      />
      {/* Purple Inner Skin Flakes */}
      <path
        d="M 44 32 C 40 48 42 66 46 78 C 54 78 58 66 54 48 C 52 38 48 30 44 32 Z"
        fill="#8E4657"
        opacity="0.9"
      />
      {/* Emerald Green Kernel Peeking Out */}
      <ellipse cx="50" cy="54" rx="11" ry="24" fill="url(#pistaNutGrad)" transform="rotate(-4 50 54)" />
      {/* Kernel Highlight */}
      <path
        d="M 47 38 C 49 46 50 56 48 64"
        stroke="#EAFBB8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

// 4. Royal Brass Diya with Warm Glowing Flame
export function BrassDiyaSVG({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF2B8" />
          <stop offset="35%" stopColor="#E5BA52" />
          <stop offset="70%" stopColor="#BA8621" />
          <stop offset="100%" stopColor="#7D530A" />
        </linearGradient>
        <radialGradient id="flameGrad" cx="50%" cy="75%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FFF482" />
          <stop offset="65%" stopColor="#FF9133" />
          <stop offset="95%" stopColor="#FF3815" />
          <stop offset="100%" stopColor="#D81C00" />
        </radialGradient>
        <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFBA42" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#FF7A1A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFA600" stopOpacity="0" />
        </radialGradient>
        <filter id="diyaShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="3" dy="8" stdDeviation="6" floodColor="#4A3408" floodOpacity="0.38" />
        </filter>
      </defs>

      {/* Flame Glow Halo */}
      <circle cx="50" cy="34" r="32" fill="url(#flameHalo)" />

      {/* Brass Diya Base */}
      <path
        d="M 20 62 C 24 78 40 84 50 84 C 60 84 76 78 80 62 C 82 56 75 54 66 56 C 56 58 44 58 34 56 C 25 54 18 56 20 62 Z"
        fill="url(#brassGrad)"
        filter="url(#diyaShadow)"
      />
      {/* Diya Rim Ring */}
      <ellipse cx="50" cy="57" rx="30" ry="6" fill="#FCE592" stroke="#B3801C" strokeWidth="1" />
      <ellipse cx="50" cy="57" rx="22" ry="4" fill="#694103" />

      {/* Burning Flame */}
      <path
        d="M 50 14 C 44 26 40 34 42 42 C 44 48 48 52 50 52 C 52 52 56 48 58 42 C 60 34 56 26 50 14 Z"
        fill="url(#flameGrad)"
      />
      {/* Inner White Flame Core */}
      <path
        d="M 50 28 C 47 34 46 38 48 44 C 49 46 50 48 50 48 C 50 48 51 46 52 44 C 54 38 53 34 50 28 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
    </svg>
  );
}

// 5. Luxury Golden Sparkle Star
export function LuxurySparkleSVG({ className = 'w-full h-full', color = '#FB1443' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 20 0 C 20 11 29 20 40 20 C 29 20 20 29 20 40 C 20 29 11 20 0 20 C 11 20 20 11 20 0 Z"
        fill={color}
      />
      <circle cx="20" cy="20" r="3.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

/**
 * Universal Floating Parallax Decoration Component
 *
 * Smooth Section-Relative Parallax:
 * Calculates position relative to the section's viewport visibility,
 * so the element floats upwards while the section is on screen,
 * staying 100% visible and beautifully floating!
 */
export default function FloatingDecoration({
  type = 'gift-box',
  className = '',
  speed = 0.25,
  delay = 0,
  duration = 5,
  rotate = 0,
  size = 90,
  mobileSize,
  sparkleColor = '#FB1443'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Find parent section or container position relative to viewport
        const parent = el.closest('section') || el.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        // When parent is in viewport (rect.top between vh and -rect.height)
        // Progress goes from 0 (entering bottom) to 1 (leaving top)
        const totalTravel = vh + rect.height;
        const currentDist = vh - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalTravel));

        // Parallax glide: gentle travel on mobile so it stays safely in the corner without overlapping text
        const isMobile = window.innerWidth < 640;
        const maxTravelPx = (isMobile ? 30 : 130) * speed;
        const translateY = (0.5 - progress) * (maxTravelPx * 2);

        el.style.transform = `translate3d(0px, ${translateY.toFixed(1)}px, 0px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  // Render element content based on type
  const renderContent = () => {
    switch (type) {
      case 'gift-box':
        return (
          <img
            src="/assets/floating/floating-gift-box.png"
            alt="Floating Luxury Gift Box"
            className="w-full h-full object-contain"
            loading="eager"
            decoding="async"
          />
        );
      case 'almonds-jar':
        return (
          <img
            src="/assets/floating/floating-almonds.png"
            alt="Floating California Almonds Jar"
            className="w-full h-full object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.16)]"
            loading="eager"
            decoding="async"
          />
        );
      case 'cashews-potli':
        return (
          <img
            src="/assets/floating/floating-cashews.png"
            alt="Floating Roasted Cashews Potli"
            className="w-full h-full object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.16)]"
            loading="eager"
            decoding="async"
          />
        );
      case 'pistas-jar':
        return (
          <img
            src="/assets/floating/floating-pistas.png"
            alt="Floating Roasted Pistachios Jar"
            className="w-full h-full object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.16)]"
            loading="eager"
            decoding="async"
          />
        );
      case 'almond':
        return <SingleAlmondSVG className="w-full h-full" />;
      case 'cashew':
        return <SingleCashewSVG className="w-full h-full" />;
      case 'pistachio':
        return <SinglePistachioSVG className="w-full h-full" />;
      case 'diya':
        return <BrassDiyaSVG className="w-full h-full" />;
      case 'sparkle':
        return <LuxurySparkleSVG className="w-full h-full" color={sparkleColor} />;
      default:
        return null;
    }
  };

  const mobSize = mobileSize || Math.round(size * 0.46);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none will-change-transform z-30 w-[var(--deco-mob)] h-[var(--deco-mob)] sm:w-[var(--deco-desk)] sm:h-[var(--deco-desk)] ${className}`}
      style={{
        '--deco-mob': `${mobSize}px`,
        '--deco-desk': `${size}px`,
      }}
    >
      <div
        className="w-full h-full transition-transform"
        style={{
          transform: `rotate(${rotate}deg)`,
          animation: `floatingBob ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
