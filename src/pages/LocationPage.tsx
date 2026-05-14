import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Car, Train, Navigation } from 'lucide-react';

import Footer from '../components/Footer';

const MercerCross = ({ color = '#FFFFFF', size = 10 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
  { day: 'Saturday',        time: '8:00 AM – 11:00 PM' },
  { day: 'Sunday',          time: '8:00 AM – 9:00 PM' },
];

const transport = [
  {
    icon: <Car size={18} />,
    title: 'By Car',
    desc: 'Ample parking available at MM Square. Easily accessible from MM Alam Road and Main Boulevard Gulberg.',
  },
  {
    icon: <Navigation size={18} />,
    title: 'On Foot',
    desc: 'Located in the vibrant heart of Gulberg 2, just a short walk from the MM Alam shopping district.',
  },
];

export default function LocationPage() {
  return (
    <div style={{ background: '#535F48', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0">
          <img
            src="/images/cafe-interior.jpg"
            alt="Mercer's café entrance"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(83,95,72,0.55) 0%, rgba(83,95,72,0.35) 40%, rgba(83,95,72,1) 100%)',
            }}
          />
        </div>

        {/* Hero content — consistent 16px horizontal padding on mobile */}
        <div className="relative z-10 flex flex-col justify-end h-full px-4 md:px-12 lg:px-20 pb-12 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <MercerCross size={13} />
            <span className="luxury-label opacity-60">Find Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: 'easeOut' }}
            className="font-display font-light text-white leading-none mb-4"
            style={{ fontSize: 'clamp(52px, 13vw, 120px)', letterSpacing: '-0.02em' }}
          >
            Location
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/55 leading-relaxed"
            style={{ fontSize: '14px', maxWidth: '300px' }}
          >
            A sanctuary of craft coffee,<br />nestled at the heart of the city.
          </motion.p>
        </div>
      </section>

      {/* ══════════ MAP + INFO ══════════ */}
      {/* px-4 on mobile gives 16px on each side — safe on all phones */}
      <section className="px-4 md:px-8 lg:px-20 py-8 md:py-16">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">

          {/* Map image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full overflow-hidden rounded-2xl"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
              aspectRatio: '4/3',
            }}
          >
            <img
              src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1778760387/1afcefd2-526e-4b3b-bc6b-9e873d5f6454_wqaqvv.png"
              alt="Mercer's Coffee Map"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="w-full flex flex-col gap-4"
          >
            {/* Address */}
            <div
              className="w-full rounded-2xl p-5"
              style={{
                background: 'rgba(74,85,65,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 36, height: 36, background: 'rgba(245,240,232,0.12)' }}
                >
                  <MapPin size={15} color="#F5F0E8" />
                </div>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  Address
                </span>
              </div>
              <p
                className="font-display font-light text-white"
                style={{ fontSize: 'clamp(20px, 5vw, 28px)', lineHeight: 1.25, letterSpacing: '-0.01em' }}
              >
                MM Square 5L, Block L<br />Gulberg 2
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
                Lahore, Pakistan
              </p>
              <a
                href="https://maps.google.com/?q=MM+Square+5L,+Block+L+Gulberg+2,+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  textDecoration: 'none',
                }}
              >
                <MercerCross color="#F5F0E8" size={9} />
                Get Directions
              </a>
            </div>

            {/* Hours */}
            <div
              className="w-full rounded-2xl p-5"
              style={{
                background: 'rgba(74,85,65,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 36, height: 36, background: 'rgba(245,240,232,0.12)' }}
                >
                  <Clock size={15} color="#F5F0E8" />
                </div>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  Hours
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex justify-between items-center"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '9px' }}
                  >
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
                      {day}
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#F5F0E8' }}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div
              className="w-full rounded-2xl p-5"
              style={{
                background: 'rgba(74,85,65,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+14155551234"
                  className="flex items-center gap-3"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 36, height: 36, background: 'rgba(245,240,232,0.12)' }}
                  >
                    <Phone size={14} color="#F5F0E8" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>
                      Reservations
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#F5F0E8' }}>
                      +1 (415) 555-1234
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:hello@mercers.coffee"
                  className="flex items-center gap-3"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 36, height: 36, background: 'rgba(245,240,232,0.12)' }}
                  >
                    <Mail size={14} color="#F5F0E8" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>
                      Email Us
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#F5F0E8' }}>
                      hello@mercers.coffee
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ HOW TO GET HERE ══════════ */}
      <section className="px-4 md:px-8 lg:px-20 py-8 md:py-14">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <MercerCross size={12} />
            <span className="luxury-label opacity-60">Getting Here</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transport.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="w-full rounded-2xl p-5"
                style={{
                  background: 'rgba(74,85,65,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full mb-4"
                  style={{ width: 44, height: 44, background: 'rgba(245,240,232,0.1)', color: '#F5F0E8' }}
                >
                  {icon}
                </div>
                <h3
                  className="font-display font-light text-white mb-2"
                  style={{ fontSize: '20px', letterSpacing: '-0.01em' }}
                >
                  {title}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ AMBIENCE STRIP ══════════ */}
      <section className="px-4 md:px-8 lg:px-20 py-6 md:py-10">
        <div
          className="max-w-6xl mx-auto w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: '21/6', minHeight: 140 }}
        >
          <img
            src="/images/gallery-interior.jpg"
            alt="Mercer's interior ambience"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
        </div>
      </section>



      <Footer />
    </div>
  );
}
