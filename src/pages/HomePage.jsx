import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import OccasionsGrid from '../components/home/OccasionsGrid';
import FeaturedHampers from '../components/home/FeaturedHampers';
import BuilderTeaser from '../components/home/BuilderTeaser';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import BestsellersShowcase from '../components/home/BestsellersShowcase';
import CorporateGiftingSection from '../components/home/CorporateGiftingSection';
import BrandStorySection from '../components/home/BrandStorySection';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import InstagramGallery from '../components/home/InstagramGallery';
import NewsletterSection from '../components/home/NewsletterSection';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCustomizeHamper = (product) => {
    navigate('/customize');
  };

  return (
    <div className="space-y-0">
      <HeroSection />
      <OccasionsGrid />
      <FeaturedHampers onCustomizeHamper={handleCustomizeHamper} />
      <BuilderTeaser />
      <WhyChooseUs />
      <HowItWorks />
      <BestsellersShowcase />
      <CorporateGiftingSection />
      <BrandStorySection />
      <TestimonialsSlider />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
}

