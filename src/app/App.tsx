import "../styles/fonts.css";
import "../styles/theme.css";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarketTicker } from "./components/MarketTicker";
import { LiveMarket } from "./components/LiveMarket";
import { NewsSection } from "./components/NewsSection";
import { IPOSection } from "./components/IPOSection";
import { TrendingStocks } from "./components/TrendingStocks";
import { EducationSection } from "./components/EducationSection";
import { MemesSection } from "./components/MemesSection";
import { VideoSection } from "./components/VideoSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { CommunitySection } from "./components/CommunitySection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarketTicker />
      <LiveMarket />
      <NewsSection />
      <IPOSection />
      <TrendingStocks />
      <EducationSection />
      <MemesSection />
      <VideoSection />
      <NewsletterSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
