import React from 'react';
import { ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { BRAND_CONFIG } from '../../config/brand';
import { INSTAGRAM_POSTS } from '../../data/testimonials';

export default function InstagramGallery() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Exact Chely Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA6B6] mb-1">
              <InstagramIcon className="w-3.5 h-3.5 text-[#FFA6B6]" />
              <span>@abbhinandan_.gifting on Instagram</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              We Are Popular On Instagram
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg font-sans">
              Behind the scenes of ribbon hand-tying, wax stamping, and real unboxing celebrations.
            </p>
          </div>

          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8FC] hover:bg-[#FFA6B6] hover:text-white text-xs font-bold uppercase tracking-wider text-[#8A67B7] border border-[#8A67B7]/20 transition-all duration-300 shadow-sm self-center sm:self-auto group"
          >
            <span>Follow Atelier</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grid of Instagram moments */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-[#FAF8FC] border border-stone-100 shadow-soft block"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#8A67B7]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-white text-center">
                <InstagramIcon className="w-5 h-5 text-white mb-2" />
                <p className="text-[11px] line-clamp-2 text-white font-medium leading-snug">
                  {post.title}
                </p>
                <span className="text-[10px] text-white/80 mt-1 uppercase tracking-wider font-bold">
                  View Reel
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
