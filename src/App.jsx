import React from 'react';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import HeroSection from './components/home/HeroSection';
import ChelyProductsShowcase from './components/home/ChelyProductsShowcase';
import ChelyArchedStorySection from './components/home/ChelyArchedStorySection';
import ChelyJourneyScallopSection from './components/home/ChelyJourneyScallopSection';
import ChelyCustomHamperBuilder from './components/home/ChelyCustomHamperBuilder';
import ChelyHowItWorksSection from './components/home/ChelyHowItWorksSection';
import ChelyInstagramStampFeed from './components/home/ChelyInstagramStampFeed';
import ChelyFAQSection from './components/home/ChelyFAQSection';
import ChelyNewsletterBanner from './components/home/ChelyNewsletterBanner';
import { MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from './config/brand';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 scroll-smooth">
      <ScrollProgress />
      
      {/* 1. Topbar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* 3. Main Landing Page Sections - Chely Home-Four Aesthetic */}
      <main className="flex-1">
        {/* Banner with 3D Box & Subcontent */}
        <HeroSection />

        {/* 1. Explore The World of Handmade Hampers (Products Carousel) */}
        <ChelyProductsShowcase />

        {/* 2. We Are Abhinandan (Dual Arch Photo Editorial) */}
        <ChelyArchedStorySection />

        {/* 3. From Passion to Perfection (Scalloped Circle Badge) */}
        <ChelyJourneyScallopSection />

        {/* 4. Choose What Goes Inside Your Custom Hamper (Chely Flavour Style Inclusions) */}
        <ChelyCustomHamperBuilder />

        {/* 5. How It Works (Interactive 4-Step Custom Hamper Process) */}
        <ChelyHowItWorksSection />

        {/* 6. We Are Popular on Instagram (Postage Stamp Grid with Real Video Reels) */}
        <ChelyInstagramStampFeed />

        {/* 7. Frequently Asked Questions (Interactive Accordion) */}
        <ChelyFAQSection />

        {/* 8. To Receive Exclusive Offers! (Newsletter Yellow Card) */}
        <ChelyNewsletterBanner />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Floating 1-Click WhatsApp Icon Button (Circular, Icon Only) */}
      <a
        href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
          BRAND_CONFIG.whatsapp.defaultMessage
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white"
        title="Chat with Abhinandan Gifting on WhatsApp"
        aria-label="Chat with Abhinandan Gifting on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}
