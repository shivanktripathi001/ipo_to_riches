import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, TrendingUp, TrendingDown, ExternalLink, Clock } from "lucide-react";

type TabKey = "upcoming" | "current" | "listed";

const ipoData: Record<TabKey, Array<{
  company: string; sector: string; price: string; gmp: string; gmpDir: number;
  subStatus: number; subLabel: string; openDate: string; closeDate: string; listDate: string;
  lotSize: number; issueSize: string;
}>> = {
  upcoming: [
    { company: "Hyundai India", sector: "Auto", price: "₹1,960 – ₹2,060", gmp: "+₹110", gmpDir: 1, subStatus: 0, subLabel: "Not Open", openDate: "Oct 15", closeDate: "Oct 17", listDate: "Oct 22", lotSize: 7, issueSize: "₹27,870 Cr" },
    { company: "Swiggy", sector: "Food Tech", price: "₹371 – ₹390", gmp: "+₹85", gmpDir: 1, subStatus: 0, subLabel: "Not Open", openDate: "Oct 21", closeDate: "Oct 23", listDate: "Oct 28", lotSize: 38, issueSize: "₹11,327 Cr" },
    { company: "NTPC Green Energy", sector: "Renewable", price: "₹102 – ₹108", gmp: "+₹22", gmpDir: 1, subStatus: 0, subLabel: "Not Open", openDate: "Nov 4", closeDate: "Nov 6", listDate: "Nov 11", lotSize: 138, issueSize: "₹10,000 Cr" },
    { company: "Vishal Mega Mart", sector: "Retail", price: "₹74 – ₹78", gmp: "+₹12", gmpDir: 1, subStatus: 0, subLabel: "Not Open", openDate: "Nov 11", closeDate: "Nov 13", listDate: "Nov 18", lotSize: 192, issueSize: "₹8,000 Cr" },
  ],
  current: [
    { company: "Bajaj Housing Finance", sector: "NBFC", price: "₹66 – ₹70", gmp: "+₹92", gmpDir: 1, subStatus: 67, subLabel: "67.43x (Day 3)", openDate: "Sep 9", closeDate: "Sep 11", listDate: "Sep 16", lotSize: 214, issueSize: "₹6,560 Cr" },
    { company: "Arkade Developers", sector: "Real Estate", price: "₹121 – ₹128", gmp: "+₹45", gmpDir: 1, subStatus: 45, subLabel: "44.87x (Day 2)", openDate: "Sep 16", closeDate: "Sep 18", listDate: "Sep 23", lotSize: 110, issueSize: "₹410 Cr" },
    { company: "Premier Energies", sector: "Solar", price: "₹427 – ₹450", gmp: "+₹180", gmpDir: 1, subStatus: 74, subLabel: "74.12x (Day 3)", openDate: "Sep 11", closeDate: "Sep 13", listDate: "Sep 18", lotSize: 33, issueSize: "₹2,830 Cr" },
  ],
  listed: [
    { company: "Ola Electric", sector: "EV", price: "₹72 – ₹76", gmp: "-₹18", gmpDir: -1, subStatus: 100, subLabel: "Listed ₹76 → ₹64 (-15%)", openDate: "Aug 2", closeDate: "Aug 6", listDate: "Aug 9", lotSize: 195, issueSize: "₹6,145 Cr" },
    { company: "Brainbees Solutions", sector: "D2C", price: "₹440 – ₹465", gmp: "+₹120", gmpDir: 1, subStatus: 100, subLabel: "Listed ₹465 → ₹606 (+30%)", openDate: "Aug 6", closeDate: "Aug 8", listDate: "Aug 13", lotSize: 32, issueSize: "₹1,874 Cr" },
    { company: "Unicommerce", sector: "SaaS", price: "₹102 – ₹108", gmp: "+₹55", gmpDir: 1, subStatus: 100, subLabel: "Listed ₹108 → ₹198 (+83%)", openDate: "Aug 6", closeDate: "Aug 8", listDate: "Aug 13", lotSize: 138, issueSize: "₹276 Cr" },
    { company: "TBO Tek", sector: "Travel Tech", price: "₹875 – ₹920", gmp: "-₹40", gmpDir: -1, subStatus: 100, subLabel: "Listed ₹920 → ₹872 (-5%)", openDate: "May 22", closeDate: "May 24", listDate: "May 29", lotSize: 16, issueSize: "₹1,551 Cr" },
  ],
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "upcoming", label: "Upcoming IPOs" },
  { key: "current", label: "Current IPOs" },
  { key: "listed", label: "Recently Listed" },
];

function SubscriptionBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value > 50 ? "#00C853" : value > 20 ? "#F5A300" : "#2196F3";
  return (
    <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

export function IPOSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("current");

  return (
    <section id="ipo" className="py-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">IPO Tracker</p>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              IPO Dashboard
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111111] p-1 rounded-xl border border-white/8 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "text-black"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-[#F5A300] rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* IPO Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {ipoData[activeTab].map((ipo, i) => (
              <motion.div
                key={ipo.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className="bg-[#141414] border border-white/8 rounded-2xl p-5 hover:border-[#F5A300]/20 transition-all duration-300 group cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#F5A300]/15 text-[#F5A300] text-xs px-2 py-0.5 rounded font-medium">
                        {ipo.sector}
                      </span>
                    </div>
                    <h3 className="font-['Barlow'] font-700 text-white text-lg leading-tight">{ipo.company}</h3>
                    <div className="text-white/40 text-xs mt-0.5">Issue Size: {ipo.issueSize}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold font-mono ${ipo.gmpDir > 0 ? "text-[#00C853]" : "text-[#FF3D00]"}`}>
                    {ipo.gmpDir > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {ipo.gmp}
                    <span className="text-white/30 text-xs font-normal ml-0.5">GMP</span>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">IPO Price</div>
                    <div className="text-white text-sm font-mono font-medium">{ipo.price}</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">Lot Size</div>
                    <div className="text-white text-sm font-mono font-medium">{ipo.lotSize} shares</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">Open / Close</div>
                    <div className="text-white text-sm flex items-center gap-1">
                      <Calendar size={11} className="text-white/30" />
                      {ipo.openDate} – {ipo.closeDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs mb-0.5">Listing Date</div>
                    <div className="text-[#F5A300] text-sm flex items-center gap-1">
                      <Clock size={11} />
                      {ipo.listDate}
                    </div>
                  </div>
                </div>

                {/* Subscription bar */}
                <div className="mb-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/30">Subscription</span>
                    <span className="text-white/60 font-mono">{ipo.subLabel}</span>
                  </div>
                  <SubscriptionBar value={ipo.subStatus} />
                </div>

                <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#F5A300] text-xs flex items-center gap-1">
                    View Details <ExternalLink size={11} />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
