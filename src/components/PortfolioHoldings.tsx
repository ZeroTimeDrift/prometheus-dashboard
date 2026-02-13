'use client';

import { motion } from 'framer-motion';

const SOL_PRICE = 77.10;

interface Holding {
  token: string;
  amount: number;
  valueUsd: number;
  location: string;
  category: 'yield' | 'lst' | 'defi' | 'culture' | 'liquid' | 'stable';
  apy?: number;
}

const holdings: Holding[] = [
  // KLend deposits
  { token: 'SOL', amount: 0.7194, valueUsd: 0.7194 * SOL_PRICE, location: 'Kamino KLend', category: 'yield', apy: 4.66 },
  { token: 'USDC', amount: 12.995, valueUsd: 12.995, location: 'Kamino KLend', category: 'stable', apy: 3.39 },
  { token: 'JitoSOL', amount: 0.237, valueUsd: 0.237 * SOL_PRICE * 1.06, location: 'KLend + Staking', category: 'yield', apy: 9.2 },
  // Borrowed
  { token: 'USDC', amount: -5.0, valueUsd: -5.0, location: 'Borrowed (KLend)', category: 'stable' },
  // Wallet LSTs
  { token: 'mSOL', amount: 0.1103, valueUsd: 0.1103 * SOL_PRICE * 1.06, location: 'Wallet (staking)', category: 'lst', apy: 6.8 },
  // DeFi Index
  { token: 'JUP', amount: 56.44, valueUsd: 56.44 * 0.1365, location: 'Wallet', category: 'defi' },
  { token: 'RAY', amount: 10.58, valueUsd: 10.58 * 0.5817, location: 'Wallet', category: 'defi' },
  { token: 'PYTH', amount: 134.56, valueUsd: 134.56 * 0.04563, location: 'Wallet', category: 'defi' },
  { token: 'ORCA', amount: 5.19, valueUsd: 5.19 * 0.7411, location: 'Wallet', category: 'defi' },
  // Culture
  { token: 'WIF', amount: 18.22, valueUsd: 18.22 * 0.2113, location: 'Wallet', category: 'culture' },
  { token: 'BONK', amount: 834916, valueUsd: 834916 * 0.00000597, location: 'Wallet', category: 'culture' },
  // Liquid
  { token: 'SOL', amount: 0.5118, valueUsd: 0.5118 * SOL_PRICE, location: 'Wallet (liquid)', category: 'liquid' },
];

const totalValue = holdings.reduce((sum, h) => sum + h.valueUsd, 0);

const categoryConfig: Record<string, { label: string; color: string; emoji: string }> = {
  yield: { label: 'Yield Positions', color: 'text-green-400', emoji: '💰' },
  stable: { label: 'Stablecoins', color: 'text-blue-400', emoji: '💵' },
  lst: { label: 'Liquid Staking', color: 'text-cyan-400', emoji: '💧' },
  defi: { label: 'DeFi Index', color: 'text-purple-400', emoji: '📊' },
  culture: { label: 'Culture', color: 'text-yellow-400', emoji: '🐕' },
  liquid: { label: 'Liquid SOL', color: 'text-gray-300', emoji: '◎' },
};

const categories = ['yield', 'stable', 'lst', 'defi', 'culture', 'liquid'];

// Allocation chart data
const allocationData = categories.map(cat => {
  const catValue = holdings.filter(h => h.category === cat).reduce((s, h) => s + h.valueUsd, 0);
  return {
    category: cat,
    ...categoryConfig[cat],
    value: catValue,
    pct: (catValue / totalValue * 100),
  };
}).filter(d => Math.abs(d.value) > 0.01);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function PortfolioHoldings() {
  return (
    <section className="px-6 py-8">
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-lg font-mono font-semibold text-gray-200 tracking-wide">
          PORTFOLIO HOLDINGS
        </h2>
        <span className="text-xs text-gray-500 font-sans">
          ${totalValue.toFixed(2)} total · SOL @ ${SOL_PRICE}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation bar */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-bg-card border border-gray-800/50 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-sans mb-4">Allocation</p>
            
            {/* Stacked bar */}
            <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-gray-800/50">
              {allocationData.filter(d => d.value > 0).map((d, i) => (
                <div
                  key={d.category}
                  className={`h-full ${
                    d.category === 'yield' ? 'bg-green-500' :
                    d.category === 'stable' ? 'bg-blue-500' :
                    d.category === 'lst' ? 'bg-cyan-500' :
                    d.category === 'defi' ? 'bg-purple-500' :
                    d.category === 'culture' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${Math.max(d.pct, 2)}%` }}
                  title={`${d.label}: ${d.pct.toFixed(1)}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {allocationData.filter(d => d.value > 0).map(d => (
                <div key={d.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{d.emoji}</span>
                    <span className="text-xs text-gray-400 font-sans">{d.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">${d.value.toFixed(2)}</span>
                    <span className={`text-xs font-mono font-medium ${d.color}`}>
                      {d.pct.toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* SOL equivalent */}
            <div className="mt-4 pt-4 border-t border-gray-800/50">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500 font-sans">Total in SOL</span>
                <span className="text-sm font-mono text-gray-200 font-bold">
                  ◎ {(totalValue / SOL_PRICE).toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings table */}
        <div className="lg:col-span-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="rounded-xl bg-bg-card border border-gray-800/50 overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 px-4 sm:px-5 py-3 border-b border-gray-800/30 text-xs uppercase tracking-wider text-gray-500 font-sans">
              <div className="sm:col-span-4">Token</div>
              <div className="text-right sm:col-span-3">Value</div>
              <div className="text-right sm:col-span-3 hidden sm:block">SOL eq.</div>
              <div className="text-right sm:col-span-2">APY</div>
            </div>

            {/* Rows */}
            {holdings.map((h, i) => (
              <motion.div
                key={`${h.token}-${h.location}-${i}`}
                variants={item}
                className={`grid grid-cols-3 sm:grid-cols-12 gap-2 px-4 sm:px-5 py-2.5 text-sm border-b border-gray-800/20
                  ${h.valueUsd < 0 ? 'bg-red-500/5' : 'hover:bg-bg-hover/50'}
                  transition-colors`}
              >
                <div className="sm:col-span-4 flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                    h.category === 'yield' ? 'bg-green-500/10 text-green-400' :
                    h.category === 'stable' ? 'bg-blue-500/10 text-blue-400' :
                    h.category === 'lst' ? 'bg-cyan-500/10 text-cyan-400' :
                    h.category === 'defi' ? 'bg-purple-500/10 text-purple-400' :
                    h.category === 'culture' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {h.token}
                  </span>
                  <span className="text-xs text-gray-600 font-sans hidden md:inline truncate">
                    {h.location}
                  </span>
                </div>
                <div className={`text-right sm:col-span-3 font-mono ${h.valueUsd < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                  {h.valueUsd < 0 ? '-' : ''}${Math.abs(h.valueUsd).toFixed(2)}
                </div>
                <div className="text-right sm:col-span-3 font-mono text-gray-500 hidden sm:block">
                  ◎{(Math.abs(h.valueUsd) / SOL_PRICE).toFixed(4)}
                </div>
                <div className="text-right sm:col-span-2 font-mono">
                  {h.apy ? (
                    <span className="text-green-400">{h.apy}%</span>
                  ) : h.valueUsd < 0 ? (
                    <span className="text-red-400">-5.16%</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Total row */}
            <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 px-4 sm:px-5 py-3 bg-bg-hover/30 text-sm font-medium">
              <div className="sm:col-span-4 text-gray-400 font-sans">Total</div>
              <div className="text-right sm:col-span-3 font-mono text-gray-100 font-bold">
                ${totalValue.toFixed(2)}
              </div>
              <div className="text-right sm:col-span-3 font-mono text-gray-300 font-bold hidden sm:block">
                ◎{(totalValue / SOL_PRICE).toFixed(4)}
              </div>
              <div className="sm:col-span-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
