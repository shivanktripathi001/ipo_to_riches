import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

function generateSparkData(base: number, trend: number) {
  return Array.from({ length: 20 }, (_, i) => ({
    v: base + trend * i + (Math.random() - 0.5) * base * 0.015,
  }));
}

const indices = [
  {
    name: "NIFTY 50",
    value: 24874.25,
    change: 187.45,
    changePct: 0.76,
    trend: 1,
    color: "#00C853",
    data: generateSparkData(24500, 8),
  },
  {
    name: "SENSEX",
    value: 81742.30,
    change: 524.80,
    changePct: 0.65,
    trend: 1,
    color: "#00C853",
    data: generateSparkData(81000, 30),
  },
  {
    name: "BANK NIFTY",
    value: 52341.15,
    change: -143.60,
    changePct: -0.27,
    trend: -1,
    color: "#FF3D00",
    data: generateSparkData(52600, -5),
  },
  {
    name: "FINNIFTY",
    value: 23687.90,
    change: -67.25,
    changePct: -0.28,
    trend: -1,
    color: "#FF3D00",
    data: generateSparkData(23800, -3),
  },
];

function AnimatedValue({ value, decimals = 2 }: { value: number; decimals?: number }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    let start = displayed;
    const end = value;
    const diff = end - start;
    let frame = 0;
    const frames = 30;
    const animate = () => {
      frame++;
      setDisplayed(start + diff * (frame / frames));
      if (frame < frames) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{displayed.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

export function LiveMarket() {
  const [data, setData] = useState(indices);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((idx) => {
          const delta = (Math.random() - 0.48) * idx.value * 0.002;
          const newVal = idx.value + delta;
          const newChange = idx.change + delta;
          const newPct = (newChange / (newVal - newChange)) * 100;
          const newSparkPoint = { v: newVal };
          return {
            ...idx,
            value: newVal,
            change: newChange,
            changePct: newPct,
            color: newChange >= 0 ? "#00C853" : "#FF3D00",
            trend: newChange >= 0 ? 1 : -1,
            data: [...idx.data.slice(1), newSparkPoint],
          };
        })
      );
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="markets" className="py-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" />
              <span className="text-[#00C853] text-xs font-mono font-medium uppercase tracking-widest">Live</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Barlow_Condensed'] font-black text-white uppercase">
              Market Dashboard
            </h2>
          </div>
          <div className="text-white/30 text-xs font-mono text-right">
            <Activity size={14} className="inline mr-1" />
            Last updated<br />
            {lastUpdate.toLocaleTimeString("en-IN")}
          </div>
        </div>

        {/* Index Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((idx, i) => {
            const isUp = idx.trend >= 0;
            return (
              <motion.div
                key={idx.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative bg-[#141414] border border-white/8 rounded-2xl p-5 overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                {/* Glow background */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: idx.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white/40 text-xs font-medium mb-0.5">{idx.name}</div>
                      <div className="font-['JetBrains_Mono'] font-bold text-2xl text-white">
                        <AnimatedValue value={idx.value} />
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold font-mono"
                      style={{
                        background: `${idx.color}18`,
                        color: idx.color,
                        border: `1px solid ${idx.color}30`,
                      }}
                    >
                      {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {isUp ? "+" : ""}{idx.changePct.toFixed(2)}%
                    </div>
                  </div>

                  <div className="font-mono text-xs mb-3" style={{ color: idx.color }}>
                    {isUp ? "+" : ""}{idx.change.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* Sparkline */}
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={idx.data}>
                        <defs>
                          <linearGradient id={`spark${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={idx.color} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={idx.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke={idx.color}
                          strokeWidth={1.5}
                          fill={`url(#spark${i})`}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
