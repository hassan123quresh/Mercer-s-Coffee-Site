import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#4A5541] border-t border-[rgba(255,255,255,0.1)] pt-10 pb-32 md:pb-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-white/40 text-[13px] leading-relaxed max-w-xs">
              Specialty coffee, timeless ambiance, and thoughtfully crafted bites. Made for moments worth remembering.
            </p>
            <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-4">
              mercers.coffee
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="luxury-label mb-4">Navigate</p>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Menu', path: '/menu' },
                { label: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 text-[13px] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="luxury-label mb-4">Find Us</p>
            <div className="space-y-2">
              <p className="text-white/50 text-[13px]">Mon – Fri: 7am – 10pm</p>
              <p className="text-white/50 text-[13px]">Sat – Sun: 8am – 11pm</p>
              <p className="text-white/50 text-[13px] mt-2">hello@mercers.coffee</p>
              <p className="text-white/50 text-[13px]">@mercers.coffee</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <p className="text-white/20 text-[11px] tracking-[0.1em]">
            © 2025 Mercer's Coffee. All rights reserved.
          </p>
          <p className="text-white/20 text-[11px] tracking-[0.1em]">
            Good coffee deserves good company.
          </p>
        </div>

        {/* Huge Centered Logo at the very end */}
        <div className="flex justify-center mt-6">
          <img 
            src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1778755709/ChatGPT_Image_May_14_2026_03_44_53_PM_ig1lui.png" 
            alt="Mercer's Logo" 
            className="w-full max-w-[800px] h-auto brightness-0 invert opacity-80 pointer-events-none select-none"
          />
        </div>
      </div>
    </footer>
  );
}
