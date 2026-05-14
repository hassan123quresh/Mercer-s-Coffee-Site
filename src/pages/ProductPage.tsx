import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';

const MercerCross = ({ color = '#FFFFFF', size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2v16M2 10h16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ── ALL PRODUCTS (mirrors MenuPage data) ──────────────────────────────
export const allProducts: Record<string, { name: string; price: string; img: string; category: string; description: string }> = {
  'doppio': { name: 'Doppio', price: '420', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80', category: 'Hot Coffee', description: 'A double shot of rich, concentrated espresso. Bold, intense, and unapologetically smooth — the purist\'s choice.' },
  'americano': { name: 'Americano', price: '480', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', category: 'Hot Coffee', description: 'Espresso pulled long with hot water. Clean, crisp, and endlessly satisfying from the first sip to the last.' },
  'cortado': { name: 'Cortado', price: '520', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', category: 'Hot Coffee', description: 'Equal parts espresso and warm milk, perfectly balanced. A Spanish classic that bridges boldness and softness.' },
  'flat-white': { name: 'Flat White', price: '560', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80', category: 'Hot Coffee', description: 'Silky microfoam poured over a ristretto base. Velvety, intense, and crafted for those who mean business.' },
  'latte': { name: 'Latte', price: '580', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=80', category: 'Hot Coffee', description: 'Espresso crowned with steamed milk and a thin layer of foam. The everyday indulgence, elevated.' },
  'cappuccino': { name: 'Cappuccino', price: '580', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80', category: 'Hot Coffee', description: 'The classic Italian trio — espresso, steamed milk, and dense foam — in perfect harmony.' },
  'mocha': { name: 'Mocha', price: '640', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', category: 'Hot Coffee', description: 'Espresso meets rich chocolate for a drink that\'s deeply comforting. Dessert in a cup.' },
  'caramel': { name: 'Caramel', price: '700', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80', category: 'Hot Coffee', description: 'Buttery caramel ribboned through smooth espresso and steamed milk. Sweet, warm, and utterly indulgent.' },
  'hazelnut': { name: 'Hazelnut', price: '700', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', category: 'Hot Coffee', description: 'Roasted hazelnut syrup woven through our signature espresso blend. Nutty, warm, and perfectly complex.' },
  'vanilla': { name: 'Vanilla', price: '700', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', category: 'Hot Coffee', description: 'Pure Madagascan vanilla softening bold espresso into something altogether lovely.' },
  'pop-corn': { name: 'Pop Corn', price: '740', img: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&q=80', category: 'Hot Coffee', description: 'A playful twist — sweet popcorn-infused syrup blended with our espresso for an unexpectedly delightful cup.' },
  'spanish': { name: 'Spanish', price: '720', img: 'https://images.unsplash.com/photo-1485808191679-5f86510bd8b2?w=800&q=80', category: 'Hot Coffee', description: 'Condensed milk stirred through rich espresso. Sweet, creamy, and impossibly good.' },
  'tiramisu': { name: 'Tiramisu', price: '760', img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80', category: 'Hot Coffee', description: 'All the magic of Italy\'s favourite dessert reimagined as a luxurious coffee drink.' },
  'iced-americano': { name: 'Iced Americano', price: '520', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80', category: 'Iced Coffee', description: 'Cold, bold, and refreshingly clean. Our espresso poured over ice — a summer essential.' },
  'iced-latte': { name: 'Iced Latte', price: '600', img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80', category: 'Iced Coffee', description: 'Chilled espresso and cold milk over ice. Simple, elegant, and craveable.' },
  'iced-cappuccino': { name: 'Iced Cappuccino', price: '600', img: 'https://images.unsplash.com/photo-1485808191679-5f86510bd8b2?w=800&q=80', category: 'Iced Coffee', description: 'Cold foam meeting espresso — the refreshing Italian classic, iced to perfection.' },
  'iced-mocha': { name: 'Iced Mocha', price: '660', img: 'https://images.unsplash.com/photo-1539601933770-3c8165485634?w=800&q=80', category: 'Iced Coffee', description: 'Chocolate, espresso, and cold milk over ice. Rich enough to be a treat, cold enough to be a relief.' },
  'iced-caramel': { name: 'Iced Caramel', price: '740', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80', category: 'Iced Coffee', description: 'Golden caramel cascading through iced espresso and milk. Sweet, cool, and completely irresistible.' },
  'iced-hazelnut': { name: 'Iced Hazelnut', price: '740', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', category: 'Iced Coffee', description: 'Toasted hazelnut and cool espresso — the cold-weather favourite served on ice.' },
  'iced-vanilla': { name: 'Iced Vanilla', price: '740', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', category: 'Iced Coffee', description: 'Vanilla-kissed espresso over ice. Delicate, refreshing, and effortlessly sophisticated.' },
  'hot-chocolate': { name: 'Hot Chocolate', price: '950', img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80', category: 'Beverages', description: 'Premium cacao melted into steamed milk. Deeply rich, warming, and utterly indulgent.' },
  'chai': { name: 'Chai', price: '480', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', category: 'Beverages', description: 'Aromatic spices steeped slow, poured over steamed milk. The kind of warmth that stays with you.' },
  'matcha-spanish': { name: 'Matcha Spanish', price: '850', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80', category: 'Beverages', description: 'Ceremonial grade matcha blended with condensed milk — sweet, earthy, and beautifully vibrant.' },
  'matcha-strawberry': { name: 'Matcha Strawberry', price: '900', img: '/images/strawberry-matcha.jpg', category: 'Beverages', description: 'Fresh strawberry and ceremonial matcha — a visual masterpiece that tastes even better than it looks.' },
  'matcha-vanilla': { name: 'Matcha Vanilla', price: '850', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', category: 'Beverages', description: 'Earthy matcha softened by the warmth of pure vanilla. Calming, refined, and utterly unique.' },
  'butter-croissant': { name: 'Butter Croissant', price: '750', img: '/images/croissant.jpg', category: 'Croissants', description: 'Flaky, golden, and impossibly buttery. Made fresh daily, the way all croissants should be.' },
  'chocolate-croissant': { name: 'Chocolate Croissant', price: '820', img: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80', category: 'Croissants', description: 'Rich dark chocolate tucked inside layers of laminated pastry. The breakfast upgrade you deserve.' },
  'lotus-cheesecake': { name: 'Lotus Cheesecake', price: '950', img: '/images/lotus-cheesecake.jpg', category: 'Cakes', description: 'Velvety cheesecake on a Lotus Biscoff crust. Caramelised, rich, and completely unforgettable.' },
  'choc-brownie': { name: 'Choc Brownie', price: '620', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', category: 'Brownies', description: 'Fudgy at the centre, crisp at the edge. Our brownie is a lesson in chocolate perfection.' },
};

// ── COMBO SUGGESTIONS ─────────────────────────────────────────────────
const combos: Record<string, { label: string; items: string[]; note: string }[]> = {
  'Hot Coffee': [
    { label: 'The Morning Ritual', items: ['Butter Croissant', 'Americano'], note: 'A timeless pairing — flaky pastry meets bold espresso.' },
    { label: 'Sweet Indulgence', items: ['Lotus Cheesecake', 'Caramel Latte'], note: 'When you want to treat yourself properly.' },
  ],
  'Iced Coffee': [
    { label: 'Summer Afternoon', items: ['Iced Mocha', 'Choc Brownie'], note: 'Cool coffee, warm chocolate. The perfect contrast.' },
    { label: 'Light & Fresh', items: ['Iced Latte', 'Butter Croissant'], note: 'Breezy and satisfying without the weight.' },
  ],
  'Beverages': [
    { label: 'The Matcha Moment', items: ['Matcha Strawberry', 'Choc Brownie'], note: 'Earthy meets sweet in the most delightful way.' },
    { label: 'Cosy Afternoon', items: ['Hot Chocolate', 'Lotus Cheesecake'], note: 'Wrap yourself in warmth and richness.' },
  ],
  'Croissants': [
    { label: 'Classic Café Pair', items: ['Flat White', 'Butter Croissant'], note: 'The Parisian café experience, perfected.' },
    { label: 'Decadent Duo', items: ['Mocha', 'Chocolate Croissant'], note: 'Double chocolate, double the satisfaction.' },
  ],
  'Cakes': [
    { label: 'Dessert Hour', items: ['Cortado', 'Lotus Cheesecake'], note: 'Bold espresso cuts through the rich cheesecake beautifully.' },
    { label: 'Sweet Retreat', items: ['Hazelnut Latte', 'Choc Brownie'], note: 'A nutty, chocolatey escape from the everyday.' },
  ],
  'Brownies': [
    { label: 'Chocolate Lover\'s Pick', items: ['Mocha', 'Choc Brownie'], note: 'For those who believe chocolate is a food group.' },
    { label: 'Balanced Bite', items: ['Cortado', 'Choc Brownie'], note: 'The espresso\'s intensity tames the brownie\'s sweetness.' },
  ],
};

const defaultCombos = [
  { label: 'The Signature Pair', items: ['Flat White', 'Butter Croissant'], note: 'Our most-loved combination.' },
  { label: 'Sweet & Bold', items: ['Mocha', 'Lotus Cheesecake'], note: 'Rich meets richer.' },
];

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const product = slug ? allProducts[slug] : null;

  if (!product) {
    return (
      <div className="bg-[#535F48] min-h-screen flex flex-col items-center justify-center gap-6 px-5">
        <p className="luxury-label opacity-60">Not Found</p>
        <h1 className="font-display font-light text-white text-4xl">Product unavailable</h1>
        <button onClick={() => navigate('/menu')} className="btn-luxury">
          <ArrowLeft size={13} /> Back to Menu
        </button>
      </div>
    );
  }

  const suggestedCombos = combos[product.category] ?? defaultCombos;

  return (
    <div className="bg-[#535F48] min-h-screen overflow-x-hidden">

      {/* ── BACK BUTTON ── */}
      <div className="px-5 md:px-10 pt-24 pb-0">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-300 mb-6"
            style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Inter', fontWeight: 500 }}
          >
            <ArrowLeft size={13} /> Menu
          </button>
        </div>
      </div>

      {/* ── HERO / PRODUCT ── */}
      <section className="px-5 md:px-10 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: '1/1', background: '#5D6B52' }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80';
                }}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-2 mb-3">
                <MercerCross size={11} />
                <span className="luxury-label opacity-60">{product.category}</span>
              </div>

              {/* Name */}
              <h1
                className="font-display font-light text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(32px, 7vw, 56px)', letterSpacing: '-0.01em' }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <p
                className="text-white mb-5"
                style={{ fontFamily: 'Inter', fontSize: '22px', fontWeight: 300, letterSpacing: '0.02em' }}
              >
                Rs. {product.price}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />

              {/* Description */}
              <p
                className="text-white/50 leading-relaxed mb-8"
                style={{ fontFamily: 'Inter', fontSize: '13px', lineHeight: 1.75 }}
              >
                {product.description}
              </p>

              {/* CTA */}
              <button onClick={openBookingModal} className="btn-primary" style={{ padding: '13px 28px', fontSize: '10.5px' }}>
                <MercerCross color="#535F48" size={12} />
                Book a Table
              </button>

              {/* Trust note */}
              <p className="text-white/20 mt-4" style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.1em' }}>
                Dine in · Lahore · Made fresh daily
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BEST COMBOS ── */}
      <section className="pt-28 pb-12 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <MercerCross size={11} />
              <span className="luxury-label opacity-60">Curated Pairings</span>
            </div>
            <h2
              className="font-display font-light text-white leading-tight"
              style={{ fontSize: 'clamp(26px, 5vw, 42px)', letterSpacing: '-0.01em' }}
            >
              Best with {product.name}
            </h2>
          </motion.div>

          {/* Combo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedCombos.map((combo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="rounded-xl p-5 border"
                style={{ background: '#4A5541', borderColor: 'rgba(255,255,255,0.12)' }}
              >
                {/* Combo label */}
                <p className="luxury-label mb-3 opacity-80">{combo.label}</p>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {combo.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-white"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        background: '#5D6B52',
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderRadius: '100px',
                        padding: '5px 12px',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Note */}
                <p className="text-white/35" style={{ fontFamily: 'Inter', fontSize: '12px', lineHeight: 1.6 }}>
                  {combo.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOU MIGHT ALSO LIKE ── */}
      <section className="px-5 md:px-10 pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MercerCross size={11} />
                <span className="luxury-label opacity-60">Explore More</span>
              </div>
              <h2
                className="font-display font-light text-white"
                style={{ fontSize: 'clamp(22px, 4vw, 34px)', letterSpacing: '-0.01em' }}
              >
                You Might Also Like
              </h2>
            </div>
            <Link
              to="/menu"
              className="hidden sm:flex items-center gap-1 text-white/35 hover:text-white transition-colors"
              style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              View All <ArrowRight size={11} />
            </Link>
          </motion.div>

          {/* Related items — pick 4 random from same category */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(allProducts)
              .filter(([s, p]) => s !== slug && p.category === product.category)
              .slice(0, 4)
              .map(([s, p], i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={`/product/${s}`}
                    className="block rounded-xl overflow-hidden border group"
                    style={{ background: '#5D6B52', borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    <div className="overflow-hidden" style={{ aspectRatio: '1/1' }}>
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80';
                        }}
                      />
                    </div>
                    <div className="p-3 text-center">
                      <p
                        className="text-white leading-snug uppercase line-clamp-2"
                        style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em' }}
                      >
                        {p.name}
                      </p>
                      <p className="text-white mt-1" style={{ fontSize: '11px' }}>Rs. {p.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
