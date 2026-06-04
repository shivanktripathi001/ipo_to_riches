import { motion } from "motion/react";
import { ArrowRight, Clock, Tag } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "IPO News",
    categoryColor: "#F5A300",
    title: "Hyundai India Mega IPO: ₹27,870 Cr Offering Gets SEBI Green Light — Opens Next Week",
    summary: "India's largest-ever IPO is set to open for subscription. Hyundai Motor India's ₹27,870 crore offering is entirely an Offer For Sale (OFS) with no fresh issue component.",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 2,
    category: "Market News",
    categoryColor: "#2196F3",
    title: "NIFTY 50 Hits 25,000 Milestone — FII Inflows Drive Bull Run Across Midcap Stocks",
    summary: "Foreign institutional investors pumped ₹8,240 crore into Indian equities in a single session as optimism about earnings growth and rate cuts fueled the rally.",
    time: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 3,
    category: "Results",
    categoryColor: "#00C853",
    title: "Zomato Q2 Results: Revenue Surges 69% — First Full Year of Profitability in Sight",
    summary: "Food delivery giant Zomato reported Q2 FY25 revenue of ₹4,799 crore, up 69% YoY, as adjusted EBITDA turned positive for the third consecutive quarter.",
    time: "6 hours ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 4,
    category: "Policy",
    categoryColor: "#9C27B0",
    title: "RBI Keeps Repo Rate at 6.5% — MPC Remains Focused on Withdrawal of Accommodation",
    summary: "The Monetary Policy Committee voted 5-1 to keep the benchmark repo rate unchanged. Governor Shaktikanta Das signaled rates could ease in early 2025.",
    time: "8 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 5,
    category: "Tech Stocks",
    categoryColor: "#F5A300",
    title: "TCS & Infosys Beat Estimates — IT Sector Rally Could Signal Sector Rotation Ahead",
    summary: "India's top IT exporters posted better-than-expected Q2 numbers driven by deal wins in AI and cloud migration. Analysts upgrade targets by 15-20%.",
    time: "12 hours ago",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 6,
    category: "SME IPO",
    categoryColor: "#FF9800",
    title: "Vibhor Steel Tubes SME IPO Subscribed 320x — GMP Signals 180% Listing Premium",
    summary: "The SME IPO frenzy continues as Vibhor Steel Tubes' ₹72 Cr offering attracted record demand from HNIs and retail investors, with GMP touching ₹90 on grey market.",
    time: "1 day ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format",
  },
];

function NewsCard({ item, featured = false }: { item: typeof newsItems[0]; featured?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-[#141414] border border-white/8 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/15 transition-all duration-300 ${
        featured ? "md:col-span-2 md:flex" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "md:w-2/5 flex-shrink-0" : ""}`}>
        <div className={`${featured ? "h-48 md:h-full" : "h-48"} overflow-hidden`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent" />
        </div>
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold text-black"
          style={{ background: item.categoryColor }}
        >
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className={`font-['Barlow'] font-700 text-white group-hover:text-[#F5A300] transition-colors leading-snug mb-3 ${featured ? "text-xl" : "text-base"}`}>
            {item.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">{item.summary}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/30 text-xs">
            <span className="flex items-center gap-1"><Clock size={11} />{item.time}</span>
            <span className="flex items-center gap-1"><Tag size={11} />{item.readTime}</span>
          </div>
          <span className="text-[#F5A300] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function NewsSection() {
  return (
    <section id="news" className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">Market Intelligence</p>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              Latest Stock Market News
            </h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-2 text-[#F5A300] text-sm font-medium hover:gap-3 transition-all">
            All News <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-[#F5A300] hover:border-[#F5A300]/40 px-8 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          >
            Load More News <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
