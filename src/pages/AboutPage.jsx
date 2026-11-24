import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../config/brand';
import {
  Sparkles,
  Heart,
  Award,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-light border border-gold/30 shadow-soft">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Our Story & Philosophy
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-chocolate tracking-tight">
            The Poetry of Thoughtful Gifting
          </h1>

          <p className="text-sm sm:text-base text-chocolate/80 leading-relaxed font-sans max-w-2xl mx-auto">
            {BRAND_CONFIG.name} was established with a solitary, unwavering conviction: that a gift is never merely an object, but a tangible reflection of sentiment, reverence, and unconditional love.
          </p>
        </div>

        {/* Narrative & Craft Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border-2 border-gold/30 bg-cream-200">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop"
                alt="Artisan assembling hampers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-chocolate leading-tight">
              Hand-Tied Ribbons. <br />
              <span className="font-display italic font-normal text-burgundy">
                Zero Mass Manufacturing.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed font-sans">
              In an era dominated by impersonal automated warehouses, our atelier preserves the sacred intimacy of old-world artisanal gifting. Every ribbon is hand-cut and double-bowed by trained gift stylists. Every wax seal is melted from organic beeswax and stamped with solid brass dies.
            </p>

            <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed font-sans">
              We partner exclusively with ethical chocolatiers, Himalayan bee-keepers, cold-process soap crafters, and single-estate tea plantations to ensure your recipient experiences genuine sensory indulgence.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-gold/20">
                <span className="font-serif text-2xl font-bold text-burgundy block">
                  100%
                </span>
                <span className="text-xs text-chocolate/70 font-medium">
                  Artisanal Craftsmanship
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-cream-50 border border-gold/20">
                <span className="font-serif text-2xl font-bold text-burgundy block">
                  25,000+
                </span>
                <span className="text-xs text-chocolate/70 font-medium">
                  Joyous Unboxings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Atelier Pillars */}
        <div className="p-8 sm:p-12 rounded-3xl bg-cream-50 border border-gold/30 shadow-luxury space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              Our Core Commitments
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">
              The Guiding Pillars of Our Studio
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Curated Distinction",
                desc: "Never generic off-the-shelf snacks. Only gourmet single-origin delicacies and clean aromatherapy."
              },
              {
                title: "Heirloom Packaging",
                desc: "Our rigid magnetic chests and velvet trunks are built to be treasured forever as keepsake organizers."
              },
              {
                title: "Gold-Stamper Stationery",
                desc: "Your words deserve permanence. Every card is printed on 300 GSM cardstock with 24K gold foil details."
              },
              {
                title: "Sustainable Reverence",
                desc: "FSC-certified board, plant-based crinkle paper, and zero single-use plastics in our gift boxes."
              }
            ].map((pillar, i) => (
              <div key={i} className="p-5 rounded-2xl bg-cream-100 border border-gold/20 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-serif font-bold text-xs mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="font-serif text-base font-bold text-chocolate mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-chocolate/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Customize */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-burgundy via-burgundy-deep to-chocolate text-cream-50 text-center space-y-5 shadow-luxury">
          <h3 className="font-serif text-2xl sm:text-4xl font-bold">
            Ready to Craft Something Truly Memorable?
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-md mx-auto">
            Design a custom hamper in our interactive studio or let our gifting stylists assist your bespoke requirement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/customize">
              <Button variant="gold" size="lg" icon={Sparkles}>
                Launch Hamper Studio
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-cream-50 border-cream-50/40 hover:bg-cream-50/10">
                Contact Atelier Concierge
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

