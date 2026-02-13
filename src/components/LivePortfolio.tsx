'use client';

import { motion } from 'framer-motion';

const SOL_PRICE = 77.10;

const positions = [
  { protocol: 'Kamino KLend', asset: 'SOL', amount: '0.7194', usd: 55.47, apy: 4.66, type: 'supply' as const },
  { protocol: 'Kamino KLend', asset: 'JitoSOL', amount: '0.237', usd: 19.37, apy: 9.2, type: 'supply' as const },
  { protocol: 'Kamino KLend', asset: 'USDC', amount: '12.995', usd: 12.99, apy: 3.39, type: 'supply' as const },
  { protocol: 'Kamino KLend', asset: 'USDC', amount: '-5.00', usd: -5.00, apy: -5.16, type: 'borrow' as const },
  { protocol: 'Marinade', asset: 'mSOL', amount: '0.1103', usd: 9.01, apy: 6.8, type: 'stake' as const },
  { protocol: 'Jupiter', asset: 'JUP', amount: '56.44', usd: 7.70, apy: null, type: 'hold' as const },
  { protocol: 'Jupiter', asset: 'RAY', amount: '10.58', usd: 6.15, apy: null, type: 'hold' as const },
  { protocol: 'Jupiter', asset: 'PYTH', amount: '134.56', usd: 6.14, apy: null, type: 'hold' as const },
  { protocol: 'Wallet', asset: 'SOL', amount: '0.5118', usd: 39.46, apy: null, type: 'liquid' as const },
];

const typeColors = {
  supply: 'text-green-400 bg-green-500/10',
  borrow: 'text-red-400 bg-red-500/10',
  stake: 'text-cyan-400 bg-cyan-500/10',
  hold: 'text-purple-400 bg-purple-500/10',
  liquid: 'text-gray-400 bg-gray-500/10',
};

export default function LivePortfolio() {
  const total = positions.reduce((s, p) => s + p.usd, 0);

  return (
    <section className="px-6 py-12">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-100">Active Positions</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-400">Live on mainnet</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Real positions managed by the agent right now</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-2xl font-mono font-bold text-gray-100">◎ {(total / SOL_PRICE).toFixed(2)}</div>
          <div className="text-sm font-mono text-gray-500">${total.toFixed(2)} USD</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-800/40 overflow-hidden">
        {/* Header - hidden on mobile, cards on mobile instead */}
        <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 bg-bg-card/50 border-b border-gray-800/30 text-xs text-gray-500 font-mono uppercase tracking-wider">
          <div className="col-span-3">Protocol</div>
          <div className="col-span-2">Asset</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-1 text-right">APY</div>
          <div className="col-span-2 text-right">Type</div>
        </div>

        {/* Desktop rows */}
        {positions.map((p, i) => (
          <motion.div
            key={`${p.asset}-${p.protocol}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className={`border-b border-gray-800/20 ${p.usd < 0 ? 'bg-red-500/[0.03]' : 'hover:bg-gray-800/20'} transition-colors`}
          >
            {/* Mobile card layout */}
            <div className="sm:hidden px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${typeColors[p.type]}`}>{p.asset}</span>
                <span className="text-xs text-gray-500 font-sans">{p.protocol}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-mono ${p.usd < 0 ? 'text-red-400' : 'text-gray-200'}`}>
                  {p.usd < 0 ? '-' : ''}${Math.abs(p.usd).toFixed(2)}
                </div>
                {p.apy !== null && (
                  <span className={`text-xs font-mono ${p.apy < 0 ? 'text-red-400' : 'text-green-400'}`}>{p.apy > 0 ? '+' : ''}{p.apy}%</span>
                )}
              </div>
            </div>
            {/* Desktop row layout */}
            <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 text-sm">
              <div className="col-span-3 text-gray-400 font-sans truncate">{p.protocol}</div>
              <div className="col-span-2 font-mono text-gray-200 font-medium">{p.asset}</div>
              <div className="col-span-2 text-right font-mono text-gray-300">{p.amount}</div>
              <div className={`col-span-2 text-right font-mono ${p.usd < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                {p.usd < 0 ? '-' : ''}${Math.abs(p.usd).toFixed(2)}
              </div>
              <div className="col-span-1 text-right font-mono">
                {p.apy !== null ? (
                  <span className={p.apy < 0 ? 'text-red-400' : 'text-green-400'}>{p.apy > 0 ? '+' : ''}{p.apy}%</span>
                ) : (
                  <span className="text-gray-700">—</span>
                )}
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${typeColors[p.type]}`}>{p.type}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
