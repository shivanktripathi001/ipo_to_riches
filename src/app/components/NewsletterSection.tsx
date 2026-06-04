import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Check, ArrowRight, Mail } from "lucide-react";

const perks = [
  "Daily IPO alerts before market open",
  "Weekly portfolio watchlist",
  "Breaking market news within minutes",
  "Exclusive GMP updates twice daily",
];

export function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="newsletter" className="py-16 relative overflow-hidden bg-[#0d0d0d]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#F5A300]/5 blur-[100px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#F5A300]/8 to-transparent"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #F5A300 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#141414]/80 backdrop-blur-xl border border-[#F5A300]/15 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#F5A300]/15 border border-[#F5A300]/30 rounded-lg flex items-center justify-center">
                  <Bell size={16} className="text-[#F5A300]" />
                </div>
                <span className="text-[#F5A300] text-xs font-mono uppercase tracking-widest">Free Newsletter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase mb-4 leading-tight">
                Never Miss<br />
                <span className="text-[#F5A300]">An IPO Again</span>
              </h2>

              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Join 50,000+ smart investors who get our daily market digest straight to their inbox. Stay ahead with actionable insights.
              </p>

              <ul className="space-y-2.5">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <span className="w-4 h-4 bg-[#00C853]/15 border border-[#00C853]/30 rounded flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#00C853]" strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-[#00C853]/15 border border-[#00C853]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-[#00C853]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-white font-['Barlow_Condensed'] text-2xl font-black uppercase mb-2">You're In!</h3>
                  <p className="text-white/50 text-sm">Welcome to the IPO To Riches community. Check your inbox for a welcome email.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#F5A300]/50 focus:ring-2 focus:ring-[#F5A300]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#F5A300]/50 focus:ring-2 focus:ring-[#F5A300]/10 transition-all"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#F5A300] text-black py-3.5 rounded-xl font-700 text-sm flex items-center justify-center gap-2 hover:bg-[#f5b533] transition-colors disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Subscribe Now <ArrowRight size={16} /></>
                    )}
                  </motion.button>
                  <p className="text-white/25 text-xs text-center">
                    No spam, ever. Unsubscribe anytime. 50,000+ subscribers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
