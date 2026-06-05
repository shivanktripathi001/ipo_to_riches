import { motion } from "motion/react";
import { Instagram, Youtube, Twitter, Mail, Phone, ExternalLink } from "lucide-react";
import logoImg from "../../imports/WhatsApp_Image_2026-06-04_at_6.56.34_PM.jpeg";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Resources: [
    { label: "IPO Tracker", href: "#ipo" },
    { label: "Market News", href: "#news" },
    { label: "Learn Investing", href: "#education" },
    { label: "GMP Tracker", href: "#" },
  ],
  Legal: [
    { label: "Disclaimer", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "Advertise", href: "#" },
    { label: "Write For Us", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

const socials = [
  { icon: <Instagram size={18} />, href: "https://www.instagram.com/ipo_to_riches?igsh=YWFxaXd2bWZ2aTZr", label: "Instagram", color: "#E1306C" },
  { icon: <Youtube size={18} />, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
  { icon: <Twitter size={18} />, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
  { icon: <Mail size={18} />, href: "mailto:hello@ipotoriches.com", label: "Email", color: "#F5A300" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoImg} alt="IPO To Riches" className="h-10 w-10 object-contain rounded-full" />
              <span className="font-['Barlow_Condensed'] font-900 text-lg text-white tracking-wide">
                IPO <span className="text-[#F5A300]">TO</span> RICHES
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              India's leading platform for IPO updates, stock market news, and investing education. Helping retail investors make smarter decisions.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-6">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center hover:border-white/20 transition-all"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = s.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <Mail size={12} />
                hello@ipotoriches.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} />
                Available on Instagram DMs
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-700 text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-[#F5A300] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/5 py-6">
          <div className="bg-[#141414] border border-[#F5A300]/10 rounded-xl p-4 mb-6">
            <p className="text-white/25 text-xs leading-relaxed">
              <span className="text-[#F5A300] font-medium">Disclaimer:</span> IPO To Riches is an educational and informational platform only. Content published here does not constitute financial advice or investment recommendations. Stock market investments are subject to market risks. Always consult a SEBI-registered financial advisor before making investment decisions. Past performance of IPOs does not guarantee future results. GMP (Grey Market Premium) data is for informational purposes only and not indicative of actual listing performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">
              © 2024 IPO To Riches. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-white/25 text-xs">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/50 transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
