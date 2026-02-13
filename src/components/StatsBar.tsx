'use client';

import { motion } from 'framer-motion';
import { portfolioStats } from '@/data/mock';

const stats = [
  { label: 'Portfolio Value', value: `◎ ${portfolioStats.totalValue.toFixed(2)}`, sub: `~$${(portfolioStats.totalValue * 77.10).toFixed(0)} USD`, color: 'text-cyan-glow', size: 'text-3xl md:text-4xl' },
  { label: '10-Day Return', value: `${((portfolioStats.totalValue / 2.0 - 1) * 100) >= 0 ? '+' : ''}${((portfolioStats.totalValue / 2.0 - 1) * 100).toFixed(1)}%`, sub: 'SOL-denominated', color: ((portfolioStats.totalValue / 2.0 - 1) >= 0) ? 'text-emerald-400' : 'text-amber-400', size: 'text-3xl md:text-4xl' },
  { label: 'Protocols', value: '7', sub: 'Kamino · Jupiter · Jito · Marinade · Raydium · Orca · Pyth', color: 'text-gray-100', size: 'text-3xl md:text-4xl' },
  { label: 'On-Chain Txs', value: `${portfolioStats.totalTransactions}+`, sub: 'Verified on Solscan', color: 'text-gray-100', size: 'text-3xl md:text-4xl' },
  { label: 'Decision Memos', value: '15+', sub: 'Logged via Memo program', color: 'text-gray-100', size: 'text-3xl md:text-4xl' },
];

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-6 py-10"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className={`${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <div className={`font-mono ${s.size} font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-sans font-medium mb-0.5">{s.label}</div>
            <div className="text-[10px] text-gray-600 font-sans">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
