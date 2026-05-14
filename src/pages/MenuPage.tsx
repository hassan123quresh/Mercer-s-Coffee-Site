import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, GlassWater, Utensils, Zap } from 'lucide-react';

import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// ── DATA ──────────────────────────────────────────────────────────────
const hotCoffee = [
  { name: 'Doppio', price: '420' },
  { name: 'Americano', price: '480' },
  { name: 'Cortado', price: '520' },
  { name: 'Flat White', price: '560' },
  { name: 'Latte', price: '580' },
  { name: 'Cappuccino', price: '580' },
  { name: 'Mocha', price: '640' },
  { name: 'Caramel', price: '700' },
  { name: 'Hazelnut', price: '700' },
  { name: 'Vanilla', price: '700' },
  { name: 'Pop Corn', price: '740' },
  { name: 'Spanish', price: '720' },
  { name: 'Tiramisu', price: '760' },
];

const icedCoffee = [
  { name: 'Americano', price: '520' },
  { name: 'Latte', price: '600' },
  { name: 'Cappuccino', price: '600' },
  { name: 'Mocha', price: '660' },
  { name: 'Caramel', price: '740' },
  { name: 'Hazelnut', price: '740' },
  { name: 'Vanilla', price: '740' },
  { name: 'Pop Corn', price: '780' },
  { name: 'Spanish', price: '760' },
  { name: 'Tiramisu', price: '800' },
];

const beverages = [
  { name: 'Hot Chocolate', price: '950' },
  { name: 'Chai', price: '480' },
  { name: 'Matcha Spanish', price: '850' },
  { name: 'Matcha Strawberry', price: '900' },
  { name: 'Matcha Vanilla', price: '850' },
  { name: 'Peach Ice Tea', price: '650' },
  { name: 'Strawberry Ice Tea', price: '650' },
  { name: 'Lime Ice Tea', price: '620' },
  { name: 'Add Flavour', price: '80' },
  { name: 'Extra Espresso Shot', price: '120' },
  { name: 'Extra Milk', price: '60' },
  { name: 'Alternate Milk', price: '80' },
  { name: 'Up Size', price: '80' },
  { name: 'Lactose Free Milk', price: '80' },
  { name: 'Decaf', price: '60' },
];

const foodMenu = [
  {
    category: 'Sandwiches',
    items: [
      { name: 'Pulled Beef Sandwich with Caramelized Onions', price: '1,090' },
      { name: 'Smoked Chicken with Jalapenos', price: '980' },
      { name: 'Pesto Chicken with Sundried Tomatoes', price: '1,020' },
    ],
  },
  {
    category: 'Croissants',
    items: [
      { name: 'Butter Croissant', price: '750' },
      { name: 'Chocolate Croissant', price: '820' },
      { name: 'Almond Croissant', price: '850' },
    ],
  },
  {
    category: 'Brownies',
    items: [
      { name: 'Choc Brownie', price: '620' },
    ],
  },
  {
    category: 'Cakes',
    items: [
      { name: 'Lotus Cheesecake', price: '950' },
      { name: 'Basque Cheesecake', price: '900' },
      { name: 'Flourless Choc Cake', price: '880' },
      { name: "Devil's Chocolate Cake", price: '920' },
      { name: 'Butter Cake', price: '780' },
      { name: 'Banana Mini Cake', price: '720' },
      { name: 'Strawberry and Cream Cake', price: '1,050' },
    ],
  },
  {
    category: 'Pies',
    items: [
      { name: 'Dark Chocolate Mud Pie', price: '880' },
      { name: 'Apple Pie', price: '820' },
    ],
  },
  {
    category: 'Cookies',
    items: [
      { name: 'Choc Chip Cookie', price: '380' },
      { name: 'Triple Choc Cookie', price: '420' },
    ],
  },
  {
    category: 'Tart',
    items: [
      { name: 'Lemon Tart', price: '780' },
    ],
  },
];

// ── COMPONENTS ────────────────────────────────────────────────────────
function MenuItem({ name, price }: { name: string; price: string }) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <motion.div variants={fadeUp} className="group">
      <Link to={`/product/${slug}`} className="flex items-baseline justify-between py-3 border-b border-white/10 hover:border-white/30 transition-colors">
        <span className="font-serif text-[18px] md:text-[22px] text-white/90 group-hover:text-white transition-colors tracking-tight">
          {name}
        </span>
        <div className="flex-1 mx-4 border-b border-dotted border-white/20 relative top-[-4px] hidden sm:block"></div>
        <span className="font-sans text-[13px] md:text-[14px] text-white/60 tracking-wider font-medium">
          PKR {price}
        </span>
      </Link>
    </motion.div>
  );
}

function MenuSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-[1px] w-8 bg-white/30"></div>
        <h2 className="luxury-label text-white/50 tracking-[0.3em] uppercase text-[10px] md:text-[11px]">
          {title}
        </h2>
        <div className="flex-1 h-[1px] bg-white/10"></div>
      </div>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-1"
      >
        {children}
      </motion.div>
    </section>
  );
}

function CategoryNav() {
  const categories = [
    { id: 'coffee', icon: Coffee, label: 'Coffee' },
    { id: 'beverages', icon: GlassWater, label: 'Beverages' },
    { id: 'food', icon: Utensils, label: 'Culinary' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex justify-center mb-16"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 flex items-center gap-2 md:gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.id)}
            title={cat.label}
            className="flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-full text-[#535F48] hover:bg-[#535F48] hover:text-white transition-all duration-300"
            aria-label={cat.label}
          >
            <cat.icon size={18} className="md:size-5" strokeWidth={1.5} />
            <span className="text-[8px] uppercase tracking-[0.1em] font-bold mt-1 md:hidden">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  return (
    <div className="bg-[#535F48] min-h-screen">
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block mb-8"
          >
            <div className="w-20 h-20 md:w-32 md:h-32 relative mx-auto">
              <motion.img 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1778406644/14_lvn3cb.png"
                alt="Emblem"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[48px] md:text-[84px] text-white leading-[1.1] mb-6 font-light"
          >
            La Carte
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif italic text-white/50 text-[18px] md:text-[22px] max-w-lg mx-auto"
          >
            A curated collection of exceptional brews and culinary delights, crafted for the discerning palate.
          </motion.p>
        </div>
      </section>

      {/* ── MENU CONTENT ── */}
      <main className="px-6 md:px-10 pb-20">
        <div className="max-w-3xl mx-auto">
          
          <CategoryNav />
          
          {/* COFFEE SECTION */}
          <MenuSection title="The Coffee House" id="coffee">
            <div className="text-center mb-12">
              <h3 className="font-serif italic text-white/40 text-[20px] mb-8">— Hot —</h3>
              <div className="text-left">
                {hotCoffee.map((item, i) => (
                  <MenuItem key={i} {...item} />
                ))}
              </div>
            </div>

            <div className="text-center mt-16 mb-12">
              <h3 className="font-serif italic text-white/40 text-[20px] mb-8">— Iced —</h3>
              <div className="text-left">
                {icedIcedCoffeeData.map((item, i) => (
                  <MenuItem key={i} {...item} />
                ))}
              </div>
            </div>
          </MenuSection>

          {/* BEVERAGES SECTION */}
          <MenuSection title="Beverages & Add Ons" id="beverages">
            {beverages.map((item, i) => (
              <MenuItem key={i} {...item} />
            ))}
          </MenuSection>

          {/* FOOD SECTION */}
          <MenuSection title="Culinary Selection" id="food">
            {foodMenu.map((category, ci) => (
              <div key={ci} className="mb-16 last:mb-0">
                <h3 className="font-serif italic text-white/40 text-[20px] mb-8 text-center">
                  — {category.category} —
                </h3>
                <div className="space-y-1">
                  {category.items.map((item, i) => (
                    <MenuItem key={i} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </MenuSection>

        </div>
      </main>



      <Footer />
    </div>
  );
}

// Fixed the typo in the mapping for iced coffee
const icedIcedCoffeeData = icedCoffee;
