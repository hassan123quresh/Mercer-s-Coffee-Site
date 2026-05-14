import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';



const MercerCross = ({ color = '#FFFFFF', size = 16 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2v16M2 10h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default function HomePage() {
  const { openBookingModal } = useBooking();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const menuItems = [
    {
      name: 'Croissant',
      img: '/images/croissant.jpg',
      hash: '#croissants'
    },
    {
      name: 'Lotus Cheese Cake',
      img: '/images/lotus-cheesecake.jpg',
      hash: '#cakes'
    },
    {
      name: 'Strawberry Matcha',
      img: '/images/strawberry-matcha.jpg',
      hash: '#beverages'
    },
    {
      name: "Mercer's Iced Mocha",
      img: '/images/iced-mocha.jpg',
      hash: '#coffee'
    },
  ];

  const testimonials = [
    {
      quote: 'The croissant and flat white combo is my Sunday ritual.',
      name: 'Aisha M.',
      role: 'Regular Guest',
    },
    {
      quote: "Mercer's is where I meet, think, and create.",
      name: 'Rohan D.',
      role: 'Freelance Designer',
    },
    {
      quote: 'Beautiful space, amazing coffee, even better people.',
      name: 'Meera S.',
      role: 'Local Resident',
    },
  ];

  return (
    <div className="bg-[#535F48]">

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen md:h-[calc(100vh-72px)] min-h-[600px] max-h-[900px] overflow-hidden flex items-end mt-0 md:mt-[72px]"
      >
        {/* Mobile Video */}
        <div className="absolute inset-0 z-0 origin-center block md:hidden">
          <video
            src="https://res.cloudinary.com/dacyy7rkn/video/upload/v1778408322/Mercer_s_isn_t_just_coffee_it_s_a_whole_mood_czrui6.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Parallax background */}
        <motion.div
          style={{ scale: heroImgScale }}
          className="absolute inset-0 z-0 origin-center hidden md:block"
        >
          <video
            src="https://res.cloudinary.com/dacyy7rkn/video/upload/v1778412330/0510.compressed_klgvth.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-10 w-full pb-16 md:pb-24 hidden md:flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <button onClick={openBookingModal} className="btn-primary" style={{ padding: '16px 36px', fontSize: '12px' }}>
              <MercerCross color="#535F48" size={14} />
              Book a Table
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — DRINKS MARQUEE (Floating Bridge)
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden z-30 pointer-events-none" style={{ background: '#535F48' }}>
        <div className="flex w-max py-5 md:py-10 border-y border-[rgba(255,255,255,0.15)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.2)]" style={{ animation: 'marquee 110s linear infinite' }}>
          {[...Array(4)].map((_, groupIndex) => (
            <div key={`marquee-group-${groupIndex}`} className="flex items-center">
              {[
                'Espresso', 'Flat White', 'Cappuccino', 'Spanish Latte', 'V60 Brew', 'Cortado', 'Macchiato', 'Mocha', 'Americano',
                'Iced Latte', 'Cold Brew', 'Iced Americano', 'Iced Spanish Latte', 'Nitro Cold Brew', 'Affogato', 'Iced Mocha', 'Iced Flat White'
              ].map((drink, i) => (
                <div key={`drink-${groupIndex}-${i}`} className="flex items-center gap-4 md:gap-10 px-6 md:px-12 whitespace-nowrap">
                  <span className="font-sans text-[20px] md:text-[48px] font-black uppercase tracking-[0.12em] text-[#535F48]">
                    {drink}
                  </span>
                  <div className="flex items-center">
                    <MercerCross color="#535F48" size={28} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — SIGNATURE MENU
      ════════════════════════════════════════════ */}
      <section className="pt-6 md:pt-8 pb-20 md:pb-28 px-5 md:px-10 lg:px-16" style={{ background: '#535F48' }}>
        <div className="max-w-7xl mx-auto">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MercerCross size={14} />
                <span className="luxury-label">Our Menu</span>
              </div>
              <h2
                className="font-display font-light text-white leading-none"
                style={{ fontSize: 'clamp(38px, 7vw, 72px)', letterSpacing: '-0.01em' }}
              >
                Distinct by Choice
              </h2>
            </div>
            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              View All
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* 4-column product cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {menuItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="premium-card rounded-[14px] overflow-hidden group cursor-pointer"
              >
                <Link to={`/menu${item.hash}`} className="aspect-[3/4] overflow-hidden relative block">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(83,95,72,0.9) 0%, transparent 55%)' }}
                  />
                  {/* Name overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className="text-white font-medium leading-tight uppercase tracking-[0.08em]"
                      style={{ fontFamily: 'Inter', fontSize: '10px' }}
                    >
                      {item.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="flex justify-center mt-8 md:hidden">
            <Link to="/menu" className="btn-luxury py-3 px-6 text-[10px]">
              View Full Menu <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — EXPERIENCE (SPACES)
      ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-10 lg:px-16" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MercerCross color="#535F48" size={13} />
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(48,47,33,0.55)',
                    fontWeight: 500,
                  }}
                >
                  The Experience
                </span>
              </div>

              <h2
                className="font-display font-light text-[#535F48] leading-tight mb-6"
                style={{ fontSize: 'clamp(36px, 5.5vw, 62px)', letterSpacing: '-0.01em' }}
              >
                Spaces That
                <br />
                Inspire
              </h2>

              <p
                className="text-[#535F48]/55 leading-relaxed mb-8 max-w-[320px]"
                style={{ fontSize: '14px' }}
              >
                Thoughtfully designed spaces where conversations flow, ideas bloom, and every visit feels like home.
              </p>

              <Link
                to="/gallery"
                className="flex items-center gap-2 text-[#535F48] hover:text-[#FFFFFF] transition-colors duration-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  borderBottom: '1px solid rgba(83,95,72,0.25)',
                  paddingBottom: '4px',
                }}
              >
                View Spaces <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Image side — arch shape */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="arch-shape overflow-hidden shadow-[0_40px_100px_rgba(83,95,72,0.2)]"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/images/cafe-interior.jpg"
                  alt="Mercer's Coffee interior"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — BRAND STORY (STICKERS)
      ════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-32 px-5 md:px-10 lg:px-16 overflow-hidden"
        style={{ background: '#535F48' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MercerCross size={13} />
                <span className="luxury-label opacity-60">Our Commitment</span>
              </div>

              <h2
                className="font-display font-light text-white leading-tight mb-7"
                style={{ fontSize: 'clamp(36px, 5.5vw, 66px)', letterSpacing: '-0.01em' }}
              >
                Better Coffee.
                <br />
                Better Tomorrow.
              </h2>

              <button
                className="flex items-center gap-2 text-white/45 hover:text-white transition-colors duration-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  paddingBottom: '4px',
                }}
              >
                Learn More <ArrowRight size={12} />
              </button>
            </motion.div>

            {/* Stickers collage */}
            <div className="relative h-80 md:h-96 select-none">
              {[
                {
                  label: 'Doppio',
                  bg: '#FFFFFF',
                  color: '#535F48',
                  style: {
                    top: '4%',
                    left: '2%',
                    transform: 'rotate(-8deg)',
                    minWidth: '110px',
                    height: '46px',
                    borderRadius: '100px',
                  },
                },
                {
                  label: 'Lotus\nCheese Cake',
                  bg: '#7a9060',
                  color: '#535F48',
                  style: {
                    top: '50%',
                    left: '0%',
                    transform: 'rotate(4deg)',
                    minWidth: '130px',
                    height: '66px',
                    borderRadius: '100px',
                  },
                },
                {
                  label: 'Strawberry\nMatcha',
                  bg: '#FFFFFF',
                  color: '#535F48',
                  style: {
                    top: '22%',
                    left: '32%',
                    transform: 'rotate(-3deg)',
                    minWidth: '130px',
                    height: '58px',
                    borderRadius: '100px',
                  },
                },
                {
                  label: 'Hot\nChocolate',
                  bg: '#2e2920',
                  color: '#FFFFFF',
                  style: {
                    top: '62%',
                    left: '38%',
                    transform: 'rotate(5deg)',
                    minWidth: '130px',
                    height: '58px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.25)',
                  },
                },
                {
                  label: 'Extra\nEspresso\nShot',
                  bg: '#4A5541',
                  color: '#FFFFFF',
                  style: {
                    top: '5%',
                    right: '4%',
                    transform: 'rotate(11deg)',
                    minWidth: '105px',
                    height: '76px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.3)',
                  },
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.65 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.09,
                    duration: 0.55,
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                  }}
                  className="absolute flex items-center justify-center text-center px-5"
                  style={{
                    background: s.bg,
                    color: s.color,
                    boxShadow: '0 10px 36px rgba(0,0,0,0.45)',
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    lineHeight: 1.35,
                    whiteSpace: 'pre-line',
                    ...s.style,
                  }}
                >
                  {s.label}
                </motion.div>
              ))}

              {/* Center circular emblem */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5, type: 'spring' }}
                className="absolute"
                style={{ top: '35%', left: '54%', transform: 'translate(-50%,-50%)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: '#5D6B52',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <MercerCross size={22} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10 lg:px-16"
        style={{ background: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(48,47,33,0.5)',
                fontWeight: 500,
                marginBottom: '12px',
              }}
            >
              Loved by Our Community
            </p>
            <h2
              className="font-display font-light text-[#535F48] leading-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.01em' }}
            >
              More Than Just Coffee
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
                className="bg-white rounded-2xl p-7"
                style={{
                  boxShadow: '0 4px 40px rgba(48,47,33,0.06), 0 0 0 1px rgba(48,47,33,0.05)',
                }}
              >
                <div
                  className="font-display text-[#535F48] mb-4 leading-none"
                  style={{ fontSize: '40px', fontWeight: 400, lineHeight: 1 }}
                >
                  "
                </div>
                <p
                  className="font-display italic text-[#535F48]/70 leading-relaxed mb-7"
                  style={{ fontSize: '18px', fontWeight: 400 }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#F5F0E8] font-medium"
                    style={{ background: '#535F48', fontSize: '13px' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-[#535F48] font-medium"
                      style={{ fontSize: '13px' }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-[#535F48]/40"
                      style={{ fontSize: '11px' }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '100px',
                  background: i === 0 ? '#535F48' : 'rgba(83,95,72,0.18)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
