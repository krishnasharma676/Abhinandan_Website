import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import PreloaderIntro from './components/common/PreloaderIntro';
import MagneticCursor from './components/common/MagneticCursor';
import HeroSection from './components/home/HeroSection';
import ChelyProductsShowcase from './components/home/ChelyProductsShowcase';
import StoryToJourneyStage from './components/home/StoryToJourneyStage';
import ChelyCustomHamperBuilder from './components/home/ChelyCustomHamperBuilder';
import ChelyHowItWorksSection from './components/home/ChelyHowItWorksSection';
import ChelyInstagramStampFeed from './components/home/ChelyInstagramStampFeed';
import ChelyFAQSection from './components/home/ChelyFAQSection';
import ChelyNewsletterBanner from './components/home/ChelyNewsletterBanner';
import LenisSectionTransition from './components/common/LenisSectionTransition';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from './config/brand';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once images, preloader & fonts settle, and sync hash navigation if present
    const syncTriggers = () => {
      ScrollTrigger.refresh();
      if (window.location.hash) {
        if (window.location.hash === '#hampers') {
          const heroTrigger = ScrollTrigger.getById('hero-stage');
          if (heroTrigger) {
            lenis.scrollTo(heroTrigger.end + 2, { immediate: true });
            ScrollTrigger.update();
            window.dispatchEvent(new Event('scroll'));
            return;
          }
        }
        if (window.location.hash === '#story') {
          const storyTrigger = ScrollTrigger.getById('story-journey-stage');
          if (storyTrigger) {
            lenis.scrollTo(storyTrigger.start + 2, { immediate: true });
            ScrollTrigger.update();
            window.dispatchEvent(new Event('scroll'));
            return;
          }
        }
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target, { offset: -76, immediate: true });
          ScrollTrigger.update();
          window.dispatchEvent(new Event('scroll'));
        }
      }
    };

    const refreshTimer = setTimeout(syncTriggers, 650);
    const postPreloaderTimer = setTimeout(() => ScrollTrigger.refresh(), 1600);
    window.addEventListener('load', syncTriggers);

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
          lenis.scrollTo(heroTrigger.end + 2, { duration: 1.05 });
          return;
        }
      }
      if (hash === '#story') {
        const storyTrigger = ScrollTrigger.getById('story-journey-stage');
        if (storyTrigger) {
          e.preventDefault();
          lenis.scrollTo(storyTrigger.start + 2, { duration: 1.05 });
          return;
        }
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -76, duration: 1.05 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(postPreloaderTimer);
      window.removeEventListener('load', syncTriggers);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 relative selection:bg-[#FEEAE6] selection:text-[#FB1443]">
      {/* Silk Curtain Luxury Intro Reveal */}
      <PreloaderIntro />

      {/* Custom Magnetic Cursor & Rose Spotlight (Desktop fine pointer) */}
      <MagneticCursor />

      {/* Live Brand Scroll Ribbon */}
      <ScrollProgress />

      {/* 1. Topbar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* 3. Main Interactive Experience */}
      <main className="flex-1 relative z-10 bg-white">
        {/* Scroll & Click-to-Unbox 3D Hero Stage -> Horizontal Center Cut & Vertical Split directly revealing Hampers */}
        <HeroSection>
          <ChelyProductsShowcase />
        </HeroSection>

        {/* Transition 2 (Lenis Split Satin Curtain Doors, sticky-safe): Hampers Cream -> Studio White */}
        <LenisSectionTransition variant="curtain-split" backdropColor="#FAF7F2">
          <ChelyCustomHamperBuilder />
        </LenisSectionTransition>

        {/* Unique Lateral Page-Sweep Transition (Story White -> Journey Cream, zero zoom/split) */}
        <StoryToJourneyStage />

        {/* Transition 5 (Lenis Radial Circle Spotlight Bloom): Journey Cream -> HowItWorks White */}
        <LenisSectionTransition variant="circle-bloom" backdropColor="#FAF7F2">
          <ChelyHowItWorksSection />
        </LenisSectionTransition>

        {/* Transition 6 (Staggered Triple-Ribbon Silk Unroll): HowItWorks White -> Instafeed Cream */}
        <LenisSectionTransition variant="triple-ribbon" backdropColor="#FFFFFF">
          <ChelyInstagramStampFeed />
        </LenisSectionTransition>

        {/* Transition 7 (Split Blush Veil Reveal, sticky-safe): Instafeed Cream -> FAQ White */}
        <LenisSectionTransition variant="depth-curtain" backdropColor="#FAF7F2">
          <ChelyFAQSection />
        </LenisSectionTransition>

        {/* Transition 8 (Lenis Silk Card Unveil Lift): FAQ White -> Festive Offers Blush */}
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
