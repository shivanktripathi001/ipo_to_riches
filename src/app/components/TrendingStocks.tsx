import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

type StockTab = "gainers" | "losers" | "active";

const generateMini = (start: number, up: boolean) =>
  Array.from({ length: 12 }, (_, i) => ({
    v: start + (up ? 1 : -1) * i * 2 + (Math.random() - 0.5) * 5,
  }));

const stockData: Record<StockTab, Array<{
  symbol: string; name: string; price: string; change: string; pct: string; up: boolean;
  volume: string; data: { v: number }[];
}>> = {
  gainers: [
    { symbol: "BAJAJHFL", name: "Bajaj Housing Finance", price: "₹178.40", change: "+₹18.60", pct: "+11.64%", up: true, volume: "3.2 Cr", data: generateMini(160, true) },
    { symbol: "PREMIERENE", name: "Premier Energies", price: "₹1,082", change: "+₹104", pct: "+10.63%", up: true, volume: "1.8 Cr", data: generateMini(980, true) },
    { symbol: "IREDA", name: "IREDA", price: "₹242.50", change: "+₹21.40", pct: "+9.68%", up: true, volume: "4.1 Cr", data: generateMini(221, true) },
    { symbol: "ZOMATO", name: "Zomato", price: "₹268.30", change: "+₹22.10", pct: "+8.99%", up: true, volume: "6.7 Cr", data: generateMini(246, true) },
    { symbol: "PAYTM", name: "One97 Communications", price: "₹654.20", change: "+₹52.40", pct: "+8.71%", up: true, volume: "2.3 Cr", data: generateMini(602, true) },
    { symbol: "ADANIGREEN", name: "Adani Green Energy", price: "₹1,742", change: "+₹118", pct: "+7.27%", up: true, volume: "1.2 Cr", data: generateMini(1624, true) },
  ],
  losers: [
    { symbol: "OLAELEC", name: "Ola Electric", price: "₹64.20", change: "-₹11.80", pct: "-15.52%", up: false, volume: "8.4 Cr", data: generateMini(76, false) },
    { symbol: "NYKAA", name: "FSN E-Commerce", price: "₹148.60", change: "-₹14.20", pct: "-8.72%", up: false, volume: "2.1 Cr", data: generateMini(163, false) },
    { symbol: "PAYTM", name: "One97 Communications", price: "₹394.50", change: "-₹35.10", pct: "-8.17%", up: false, volume: "5.6 Cr", data: generateMini(430, false) },
    { symbol: "TATAMOTORS", name: "Tata Motors", price: "₹912.40", change: "-₹72.60", pct: "-7.37%", up: false, volume: "3.8 Cr", data: generateMini(985, false) },
    { symbol: "INFY", name: "Infosys", price: "₹1,824", change: "-₹98", pct: "-5.10%", up: false, volume: "4.2 Cr", data: generateMini(1922, false) },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: "₹2,342", change: "-₹118", pct: "-4.80%", up: false, volume: "1.1 Cr", data: generateMini(2460, false) },
  ],
  active: [
    { symbol: "RELIANCE", name: "Reliance Industries", price: "₹2,987", change: "+₹34.50", pct: "+1.17%", up: true, volume: "12.4 Cr", data: generateMini(2953, true) },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: "₹1,784", change: "+₹18.20", pct: "+1.03%", up: true, volume: "10.8 Cr", data: generateMini(1766, true) },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: "₹1,248", change: "+₹22.40", pct: "+1.83%", up: true, volume: "9.7 Cr", data: generateMini(1226, true) },
    { symbol: "ZOMATO", name: "Zomato", price: "₹268.30", change: "+₹22.10", pct: "+8.99%", up: true, volume: "6.7 Cr", data: generateMini(246, true) },
    { symbol: "SBIN", name: "State Bank of India", price: "₹842.50", change: "+₹8.40", pct: "+1.01%", up: true, volume: "6.2 Cr", data: generateMini(834, true) },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", price: "₹7,842", change: "-₹68", pct: "-0.86%", up: false, volume: "5.8 Cr", data: generateMini(7910, false) },
  ],
};

const tabs: { key: StockTab; label: string; icon: React.ReactNode }[] = [
  { key: "gainers", label: "Top Gainers", icon: <TrendingUp size={14} /> },
  { key: "losers", label: "Top Losers", icon: <TrendingDown size={14} /> },
  { key: "active", label: "Most Active", icon: <BarChart2 size={14} /> },
];

export function TrendingStocks() {
  const [active, setActive] = useState<StockTab>("gainers");

  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-[#F5A300] text-xs font-mono uppercase tracking-widest mb-2">Real-time Data</p>
          <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
            Trending Stocks
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === tab.key
                  ? "bg-[#F5A300] text-black"
                  : "bg-[#141414] border border-white/8 text-white/60 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stock cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {stockData[active].map((stock, i) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-[#141414] border border-white/8 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-white/15 transition-all duration-300 group"
              >
                {/* Symbol badge */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/80 text-xs font-bold font-mono text-center leading-tight px-1">
                    {stock.symbol.slice(0, 4)}
                  </span>
                </div>

                {/* Name & volume */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{stock.name}</div>
                  <div className="text-white/30 text-xs font-mono">Vol: {stock.volume}</div>
                </div>

                {/* Mini chart */}
                <div className="w-20 h-10 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stock.data}>
                      <defs>
                        <linearGradient id={`sg${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={stock.up ? "#00C853" : "#FF3D00"} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={stock.up ? "#00C853" : "#FF3D00"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={stock.up ? "#00C853" : "#FF3D00"} strokeWidth={1.5} fill={`url(#sg${i})`} dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Price & change */}
                <div className="text-right flex-shrink-0">
                  <div className="text-white font-mono font-medium text-sm">{stock.price}</div>
                  <div className={`text-xs font-mono font-bold ${stock.up ? "text-[#00C853]" : "text-[#FF3D00]"}`}>
                    {stock.pct}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
