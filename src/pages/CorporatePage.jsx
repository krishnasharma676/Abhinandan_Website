import React from 'react';
import CorporateGiftingSection from '../components/home/CorporateGiftingSection';
import { BRAND_CONFIG } from '../config/brand';
import {
  Building2,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Mail,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/common/Button';

export default function CorporatePage() {
  const corporateCollections = [
    {
      title: "Employee Onboarding & Welcome Suites",
      desc: "Warm executive welcomes with customized leather journals, engraved brass pens, insulated tumblers, and gourmet cookies.",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=700&auto=format&fit=crop"
    },
    {
      title: "Tier-1 VIP Client Appreciation",
      desc: "Deepen executive partnerships with single-origin Darjeeling flushes, Belgian truffles, and laser-engraved acrylic plaques.",
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=700&auto=format&fit=crop"
    },
    {
      title: "Festive Diwali & New Year Galas",
      desc: "Opulent traditional hampers featuring 24K edible gold sweets, hand-hammered brass diyas, and organic dry fruit jars.",
      img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=700&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-light border border-gold/30 shadow-soft">
            <Building2 className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Enterprise & Milestone Solutions
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-chocolate tracking-tight">
            Corporate Gifting with Soul & Distinction
          </h1>

          <p className="text-xs sm:text-sm text-chocolate/80 leading-relaxed font-sans max-w-xl mx-auto">
            From 25 executive boxes to 5,000 pan-India festive hampers, {BRAND_CONFIG.name} provides end-to-end bespoke solutions with company logo debossing and doorstep logistics.
          </p>
        </div>

        {/* Corporate Collections Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {corporateCollections.map((col, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden bg-cream-50 border border-gold/30 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream-200">
                <img
                  src={col.img}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-chocolate mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-chocolate/75 leading-relaxed">
                    {col.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-cream-300">
                  <a
                    href="#corporate-enquiry"
                    className="text-xs font-semibold text-gold-dark hover:text-burgundy"
                  >
                    Request Custom Quote →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded Corporate Enquiry Form Section */}
      <CorporateGiftingSection />
    </div>
  );
}

