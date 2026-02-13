import HeroHeader from '@/components/HeroHeader';
import StatsBar from '@/components/StatsBar';
import VsComparison from '@/components/VsComparison';
import LivePortfolio from '@/components/LivePortfolio';
import AgentLog from '@/components/AgentLog';
import FlashLoanStory from '@/components/FlashLoanStory';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary relative scanline grid-bg">
      <div className="relative z-10">
        <HeroHeader />

        <div className="max-w-6xl mx-auto">
          <StatsBar />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto">
          <VsComparison />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto">
          <LivePortfolio />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto">
          <FlashLoanStory />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto">
          <AgentLog />
        </div>

        <Footer />
      </div>
    </main>
  );
}
