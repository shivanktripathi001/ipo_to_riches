import { motion } from "motion/react";
import { BookOpen, TrendingUp, BarChart2, Brain, Shield, ArrowRight, ChevronRight } from "lucide-react";

const categories = [
  {
    icon: <BookOpen size={22} />,
    title: "Stock Market Basics",
    description: "Master the fundamentals of equity investing — from how stocks work to understanding market cycles and indices.",
    lessons: 24,
    color: "#2196F3",
    level: "Beginner",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "IPO Investing",
    description: "Learn how to evaluate IPOs, understand prospectus documents, GMP signals, and subscription strategies.",
    lessons: 18,
    color: "#F5A300",
    level: "Beginner",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Fundamental Analysis",
    description: "Dive deep into balance sheets, P/E ratios, moat analysis, and how to value a company like Warren Buffett.",
    lessons: 32,
    color: "#00C853",
    level: "Intermediate",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Technical Analysis",
    description: "Chart patterns, indicators, support/resistance levels, and proven setups used by professional traders.",
    lessons: 28,
    color: "#9C27B0",
    level: "Intermediate",
  },
  {
    icon: <Brain size={22} />,
    title: "Trading Psychology",
    description: "Overcome fear, greed, and FOMO. Build a disciplined mindset and journal practice to trade consistently.",
    lessons: 14,
    color: "#FF9800",
    level: "All Levels",
  },
  {
    icon: <Shield size={22} />,
    title: "Risk Management",
    description: "Position sizing, stop-losses, portfolio diversification, and protecting capital during market downturns.",
    lessons: 16,
    color: "#FF3D00",
    level: "Advanced",
  },
];

const levelColors: Record<string, string> = {
  Beginner: "#00C853",
  Intermediate: "#F5A300",
  Advanced: "#FF3D00",
  "All Levels": "#2196F3",
};

export function EducationSection() {
  return (
    <section id="education" className="py-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">Learn & Grow</p>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              Market Education
            </h2>
            <p className="text-white/50 text-sm mt-2 max-w-md">
              From zero to investor — free, structured courses for every stage of your financial journey.
            </p>
          </div>
          <a href="#" className="flex items-center gap-2 text-[#F5A300] text-sm font-medium hover:gap-3 transition-all whitespace-nowrap">
            All Courses <ArrowRight size={16} />
          </a>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -5 }}
              className="bg-[#141414] border border-white/8 rounded-2xl p-6 cursor-pointer hover:border-white/15 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: cat.color }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}25` }}
              >
                {cat.icon}
              </div>

              {/* Level badge */}
              <span
                className="text-xs px-2 py-0.5 rounded-md font-medium mb-3 inline-block"
                style={{ background: `${levelColors[cat.level]}15`, color: levelColors[cat.level] }}
              >
                {cat.level}
              </span>

              <h3 className="font-['Barlow'] font-700 text-white text-lg mb-2 group-hover:text-[#F5A300] transition-colors">
                {cat.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-4">{cat.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/30 text-xs">{cat.lessons} Lessons</span>
                <span
                  className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: cat.color }}
                >
                  Start Learning <ChevronRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #141414 0%, #1a1200 50%, #141414 100%)",
            border: "1px solid rgba(245,163,0,0.15)",
          }}
        >
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, #F5A300 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
            <div>
              <h3 className="font-['Barlow_Condensed'] font-black text-white text-3xl uppercase mb-2">
                Ready to become a smarter investor?
              </h3>
              <p className="text-white/50 text-sm max-w-lg">
                Join 50,000+ investors learning with IPO To Riches. Free access to all courses, market updates, and IPO alerts.
              </p>
            </div>
            <a
              href="#newsletter"
              className="flex-shrink-0 bg-[#F5A300] text-black px-8 py-3.5 rounded-xl font-700 text-sm hover:bg-[#f5b533] transition-all hover:scale-105 whitespace-nowrap"
            >
              Start Learning Free
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
