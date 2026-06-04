import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, TrendingUp, Bell, Search } from "lucide-react";
import logoImg from "../../imports/WhatsApp_Image_2026-06-04_at_6.56.34_PM.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "IPO Tracker", href: "#ipo" },
  { label: "Market News", href: "#news" },
  { label: "Markets", href: "#markets" },
  { label: "Learn", href: "#education" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src={logoImg}
              alt="IPO To Riches Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="font-['Barlow_Condensed'] font-900 text-xl tracking-wide text-white">
              IPO<span className="text-[#F5A300]">_TO_</span> RICHES
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-white/70 hover:text-[#F5A300] transition-colors duration-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5A300] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-white/60 hover:text-[#F5A300] transition-colors p-2">
              <Search size={18} />
            </button>
            <button className="text-white/60 hover:text-[#F5A300] transition-colors p-2">
              <Bell size={18} />
            </button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F5A300] text-black px-4 py-2 rounded-lg text-sm font-700 hover:bg-[#f5b300] transition-all duration-200 hover:scale-105"
            >
              <TrendingUp size={15} />
              Join Community
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111] border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-white/80 hover:text-[#F5A300] hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 bg-[#F5A300] text-black px-4 py-3 rounded-lg text-sm font-700"
              >
                <TrendingUp size={15} />
                Join Community
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
