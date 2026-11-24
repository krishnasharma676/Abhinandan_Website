import React from 'react';
import {
  Mail,
  Phone,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../common/SocialIcons';
import { BRAND_CONFIG } from '../../config/brand';

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-stone-600 text-xs font-sans border-t border-stone-200/80">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand Info (Full width on mobile, Col span 2 on lg) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <a href="#hero" className="inline-block">
              <img
                src={BRAND_CONFIG.logo || '/assets/logo.png'}
                alt={BRAND_CONFIG.name}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              {BRAND_CONFIG.shortDescription}
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#FB1443] text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-sm border border-stone-200/80"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#FB1443] text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-sm border border-stone-200/80"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#FB1443] text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-sm border border-stone-200/80"
                aria-label="WhatsApp"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-stone-700">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#FB1443]" />
                100% Quality Dry Fruits
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Truck className="w-4 h-4 text-[#FB1443]" />
                Pan India Delivery
              </span>
            </div>
          </div>

          {/* Quick Links (Left Column on Mobile) */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-serif text-lg font-normal text-stone-900 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <a href="#hero" className="hover:text-[#FB1443] transition-colors font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-[#FB1443] transition-colors font-medium">
                  Shop Hampers
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                    BRAND_CONFIG.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FB1443] transition-colors font-medium"
                >
                  Custom Hamper Inquiry
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                    'Hi! I would like to enquire about bulk corporate hampers.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FB1443] transition-colors font-medium"
                >
                  Corporate Gifting
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_CONFIG.contact.phone}`}
                  className="hover:text-[#FB1443] transition-colors font-medium"
                >
                  Helpline & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Gift Hampers (Right Column on Mobile, Static Text - Non Clickable) */}
          <div className="col-span-1 space-y-4">
            <h4 className="font-serif text-lg font-normal text-stone-900 tracking-wide">
              Gift Hampers
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              {[
                'Wedding & Trousseau Hampers',
                'Festive & Diwali Hampers',
                'Birthday & Anniversary Hampers',
                'Corporate Gift Hampers',
                'Custom Gift Boxes'
              ].map((item, i) => (
                <li key={i} className="text-stone-600 font-normal cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Next Row on Mobile, under Quick Links) */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <h4 className="font-serif text-lg font-normal text-stone-900 tracking-wide">
              Contact Us
            </h4>
            <p className="text-xs text-stone-600">
              {BRAND_CONFIG.contact.address}
            </p>
            <div className="pt-1 text-xs text-stone-600 space-y-2">
              <p className="flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-[#FB1443] shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </p>
              <p className="flex items-center gap-2 font-bold text-stone-900">
                <Phone className="w-4 h-4 text-[#FB1443]" />
                <span>{BRAND_CONFIG.contact.phoneDisplay}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Luxury Charcoal/Black Bottom Copyright Strip */}
      <div className="bg-[#1C1917] py-4 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} {BRAND_CONFIG.name} (By KDF NUTS). All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-[11px] text-stone-400">
            <a href="#story" className="hover:text-[#FB1443] transition-colors">
              Our Story
            </a>
            <a href="#hampers" className="hover:text-[#FB1443] transition-colors">
              Hampers
            </a>
            <a href="#faq" className="hover:text-[#FB1443] transition-colors">
              FAQs
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
