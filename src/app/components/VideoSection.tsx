import { motion } from "motion/react";
import { Play, Youtube, Clock, Eye } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Hyundai India IPO Review: Should You Apply? Price Band Analysis",
    category: "IPO Review",
    duration: "18:42",
    views: "2.4L",
    thumbnail: "https://images.unsplash.com/photo-1612837017391-4b6b7b0e23b3?w=500&h=300&fit=crop&auto=format",
    featured: true,
  },
  {
    id: 2,
    title: "Weekly Market Recap: NIFTY at 25K — What's Next?",
    category: "Market Analysis",
    duration: "22:15",
    views: "1.8L",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop&auto=format",
    featured: false,
  },
  {
    id: 3,
    title: "How to Read an IPO Prospectus — Complete Beginner Guide",
    category: "Education",
    duration: "31:08",
    views: "3.2L",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&h=300&fit=crop&auto=format",
    featured: false,
  },
  {
    id: 4,
    title: "Top 5 Stocks for Long-Term Wealth Building in 2024",
    category: "Stock Picks",
    duration: "26:44",
    views: "4.1L",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&auto=format",
    featured: false,
  },
];

const catColors: Record<string, string> = {
  "IPO Review": "#F5A300",
  "Market Analysis": "#2196F3",
  "Education": "#00C853",
  "Stock Picks": "#9C27B0",
};

export function VideoSection() {
  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">Video Content</p>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              Latest Videos
            </h2>
          </div>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#FF0000]/20 transition-all"
          >
            <Youtube size={16} />
            Subscribe
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-[#141414] border border-white/8 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/15 transition-all duration-300 ${video.featured ? "md:col-span-2 xl:col-span-2" : ""}`}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${video.featured ? "h-52" : "h-44"}`}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-[#F5A300] rounded-full flex items-center justify-center shadow-lg shadow-[#F5A300]/30 opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <Play size={18} fill="black" className="ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">
                  {video.duration}
                </div>

                {/* Category */}
                <span
                  className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-bold text-black"
                  style={{ background: catColors[video.category] || "#F5A300" }}
                >
                  {video.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-['Barlow'] font-600 text-sm leading-snug mb-3 group-hover:text-[#F5A300] transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-3 text-white/30 text-xs">
                  <span className="flex items-center gap-1"><Eye size={11} />{video.views} views</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{video.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
