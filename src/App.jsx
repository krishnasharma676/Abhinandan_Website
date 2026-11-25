import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import MagneticCursor from './components/common/MagneticCursor';
import HeroSection from './components/home/HeroSection';
import ChelyProductsShowcase from './components/home/ChelyProductsShowcase';
import ChelyCustomHamperBuilder from './components/home/ChelyCustomHamperBuilder';
import StoryToJourneyStage from './components/home/StoryToJourneyStage';
import ChelyHowItWorksSection from './components/home/ChelyHowItWorksSection';
import ChelyInstagramStampFeed from './components/home/ChelyInstagramStampFeed';
import ChelyNewsletterBanner from './components/home/ChelyNewsletterBanner';
import LenisSectionTransition from './components/common/LenisSectionTransition';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from './config/brand';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
gsap.config({ force3D: true });

export default function App() {
  useEffect(() => {
    // Always open/refresh from the top Home Banner (disable browser mid-page scroll restoration)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    const resetScrollOnUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', resetScrollOnUnload);
    window.addEventListener('pagehide', resetScrollOnUnload);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return () => {
        window.removeEventListener('beforeunload', resetScrollOnUnload);
        window.removeEventListener('pagehide', resetScrollOnUnload);
      };
    }

    const lenis = new Lenis({
      duration: 1.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.56,
      syncTouch: true,
      touchMultiplier: 0.62,
      syncTouchLerp: 0.048,
      touchInertiaExponent: 0.86,
      allowNestedScroll: true,
      virtualScroll: (data) => {
        const { deltaX, deltaY, event } = data;
        // Preserve horizontal touch swipes for carousels, 3D gift box, and Instagram fan deck
        if (event?.type?.startsWith('touch') && Math.abs(deltaX) > Math.abs(deltaY)) {
          return false;
        }
        // Softly cap extreme swipe/wheel bursts so transitions always play out smoothly
        const maxStep = event?.type?.startsWith('touch') ? 34 : 76;
        if (Math.abs(deltaY) > maxStep) {
          data.deltaY = Math.sign(deltaY) * maxStep;
        }
        return true;
      },
    });

    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    const rafRefresh = requestAnimationFrame(refreshTriggers);
    const settleTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 400);
    window.addEventListener('load', refreshTriggers);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshTriggers).catch(() => {});
    }

    // Intercept native anchor links (#hampers, #customize, #story, etc.) so Lenis + ScrollTrigger stay synced
    const handleAnchorClick = (e) => {
      if (e.defaultPrevented) return;
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      if (hash === '#hampers') {
        const heroTrigger = ScrollTrigger.getById('hero-stage');
        if (heroTrigger) {
          e.preventDefault();
          lenis.scrollTo(heroTrigger.end + 2, { duration: 1.45 });
          return;
        }
      }
      if (hash === '#story') {
        const storyTrigger = ScrollTrigger.getById('story-journey-stage');
        if (storyTrigger) {
          e.preventDefault();
          lenis.scrollTo(storyTrigger.start + 2, { duration: 1.45 });
          return;
        }
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -76, duration: 1.45 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafRefresh);
      clearTimeout(settleTimer);
      window.removeEventListener('beforeunload', resetScrollOnUnload);
      window.removeEventListener('pagehide', resetScrollOnUnload);
      window.removeEventListener('load', refreshTriggers);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 relative selection:bg-[#FB1443]/15 selection:text-[#FB1443]">
      {/* Custom Magnetic Cursor (Desktop fine pointer) */}
      <MagneticCursor />

      {/* Live Brand Scroll Ribbon */}
      <ScrollProgress />

      {/* 1. Topbar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* 3. Main Interactive Experience */}
      <main className="flex-1 relative z-10 bg-white">
        {/* Scroll & Click-to-Unbox 3D Hero Stage -> Horizontal Center Cut & Vertical Split directly revealing Hampers (#FAF7F2) */}
        <HeroSection>
          <ChelyProductsShowcase />
        </HeroSection>

        {/* Transition 2 (Lenis Split Ivory/White Curtain Doors, sticky-safe): Hampers Cream -> Studio White */}
        <LenisSectionTransition variant="curtain-split" backdropColor="#FAF7F2">
          <ChelyCustomHamperBuilder />
        </LenisSectionTransition>

        {/* Unique Lateral Page-Sweep Transition (Story Cream #FAF7F2 -> Journey White #FFFFFF) */}
        <StoryToJourneyStage />

        {/* Transition 5 (Horizon Crimson Thread + Glide): Journey White -> HowItWorks Cream #FAF7F2 */}
        <LenisSectionTransition variant="circle-bloom" backdropColor="#FFFFFF">
          <ChelyHowItWorksSection />
        </LenisSectionTransition>

        {/* Transition 6 (3D Arch Card Unfold + Crimson Crest Spread): HowItWorks Cream -> Instafeed White */}
        <LenisSectionTransition variant="arch-unfold" backdropColor="#FAF7F2">
          <ChelyInstagramStampFeed />
        </LenisSectionTransition>

        {/* Transition 7 (Clean Crimson Thread + Straight Lift): Instafeed White -> Newsletter Golden Cream */}
        <LenisSectionTransition variant="unveil-up" backdropColor="#FFFFFF">
          <ChelyNewsletterBanner />
        </LenisSectionTransition>
      </main>

      {/* 4. Giant Reveal Footer */}
      <Footer />

      {/* 5. Floating Animated WhatsApp Concierge Pulse Button */}
      <a
        href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
          BRAND_CONFIG.whatsapp.defaultMessage
        )}`}
        target="_blank"
        rel="noreferrer"
        data-cursor="WHATSAPP"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white group"
        title="Chat with Abhinandan Gifting on WhatsApp"
        aria-label="Chat with Abhinandan Gifting on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
}
