import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Instagram, Users, Mail, BookOpen } from "lucide-react";

const stats = [
  { label: "Instagram Followers", value: 127000, suffix: "+", icon: <Instagram size={22} />, color: "#E1306C" },
  { label: "Newsletter Subscribers", value: 52000, suffix: "+", icon: <Mail size={22} />, color: "#F5A300" },
  { label: "Daily Readers", value: 18000, suffix: "+", icon: <BookOpen size={22} />, color: "#00C853" },
  { label: "Community Members", value: 84000, suffix: "+", icon: <Users size={22} />, color: "#2196F3" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const frames = 60;
          const increment = target / frames;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, duration / frames);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = count >= 1000
    ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    : count.toString();

  return (
    <div ref={ref} className="font-['JetBrains_Mono'] font-bold">
      {formatted}{suffix}
    </div>
  );
}

const testimonials = [
  { name: "Priya M.", handle: "@priya_invests", text: "IPO To Riches gave me the confidence to apply for my first IPO. Bajaj Housing Finance listing gains were amazing! 🔥", avatar: "PM" },
  { name: "Rohan K.", handle: "@rohan_trader", text: "The daily GMP updates and subscription analysis are 🔥. Never miss an important IPO anymore. Best free resource!", avatar: "RK" },
  { name: "Ananya S.", handle: "@ananya_fin", text: "The education section helped me understand fundamentals. Now I can analyze stocks on my own. Life-changing!", avatar: "AS" },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-5xl font-['Barlow_Condensed'] font-black text-white uppercase mb-4">
            Join Our Growing<br />
            <span className="text-[#F5A300]">Investor Community</span>
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Thousands of retail investors trust IPO To Riches for daily market insights, IPO alerts, and investing education.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-[#141414] border border-white/8 rounded-2xl p-6 text-center hover:border-white/15 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${stat.color}15`, color: stat.color, border: `1px solid ${stat.color}25` }}
              >
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl mb-1" style={{ color: stat.color }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-xs font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#141414] border border-white/8 rounded-2xl p-6 hover:border-[#F5A300]/20 transition-all duration-300"
            >
              <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#F5A300] to-[#e67e00] rounded-full flex items-center justify-center text-black text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/ipo_to_riches?igsh=YWFxaXd2bWZ2aTZr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white px-8 py-4 rounded-2xl font-700 text-base hover:scale-105 transition-transform duration-200 hover:shadow-xl hover:shadow-pink-500/20"
          >
            <Instagram size={20} />
            Follow us on Instagram
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">@ipotoriches</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
