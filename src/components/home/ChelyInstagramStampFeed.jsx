import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2, Play } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { BRAND_CONFIG } from '../../config/brand';
import SectionHeading from '../common/SectionHeading';
import { useLenisVelocity } from '../common/LenisSectionTransition';

function getVerticalStampPath(w = 300, h = 410, r = 5, spacing = 15) {
  let d = 'M 0 0 ';
  const topCount = Math.floor((w - 24) / spacing);
  const topStartX = (w - (topCount - 1) * spacing) / 2;
  d += `H ${(topStartX - r).toFixed(1)} `;
  for (let i = 0; i < topCount; i++) {
    const cx = topStartX + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${(cx + r).toFixed(1)} 0 `;
    if (i < topCount - 1) d += `H ${(cx + spacing - r).toFixed(1)} `;
  }
  d += `H ${w} `;

  const rightCount = Math.floor((h - 24) / spacing);
  const rightStartY = (h - (rightCount - 1) * spacing) / 2;
  d += `V ${(rightStartY - r).toFixed(1)} `;
  for (let i = 0; i < rightCount; i++) {
    const cy = rightStartY + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${w} ${(cy + r).toFixed(1)} `;
    if (i < rightCount - 1) d += `V ${(cy + spacing - r).toFixed(1)} `;
  }
  d += `V ${h} `;

  d += `H ${(topStartX + (topCount - 1) * spacing + r).toFixed(1)} `;
  for (let i = topCount - 1; i >= 0; i--) {
    const cx = topStartX + i * spacing;
    d += `A ${r} ${r} 0 0 0 ${(cx - r).toFixed(1)} ${h} `;
    if (i > 0) d += `H ${(cx - spacing + r).toFixed(1)} `;
  }
  d += 'H 0 ';

  d += `V ${(rightStartY + (rightCount - 1) * spacing + r).toFixed(1)} `;
  for (let i = rightCount - 1; i >= 0; i--) {
    const cy = rightStartY + i * spacing;
    d += `A ${r} ${r} 0 0 0 0 ${(cy - r).toFixed(1)} `;
    if (i > 0) d += `V ${(cy - spacing + r).toFixed(1)} `;
  }
  d += 'Z';
  return d;
}

const STAMP_PATH = getVerticalStampPath(300, 410, 5, 15);

const INSTA_POSTS = [
  {
    id: 1,
    video: '/assets/reels/reelVideo1.mp4',
    image: '/assets/chely/hamper-product-1.png',
    caption: 'Royal bespoke hamper unboxing moments by Abhinandan Gifting ✨',
    tag: 'UNBOXING',
    tilt: -2.6,
  },
  {
    id: 2,
    video: '/assets/reels/reelVideo2.mp4',
    image: '/assets/chely/story-model-gift.png',
    caption: 'Personalized gift hampers for weddings and celebrations 💕',
    tag: 'WEDDINGS',
    tilt: 1.8,
  },
  {
    id: 3,
    video: '/assets/reels/reelVideo3.mp4',
    image: '/assets/chely/hamper-product-2.png',
    caption: 'Custom gift box with fresh dry fruits and sweets 🌿',
    tag: 'KDF NUTS',
    tilt: -1.2,
  },
  {
    id: 4,
    video: '/assets/reels/reelVideo4.mp4',
    image: '/assets/chely/journey-recipient.png',
    caption: 'Celebration gift hampers made with love 🎁',
    tag: 'FESTIVE',
    tilt: 2.1,
  },
  {
    id: 5,
    video: '/assets/reels/reelVideo5.mp4',
    image: '/assets/chely/hamper-product-3.png',
    caption: 'Decorative gift hampers for every special occasion ✨',
    tag: 'TROUSSEAU',
    tilt: -2.2,
  },
];

function getCircularOffset(idx, centerIdx, total) {
  let diff = idx - centerIdx;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function ReelStampCard({
  post,
  index,
  isFocused,
  anyFocused,
  parallaxY,
  onFocusStart,
  onFocusEnd,
  onOpenZoom,
  isMobileDeck = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <motion.div
      style={parallaxY ? { y: parallaxY } : undefined}
      initial={isMobileDeck ? false : { opacity: 0, y: 24, scale: 0.92 }}
      whileInView={isMobileDeck ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={isMobileDeck ? undefined : { once: true, amount: 0.2 }}
      transition={{ delay: isMobileDeck ? 0 : index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpenZoom(post)}
      onMouseEnter={onFocusStart}
      onMouseLeave={onFocusEnd}
      data-cursor="WATCH"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenZoom(post);
        }
      }}
      animate={
        isMobileDeck
          ? undefined
          : {
              rotate: isFocused ? 0 : post.tilt,
              y: isFocused ? -12 : 0,
              scale: isFocused ? 1.07 : anyFocused ? 0.95 : 1,
              opacity: anyFocused && !isFocused ? 0.78 : 1,
            }
      }
      className="group block relative cursor-pointer focus:outline-none select-none will-change-transform"
      title="Click to watch reel with sound"
    >
      <div
        className={`relative w-full transition-all duration-300 ${
          isFocused
            ? 'drop-shadow-[0_22px_36px_rgba(251,20,67,0.24)]'
            : 'drop-shadow-[0_12px_26px_rgba(53,28,78,0.1)]'
        }`}
      >
        <svg
          viewBox="0 0 300 410"
          className="w-full h-auto overflow-visible select-none pointer-events-none block"
        >
          <path d={STAMP_PATH} fill="#FFFFFF" />
        </svg>

        <div className="absolute top-[4.4%] bottom-[4.4%] left-[6%] right-[6%] overflow-hidden rounded-[4px] bg-stone-950">
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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Top Tag & Sound Preview Chip */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-white/90 text-[#351C4E] text-[9px] font-bold tracking-wider uppercase shadow-xs">
              {post.tag}
            </span>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                isFocused
                  ? 'bg-[#FB1443] text-white scale-105'
                  : 'bg-black/45 text-white/90 backdrop-blur-xs'
              }`}
            >
              {isFocused ? <Volume2 className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            </span>
          </div>

          {/* Bottom Interactive Hover/Focus Frosted Strip */}
          <div
            className={`absolute inset-x-0 bottom-0 p-2.5 pt-8 bg-gradient-to-t from-[#351C4E]/90 via-[#351C4E]/45 to-transparent transition-opacity duration-300 ${
              isFocused ? 'opacity-100' : 'opacity-80 sm:opacity-0 sm:group-hover:opacity-100'
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#FFE885]">
              <span>Watch Reel</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChelyInstagramStampFeed() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const modalVideoRef = useRef(null);
  const sectionRef = useRef(null);

  const velocity = useLenisVelocity();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Kinetic scroll-linked marquee + subtle opposing card column parallax
  const marqueeScrollX = useTransform(scrollYProgress, [0, 1], [60, -180]);
  const marqueeVelocityShift = useTransform(velocity, [-15, 0, 15], [35, 0, -35]);
  const oddColumnParallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const evenColumnParallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedPost && modalVideoRef.current) {
      const modalVideo = modalVideoRef.current;
      modalVideo.muted = false;
      modalVideo.volume = 1.0;
      modalVideo.currentTime = 0;
      const playPromise = modalVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [selectedPost]);

  const closeModal = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setSelectedPost(null);
  };

  const navigateModal = (dir) => {
    if (!selectedPost) return;
    const idx = INSTA_POSTS.findIndex((p) => p.id === selectedPost.id);
    const nextIdx = (idx + dir + INSTA_POSTS.length) % INSTA_POSTS.length;
    setSelectedPost(INSTA_POSTS[nextIdx]);
  };

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-12 sm:py-16 lg:py-20 bg-[#FAF7F2] relative overflow-hidden"
    >
      {/* Lenis Scroll-Linked Kinetic Background Marquee */}
      <div className="absolute top-16 sm:top-20 left-0 w-full pointer-events-none select-none z-0 overflow-hidden">
        <motion.div style={{ x: marqueeScrollX }} className="will-change-transform">
          <motion.div style={{ x: marqueeVelocityShift }} className="flex items-center whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={`marquee-item-${i}`}
                className="font-serif text-[110px] sm:text-[155px] md:text-[190px] lg:text-[220px] text-stone-900/[0.055] font-normal tracking-tight px-6 sm:px-12 leading-none select-none"
              >
                Visit Our Instafeed
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading + Gradient Instagram Icon + Handle Badge */}
        <div className="mb-8 sm:mb-12 text-center">
          <SectionHeading
            className="mb-3"
            trailing={
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#FF543E] via-[#FD1D1D] to-[#C13584] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 shrink-0"
              >
                <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </a>
            }
          >
            Follow us on Instagram
          </SectionHeading>

          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#FEEAE6] shadow-2xs text-[11px] sm:text-xs font-bold text-[#351C4E] hover:border-[#FB1443] hover:text-[#FB1443] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#FB1443] animate-pulse" />
            <span>@abbhinandan_.gifting</span>
          </a>
        </div>

        {/* MOBILE (< sm): Symmetrical Interactive Fanned Stamp Deck with Spring Swipes */}
        <div className="sm:hidden">
          <motion.div
            onPanEnd={(_, info) => {
              if (info.offset.x < -36 || info.velocity.x < -250) {
                setMobileIdx((prev) => (prev + 1) % INSTA_POSTS.length);
              } else if (info.offset.x > 36 || info.velocity.x > 250) {
                setMobileIdx((prev) => (prev - 1 + INSTA_POSTS.length) % INSTA_POSTS.length);
              }
            }}
            className="relative h-[325px] w-full flex items-center justify-center touch-pan-y"
          >
            {INSTA_POSTS.map((post, idx) => {
              const offset = getCircularOffset(idx, mobileIdx, INSTA_POSTS.length);
              const absOff = Math.abs(offset);
              const isCenter = offset === 0;
              const isHidden = absOff >= 2;

              return (
                <motion.div
                  key={`mob-fan-${post.id}`}
                  initial={false}
                  animate={{
                    x: isHidden ? offset * 120 : offset * 76,
                    y: isCenter ? 0 : 14,
                    scale: isCenter ? 1 : isHidden ? 0.65 : 0.84,
                    rotate: isCenter ? 0 : offset * 7.5,
                    opacity: isHidden ? 0 : isCenter ? 1 : 0.85,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  style={{
                    zIndex: isCenter ? 30 : 20 - absOff,
                    pointerEvents: isHidden ? 'none' : 'auto',
                  }}
                  className="absolute w-[215px]"
                >
                  <ReelStampCard
                    post={post}
                    index={idx}
                    isFocused={isCenter}
                    anyFocused={true}
                    onFocusStart={() => {}}
                    onFocusEnd={() => {}}
                    onOpenZoom={(p) => {
                      if (isCenter) setSelectedPost(p);
                      else setMobileIdx(idx);
                    }}
                    isMobileDeck={true}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Deck Controls & Reel Dots */}
          <div className="mt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setMobileIdx((prev) => (prev - 1 + INSTA_POSTS.length) % INSTA_POSTS.length)}
              aria-label="Previous reel"
              className="w-8 h-8 rounded-full bg-white border border-stone-200 text-[#351C4E] hover:bg-[#FB1443] hover:text-white flex items-center justify-center shadow-xs transition-colors active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full border border-[#FEEAE6] shadow-2xs">
              {INSTA_POSTS.map((p, idx) => {
                const active = idx === mobileIdx;
                return (
                  <button
                    key={`dot-${p.id}`}
                    type="button"
                    onClick={() => setMobileIdx(idx)}
                    aria-label={p.tag}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active ? 'w-6 bg-[#FB1443]' : 'w-2 bg-stone-300'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileIdx((prev) => (prev + 1) % INSTA_POSTS.length)}
              aria-label="Next reel"
              className="w-8 h-8 rounded-full bg-white border border-stone-200 text-[#351C4E] hover:bg-[#FB1443] hover:text-white flex items-center justify-center shadow-xs transition-colors active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DESKTOP & TABLET (sm+): Opposing Scroll-Parallax 5-Stamp Gallery */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 items-center pt-2 pb-2">
          {INSTA_POSTS.map((post, index) => (
            <div key={post.id} className={index === 2 ? 'lg:-translate-y-4' : ''}>
              <ReelStampCard
                post={post}
                index={index}
                isFocused={hoveredId === post.id}
                anyFocused={hoveredId !== null}
                parallaxY={index % 2 === 0 ? oddColumnParallaxY : evenColumnParallaxY}
                onFocusStart={() => setHoveredId(post.id)}
                onFocusEnd={() => setHoveredId(null)}
                onOpenZoom={setSelectedPost}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Zoomed Video Lightbox rendered cleanly at body root */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[95] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 24, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                  className="relative max-h-[90vh] max-w-[92vw] sm:max-w-md w-full flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      aria-label="Close zoomed video"
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FB1443] text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative w-full aspect-[9/16] max-h-[75vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                    <video
                      ref={modalVideoRef}
                      src={selectedPost.video}
                      poster={selectedPost.image}
                      autoPlay
                      controls
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => navigateModal(-1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#FB1443] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                      aria-label="Previous reel"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateModal(1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#FB1443] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                      aria-label="Next reel"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="mt-3 text-white/90 text-xs sm:text-sm font-sans text-center px-4">
                    {selectedPost.caption}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
