import { motion } from "motion/react";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const memes = [
  { id: 1, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=380&fit=crop&auto=format", likes: "4.2K", comments: "318" },
  { id: 2, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=240&fit=crop&auto=format", likes: "6.8K", comments: "542" },
  { id: 3, image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=300&h=350&fit=crop&auto=format", likes: "3.1K", comments: "211" },
  { id: 4, image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&h=260&fit=crop&auto=format", likes: "9.2K", comments: "724" },
  { id: 5, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop&auto=format", likes: "5.5K", comments: "413" },
  { id: 6, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=380&fit=crop&auto=format", likes: "7.3K", comments: "591" },
];

export function MemesSection() {
  return (
    <section className="py-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">From Our Instagram</p>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              Finance Memes 😂
            </h2>
            <p className="text-white/40 text-sm mt-1">Because learning finance should be fun too</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/20 px-4 py-2 rounded-xl text-sm transition-all"
          >
            <Instagram size={15} />
            View all
          </a>
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 640: 3, 1024: 4 }}>
          <Masonry gutter="16px">
            {memes.map((meme, i) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={meme.image}
                  alt={`Finance meme ${meme.id}`}
                  className="w-full h-auto object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center gap-3 text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="text-pink-400" fill="currentColor" />
                      {meme.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} className="text-blue-400" />
                      {meme.comments}
                    </span>
                  </div>
                </div>

                {/* Instagram icon */}
                <div className="absolute top-2.5 right-2.5 bg-black/50 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram size={13} className="text-white" />
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
