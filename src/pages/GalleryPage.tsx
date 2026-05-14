import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

import Footer from '../components/Footer';

type Category = 'All' | 'Spaces' | 'Coffee' | 'Food' | 'People';
const categories: Category[] = ['All', 'Spaces', 'Coffee', 'Food', 'People'];

const MercerCross = ({ color = '#FFFFFF', size = 10 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

interface GalleryItem {
  id: number;
  category: Category;
  src: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
  isVideo?: boolean;
}

const allItems: GalleryItem[] = [
  { id: 1, category: 'People', src: '/images/barista-pouring.jpg', alt: 'Barista pouring latte art', wide: true, isVideo: true },
  { id: 2, category: 'Coffee', src: '/images/latte-art.jpg', alt: 'Mercer latte art' },
  { id: 3, category: 'Spaces', src: '/images/gallery-interior.jpg', alt: 'Mercer interior ambiance' },
  { id: 4, category: 'Food', src: '/images/croissant.jpg', alt: 'Almond croissant close-up' },
  { id: 5, category: 'Spaces', src: '/images/cafe-interior.jpg', alt: "Mercer's café entrance" },
  { id: 6, category: 'Coffee', src: '/images/hero-bg.jpg', alt: 'Coffee and croissant', wide: true },
  { id: 7, category: 'Food', src: '/images/lotus-cheesecake.jpg', alt: 'Lotus cheesecake' },
  { id: 8, category: 'Coffee', src: '/images/iced-mocha.jpg', alt: 'Iced mocha' },
  { id: 9, category: 'Food', src: '/images/strawberry-matcha.jpg', alt: 'Strawberry matcha drink' },
  { id: 10, category: 'People', src: '/images/barista-pouring.jpg', alt: 'Craft at Mercer\'s' },
  { id: 11, category: 'Spaces', src: '/images/gallery-interior.jpg', alt: 'Evening ambience' },
  { id: 12, category: 'Coffee', src: '/images/latte-art.jpg', alt: 'Perfect latte pour' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Category>('All');
  const [videoPlaying, setVideoPlaying] = useState(false);

  const filtered = filter === 'All' ? allItems : allItems.filter(i => i.category === filter);

  return (
    <div style={{ background: '#535F48', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '72vh' }}>
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/gallery-interior.jpg"
            alt="Mercer's ambiance"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(83,95,72,0.55) 0%, rgba(83,95,72,0.4) 40%, rgba(83,95,72,1) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 lg:px-20 pb-16 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-5"
          >
            <MercerCross size={13} />
            <span className="luxury-label opacity-60">Our Ambience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: 'easeOut' }}
            className="font-display font-light text-white leading-none mb-5"
            style={{ fontSize: 'clamp(64px, 14vw, 120px)', letterSpacing: '-0.02em' }}
          >
            Ambience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/55 leading-relaxed"
            style={{ fontSize: '15px', maxWidth: '320px' }}
          >
            Moments, spaces, and stories
            <br />
            brewed to perfection.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FILTER PILLS
      ══════════════════════════════════════ */}
      <section className="px-5 md:px-10 py-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="flex items-center gap-2 p-2 rounded-2xl overflow-x-auto hide-scrollbar"
            style={{
              background: '#4A5541',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 whitespace-nowrap transition-all duration-300"
                  style={{
                    padding: '9px 18px',
                    borderRadius: '12px',
                    fontFamily: 'Inter',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    background: active ? '#F5F0E8' : 'transparent',
                    color: active ? '#535F48' : 'rgba(255,255,255,0.38)',
                  }}
                >
                  <MercerCross color={active ? '#535F48' : 'rgba(255,255,255,0.3)'} size={9} />
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY GRID
      ══════════════════════════════════════ */}
      <section className="px-5 md:px-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: 'easeOut' }}
                  className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                    item.wide ? 'col-span-2' : ''
                  }`}
                  style={{
                    aspectRatio: item.wide ? '16/8' : '1/1',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: 'linear-gradient(to top, rgba(83,95,72,0.75) 0%, transparent 55%)',
                    }}
                  />

                  {/* Category badge on hover */}
                  <div
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ transform: 'translateY(4px)' }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: 'rgba(83,95,72,0.8)',
                        borderRadius: '100px',
                        padding: '4px 10px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Video play button */}
                  {item.isVideo && !videoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        onClick={() => setVideoPlaying(true)}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                        style={{
                          width: '56px',
                          height: '56px',
                          background: 'rgba(245,240,232,0.95)',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                        }}
                      >
                        <Play
                          size={20}
                          style={{ color: '#535F48', marginLeft: '3px' }}
                          fill="#535F48"
                        />
                      </motion.button>
                    </div>
                  )}

                  {/* Mercer watermark on barista shot */}
                  {item.isVideo && (
                    <div className="absolute top-4 right-4">
                      <img 
                        src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1778755709/ChatGPT_Image_May_14_2026_03_44_53_PM_ig1lui.png" 
                        alt="Mercer" 
                        className="h-4 w-auto invert opacity-70"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', fontFamily: 'Inter' }}>
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>



      <Footer />
    </div>
  );
}
