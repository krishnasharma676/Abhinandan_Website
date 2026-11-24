import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

function InstagramIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Function to generate exact postage stamp path with scalloped teeth along all 4 edges
function getStampPath(w = 300, h = 410, r = 4.5, spacing = 14) {
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

const STAMP_PATH = getStampPath(300, 410, 4.5, 14);

const INSTA_POSTS = [
  {
    id: 1,
    video: '/assets/reels/reelVideo1.mp4',
    image: '/assets/chely/hamper-product-1.png',
    caption: 'Handcrafted luxury hamper with dry fruits and festive gifts ✨',
  },
  {
    id: 2,
    video: '/assets/reels/reelVideo2.mp4',
    image: '/assets/chely/story-model-gift.png',
    caption: 'Personalized gift hampers for weddings and celebrations 💕',
  },
  {
    id: 3,
    video: '/assets/reels/reelVideo3.mp4',
    image: '/assets/chely/hamper-product-2.png',
    caption: 'Custom gift box with fresh dry fruits and sweets 🌿',
  },
  {
    id: 4,
    video: '/assets/reels/reelVideo4.mp4',
    image: '/assets/chely/journey-recipient.png',
    caption: 'Celebration gift hampers made with love 🎁',
  },
  {
    id: 5,
    video: '/assets/reels/reelVideo5.mp4',
    image: '/assets/chely/hamper-product-3.png',
    caption: 'Decorative gift hampers for every special occasion ✨',
  },
];

// Single Reel Stamp Card with Autoplay Muted Video (No buttons, iOS/Android/Windows robust)
function ReelStampCard({ post, onOpenZoom }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical for iOS Safari, Android, and Windows Chrome autoplay
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback retry on scroll
      });
    }
  }, []);

  return (
    <div
      onClick={() => onOpenZoom(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenZoom(post);
        }
      }}
      className="shrink-0 w-[58vw] max-w-[230px] min-w-[180px] snap-center sm:w-auto sm:max-w-none sm:min-w-0 sm:shrink group block relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 focus:outline-none select-none"
      title="Click to watch with sound"
    >
      <div className="relative w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
        
        {/* Scalloped Postage Stamp Border Frame */}
        <svg
          viewBox="0 0 300 410"
          className="w-full h-auto overflow-visible select-none pointer-events-none block"
        >
          <path d={STAMP_PATH} fill="#FFFFFF" />
        </svg>

        {/* Inner Video Container (Exact window inside the white stamp frame) */}
        <div className="absolute top-[4.4%] bottom-[4.4%] left-[6%] right-[6%] overflow-hidden rounded-[2px] bg-black">
          <video
            ref={videoRef}
            src={post.video}
            poster={post.image}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Clean Subtle Brand Watermark on Hover (No button) */}
          <div className="absolute inset-0 bg-[#8A67B7]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center pointer-events-none">
            <InstagramIcon className="w-8 h-8 mb-2" />
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider">
              @abbhinandan_.gifting
            </p>
            <p className="text-[10px] font-sans opacity-90 mt-1">
              Tap to play with sound
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ChelyInstagramStampFeed() {
  const [selectedPost, setSelectedPost] = useState(null);
  const modalVideoRef = useRef(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // When Zoom Modal opens, ensure video plays with sound immediately
  useEffect(() => {
    if (selectedPost && modalVideoRef.current) {
      const modalVideo = modalVideoRef.current;
      modalVideo.muted = false;
      modalVideo.volume = 1.0;
      modalVideo.currentTime = 0;
      const playPromise = modalVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play request:', err);
        });
      }
    }
  }, [selectedPost]);

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedPost(null);
  };

  return (
    <section id="instagram" className="pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 bg-[#FAF7F2] relative overflow-hidden">
      
      {/* Continuous Faded Marquee Text (Positioned cleanly in the gap between heading and cards on both Mobile & Desktop) */}
      <div className="absolute top-20 sm:top-20 md:top-20 lg:top-22 left-0 w-full pointer-events-none select-none z-0 overflow-hidden">
        <div className="animate-instafeed-marquee flex items-center whitespace-nowrap">
          {/* Set 1 */}
          <div className="flex items-center shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={`marquee-item-1-${i}`}
                className="font-serif text-[120px] sm:text-[165px] md:text-[205px] lg:text-[245px] text-stone-900/[0.055] font-normal tracking-tight px-8 sm:px-14 leading-none select-none"
              >
                Visit Our Instafeed
              </span>
            ))}
          </div>

          {/* Set 2 (Exact duplicate for 100% continuous infinite loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={`marquee-item-2-${i}`}
                className="font-serif text-[120px] sm:text-[165px] md:text-[205px] lg:text-[245px] text-stone-900/[0.055] font-normal tracking-tight px-8 sm:px-14 leading-none select-none"
              >
                Visit Our Instafeed
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Official Instagram Icon (z-10, sits in front of marquee top) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal text-stone-900 leading-tight">
            Follow us on Instagram
          </h2>
          
          {/* Gradient Instagram Icon (Chely Style) */}
          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#FF543E] via-[#FD1D1D] to-[#C13584] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
          >
            <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </a>
        </div>

        {/* 5 Stamp-Framed Instagram Video Reels (Horizontal scroll on mobile, 5-col grid on desktop) */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible pb-4 pt-1 px-4 -mx-4 sm:px-0 sm:mx-0 sm:pb-0 gap-3.5 sm:gap-5 lg:gap-6 snap-x snap-mandatory sm:snap-none no-scrollbar sm:grid-cols-3 lg:grid-cols-5">
          {INSTA_POSTS.map((post) => (
            <ReelStampCard
              key={post.id}
              post={post}
              onOpenZoom={setSelectedPost}
            />
          ))}
        </div>

      </div>

      {/* ========================================================
          ZOOMED LIGHTBOX MODAL (Plays Reel with Sound on Click)
          - iOS, Android, and Windows compatible
          - Clean, borderless video with sound
          - Click anywhere or backdrop to dismiss
      ======================================================== */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="relative max-h-[90vh] max-w-[92vw] sm:max-w-md w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Brand Handle & Close Icon */}
            <div className="w-full flex items-center justify-between pb-3 text-white px-2">
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider hover:text-[#FFA6B6] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#FB1443]" />
                <span>@abbhinandan_.gifting</span>
              </a>

              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="Close zoomed video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player (Unmuted with Sound, No default browser controls) */}
            <div className="relative w-full aspect-[9/16] max-h-[78vh] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 bg-black">
              <video
                ref={modalVideoRef}
                src={selectedPost.video}
                autoPlay
                loop
                playsInline
                webkit-playsinline="true"
                className="w-full h-full object-cover select-none"
              />

              {/* Sound Active Pill Badge at Bottom */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 text-[11px] font-sans">
                <Volume2 className="w-3.5 h-3.5 text-[#FB1443]" />
                <span>Sound On</span>
              </div>
            </div>

            {/* Caption below video */}
            <p className="text-white/80 text-xs text-center mt-3 font-sans max-w-sm px-2">
              {selectedPost.caption}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
