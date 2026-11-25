import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Plus,
  Minus,
  Trash2,
  Sparkles,
  MessageCircle,
  Gift,
  PenLine,
  RotateCcw,
  Check,
  ArrowRight,
  Package,
  ChevronDown,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import SectionHeading from '../common/SectionHeading';

const BOX_OPTIONS = [
  {
    id: 'box-wooden',
    name: 'Royal Wooden Chest',
    price: 1200,
    image: '/assets/chely/hamper-product-1.png',
    bgTint: '#F5EDE4',
  },
  {
    id: 'box-velvet',
    name: 'Crimson Velvet Box',
    price: 950,
    image: '/assets/chely/hamper-product-2.png',
    bgTint: '#FEEAE6',
  },
  {
    id: 'box-wicker',
    name: 'Pearl Wicker Basket',
    price: 850,
    image: '/assets/chely/hamper-product-3.png',
    bgTint: '#FFF6D9',
  },
];

const RIBBON_OPTIONS = [
  { id: 'rib-crimson', name: 'Crimson Rose', hex: '#FB1443', sheen: '#FF6B8A' },
  { id: 'rib-gold', name: 'Champagne Gold', hex: '#D4AF37', sheen: '#FFE885' },
  { id: 'rib-blush', name: 'Blush Silk', hex: '#FF8E9E', sheen: '#FFD1DA' },
];

const GOODIES = [
  {
    id: 'inc-1',
    title: 'California Almonds',
    weight: '200g Crystal Jar',
    price: 380,
    image: '/assets/chely/custom-almonds.png',
  },
  {
    id: 'inc-2',
    title: 'Roasted Cashews',
    weight: '200g Satin Potli',
    price: 420,
    image: '/assets/chely/custom-cashews.png',
  },
  {
    id: 'inc-3',
    title: 'Salted Green Pistas',
    weight: '200g Airtight Jar',
    price: 460,
    image: '/assets/chely/custom-pistas.png',
  },
  {
    id: 'inc-4',
    title: 'Brass Kundan Diya',
    weight: 'Pearl Handcrafted',
    price: 290,
    image: '/assets/chely/hamper-product-3.png',
  },
  {
    id: 'inc-5',
    title: 'Wild Flower Honey',
    weight: '250g + Wooden Dipper',
    price: 340,
    image: '/assets/chely/hamper-product-2.png',
  },
  {
    id: 'inc-6',
    title: 'Saffron Dryfruit Mithai',
    weight: '300g Gift Pack',
    price: 450,
    image: '/assets/chely/hamper-product-4.png',
  },
];

const QUICK_NOTES = [
  'With warmest festive wishes ✨',
  'Wishing you endless joy & love',
  'With gratitude & warm regards',
];

const STEPS = [
  { id: 'box', num: '01', label: 'Box & Ribbon', Icon: Package },
  { id: 'treats', num: '02', label: 'Pack Treats', Icon: Sparkles },
  { id: 'note', num: '03', label: 'Gift Card', Icon: PenLine },
];

export default function ChelyCustomHamperBuilder() {
  const [activeTab, setActiveTab] = useState('treats');
  const [selectedBox, setSelectedBox] = useState(BOX_OPTIONS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);
  const [packedItems, setPackedItems] = useState([
    { ...GOODIES[0], qty: 1 },
    { ...GOODIES[1], qty: 1 },
  ]);
  const [customNote, setCustomNote] = useState('With warmest festive wishes ✨');
  const [trayPulseKey, setTrayPulseKey] = useState(0);
  const [mobileTrayOpen, setMobileTrayOpen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const leftStageY = useTransform(scrollYProgress, [0, 0.85], [18, 0]);
  const rightStageX = useTransform(scrollYProgress, [0, 0.85], [24, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 0.85], [0.97, 1]);

  const fireSpark = (e, count = 16) => {
    const x = e?.clientX ? e.clientX / window.innerWidth : 0.5;
    const y = e?.clientY ? e.clientY / window.innerHeight : 0.5;
    confetti({
      particleCount: count,
      spread: 50,
      startVelocity: 24,
      scalar: 0.72,
      origin: { x, y },
      colors: [selectedRibbon.hex, '#FFE885', '#FFA6B6', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const addItem = (item, e) => {
    setPackedItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setTrayPulseKey((k) => k + 1);
    fireSpark(e, 18);
  };

  const updateQty = (id, delta, e) => {
    setPackedItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
    if (delta > 0) {
      setTrayPulseKey((k) => k + 1);
      fireSpark(e, 10);
    }
  };

  const handleBoxSelect = (box, e) => {
    setSelectedBox(box);
    setTrayPulseKey((k) => k + 1);
    fireSpark(e, 12);
  };

  const handleRibbonSelect = (rib, e) => {
    setSelectedRibbon(rib);
    setTrayPulseKey((k) => k + 1);
    confetti({
      particleCount: 14,
      spread: 42,
      startVelocity: 18,
      scalar: 0.68,
      origin: {
        x: e?.clientX ? e.clientX / window.innerWidth : 0.4,
        y: e?.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: [rib.hex, rib.sheen, '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const resetStudio = () => {
    setSelectedBox(BOX_OPTIONS[0]);
    setSelectedRibbon(RIBBON_OPTIONS[0]);
    setPackedItems([]);
    setCustomNote('');
    setMobileTrayOpen(false);
    setTrayPulseKey((k) => k + 1);
  };

  const handleTrayMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 8, ry: x * 8 });
  };

  const totalItemsCount = useMemo(
    () => packedItems.reduce((sum, item) => sum + item.qty, 0),
    [packedItems]
  );

  const totalPrice = useMemo(() => {
    const itemsSum = packedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    return selectedBox.price + itemsSum;
  }, [selectedBox, packedItems]);

  const whatsappSummaryUrl = useMemo(() => {
    const itemsText = packedItems.length
      ? packedItems
          .map((i) => `• ${i.qty}x ${i.title} (${BRAND_CONFIG.currency}${i.price * i.qty})`)
          .join('\n')
      : '• (No treats added yet — please suggest options)';

    const msg = `Hello Abhinandan Gifting! I built a Custom Hamper in your Studio:\n\n📦 Box: ${selectedBox.name} (${BRAND_CONFIG.currency}${selectedBox.price})\n🎀 Ribbon: ${selectedRibbon.name}\n🍯 Inside Goodies:\n${itemsText}\n💌 Gift Card Note: "${customNote || 'Complimentary Card'}"\n\nEstimated Total: ${BRAND_CONFIG.currency}${totalPrice.toLocaleString()}\nPlease confirm availability & share photos!`;

    return `https://wa.me/${BRAND_CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  }, [selectedBox, selectedRibbon, packedItems, customNote, totalPrice]);

  return (
    <section
      ref={sectionRef}
      id="customize"
      className="py-5 sm:py-8 lg:py-9 bg-white relative overflow-x-clip border-t border-stone-100"
    >
      {/* Ambient Radial Silk Glow */}
      <div
        className="absolute -top-24 -right-16 w-96 h-96 rounded-full pointer-events-none opacity-55 blur-3xl transition-colors duration-500"
        style={{ background: `radial-gradient(circle, ${selectedBox.bgTint} 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full pointer-events-none opacity-45 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FEEAE6 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Shared Signature Animated Heading */}
        <SectionHeading className="max-w-5xl mx-auto mb-3 sm:mb-6">
          Choose what goes inside your custom hamper
        </SectionHeading>

        {/* ========================================================
            MOBILE & TABLET: ULTRA-COMPACT STICKY LIVE PREVIEW BAR (< lg)
            Always stays visible right above controls — zero scrolling up!
        ======================================================== */}
        <div className="lg:hidden sticky top-[76px] z-30 mb-3">
          <div className="relative rounded-2xl border border-[#FB1443]/25 bg-white/95 backdrop-blur-md shadow-[0_10px_28px_-6px_rgba(53,28,78,0.18)] overflow-hidden">
            {trayPulseKey > 0 && (
              <motion.div
                key={`m-pulse-${trayPulseKey}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#FB1443] z-40"
              />
            )}
            {/* Compact Top Visual Strip */}
            <div
              className="relative px-3 py-2 flex items-center justify-between gap-2 transition-colors duration-500"
              style={{ backgroundColor: selectedBox.bgTint }}
            >
              {/* Mini Ribbon Accent */}
              <div
                className="pointer-events-none absolute -right-7 top-1.5 w-24 h-2.5 rotate-45 shadow-xs transition-colors duration-500"
                style={{
                  background: `linear-gradient(90deg, ${selectedRibbon.hex}, ${selectedRibbon.sheen}, ${selectedRibbon.hex})`,
                }}
              />

              <div className="flex items-center gap-2.5 min-w-0 relative z-10">
                <div className="relative w-11 h-11 rounded-t-[24px] rounded-b-lg overflow-hidden border-2 border-white shadow-sm shrink-0 bg-white">
                  <img
                    src={selectedBox.image}
                    alt={selectedBox.name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 transition-colors duration-300"
                    style={{ backgroundColor: selectedRibbon.hex }}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-xs sm:text-sm text-stone-900 leading-tight truncate">
                      {selectedBox.name}
                    </h4>
                  </div>

                  {/* Overlapping Live Treat Orbs */}
                  <div className="flex items-center gap-1 mt-1">
                    {packedItems.length === 0 ? (
                      <span className="text-[10px] text-stone-500 font-medium">
                        Tap goodies below to pack
                      </span>
                    ) : (
                      <div className="flex items-center -space-x-1.5">
                        <AnimatePresence>
                          {packedItems.slice(0, 5).map((item) => (
                            <motion.div
                              key={`m-orb-${item.id}`}
                              initial={{ scale: 0, y: -10 }}
                              animate={{ scale: 1, y: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                              className="relative w-5 h-5 rounded-full border border-white shadow-xs overflow-hidden bg-white"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {packedItems.length > 5 && (
                          <span className="w-5 h-5 rounded-full bg-[#351C4E] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                            +{packedItems.length - 5}
                          </span>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setMobileTrayOpen((o) => !o)}
                      className="ml-1 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/90 border border-stone-200 text-[10px] font-bold text-[#351C4E] shadow-2xs active:scale-95"
                    >
                      <span>
                        {totalItemsCount} {totalItemsCount === 1 ? 'Treat' : 'Treats'}
                      </span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          mobileTrayOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 relative z-10 pr-2">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-stone-500 leading-none">
                  Total
                </span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.15, color: '#FB1443' }}
                  animate={{ scale: 1, color: '#1C1917' }}
                  transition={{ duration: 0.25 }}
                  className="font-serif text-lg sm:text-xl tabular-nums leading-tight"
                >
                  {BRAND_CONFIG.currency}
                  {totalPrice.toLocaleString()}
                </motion.span>
              </div>
            </div>

            {/* Expandable Mobile Itemized Drawer */}
            <AnimatePresence initial={false}>
              {mobileTrayOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden border-t border-stone-200/70 bg-white"
                >
                  <div className="p-2.5 max-h-36 overflow-y-auto space-y-1.5">
                    {packedItems.length === 0 ? (
                      <p className="text-center text-[11px] text-stone-400 py-2">
                        No treats packed yet.
                      </p>
                    ) : (
                      packedItems.map((item) => (
                        <div
                          key={`m-row-${item.id}`}
                          className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg bg-[#FAF7F2] border border-stone-200/60"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-6 h-6 rounded object-cover shrink-0"
                            />
                            <span className="font-sans font-bold text-[11px] text-stone-900 truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-bold text-[#A31352] shrink-0">
                              {BRAND_CONFIG.currency}
                              {(item.price * item.qty).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => updateQty(item.id, -1, e)}
                              className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700"
                              aria-label={`Remove ${item.title}`}
                            >
                              {item.qty === 1 ? (
                                <Trash2 className="w-2.5 h-2.5" />
                              ) : (
                                <Minus className="w-2.5 h-2.5" />
                              )}
                            </button>
                            <span className="w-4 text-center text-[11px] font-bold tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => updateQty(item.id, 1, e)}
                              className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700"
                              aria-label={`Add ${item.title}`}
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {customNote.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('note');
                          setMobileTrayOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1 rounded-lg bg-[#FEEAE6]/50 border border-rose-200/60 flex items-center justify-between gap-2"
                      >
                        <span className="font-script text-xs text-stone-700 truncate">
                          💌 “{customNote}”
                        </span>
                        <span className="text-[9px] font-bold uppercase text-[#FB1443] shrink-0">
                          Edit
                        </span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Always-Visible Compact Mobile Action Footer */}
            <div className="px-2.5 py-1.5 bg-[#FAF7F2] border-t border-stone-200/70 flex items-center gap-2">
              <button
                type="button"
                onClick={resetStudio}
                title="Reset Hamper"
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#FB1443] transition-colors shrink-0"
                aria-label="Reset hamper"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <a
                href={whatsappSummaryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] uppercase tracking-wider shadow-sm shadow-[#FB1443]/25 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Send Hamper on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-7 items-start">
          {/* ========================================================
              LEFT STUDIO DOCK: COMPACT INTERACTIVE 3-STEP SWITCHER
          ======================================================== */}
          <motion.div
            style={{ y: leftStageY, scale: stageScale }}
            className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-stone-200/80 shadow-[0_14px_40px_rgba(0,0,0,0.04)] will-change-transform"
          >
            {/* Spring Sliding Segmented Step Tabs */}
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 bg-white rounded-xl border border-stone-200/70 mb-2.5 sm:mb-3 shadow-xs">
              {STEPS.map((tab) => {
                const active = activeTab === tab.id;
                const Icon = tab.Icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors z-10 ${
                      active ? 'text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="studio-step-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        className="absolute inset-0 rounded-lg bg-[#FB1443] shadow-sm shadow-[#FB1443]/25 -z-10"
                      />
                    )}
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                    {tab.id === 'treats' && totalItemsCount > 0 && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] leading-none font-bold ${
                          active ? 'bg-white text-[#FB1443]' : 'bg-[#FEEAE6] text-[#FB1443]'
                        }`}
                      >
                        {totalItemsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Animated Compact Tab Panels */}
            <AnimatePresence mode="wait">
              {activeTab === 'box' && (
                <motion.div
                  key="panel-box"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-2.5 sm:space-y-3"
                >
                  {/* Interactive Satin Ribbon Swatches */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-xl p-2 sm:p-2.5 sm:px-3.5 border border-stone-200/70">
                    <span className="font-serif text-xs sm:text-base text-stone-900">
                      Satin Ribbon
                    </span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {RIBBON_OPTIONS.map((rib) => {
                        const active = selectedRibbon.id === rib.id;
                        return (
                          <button
                            key={rib.id}
                            type="button"
                            onClick={(e) => handleRibbonSelect(rib, e)}
                            className={`relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border transition-all ${
                              active
                                ? 'bg-[#FAF7F2] text-stone-900 border-[#FB1443] scale-105 shadow-xs'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <span
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 border border-black/10 shadow-inner"
                              style={{
                                background: `linear-gradient(135deg, ${rib.sheen} 0%, ${rib.hex} 100%)`,
                              }}
                            />
                            <span>{rib.name.split(' ')[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3 Box Showcase Cards */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                    {BOX_OPTIONS.map((box) => {
                      const active = selectedBox.id === box.id;
                      return (
                        <motion.button
                          key={box.id}
                          type="button"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => handleBoxSelect(box, e)}
                          className={`group relative rounded-xl p-1.5 sm:p-2.5 text-left transition-all bg-white border-2 ${
                            active
                              ? 'border-[#FB1443] shadow-[0_8px_22px_rgba(251,20,67,0.14)]'
                              : 'border-stone-200/70 hover:border-[#FFA6B6]'
                          }`}
                        >
                          {active && (
                            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FB1443] text-white flex items-center justify-center shadow-sm">
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                            </span>
                          )}
                          <div className="h-16 sm:h-28 lg:h-32 rounded-t-[44px] sm:rounded-t-[54px] rounded-b-lg overflow-hidden mb-1.5 sm:mb-2 bg-[#FAF7F2]">
                            <img
                              src={box.image}
                              alt={box.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <p className="font-sans font-bold text-[10px] sm:text-xs text-stone-900 line-clamp-1">
                            {box.name}
                          </p>
                          <p className="font-sans font-bold text-[11px] sm:text-sm text-[#A31352] mt-0.5">
                            {BRAND_CONFIG.currency}
                            {box.price.toLocaleString()}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-0.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('treats')}
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#351C4E] hover:bg-[#FB1443] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Next: Pack Treats</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'treats' && (
                <motion.div
                  key="panel-treats"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {/* Mobile: Ultra-compact horizontal tiles so all 6 fit in 1 view! Desktop/Tablet: Visual cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2.5">
                    {GOODIES.map((item) => {
                      const inBox = packedItems.find((p) => p.id === item.id);
                      return (
                        <motion.div
                          key={item.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => addItem(item, e)}
                          data-cursor="PACK +"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              addItem(item);
                            }
                          }}
                          className={`group relative rounded-xl p-1.5 sm:p-2 bg-white border-2 transition-all cursor-pointer select-none flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-2 sm:gap-0 ${
                            inBox
                              ? 'border-[#FB1443] shadow-[0_6px_16px_rgba(251,20,67,0.12)]'
                              : 'border-stone-200/70 hover:border-[#FFA6B6] shadow-xs'
                          }`}
                        >
                          {inBox && (
                            <motion.span
                              key={inBox.qty}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FB1443] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-sm z-10"
                            >
                              {inBox.qty}
                            </motion.span>
                          )}

                          {/* Thumbnail — compact square left on mobile, banner top on sm+ */}
                          <div className="w-11 h-11 sm:w-full sm:h-[76px] lg:h-[82px] rounded-lg overflow-hidden bg-[#FEEAE6]/40 shrink-0 sm:mb-1.5">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          {/* Info + Action */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <p className="font-sans font-bold text-[10.5px] sm:text-[11px] text-stone-900 leading-tight line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-[9px] sm:text-[10px] text-stone-500 leading-tight mt-0.5 line-clamp-1">
                                {item.weight}
                              </p>
                            </div>

                            <div className="mt-1 sm:mt-1.5 sm:pt-1.5 sm:border-t sm:border-stone-100 flex items-center justify-between gap-1">
                              <span className="font-sans font-bold text-[10.5px] sm:text-xs text-[#A31352]">
                                +{BRAND_CONFIG.currency}
                                {item.price}
                              </span>

                              {inBox ? (
                                <div
                                  className="flex items-center gap-0.5 sm:gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => updateQty(item.id, -1, e)}
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FAF7F2] border border-stone-200 hover:border-[#FB1443] text-stone-700 hover:text-[#FB1443] flex items-center justify-center transition-colors"
                                    aria-label={`Remove ${item.title}`}
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => updateQty(item.id, 1, e)}
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FB1443] text-white flex items-center justify-center shadow-xs hover:bg-[#E00E39] transition-colors"
                                    aria-label={`Add more ${item.title}`}
                                  >
                                    <Plus className="w-2.5 h-2.5 stroke-[2.8]" />
                                  </button>
                                </div>
                              ) : (
                                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FEEAE6] text-[#FB1443] group-hover:bg-[#FB1443] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.8]" />
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('box')}
                      className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-[#351C4E] transition-colors"
                    >
                      ← Change Box
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('note')}
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#351C4E] hover:bg-[#FB1443] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Next: Gift Note</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'note' && (
                <motion.div
                  key="panel-note"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200/70 space-y-2.5 sm:space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-[#FB1443]" />
                    <h3 className="font-serif text-sm sm:text-lg text-stone-900">
                      Complimentary Satin Gift Card
                    </h3>
                  </div>

                  <textarea
                    rows={2}
                    maxLength={70}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Write a personal message for your recipient..."
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#FB1443] transition-colors resize-none"
                  />

                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_NOTES.map((note) => (
                      <button
                        key={note}
                        type="button"
                        onClick={(e) => {
                          setCustomNote(note);
                          fireSpark(e, 10);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium border transition-all ${
                          customNote === note
                            ? 'bg-[#FEEAE6] border-[#FB1443] text-[#FB1443]'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-[#FFA6B6]'
                        }`}
                      >
                        {note}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('treats')}
                      className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-[#351C4E] transition-colors"
                    >
                      ← Back to Treats
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ========================================================
              DESKTOP RIGHT STICKY FULL VISUAL STUDIO (lg+)
          ======================================================== */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              style={{ x: rightStageX, scale: stageScale }}
            >
              <div
                onMouseMove={handleTrayMouseMove}
                onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
                style={{
                  transform: `perspective(1100px) rotateX(${tilt.rx.toFixed(1)}deg) rotateY(${tilt.ry.toFixed(
                    1
                  )}deg)`,
                  transition:
                    tilt.rx === 0 && tilt.ry === 0
                      ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
                      : 'transform 0.1s ease-out',
                }}
                className="will-change-transform"
              >
                <div className="relative rounded-3xl border border-stone-200/90 bg-[#FAF7F2] shadow-[0_20px_50px_-14px_rgba(53,28,78,0.16)] overflow-hidden">
                  {trayPulseKey > 0 && (
                    <motion.div
                      key={`d-pulse-${trayPulseKey}`}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#FB1443] z-40"
                    />
                  )}
                  {/* Interactive Live Visual Open-Hamper Showcase */}
                  <div
                    className="relative p-4 overflow-hidden transition-colors duration-500 border-b border-stone-200/70"
                    style={{ backgroundColor: selectedBox.bgTint }}
                  >
                    {/* Animated Diagonal Satin Ribbon Corner Trim */}
                    <div
                      className="pointer-events-none absolute -right-9 top-2.5 w-32 h-4 rotate-45 shadow-sm transition-colors duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${selectedRibbon.hex}, ${selectedRibbon.sheen}, ${selectedRibbon.hex})`,
                      }}
                    />

                    <div className="flex items-center gap-2 mb-2.5 relative z-10 pr-10">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#351C4E]">
                        <Gift className="w-3.5 h-3.5 text-[#FB1443]" />
                        <span>Your Hamper Preview</span>
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs transition-colors duration-300"
                        style={{ backgroundColor: selectedRibbon.hex }}
                      >
                        {totalItemsCount} {totalItemsCount === 1 ? 'Treat' : 'Treats'}
                      </span>
                    </div>

                    {/* Box Base Visual + Dropping Inside Treat Avatars */}
                    <div className="flex items-center gap-3 relative z-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedBox.id}
                          initial={{ scale: 0.85, rotateY: -15, opacity: 0 }}
                          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          className="relative w-[74px] h-[74px] rounded-t-[40px] rounded-b-xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-white"
                        >
                          <img
                            src={selectedBox.image}
                            alt={selectedBox.name}
                            className="w-full h-full object-cover"
                          />
                          <span
                            className="absolute inset-x-0 bottom-0 h-1.5 transition-colors duration-300"
                            style={{ backgroundColor: selectedRibbon.hex }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg text-stone-900 leading-tight truncate">
                          {selectedBox.name}
                        </h4>
                        <p className="text-xs font-bold text-[#A31352] mt-0.5">
                          {BRAND_CONFIG.currency}
                          {selectedBox.price.toLocaleString()} • {selectedRibbon.name}
                        </p>

                        {/* Overlapping Live Dropping Visual Treat Orbs */}
                        <div className="flex items-center flex-wrap gap-1 mt-1.5">
                          <AnimatePresence>
                            {packedItems.map((item, idx) => (
                              <motion.div
                                key={`orb-${item.id}`}
                                initial={{ scale: 0, y: -20, rotate: -18 }}
                                animate={{ scale: 1, y: 0, rotate: idx % 2 === 0 ? -3 : 3 }}
                                exit={{ scale: 0, y: 10 }}
                                transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                                title={`${item.qty}x ${item.title}`}
                                className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white"
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                                {item.qty > 1 && (
                                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#FB1443] text-white text-[8px] font-bold flex items-center justify-center">
                                    {item.qty}
                                  </span>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Wax-Sealed Satin Greeting Note Preview */}
                    {customNote.trim() && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5 bg-white/95 rounded-xl px-3 py-1.5 border border-stone-200/80 shadow-xs flex items-center justify-between gap-2 relative z-10"
                      >
                        <p className="font-script text-sm text-stone-800 truncate">
                          “{customNote}”
                        </p>
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border-2 border-white shadow-sm flex items-center justify-center transition-colors duration-300"
                          style={{ backgroundColor: selectedRibbon.hex }}
                          title={`${selectedRibbon.name} Wax Seal`}
                        >
                          <span className="w-1 h-1 rounded-full bg-white/80" />
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Compact Packed Treats Tray List */}
                  <div className="p-3 bg-white min-h-[96px] max-h-[140px] overflow-y-auto space-y-1.5">
                    {packedItems.length === 0 ? (
                      <div className="h-20 flex flex-col items-center justify-center text-center text-stone-400">
                        <p className="text-xs font-medium text-stone-500">
                          Select treats to pack inside your box.
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {packedItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: -6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.84, x: 18 }}
                            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                            className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#FAF7F2] border border-stone-200/70"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-8 h-8 rounded-md object-cover border border-white shadow-xs shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-sans font-bold text-[11px] text-stone-900 truncate">
                                  {item.title}
                                </p>
                                <p className="text-[11px] font-bold text-[#A31352]">
                                  {BRAND_CONFIG.currency}
                                  {(item.price * item.qty).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => updateQty(item.id, -1, e)}
                                className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:border-[#FB1443] hover:text-[#FB1443]"
                                aria-label={`Remove one ${item.title}`}
                              >
                                {item.qty === 1 ? (
                                  <Trash2 className="w-2.5 h-2.5" />
                                ) : (
                                  <Minus className="w-2.5 h-2.5" />
                                )}
                              </button>
                              <span className="w-4 text-center text-[11px] font-bold tabular-nums">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => updateQty(item.id, 1, e)}
                                className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:border-[#FB1443] hover:text-[#FB1443]"
                                aria-label={`Add one ${item.title}`}
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Live Rolling Price & WhatsApp Checkout */}
                  <div className="p-3.5 bg-[#FAF7F2] border-t border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        Estimated Total
                      </span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 1.15, color: '#FB1443' }}
                        animate={{ scale: 1, color: '#1C1917' }}
                        transition={{ duration: 0.28 }}
                        className="font-serif text-2xl tabular-nums"
                      >
                        {BRAND_CONFIG.currency}
                        {totalPrice.toLocaleString()}
                      </motion.span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={resetStudio}
                        title="Reset Hamper"
                        className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#FB1443] hover:border-[#FB1443] transition-colors shrink-0"
                        aria-label="Reset hamper"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={whatsappSummaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="ORDER"
                        className="flex-1 py-2.5 px-4 rounded-full bg-[#FB1443] hover:bg-[#E00E39] text-white font-bold text-[11px] uppercase tracking-wider shadow-md shadow-[#FB1443]/25 flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-95 text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Send This Hamper to WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
