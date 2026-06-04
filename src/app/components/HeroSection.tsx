import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, ArrowRight, Play, ChevronDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const sparkData = Array.from({ length: 30 }, (_, i) => ({
  v: 40 + Math.sin(i * 0.5) * 15 + Math.random() * 10,
}));

const stats = [
  { label: "Active IPOs", value: "12", suffix: "" },
  { label: "Upcoming IPOs", value: "28", suffix: "+" },
  { label: "Market Gainers", value: "847", suffix: "" },
  { label: "Market Losers", value: "203", suffix: "" },
];

function CandlestickCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const candles: { o: number; h: number; l: number; c: number; x: number }[] = [];
    for (let i = 0; i < 80; i++) {
      const base = 120 + Math.sin(i * 0.15) * 40 + Math.random() * 20;
      const range = 10 + Math.random() * 25;
      const o = base;
      const c = base + (Math.random() - 0.5) * range;
      const h = Math.max(o, c) + Math.random() * 8;
      const l = Math.min(o, c) - Math.random() * 8;
      candles.push({ o, h, l, c, x: i * 20 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const offset = offsetRef.current % (candles.length * 20);
      ctx.globalAlpha = 0.18;

      candles.forEach((c, i) => {
        const x = (c.x - offset + candles.length * 20) % (candles.length * 20);
        if (x < -20 || x > canvas.width + 20) return;
        const scaleY = canvas.height / 280;
        const ox = x;
        const oy = canvas.height - c.o * scaleY;
        const cy = canvas.height - c.c * scaleY;
        const hy = canvas.height - c.h * scaleY;
        const ly = canvas.height - c.l * scaleY;
        const bull = c.c >= c.o;
        ctx.strokeStyle = bull ? "#00C853" : "#FF3D00";
        ctx.fillStyle = bull ? "#00C853" : "#FF3D00";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ox + 6, hy);
        ctx.lineTo(ox + 6, ly);
        ctx.stroke();
        ctx.fillRect(ox, Math.min(oy, cy), 12, Math.max(Math.abs(cy - oy), 2));
      });

      ctx.globalAlpha = 1;
      offsetRef.current += 0.4;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(num)) { setDisplay(target); return; }
    let start = 0;
    const step = Math.ceil(num / 50);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplay(start.toString());
      if (start >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{display}{suffix}</>;
}

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated candlestick background */}
      <div className="absolute inset-0 opacity-100">
        <CandlestickCanvas />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,163,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,163,0,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F5A300]/6 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F5A300]/4 blur-[100px] pointer-events-none" />

      {/* Floating graph lines */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F5A300" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F5A300" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#F5A300" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#F5A300]/10 border border-[#F5A300]/20 text-[#F5A300] px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-[#F5A300] rounded-full animate-pulse" />
            Live Market Updates — NSE & BSE
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-['Barlow_Condensed'] font-black text-white leading-[0.95] mb-6 uppercase tracking-tight"
          >
            Your Daily Source For
            <br />
            <span className="text-[#F5A300]">IPO Updates,</span>
            <br />
            <span className="text-white/90">Stock Market News</span>
            <br />
            <span className="text-white/70">&amp; Investment Insights</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed"
          >
            Stay ahead of the market with real-time IPO alerts, stock news, market trends, and educational content designed for smart retail investors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#ipo"
              className="flex items-center gap-2 bg-[#F5A300] text-black px-6 py-3.5 rounded-xl font-700 text-sm hover:bg-[#f5b533] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#F5A300]/25"
            >
              <TrendingUp size={18} />
              Latest IPOs
            </a>
            <a
              href="#news"
              className="flex items-center gap-2 bg-white/8 border border-white/12 text-white px-6 py-3.5 rounded-xl font-700 text-sm hover:bg-white/12 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
            >
              Market News
              <ArrowRight size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white px-6 py-3.5 rounded-xl font-700 text-sm hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <Play size={16} fill="white" />
              Join Instagram
            </a>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center group hover:border-[#F5A300]/30 hover:bg-[#F5A300]/5 transition-all duration-300"
              >
                <div className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#F5A300] group-hover:scale-110 transition-transform inline-block">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/50 text-xs mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
