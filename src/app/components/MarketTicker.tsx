import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

const headlines = [
  "NIFTY 50 hits new 52-week high as FII inflows surge ₹8,240 Cr",
  "Bajaj Housing Finance IPO subscribed 67x on Day 3 — GMP at ₹110",
  "RBI keeps repo rate unchanged at 6.5% — Markets cheer the decision",
  "Paytm shares rally 12% after Q2 results beat analyst estimates",
  "SEBI tightens SME IPO norms — minimum application size raised",
  "Hyundai India IPO: ₹27,870 Cr offering opens for subscription next week",
  "SENSEX crosses 82,000 — Midcap index up 2.3% led by banking stocks",
  "Swiggy IPO: GMP at ₹85, subscription closes tonight — Last chance",
  "Adani Enterprises Q2 net profit up 47% at ₹1,702 Cr — Stock surges",
  "Gold hits ₹79,000 per 10g — Safe-haven demand amid global uncertainty",
];

export function MarketTicker() {
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.animation = "none";
    el.offsetHeight; // reflow
    el.style.animation = "";
  }, []);

  if (!visible) return null;

  const doubled = [...headlines, ...headlines];

  return (
    <div className="sticky top-16 md:top-18 z-40 bg-[#111111] border-b border-[#F5A300]/20 overflow-hidden">
      <div className="flex items-stretch">
        {/* Breaking News Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-[#F5A300] text-black px-4 py-2.5 font-['Barlow_Condensed'] font-900 text-sm uppercase tracking-wider whitespace-nowrap z-10">
          <Zap size={14} fill="black" />
          Breaking News
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center h-full">
            <div
              ref={scrollRef}
              className="flex items-center gap-0 whitespace-nowrap"
              style={{
                animation: "ticker-scroll 60s linear infinite",
              }}
            >
              {doubled.map((headline, i) => (
                <span key={i} className="text-white/80 text-sm px-6 py-2.5 border-r border-white/10 hover:text-[#F5A300] cursor-pointer transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#F5A300] rounded-full flex-shrink-0" />
                  {headline}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 px-3 text-white/30 hover:text-white/70 transition-colors text-xs"
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
