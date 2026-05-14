import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Image, Coffee, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface NavbarProps {
  transparent?: boolean;
}

const MercerLogo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <img 
      src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1778755709/ChatGPT_Image_May_14_2026_03_44_53_PM_ig1lui.png" 
      alt="Mercer's Logo" 
      className="h-8 md:h-10 w-auto invert brightness-0"
    />
  </Link>
);

const MercerCross = ({ color = '#FFFFFF', size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2v16M2 10h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal, isBookingOpen } = useBooking();

  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background transparency
      setScrolled(currentScrollY > 40);

      // Smart header: hide on scroll down, show on scroll up (mobile only)
      if (window.innerWidth < 768) {
        // Only hide if we've scrolled more than a small threshold to avoid flicker
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // On mobile, we always want it transparent at top to "merge".
  // On desktop, we follow the 'transparent' prop.
  const isScrolledOrSolid = scrolled || (!transparent && !isMobile);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home',     path: '/' },
    { label: 'Menu',     path: '/menu' },
    { label: 'Gallery',  path: '/gallery' },
    { label: 'Location', path: '/location' },
  ];

  return (
    <>
      {/* ── Desktop Navbar ─────────────────────────── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -80, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolledOrSolid
            ? (isMobile ? 'rgba(83, 95, 72, 0.8)' : 'rgba(83, 95, 72, 0.92)')
            : 'transparent',
          backdropFilter: isScrolledOrSolid ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolledOrSolid ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolledOrSolid
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent',
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: '72px' }}
        >
          <MercerLogo />

          {/* Center nav links — desktop only */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="transition-colors duration-300"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '10.5px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: location.pathname === link.path
                    ? '#FFFFFF'
                    : 'rgba(255,255,255,0.55)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={openBookingModal}
              className="btn-primary hidden md:inline-flex"
              style={{ padding: '10px 22px', fontSize: '10px' }}
            >
              <MercerCross color="#535F48" size={11} />
              Book a Table
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="flex items-center justify-center rounded-full border transition-all duration-300"
              style={{
                width: '40px',
                height: '40px',
                borderColor: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
              }}
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen Menu Overlay ─────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(83,95,72,0.97)', backdropFilter: 'blur(32px)' }}
          >
            {/* Top: logo */}
            <div className="absolute top-6 left-6">
              <MercerLogo />
            </div>

            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 flex items-center justify-center rounded-full border border-white/15"
              style={{ width: '40px', height: '40px', color: '#ffffff' }}
            >
              <X size={15} />
            </button>

            {/* Links */}
            <div className="text-center space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display font-light transition-colors duration-300 py-2"
                    style={{
                      fontSize: 'clamp(44px, 10vw, 72px)',
                      color: location.pathname === link.path ? '#FFFFFF' : '#ffffff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="pt-8"
              >
                <button onClick={() => { setMenuOpen(false); openBookingModal(); }} className="btn-luxury">
                  <MercerCross size={11} />
                  Book a Table
                </button>
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-10 text-center">
              <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                mercers.coffee
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Floating Bottom Nav ─────────────────── */}
      <div className="md:hidden">
        <AnimatePresence>
          {!isBookingOpen && (
            <motion.div
              initial={{ x: '-50%', y: 80, opacity: 0 }}
              animate={{ x: '-50%', y: 0, opacity: 1 }}
              exit={{ x: '-50%', y: 80, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mobile-nav"
              style={{ padding: '8px 12px', gap: '4px' }}
            >
              {/* Far Left: Instagram */}
              <a
                href="https://www.instagram.com/mercers.coffee/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center transition-all duration-300"
                style={{ width: '44px', color: 'rgba(255,255,255,0.85)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span style={{ fontSize: '7px', textTransform: 'uppercase', marginTop: '3px', opacity: 0.6 }}>Social</span>
              </a>

              {/* Gallery */}
              <Link
                to="/gallery"
                className="flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  width: '44px',
                  color: location.pathname === '/gallery' ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                }}
              >
                <Image size={16} />
                <span style={{ fontSize: '7px', textTransform: 'uppercase', marginTop: '3px', opacity: location.pathname === '/gallery' ? 1 : 0.6 }}>Gallery</span>
              </Link>

              {/* Center: Book a Table CTA */}
              <button 
                onClick={openBookingModal} 
                className="btn-primary" 
                style={{ 
                  padding: '9px 12px', 
                  fontSize: '8.5px', 
                  margin: '0 2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <MercerCross color="#535F48" size={9} />
                Book a Table
              </button>

              {/* Location */}
              <Link
                to="/location"
                className="flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  width: '44px',
                  color: location.pathname === '/location' ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                }}
              >
                <MapPin size={16} />
                <span style={{ fontSize: '7px', textTransform: 'uppercase', marginTop: '3px', opacity: location.pathname === '/location' ? 1 : 0.6 }}>Visit</span>
              </Link>

              {/* Right: Menu */}
              <Link
                to="/menu"
                className="flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  width: '44px',
                  color: location.pathname === '/menu' ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                }}
              >
                <Coffee size={16} />
                <span style={{ fontSize: '7px', textTransform: 'uppercase', marginTop: '3px', opacity: location.pathname === '/menu' ? 1 : 0.6 }}>Menu</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
